import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

sequelize.sync()
    .then(() => {
        console.log("User table created.....")
    })
    .catch(() => {
        console.log("Something went wrong in User table......")
        console.log(err);
    });

export default User;