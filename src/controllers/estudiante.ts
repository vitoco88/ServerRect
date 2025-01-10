

import { Request, Response } from 'express'
import Estudiante from '../models/Estudiante'
import { QueryTypes, sequelize } from '../models/sequelize';


export const getDistritos = async (req: Request, res: Response) => {
  try {
    const query = `SELECT tCodigo, tDetallado FROM vDistrito`;  // Tu consulta SQL aquí
    const results = await sequelize.query(query, { type: QueryTypes.SELECT });
    res.json(results);  // Enviar los resultados al frontend
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }
};



export const getTipoDocumento = async (req: Request, res: Response) => {
  try {
    const query = `SELECT tCodigo, tDetallado FROM vTipoDocumento`;  // Tu consulta SQL aquí
    const results = await sequelize.query(query, { type: QueryTypes.SELECT });
    res.json(results);  // Enviar los resultados al frontend
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }
};



export const getNiveles = async (req: Request, res: Response) => {
  try {
    const query = `SELECT tCodigo, tDetallado FROM vNivel`;  // Tu consulta SQL aquí
    const results = await sequelize.query(query, { type: QueryTypes.SELECT });
    res.json(results);  // Enviar los resultados al frontend

    console.log(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }
};




export const getGrado = async (req: Request, res: Response) => {
  try {
    const query = `SELECT tCodigo, tDetallado FROM vGradosPrim`;  // Tu consulta SQL aquí
    const results = await sequelize.query(query, { type: QueryTypes.SELECT });
    res.json(results);  // Enviar los resultados al frontend
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }
};




export const getEstudiantes = async (req: Request, res: Response) => {
  const { tNroDocumento } = req.params;
  try {
    // Realizar la consulta SQL cruda con LEFT JOIN
    const results = await sequelize.query(
      `select  M.tCodEstudiante, e.tNroDocumento, (e.tAPaterno + ' ' +e.tAMaterno +', '+ tNombres) as tApellidosNombres, e.tnivel, 
n.tdetallado as tDetNivel, g.tdetallado as tDetGrado, r.tDetallado as tDetEstadoRegistro,
e.fRegistro
from TESTUDIANTEAPODERADO m
right join TESTUDIANTE e on m.tcodEstudiante = e.tcodestudiante
left join TAPODERADO A ON M.tCodApoderado = A.tCodApoderado
left join VNIVEL n on e.tnivel = n.tcodigo
left join (select * from TTABLA where ttabla = 'grado')  g on e.tCodGrado = g.tcodigo
left join vestadoregistro r on e.tEstadoRegistro = r.Tcodigo
 WHERE a.tNroDocumento = :tNroDocumento
group by  M.tCodEstudiante, e.tNroDocumento, e.tAPaterno,e.tAMaterno , tNombres, e.tnivel, 
n.tdetallado, g.tdetallado, r.tDetallado,
e.fRegistro
ORDER BY m.tCodEstudiante asc`,
      {
        replacements: { tNroDocumento },
        type: QueryTypes.SELECT
      }
    );

    // Mostrar los resultados
    //        console.log(results);
    // Verificar que results es un array

    console.log(typeof results);
    if (Array.isArray(results)) {
      res.json(results);  // Devolver los resultados como un array de objetos
    } else {
      res.status(500).json({ error: 'No se encontraron resultados.' });
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

export const getEstudiante = async (req: Request, res: Response) => {
  const { tCodEstudiante } =  req.params;  // Obtener el parámetro `tCodEstudiante` de la URL
  
    // Realizar la consulta SQL con `await`
    const [result] = await sequelize.query(
      `SELECT tCodEstudiante,
              (tAPaterno + ' ' + tAMaterno + ', ' + tNombres) AS tApellidosNombres,
              tCodTipoDocumento, tNroDocumento, fNacimiento,
              tSexo, tCodDistrito, tDireccion, tTelefono, tEmail,
              tCodGrado, lActivo, lDiscapacidad, tDiscapacidadObs,
              lExonaradoR, tNivel, s.tDetallado as tDetSexo, lRatificacion
       FROM TESTUDIANTE e
       left join vSexo s ON e.tsexo = s.tCodigo
       WHERE tCodEstudiante = :tCodEstudiante`,  // Usar el parámetro en la consulta
      {
        replacements: { tCodEstudiante },  // Pasar el valor del parámetro como `replacements`
        type: QueryTypes.SELECT
      }
    );

      console.log(result);
      res.json(result);  // Enviar los resultados como respuesta
    
};




export const postEstudiante = (req: Request, res: Response) => {

  const { body } = req;

  res.json({
    msg: 'getProd',
    body
  })
}






export const updateEstudiante = async (req: Request, res: Response) => {
  const { tCodEstudiante } = req.params;  // Suponiendo que el ID del producto se pasa como parámetro en la URL.
  const { tTelefono, tDireccion, tEmail, tCodDistrito, lExonaradoR, lDiscapacidad,
tDiscapacidadObs,  lRatificacion, tCodGrado,tNivel, tEstadoRegistro   
   } = req.body;  // Suponiendo que los nuevos valores del producto se pasan en el cuerpo de la solicitud.

  // Inicia una transacción
  const t = await sequelize.transaction();

  try {
      // Ejecutamos la consulta UPDATE dentro de la transacción
      const result = await sequelize.query(
          `UPDATE TESTUDIANTE
      SET tTelefono = :tTelefono,
          tDireccion = :tDireccion,
          tEmail = :tEmail,
          tCodDistrito = :tCodDistrito,
          lExonaradoR = :lExonaradoR,
          lDiscapacidad  = :lDiscapacidad,
          tDiscapacidadObs = :tDiscapacidadObs,
          lRatificacion= :lRatificacion,
          tCodGrado = :tCodGrado,
          tNivel = :tNivel,
          tEstadoRegistro = :tEstadoRegistro,
          fRegistro = getDate()
      WHERE tCodEstudiante = :tCodEstudiante`,
          {
              replacements: { tCodEstudiante, tTelefono, tDireccion,
                tEmail, tCodDistrito, lExonaradoR, lDiscapacidad, tDiscapacidadObs, lRatificacion,
                tCodGrado, tNivel, tEstadoRegistro
               },
              type: QueryTypes.UPDATE,
              transaction: t,  // Aquí indicamos que esta consulta debe usar la transacción `t`
          }
      );

      const affectedRows = result[1] as number | undefined

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
