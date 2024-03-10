import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

sequelize.sync()
    .then(() => {
        console.log("Category table created.....")
    })
    .catch(() => {
        console.log("Something went wrong in Category table......")
        console.log(err);
    });

export default Category;