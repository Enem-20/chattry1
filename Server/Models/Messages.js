import {DataTypes} from "sequelize";

export let MessagesT = this.SequelizedDatabase.define("messages",
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        ChatId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        AuthorId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        CreateDateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        MessageTxt: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: false
    });