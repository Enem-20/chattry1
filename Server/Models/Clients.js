import {DataTypes} from "sequelize";

export let ClientsT = this.SequelizedDatabase.define("clients",
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        }
    }, {
        timestamps: false
    });