import * as amqp from 'amqplib';
import config from "../../config/config";
import { Kafka } from 'kafkajs';
/**
 *
 * Generic reciever for amqp
 * @param {string} exchangeName
 * @param {string} exchangeType
 * @param {string} queue
 * @param {string} pattern
 * @param {function} callback
 *
 */
export const reciever = async (exchangeName, exchangeType, queue, pattern, processMessage) => {
    try {
        const conn = await amqp.connect(config.amqp);
        const channel = await conn.createChannel();
        await channel.assertExchange(exchangeName, exchangeType);
        await channel.assertQueue(queue);
        await channel.bindQueue(queue, exchangeName, pattern);
        channel.consume(queue, onMessage(channel));
    }
    catch (error) {
        console.log(error);
    }
    // funcion de tipo clausura
    function onMessage(channel) {
        return async function (message) {
            try {
                if (message) {
                    const content = JSON.parse(message.content.toString());
                    const result = await processMessage(content);
                    if (result) {
                        await channel.ack(message);
                        console.log(`Mensaje ${message.fields.deliveryTag} confirmado`);
                    }
                    else {
                        console.log(`Mensaje ${message.fields.deliveryTag} rechazado y devuelto a la cola`);
                    }
                }
            }
            catch (error) {
                if (error.codigo == 400 && message) {
                    console.log(error);
                    await channel.ack(message);
                    console.log(` El Mensaje ${message.fields.deliveryTag} ya fue procesado`);
                }
                console.log(error);
            }
        };
    }
};
//Reciever for kafka
export const recieverKafka = async (topic, groupID, processMessage) => {
    try {
        const kafka = new Kafka({
            clientId: 'security',
            brokers: ['kafka:9092'],
        });
        const consumer = kafka.consumer({ groupId: groupID });
        await consumer.connect();
        await consumer.subscribe({ topic, fromBeginning: true });
        await consumer.run({
            autoCommit: false,
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    if (message.value == null)
                        return;
                    const content = JSON.parse(message.value.toString());
                    const result = await processMessage(content);
                    if (result) {
                        console.log(`Mensaje ${message.offset} confirmado y viene desde el topic ${topic} y la particion ${partition}`);
                        const offsetToCommit = Number(message.offset) + 1;
                        await consumer.commitOffsets([
                            { topic, partition, offset: String(offsetToCommit) },
                        ]);
                    }
                    else {
                        console.log(`Mensaje ${message.offset} rechazado y devuelto a la cola`);
                    }
                }
                catch (error) {
                    try {
                        if (error.codigo == 400 && message) {
                            const offsetToCommit = Number(message.offset) + 1;
                            await consumer.commitOffsets([
                                { topic, partition, offset: String(offsetToCommit) },
                            ]);
                            console.log(`el mensaje ${message.offset} ya fue procesado ${topic}`);
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            },
        });
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=reciever.js.map