import { reciever } from "../brokerComunicacion";
import { userController } from ".";
import logger from "../logger/logger";
import mongoose from "mongoose";
/**
 * Process the content of the message
 * @param  {NewCreatedUser} content
 * @returns  {Promise<boolean>}
 */
const processContentCreate = async (content) => {
    content = JSON.parse(content);
    const userData = {
        firstName: content.firstName,
        lastName: content.lastName,
        displayName: content.displayName,
        password: content.password,
        email: content.email,
        role: content.role,
        isEmailVerified: content.isEmailVerified,
        empresas: content.empresas,
        empresaActiva: content.empresaActiva,
        cuentas: content.cuentas,
        cuentaActiva: content.cuentaActiva,
        _id: content.id,
    };
    if (userData && typeof userData === 'object') {
        const result = await userController.createUserByBroker(userData);
        if (result) {
            return true;
        }
        return false;
    }
    else {
        return false;
        console.error('Error: userData is not a valid object');
    }
};
/**
 * process the content of the message to delete user
 *  @param content any
 */
const processContentDelete = async (content) => {
    content = JSON.parse(content);
    const userId = content.userId;
    const result = await userController.deleteUserByIdBroker(new mongoose.Types.ObjectId(userId));
    if (result) {
        return true;
    }
    return false;
};
const processContentUpdate = async (content) => {
    content = JSON.parse(content);
    console.log(content);
    const userId = content.id;
    const result = await userController.updateUserByBroker(new mongoose.Types.ObjectId(userId), content);
    if (result) {
        return true;
    }
    return false;
};
/**
 * Reciever for new user
 * @returns  {Promise<void>}
 */
export const recieverNewAccountUser = async () => {
    try {
        const exchangeName = "user";
        const exchangeType = "topic";
        const queue = "securityUser";
        const pattern = "user.create";
        await reciever.reciever(exchangeName, exchangeType, queue, pattern, processContentCreate);
        logger.info(`Reciever User connected`);
    }
    catch (error) {
        console.log(error);
    }
};
export const recieverNewAccountUserKafka = async () => {
    try {
        const topic = "user.create";
        const groupID = "userSecurity";
        await reciever.recieverKafka(topic, groupID, processContentCreate);
        logger.info(`Reciever kafka User connected`);
    }
    catch (error) {
        console.log(error);
    }
};
/**
 * Reciever for deleted user
 * @returns  {Promise<void>}
 */
export const recieverDeleteAccountUser = async () => {
    try {
        const exchangeName = "user";
        const exchangeType = "topic";
        const queue = "securityDeleteUser";
        const pattern = "user.delete";
        await reciever.reciever(exchangeName, exchangeType, queue, pattern, processContentDelete);
        logger.info(`Reciever deleted User connected`);
    }
    catch (error) {
        console.log(error);
    }
};
export const recieverDeleteAccountUserKafka = async () => {
    try {
        const topic = "user.delete";
        const groupID = "userDeletSecurity";
        await reciever.recieverKafka(topic, groupID, processContentDelete);
        logger.info(`Reciever kafka deleted User connected`);
    }
    catch (error) {
        console.log(error);
    }
};
/**
 * Reciever for updated user
 * @returns  {Promise<void>}
 */
export const recieverUpdateAccountUser = async () => {
    try {
        const exchangeName = "user";
        const exchangeType = "topic";
        const queue = "securityUpdateUser";
        const pattern = "user.update";
        await reciever.reciever(exchangeName, exchangeType, queue, pattern, processContentUpdate);
        logger.info(`Reciever updated User connected`);
    }
    catch (error) {
        console.log(error);
    }
};
export const recieverUpdateAccountUserKafka = async () => {
    try {
        const topic = "user.update";
        const groupID = "userUpdateSecurity";
        await reciever.recieverKafka(topic, groupID, processContentUpdate);
        logger.info(`Reciever kafka updated User connected`);
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=user.reciever.js.map