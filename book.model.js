import {Sequelize, DataTypes} from "sequelize";
import {DataBaseUtils} from "./DataBaseUtils.js";

const sequelize = DataBaseUtils.authentication();

const Book  = sequelize.define("books",
    {title: {
        type: DataTypes.STRING,
            allowNull: false
        },
        author: {
        type: DataTypes.STRING,
            allowNull: false
        },
        release_date: {
            type: DataTypes.DATEONLY,
        },
        subject:{
            type: DataTypes.INTEGER,
        }
    });

sequelize.sync().then(() => {
    console.log('Book table created successfully!');
}).catch((error) => {
    console.error('Unable to create table: ', error);
});