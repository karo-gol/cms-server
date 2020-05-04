import { Sequelize } from "sequelize";
import { dbUrl } from "./sequelize/config";

const sequelize = new Sequelize(dbUrl, {    
    dialectOptions: {
        charset: "utf8",
        multipleStatements: true
    },
    logging: false
});

try {
    sequelize.authenticate();
    console.log('Connection to MySql has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the MySql database:', error);
}

export default sequelize;