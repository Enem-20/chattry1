import {DataTypes, Sequelize} from "sequelize";
import {DataBaseUtils} from "../DataBaseUtils.js";

export default function getChatsT(dataBaseUtils) {
    return dataBaseUtils.define("chats",
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
}

//exports.default = getChatsT;