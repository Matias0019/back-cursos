import httpStatus from 'http-status';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import * as userService from './user.service';
import { BrokerError } from '../errors';
export const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
});
export const getUsers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
    const result = await userService.queryUsers(filter, options);
    res.send(result);
});
export const getUser = catchAsync(async (req, res) => {
    if (typeof req.params['userId'] === 'string') {
        const user = await userService.getUserById(new mongoose.Types.ObjectId(req.params['userId']));
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        res.send(user);
    }
});
export const updateUser = catchAsync(async (req, res) => {
    if (typeof req.params['userId'] === 'string') {
        const user = await userService.updateUserById(new mongoose.Types.ObjectId(req.params['userId']), req.body);
        res.send(user);
    }
});
export const deleteUser = catchAsync(async (req, res) => {
    if (typeof req.params['userId'] === 'string') {
        await userService.deleteUserById(new mongoose.Types.ObjectId(req.params['userId']));
        res.status(httpStatus.NO_CONTENT).send();
    }
});
/**
 * Delete user by id from broker
 * @param {mongoose.Types.ObjectId} userId
 * @returns {Promise<IUserDoc | null>}
 */
export const deleteUserByIdBroker = async (userId) => {
    const user = await userService.getUserById(userId);
    if (!user) {
        throw new BrokerError("El usuario no existe", 401);
    }
    await user.remove();
    return user;
};
/**
 * Create user by broker message
 * @param {NewCreatedUserByBroken} userBody
 * @returns {Promise<IUserDoc>}
 *
 */
export const createUserByBroker = async (userBody) => {
    const user = await userService.createUser(userBody);
    return user;
};
/**
 * Update user by broker message
 * @param {mongoose.Types.ObjectId} userId
 * @param {UpdateUserBody} updateBody
*/
export const updateUserByBroker = async (userId, updateBody) => {
    const user = await userService.updateUserById(userId, updateBody);
    return user;
};
//# sourceMappingURL=user.controller.js.map