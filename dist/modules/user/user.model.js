import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { roles } from '../../config/roles';
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        },
    },
    active: Boolean,
    profileImageURL: String,
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error('Password must contain at least one letter and one number');
            }
        },
        private: true, // used by the toJSON plugin
    },
    role: {
        type: String,
        enum: roles,
        default: 'user',
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    cuentas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cuenta'
        }
    ],
    cuentaActiva: {
        type: Schema.Types.ObjectId,
        ref: 'Cuenta'
    },
    empresas: [{
            type: Schema.Types.ObjectId,
            ref: 'Empresa'
        }],
    empresaActiva: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa'
    },
}, {
    timestamps: true,
});
// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static('isEmailTaken', async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
});
/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.method('isPasswordMatch', async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
});
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=user.model.js.map