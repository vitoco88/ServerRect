"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryTypes = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "QueryTypes", { enumerable: true, get: function () { return sequelize_1.QueryTypes; } });
// Configuración de la base de datos
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mssql', // Cambia esto a 'postgres' si usas PostgreSQL
    host: '161.132.68.10', // La dirección de tu base de datos (local o remota)
    username: 'sa', // Tu nombre de usuario de la base de datos
    password: 'Maktub1988!', // Tu contraseña de la base de datos
    database: 'GUEMM', // Nombre de tu base de datos
    logging: false, // Puedes activar el log para ver las consultas ejecutadas (true) o desactivarlo (false)
});
exports.sequelize = sequelize;
// Verificación de la conexión a la base de datos
sequelize.authenticate()
    .then(() => {
    console.log('Conexión a la base de datos exitosa');
})
    .catch((error) => {
    console.error('Error de conexión a la base de datos:', error);
});
