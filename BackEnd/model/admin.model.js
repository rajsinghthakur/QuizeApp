import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const Admin = sequelize.define("Admin", {
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
    }
});

sequelize.sync()
    .then(() => {
        console.log("Admin table created.....")
    })
    .catch(() => {
        console.log("Something went wrong in admin table......")
        console.log(err);
    });

export default Admin;