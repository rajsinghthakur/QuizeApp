import { Sequelize } from "sequelize";

const sequelize = new Sequelize("QuizeApp", "root", "Raj@882714", { host: "localhost", dialect: "mysql", timezone: "+05:30" });

sequelize.authenticate().then(() => {
    console.log("Database Connected.....");
}).catch(() => {
    console.log("Database Connection Failed.....");
    console.log(err);
})

export default sequelize;