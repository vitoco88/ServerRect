import { Sequelize, QueryTypes } from 'sequelize';


// Configuración de la base de datos
const sequelize = new Sequelize({
    dialect: 'mssql',  // Cambia esto a 'postgres' si usas PostgreSQL
    host: '161.132.68.10', // La dirección de tu base de datos (local o remota)
    username: 'sa',  // Tu nombre de usuario de la base de datos
    password: 'Maktub1988!',  // Tu contraseña de la base de datos
    database: 'GUEMM',  // Nombre de tu base de datos
    logging: false,  // Puedes activar el log para ver las consultas ejecutadas (true) o desactivarlo (false)
  });
  
  // Verificación de la conexión a la base de datos
  sequelize.authenticate()
    .then(() => {
      console.log('Conexión a la base de datos exitosa');
    })
    .catch((error) => {
      console.error('Error de conexión a la base de datos:', error);
    });
  
  // Exportar la instancia de Sequelize
  export { sequelize, QueryTypes };