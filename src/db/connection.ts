import { Sequelize } from "sequelize";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('GUEMM', 'sa', 'Maktub1988!', {
    host: '161.132.68.10',
   // port: 3306,
    dialect: 'mssql',
    logging: false
    
  });

  export default sequelize;