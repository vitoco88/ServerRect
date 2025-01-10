"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Estudiante = connection_1.default.define('TESTUDIANTE', {
    tDireccion: {
        type: sequelize_1.DataTypes.STRING
    },
    tCodEstudiante: {
        type: sequelize_1.DataTypes.STRING
    },
    tTelefono: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false,
    modelName: 'TESTUDIANTE', // Especifica el nombre de la tabla (sin cambios automáticos)
    tableName: 'TESTUDIANTE', // Nombre de la tabla en la base de datos
    freezeTableName: true // Evita que Sequelize cambie el nombre de la tabla
});
exports.default = Estudiante;
