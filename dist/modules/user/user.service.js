import httpStatus from 'http-status';
import User from './user.model';
import ApiError from '../errors/ApiError';
import { BrokerError } from '../errors';
/**
 * Create a user
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new BrokerError('El usuario ya existe', 400);
    }
    return User.create(userBody);
};
/**
 * Register a user
 * @param {NewRegisteredUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const registerUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return User.create(userBody);
};
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryUsers = async (filter, options) => {
    const users = await User.paginate(filter, options);
    return users;
};
/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserById = async (id) => User.findById(id).populate('empresas');
/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserByEmail = async (email) => User.findOne({ email }).populate('empresas');
/**
 * Update user by id
 * @param {mongoose.Types.ObjectId} userId
 * @param {UpdateUserBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new BrokerError("El usuario no existe", 401);
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new BrokerError("Este mail ya esta usado por otro usuario", 401);
    }
    updateBody.password = user.password;
    Object.assign(user, updateBody);
    await user.save();
    return user;
};
/**
 * Delete user by id
 * @param {mongoose.Types.ObjectId} userId
 * @returns {Promise<IUserDoc | null>}
 */
export const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
    return user;
};
//# sourceMappingURL=user.service.js.map