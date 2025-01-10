"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Option 3: Passing parameters separately (other dialects)
const sequelize = new sequelize_1.Sequelize('GUEMM', 'sa', 'Maktub1988!', {
    host: '161.132.68.10',
    // port: 3306,
    dialect: 'mssql',
    logging: false
});
exports.default = sequelize;
