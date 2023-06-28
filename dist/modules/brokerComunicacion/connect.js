import { userReciever } from '../user';
export const connect = async () => {
    try {
        // Recievers for user
        await userReciever.recieverDeleteAccountUserKafka();
        await userReciever.recieverUpdateAccountUserKafka();
        await userReciever.recieverNewAccountUserKafka();
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=connect.js.map