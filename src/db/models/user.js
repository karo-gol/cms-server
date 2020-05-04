import { DataTypes, Model } from "sequelize";

import sequelize from "../connection";


export class User extends Model {}
User.init(
    {
        userId: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.MEDIUMINT
        },
        login: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.CHAR(64)
        },
        tokenVersion: {
            type: DataTypes.BIGINT
        }
    },
    {
        modelName: "users",
        sequelize
    }
);