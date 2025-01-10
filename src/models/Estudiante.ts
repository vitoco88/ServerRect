import { DataTypes } from 'sequelize'
import db from '../db/connection'



const Estudiante = db.define('TESTUDIANTE', {

    tDireccion:{
        type: DataTypes.STRING
    },

    

    tCodEstudiante:{
       type: DataTypes.STRING
    },
    tTelefono:{
        type: DataTypes.STRING
    }
},
{ 
    createdAt: false,
    updatedAt: false,
    modelName: 'TESTUDIANTE', // Especifica el nombre de la tabla (sin cambios automáticos)
    tableName: 'TESTUDIANTE', // Nombre de la tabla en la base de datos
    freezeTableName: true // Evita que Sequelize cambie el nombre de la tabla
} 
)
export default Estudiante;