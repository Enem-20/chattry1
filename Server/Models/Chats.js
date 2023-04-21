import {DataTypes} from "sequelize";

export let ChatsT = this.SequelizedDatabase.define("chats",
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        Owner1Id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        Owner2Id: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
        timestamps: false
    });