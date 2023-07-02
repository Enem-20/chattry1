import {DataTypes, Sequelize} from "sequelize";
import {DataBaseUtils} from "../DataBaseUtils.js";

export default function getMessagesT(dataBaseUtils){
    return dataBaseUtils.define("messages",
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
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false
        });
}

//exports.default = getMessagesT;