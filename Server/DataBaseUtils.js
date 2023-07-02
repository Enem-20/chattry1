import {Op, DataTypes, Sequelize} from "sequelize";
import getMessagesT from './Models/Messages.js';
import getClientsT from './Models/Clients.js';
import getChatsT from './Models/Chats.js';


export class DataBaseUtils {
    static authentication(
        database = 'hello_world_db',
        username = 'root',
        password = 'kloaka80009!',
        options = {
            host: 'localhost',
            dialect: 'mysql'
        }) {
        const sequelize = new Sequelize(
            database,
            username,
            password,
            options
        );

        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect the database: ', error);
        });

        return sequelize;
    }

    constructor() {
        this.SequelizedDatabase = DataBaseUtils.authentication();
    }

    get sequelizedDatabase(){
        return this.SequelizedDatabase;
    }

    async findUserById(id = -1) {
        await this.SequelizedDatabase.sync().catch((error) => {
            console.error('Unable to create table : ', error);
        });

        return getClientsT(this.SequelizedDatabase).findOne({
            where: {
                id: id
            }
        }).catch((error) => {
            console.error("failed to retrieve data: ", error)
        });
    }

    async findAllLastMessagesFromChatArray(ChatArray) {
        await this.SequelizedDatabase.sync().catch((error) => {
            console.error('Unable to create table : ', error);
        });
        let lastMessagesArray = [];
        for (let i = 0; i < ChatArray.length; ++i) {
            lastMessagesArray.push(await getMessagesT(this.SequelizedDatabase).findOne({
                where: {
                    ChatId: ChatArray[i]
                },
                order: [
                    ['CreateDateTime', 'DESC']
                ]
            }));
        }
        
        return lastMessagesArray;
    }

    async findChatsByUserId(id = -1, limitedNumberOfRecords = -1) {
        return getChatsT(this.SequelizedDatabase).findAll({
            where: {
                [Op.or]: [
                    {Owner1Id: id},
                    {Owner2Id: id}
                ]
            },
            limit: ((limitedNumberOfRecords < 0) ? this.SequelizedDatabase.query.limit : limitedNumberOfRecords)
        }).catch((error) => {
            console.error("failed to retrieve data: ", error)
        });

    }

    async findAllMessagesByChatId(id = -1, limitedNumberOfRecords = -1) {
        return getMessagesT(this.SequelizedDatabase).findAll({
            where: {
                ChatId: id
            },
            limit: ((limitedNumberOfRecords < 0) ? this.SequelizedDatabase.query.limit : limitedNumberOfRecords),
            order: [
                ['CreateDateTime', 'DESC']
            ]
        });
    }
}

//module.exports = DataBaseUtils

////////////////////////////////////////Some db tests///////////////////////////////////////////////////////////////////
let DBtest = new DataBaseUtils();
let currentUserId = 2;
let user = await DBtest.findUserById(currentUserId).then((result) => {
    return result;
});

let chatsForUser1 = await DBtest.findChatsByUserId(user.id).then((result) => {
    return result;
});


console.log(`Here is your user: ${user.id}`);
let ChatIdArray = [];
for (let i = 0; i < chatsForUser1.length; ++i) {
    ChatIdArray.push(chatsForUser1[i].id);
}
let lastMessagesByChatIds = await DBtest.findAllLastMessagesFromChatArray(ChatIdArray).then((result) => {
    return result;
});

for (let i = 0; i < lastMessagesByChatIds.length; ++i) {
    ChatIdArray.push(lastMessagesByChatIds[i].id);
}

for (let i = 0; i < lastMessagesByChatIds.length; ++i) {
    console.log(lastMessagesByChatIds[i].MessageTxt);
}

let MessagesForChat = await DBtest.findAllMessagesByChatId(ChatIdArray[0]).then((result) => {
    return result;
});

for (let i = 0; i < MessagesForChat.length; ++i) {
    console.log(`Message${i}: ${MessagesForChat[i].MessageTxt}`);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////