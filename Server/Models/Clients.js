import {DataTypes, Sequelize} from "sequelize";
import {DataBaseUtils} from "../DataBaseUtils.js";

export default function getClientsT(dataBaseUtils){
    return dataBaseUtils.define("clients",
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true
            }
        }, {
            timestamps: false
        });
}

//exports.default = getClientsT;