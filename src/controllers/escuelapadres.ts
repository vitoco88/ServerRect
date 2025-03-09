import { Request, Response } from 'express'
import { QueryTypes, sequelize } from '../models/sequelize';
import { format } from 'date-fns';


/*
// Método para insertar datos con transacción y devolver la fecha del servidor
export const InsertEstudiante = async (req: Request, res: Response) => {
    const { tCodEscuelaPadres, fFecha, tCodEstudiante } = req.body;

    // Empezamos una transacción
    const transaction = await sequelize.transaction();
    const moment = require('moment-timezone');
    try {
        // Obtener la fecha actual del servidor dentro de la transacción
        const [serverDateResult] = await sequelize.query('SELECT GETDATE() AS serverDate', {
            type: QueryTypes.SELECT,
            transaction  // Usamos la misma transacción
        });

        // Verificamos que la propiedad "serverDate" esté presente en el resultado
        const serverDate: string = (serverDateResult as { serverDate: string }).serverDate;


      console.log(serverDate);


       // Convertir la fecha a la zona horaria de Lima y formatearla
       const formattedDate = moment.utc(serverDate).format('YYYYMMDD HH:mm:ss');


 
        console.log(formattedDate);

        console.log(tCodEscuelaPadres);
        console.log(tCodEstudiante);
        console.log(formattedDate);

        // Ejecutar el SQL crudo para insertar el registro dentro de la transacción
        const insertQuery = `
            INSERT INTO TASISTENCIAPADRES
            (tCodEscuelaPadres, fFecha, tCodEstudiante,  fRegistro, lRegistro)
            VALUES
            ('${tCodEscuelaPadres}', '${formattedDate}', '${tCodEstudiante}',  '${formattedDate}', 1)
        `;

        console.log(insertQuery);

        // Ejecutar la consulta de inserción con la transacción
        await sequelize.query(insertQuery, {
            type: QueryTypes.INSERT,
            transaction  // Pasamos la transacción para que la consulta esté dentro de la transacción
        });

        // Si todo fue bien, hacemos commit de la transacción
        await transaction.commit();
        console.log("exito");
        // Devolver la respuesta con la fecha del servidor
        res.json({
            success: true,
            message: 'Registro insertado correctamente',
            serverDate: serverDate
        });
    } catch (error) {
        // Si ocurre un error, hacemos rollback
        await transaction.rollback();
        console.error('Error al insertar:', error);
        res.status(500).json({
            success: false,
            message: 'Error al insertar el registro',
        });
    }
};
*/



export const InsertEstudiante = async (req: Request, res: Response) => {
    const { tCodEscuelaPadres, fFecha, tCodEstudiante } = req.body;

    // Empezamos una transacción
    const transaction = await sequelize.transaction();
    const moment = require('moment-timezone');
    try {
        // Obtener la fecha actual del servidor dentro de la transacción
        const [serverDateResult] = await sequelize.query('SELECT GETDATE() AS serverDate', {
            type: QueryTypes.SELECT,
            transaction  // Usamos la misma transacción
        });

        // Verificamos que la propiedad "serverDate" esté presente en el resultado
        const serverDate: Date = (serverDateResult as { serverDate: Date }).serverDate;

//        console.log('Fecha del servidor:', serverDate);

        // Convertir la fecha a la zona horaria de Lima y formatearla
        const formattedDate = moment.utc(serverDate).format('YYYYMMDD HH:mm:ss');

     //   console.log('Fecha formateada:', formattedDate);

        // Verificar si el tCodEstudiante ya existe en la tabla TASISTENCIAPADRES
        const [existingRecord] = await sequelize.query(
            `SELECT COUNT(*) AS count FROM TASISTENCIAPADRES WHERE tCodEstudiante = :tCodEstudiante`,
            {
                replacements: { tCodEstudiante },
                type: QueryTypes.SELECT,
                transaction,  // Usamos la misma transacción
            }
        );

        // Verificamos que la propiedad "serverDate" esté presente en el resultado
        const count: number = (existingRecord as { count: number }).count;


     //   console.log("es " + count);
        // Si el registro ya existe, solo devolver la fecha del servidor
        if (count > 0) {

        //    console.log("ya existe " + count);

            await transaction.commit();
            res.json({
                success: true,
                message: 'El estudiante ya está registrado.',
               // serverDate: serverDate,
            });
        }
        else {

            // Si no existe, realizar la inserción
            const insertQuery = `
            INSERT INTO TASISTENCIAPADRES
            (tCodEscuelaPadres, fFecha, tCodEstudiante,  fRegistro, lRegistro)
            VALUES
            ('${tCodEscuelaPadres}', '${formattedDate}', '${tCodEstudiante}',  '${formattedDate}', 1)
        `;

        //    console.log('Consulta de inserción:', insertQuery);

            // Ejecutar la consulta de inserción con la transacción
            await sequelize.query(insertQuery, {
                type: QueryTypes.INSERT,
                transaction  // Pasamos la transacción para que la consulta esté dentro de la transacción
            });

            // Si todo fue bien, hacemos commit de la transacción
            await transaction.commit();
            console.log("Registro insertado correctamente");

            // Devolver la respuesta con la fecha del servidor
            res.json({
                success: true,
                message: 'Registro insertado correctamente',
                serverDate: serverDate
            });
        }
    } catch (error) {
        // Si ocurre un error, hacemos rollback
        await transaction.rollback();
        console.error('Error al insertar:', error);
        res.status(500).json({
            success: false,
            message: 'Error al insertar el registro',
        });
    }
};

export const FilterEstudiante = async (req: Request, res: Response) => {
    const { stringParam, valor } = req.body;
    //console.log("consulto");

    let nivelQuery = ""; // Por defecto, filtra por el parámetro recibido


    // Si el parámetro es '01', significa que queremos incluir los tres niveles: Inicial, Primaria y Secundaria
    if (stringParam === "01") {
        nivelQuery = "tNroDocumento "; // Queremos filtrar por número de documento

    }
    if (stringParam === "02") {
        nivelQuery = "tApeNombres"; // Queremos filtrar por apellido y nombres
    }

    try {
        // Asegúrate de usar correctamente los parámetros en la consulta
        const query = `
        SELECT tcodEscuelaPadres
              ,fFecha
              ,tCodEstudiante
              ,tNroDocumento
              ,tApeNombres
              ,tNivel
              ,tDetNivel
              ,tCodGrado
              ,tDetGrado
              ,tCodParentesco
              ,tDetParentesco
              ,lRegistro
              ,fRegistro
        FROM vEstudiantesEscuelaPadres
        WHERE ${nivelQuery} LIKE :valor   order by ${nivelQuery} asc`;

        const results = await sequelize.query(query, {
            replacements: {
                valor: `%${valor}%`,
            },
            type: QueryTypes.SELECT
        });
        console.log(query);
        if (results) {
            res.json(results);
        } else {
            res.status(404).json({ error: 'No data found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data from database' });
    }
};




export const QuitarAsistencia = async (req: Request, res: Response) => {
    const { tCodEstudiante } = req.params;  // Suponiendo que el ID del producto se pasa como parámetro en la URL.
    
    console.log("quitando");
    // Inicia una transacción
    const t = await sequelize.transaction();
  
    try {
  
      //  console.log("llego tipo docu " + tCodTipoDocumento);
      // console.log("fecnac " + fNacimiento);
  
      // Ejecutamos la consulta UPDATE dentro de la transacción
      const result = await sequelize.query(
        `delete from TASISTENCIAPADRES WHERE tCodEstudiante = :tCodEstudiante`,
        {
          replacements: {
            tCodEstudiante
          },
          type: QueryTypes.DELETE,
          transaction: t,  // Aquí indicamos que esta consulta debe usar la transacción `t`
        }
      );
  
    //  const affectedRows = result[1] as number | undefined
  
      // Si no se actualizaron filas, significa que no se encontró el producto
      //    if (affectedRows && affectedRows > 0) {
      // Si la actualización fue exitosa, confirmamos la transacción
      await t.commit();
      res.json({ msg: 'Producto actualizado correctamente' });
      //    } else {
      // Si no se encontró el producto, deshacemos la transacción
      //    await t.rollback();
      //       res.status(404).json({ msg: 'Producto no encontrado' });
      //       }
  
    } catch (error) {
      // Si ocurrió un error, deshacemos la transacción
      await t.rollback();
      res.status(500).json({
        msg: 'Error al actualizar el producto',
      });
    }
  }