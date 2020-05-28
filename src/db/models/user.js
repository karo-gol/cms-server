import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

export class User extends Model {}
User.init(
    {
        id: {
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
        createdAt: {
            type: DataTypes.DATE
        }
    },
    {
        modelName: "users",
        sequelize
    }
);