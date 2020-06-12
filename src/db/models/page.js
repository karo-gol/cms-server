import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection';

export class Page extends Model {}
Page.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.MEDIUMINT
        },
        header: {               
            type: DataTypes.STRING
        },
        content: {
            allowNull: false,           
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.MEDIUMINT,
            references: {
                model: User,
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE
        }
    },
    {
        modelName: "pages",
        sequelize
    }
);