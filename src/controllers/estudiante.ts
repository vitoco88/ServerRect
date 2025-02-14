

import { query, Request, Response } from 'express'
import Estudiante from '../models/Estudiante'
import { QueryTypes, sequelize } from '../models/sequelize';
import { Transaction } from 'sequelize';





export const getDistritos = async (req: Request, res: Response) => {
  try {
    const query = `SELECT tCodigo, tDetallado FROM vDistrito`;  // Tu consulta SQL aquí
    const results = await sequelize.query(query, { type: QueryTypes.SELECT });
    res.json(results);  // Enviar los resultados al frontend
  } catch (error) {
    //  console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }
};



export const getTipoDocumento = async (req: Request, res: Response) => {
  try {
    const query = `SELECT tCodigo, tDetallado FROM vTipoDocumento`;  // Tu consulta SQL aquí
    const results = await sequelize.query(query, { type: QueryTypes.SELECT });
    res.json(results);  // Enviar los resultados al frontend
  } catch (error) {
    // console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }
};



export const getNiveles = async (req: Request, res: Response) => {
  try {
    const query = `SELECT tCodigo, tDetallado FROM vNivel`;  // Tu consulta SQL aquí
    const results = await sequelize.query(query, { type: QueryTypes.SELECT });
    res.json(results);  // Enviar los resultados al frontend

    //   console.log(results);
  } catch (error) {
    //  console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }
};


// Cerrar la conexión solo cuando se apaga el servidor
process.on("SIGINT", async () => {
  await sequelize.close();
  console.log("Conexión cerrada ✅");
  process.exit(0);
});



export const getEstudentsFilter = async (req: Request, res: Response) => {

  const { stringParam, fechaInicial, fechaFinal } = req.body;
  try {

    let nivelQuery = ""; // Por defecto, filtra por el parámetro recibido
    let Horafinal = " 23:59:59";

    // Si el parámetro es '04', significa que queremos incluir los tres niveles: Inicial, Primaria y Secundaria
    if (stringParam === "04") {
      nivelQuery = "e.tnivel IN ('01', '02', '03')";
    }
    if (stringParam == "01") {
      nivelQuery = "e.tnivel = '01'";
    }
    if (stringParam == "02") {
      nivelQuery = "e.tnivel = '02'";
    }
    if (stringParam == "03") {
      nivelQuery = "e.tnivel = '03'";
    } 


    // Convertir las fechas si están en otro formato
    const fechaInicioFormatted = new Date(fechaInicial).toISOString().split("T")[0];
    const fechaFinFormatted = (fechaFinal) + " 23:59:59" ;


//    console.log("fecha final  " + fechaFinFormatted)

    const query = `SELECT e.tCodEstudiante, g.tDetallado AS Grado, t.tDetallado as TipoDocumentoEst, e.tNroDocumento, e.tCodSiagieEst, ISNULL(e.tAPaterno, '') as tAPaterno, 
ISNULL(e.tAMaterno, '') as tAMaterno, ISNULL(e.tNombres,'') as tNombres,
e.tSexo, e.fNacimiento, e.fRegistro, s.tDetallado as tDetSeguro, d.tDetallado as tDetDistrito, e.tDireccion, e.tTelefono, e.tEmail,
CASE WHEN e.lDiscapacidad = 1 then 'SI' ELSE 'NO' END as tDiscapacidad, 
case when e.tDiscapacidadObs is null then '' else e.tDiscapacidadObs end as DetalleObservacion ,
CASE WHEN e.lExonaradoR = 1 then 'SI' ELSE 'NO' END as ExoneradoReligion, 
n.tDetallado as tNivel, v.tdetallado as Vive, a.tdetallado as Apoderado,
case when e.lHermanos = 1 then 'SI' else 'NO' end as tHermanos ,
e.nCantHermanos, tNroDocumentoRepre, ISNULL(e.tAPaternoRepre, '') as tAPaternoRepre  , ISNULL(e.tAMaternoRepre,'') as tAMaternoRepre, isnull(e.tNombresRepre,'') as tNombresRepre, 
r.tDetallado as TipoDocumentoRepre, e.tDireccionRepre, e.tTelefonoRepre, e.tEmailRepre, u.tdetallado
FROM TESTUDIANTE e
left join vGradosPrim g on e.tCodGrado = g.tCodigo
left join vTipoDocumento t on e.tCodTipoDocumento = t.tCodigo
left join vTipoSeguro s on e.tCodSeguro = s.tCodigo
left join vDistrito d on e.tCodDistrito = d.tCodigo
left join vNivel n on e.tNivel = n.tCodigo
left join (SELECT TCODIGO, tDetallado FROM TTABLA WHERE tTabla = 'VIVE') v on e.tVive = v.tcodigo
left join (sELECT TCODIGO, TDETALLADO FROM TTABLA WHERE TTABLA = 'APODERADO') a on e.tApoderado = a.tcodigo
left join vTipoDocumento r on e.tTipoDocumentoRepre = r.tCodigo
left join vparentesco u on e.tCodParentescoRepre = u.tcodigo
 WHERE (e.fRegistro BETWEEN :fechaInicial AND :fechaFinal) and ${nivelQuery}
 ORDER BY E.tNivel, E.tCodGrado,  E.tAPaterno`;  // Tu consulta SQL aquí

    // console.log(query);

    const results = await sequelize.query(query,
      {
        replacements: {
          tNivel: stringParam,
          fechaInicial: fechaInicial,       // Fecha de inicio
          fechaFinal: fechaFinFormatted,
        },
        type: QueryTypes.SELECT
      });
    res.json(results);  // Enviar los resultados al frontend
  } catch (error) {
    //  console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }

};


export const getGrado = async (req: Request, res: Response) => {
  try {
    const query = `SELECT tCodigo, tDetallado FROM vGradosPrim`;  // Tu consulta SQL aquí
    const results = await sequelize.query(query, { type: QueryTypes.SELECT });
    res.json(results);  // Enviar los resultados al frontend
  } catch (error) {
    //  console.error('Error fetching data:', error);
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

    //  console.log(typeof results);
    if (Array.isArray(results)) {
      res.json(results);  // Devolver los resultados como un array de objetos
    } else {
      res.status(500).json({ error: 'No se encontraron resultados.' });
    }
  } catch (error) {
    //   console.error('Error al obtener los datos:', error);
  }
}







export const getEstudianteUnico = async (req: Request, res: Response) => {
  const { tNroDocumento } = req.params;
  try {
    // Realizar la consulta SQL cruda con LEFT JOIN
    const results = await sequelize.query(
      `select  e.tCodEstudiante, e.tNroDocumento, (e.tAPaterno + ' ' +e.tAMaterno +', '+ tNombres) as tApellidosNombres, e.tnivel, 
n.tdetallado as tDetNivel, g.tdetallado as tDetGrado, r.tDetallado as tDetEstadoRegistro,
e.fRegistro, e.tNroDocumentoRepre, e.tAPaternoRepre, e.tAMaternoRepre, e.tNombresRepre, e.tTipoDocumentoRepre, e.tDireccionRepre, e.tTelefonoRepre, e.tEmailRepre, e.tCodParentescoRepre
from TESTUDIANTEAPODERADO m
right join TESTUDIANTE e on m.tcodEstudiante = e.tcodestudiante
left join TAPODERADO A ON M.tCodApoderado = A.tCodApoderado
left join VNIVEL n on e.tnivel = n.tcodigo
left join (select * from TTABLA where ttabla = 'grado')  g on e.tCodGrado = g.tcodigo
left join vestadoregistro r on e.tEstadoRegistro = r.Tcodigo
WHERE e.tNroDocumento = :tNroDocumento
group by  e.tCodEstudiante, e.tNroDocumento, e.tAPaterno,e.tAMaterno , tNombres, e.tnivel, 
n.tdetallado, g.tdetallado, r.tDetallado,
e.fRegistro, e.tNroDocumentoRepre, e.tAPaternoRepre, e.tAMaternoRepre, e.tNombresRepre, e.tTipoDocumentoRepre, e.tDireccionRepre, e.tTelefonoRepre, e.tEmailRepre, e.tCodParentescoRepre
ORDER BY e.tCodEstudiante asc`,
      {
        replacements: { tNroDocumento },
        type: QueryTypes.SELECT
      }
    );

    // Mostrar los resultados
    //        console.log(results);
    // Verificar que results es un array

    //  console.log(typeof results);
    if (Array.isArray(results)) {
      res.json(results);  // Devolver los resultados como un array de objetos
    } else {
      res.status(500).json({ error: 'No se encontraron resultados.' });
    }
  } catch (error) {
    //   console.error('Error al obtener los datos:', error);
  }
}




export const getEstudiante = async (req: Request, res: Response) => {
  const { tCodEstudiante } = req.params;  // Obtener el parámetro `tCodEstudiante` de la URL

  // Realizar la consulta SQL con `await`
  const [result] = await sequelize.query(
    `SELECT tCodEstudiante,
              tAPaterno , tAMaterno , tNombres,
              tCodTipoDocumento, tNroDocumento, DATEADD(day, 1, fNacimiento) AS fNacimiento,
              tSexo, tCodDistrito, tDireccion, tTelefono, tEmail,
              tCodGrado, lActivo, lDiscapacidad, tDiscapacidadObs,
              lExonaradoR, tNivel, s.tDetallado as tDetSexo, lRatificacion, tEstadoRegistro, tCodSeguro, tVive, tApoderado, lHermanos, 
                    tNroDocumentoRepre      ,tAPaternoRepre      ,tAMaternoRepre      ,tNombresRepre      ,tTipoDocumentoRepre      ,tParentescoRepre
      ,tDireccionRepre      ,tTelefonoRepre      ,tEmailRepre      ,tCodParentescoRepre, nCantHermanos

       FROM TESTUDIANTE e
       left join vSexo s ON e.tsexo = s.tCodigo
       WHERE tCodEstudiante = :tCodEstudiante`,  // Usar el parámetro en la consulta
    {
      replacements: { tCodEstudiante },  // Pasar el valor del parámetro como `replacements`
      type: QueryTypes.SELECT
    }
  );

  // console.log(" + " + result.fNacimiento);
  // console.log(result);
  res.json(result);  // Enviar los resultados como respuesta

};




export const getPadre = async (req: Request, res: Response) => {
  const { tCodEstudiante } = req.params;  // Obtener el parámetro `tCodEstudiante` de la URL
  // Realizar la consulta SQL con `await`
  const [result] = await sequelize.query(
    `SELECT 
    A.tCodApoderado,     A.tNroDocumento,     A.tCodParentesco,    A.tNroDocumento, 
    A.tDireccion,     A.tEmail,     A.tTelefono,  A.tCodTipoDocumento, 
    SUBSTRING(A.tApNombres, 1, CHARINDEX(' ', A.tApNombres) - 1) AS tAPaterno,    
    SUBSTRING(        A.tApNombres,         CHARINDEX(' ', A.tApNombres) + 1,         CHARINDEX(' ', A.tApNombres + ' ', CHARINDEX(' ', A.tApNombres) + 1) - CHARINDEX(' ', A.tApNombres) - 1    ) AS tAMaterno,
    LTRIM(SUBSTRING(        A.tApNombres,         CHARINDEX(' ', A.tApNombres + ' ', CHARINDEX(' ', A.tApNombres) + 1) + 1,         LEN(A.tApNombres)    )) AS tNombres
FROM     TESTUDIANTEAPODERADO R LEFT JOIN     TAPODERADO A     ON A.tCodApoderado = R.tCodApoderado 
WHERE     R.tCodEstudiante = :tCodEstudiante AND A.tCodParentesco = '01'`,
    {
      replacements: { tCodEstudiante },  // Pasar el valor del parámetro como `replacements`
      type: QueryTypes.SELECT
    }
  );
  // console.log(result);
  res.json(result);  // Enviar los resultados como respuesta
};


export const getMadre = async (req: Request, res: Response) => {
  const { tCodEstudiante } = req.params;  // Obtener el parámetro `tCodEstudiante` de la URL
  // Realizar la consulta SQL con `await`
  const [result] = await sequelize.query(
    `SELECT 
    A.tCodApoderado,     A.tNroDocumento,     A.tCodParentesco,    A.tNroDocumento, 
    A.tDireccion,     A.tEmail,     A.tTelefono, A.tCodTipoDocumento,    
    SUBSTRING(A.tApNombres, 1, CHARINDEX(' ', A.tApNombres) - 1) AS tAPaterno,    
    SUBSTRING(        A.tApNombres,         CHARINDEX(' ', A.tApNombres) + 1,         CHARINDEX(' ', A.tApNombres + ' ', CHARINDEX(' ', A.tApNombres) + 1) - CHARINDEX(' ', A.tApNombres) - 1    ) AS tAMaterno,
    LTRIM(SUBSTRING(        A.tApNombres,         CHARINDEX(' ', A.tApNombres + ' ', CHARINDEX(' ', A.tApNombres) + 1) + 1,         LEN(A.tApNombres)    )) AS tNombres
FROM     TESTUDIANTEAPODERADO R LEFT JOIN     TAPODERADO A     ON A.tCodApoderado = R.tCodApoderado 
WHERE     R.tCodEstudiante = :tCodEstudiante AND A.tCodParentesco = '02'`,
    {
      replacements: { tCodEstudiante },  // Pasar el valor del parámetro como `replacements`
      type: QueryTypes.SELECT
    }
  );
  // console.log(result);
  res.json(result);  // Enviar los resultados como respuesta
};




export const ValidaNroDocumentoEstudiante2 = async (req: Request, res: Response) => {
  const { tNroDocumento } = req.params;  // Obtener el parámetro `tCodEstudiante` de la URL

  // Realizar la consulta SQL con `await`
  const [result] = await sequelize.query(
    `select count(*) as nCantExiste from TESTUDIANTE where tNroDocumento = :tNroDocumento`,  // Usar el parámetro en la consulta
    {
      replacements: { tNroDocumento },  // Pasar el valor del parámetro como `replacements`
      type: QueryTypes.SELECT
    }
  );

  const existente: number = (result as { nCantExiste: number }).nCantExiste;
  //  console.log("tanto es " + existente);
  res.json(result);  // Enviar los resultados como respuesta    
};



export const ValidaNroDocumentoEstudiante = async (req: Request, res: Response) => {
  const { tNroDocumento } = req.params;  // Obtener el parámetro `tCodEstudiante` de la URL

  // Realizar la consulta SQL con `await`
  const [result] = await sequelize.query(
    `select count(*) as nCantExiste from TESTUDIANTE where tNroDocumento = :tNroDocumento`,  // Usar el parámetro en la consulta
    {
      replacements: { tNroDocumento },  // Pasar el valor del parámetro como `replacements`
      type: QueryTypes.SELECT
    }
  );
  // const existente: number = result.nCantExiste;
  // console.log(result);
  res.json(result);  // Enviar los resultados como respuesta    
};











export const updateEstudiante = async (req: Request, res: Response) => {
  const { tCodEstudiante } = req.params;  // Suponiendo que el ID del producto se pasa como parámetro en la URL.
  const { tTelefono, tDireccion, tEmail, tCodDistrito, tCodTipoDocumento, lExonaradoR, lDiscapacidad, fNacimiento, tAMaterno, tAPaterno, tNombres, nCantHermanos,
    tDiscapacidadObs, lRatificacion, tCodGrado, tNivel, tEstadoRegistro, tCodSeguro, tVive, lHermanos, tApoderado, tAMaternoRepre, tAPaternoRepre, tCodParentescoRepre, tDireccionRepre, tEmailRepre, tNombresRepre, tTipoDocumentoRepre, tNroDocumentoRepre, tTelefonoRepre
  } = req.body;  // Suponiendo que los nuevos valores del producto se pasan en el cuerpo de la solicitud.

  // Inicia una transacción
  const t = await sequelize.transaction();

  try {

    //  console.log("llego tipo docu " + tCodTipoDocumento);
    // console.log("fecnac " + fNacimiento);

    // Ejecutamos la consulta UPDATE dentro de la transacción
    const result = await sequelize.query(
      `UPDATE TESTUDIANTE
      SET tTelefono = :tTelefono,
          tDireccion = :tDireccion,
          tEmail = :tEmail,
          nCantHermanos = :nCantHermanos,
          fNacimiento = :fNacimiento,
          tCodDistrito = :tCodDistrito,
          lExonaradoR = :lExonaradoR,
          lDiscapacidad  = :lDiscapacidad,
          tDiscapacidadObs = :tDiscapacidadObs,
          lRatificacion= :lRatificacion,
          tCodGrado = :tCodGrado,
          tNivel = :tNivel,
          tApoderado = :tApoderado,
          tVive = :tVive,
          tCodSeguro = :tCodSeguro,
          lHermanos= :lHermanos,
          tEstadoRegistro = :tEstadoRegistro,
          fRegistro = getDate(),
          tNroDocumentoRepre = :tNroDocumentoRepre,
          tAPaternoRepre = :tAPaternoRepre,
          tAMaternoRepre = :tAMaternoRepre,
          tNombresRepre = :tNombresRepre,
          tTipoDocumentoRepre= :tTipoDocumentoRepre,
          tDireccionRepre = :tDireccionRepre,
          tTelefonoRepre = :tTelefonoRepre,
          tEmailRepre = :tEmailRepre,
          tAPaterno = :tAPaterno,
          tAMaterno = :tAMaterno,
          tNombres = :tNombres,
          tCodParentescoRepre = :tCodParentescoRepre,
          tCodTipoDocumento = :tCodTipoDocumento
      WHERE tCodEstudiante = :tCodEstudiante`,
      {
        replacements: {
          tCodEstudiante, tTelefono, tDireccion,
          tEmail, tCodDistrito, lExonaradoR, lDiscapacidad, tDiscapacidadObs, lRatificacion,
          tCodGrado, tNivel, tEstadoRegistro, tApoderado, tVive, lHermanos, tCodSeguro,
          tNroDocumentoRepre, tAPaternoRepre, tAMaternoRepre, tCodTipoDocumento,
          tNombresRepre, tTipoDocumentoRepre, tDireccionRepre, tNombres, tAMaterno, tAPaterno,
          tTelefonoRepre, tEmailRepre, tCodParentescoRepre, fNacimiento, nCantHermanos
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



export const MatricularEstudiante = async (req: Request, res: Response) => {
  const { estudiante, padre, madre } = req.body;
  /*
    // Validar que los datos necesarios estén presentes
    if (!estudiante || !padre || !madre) {
      return res.status(400).json({ message: 'Datos incompletos para la matrícula' });
    }*/


  // Realizar la consulta SQL con `await`
  const [result] = await sequelize.query(
    `select count(*) as nCantExiste from TESTUDIANTE where tNroDocumento = :tNroDocumento`,  // Usar el parámetro en la consulta
    {
      replacements: { tNroDocumento: estudiante.tNroDocumento },  // Pasar el valor del parámetro como `replacements`
      type: QueryTypes.SELECT
    }
  );
  // const existente: number = result.nCantExiste;    14/01/2025
  const existente: number = (result as { nCantExiste: number }).nCantExiste;

  // console.log("si existre " + existente);


  if (existente > 0) {
    res.json(result)
  }
  else {
    const transaction = await sequelize.transaction();
    try {
      const [nuevocodigo] = await sequelize.query(
        `SELECT   CAST((MAX(tcodestudiante)+1) as VARCHAR) as d from TESTUDIANTE`,
        {
          type: QueryTypes.SELECT,
          transaction,
        }
      );


      // Ahora, 'nuevocodigo.d' contendrá el valor como un string
      //   const codigoEstudiante: string = nuevocodigo.d;   14/01/2024

      const codigoEstudiante: string = (nuevocodigo as { d: string }).d;
      //  console.log("cod estudiante " + codigoEstudiante);


      // Insertar estudiante
      const [nuevoEstudiante] = await sequelize.query(
        `INSERT INTO TESTUDIANTE (tCodEstudiante, tCodGrado, tCodTipoDocumento, 
        tAPaterno, tAMaterno, tNombres, tSexo, fNacimiento, tEstadoMatricula,
        tNroDocumento, fRegistro, lActivo, tCodSeguro, tCodDistrito, tDireccion,
        tTelefono, tEmail, lDiscapacidad, tDiscapacidadObs, lExonaradoR, lCierre,
        tEstadoRegistro, tNivel,  tVive, tApoderado, lHermanos, nCantHermanos
      ) VALUES (
        :tCodEstudiante, :tCodGrado, :tCodTipoDocumento, :tAPaterno, :tAMaterno, :tNombres, :tSexo , :fNacimiento,  :tEstadoMatricula,
        :tNroDocumento, getdate(), 1 , :tCodSeguro, :tCodDistrito, :tDireccion,
        :tTelefono, :tEmail, :lDiscapacidad, :tDiscapacidadObs, :lExonaradoR, 1,
        :tEstadoRegistro, :tNivel,  :tVive, :tApoderado, :lHermanos, :nCantHermanos
      )`,
        {
          replacements: {
            tCodEstudiante: codigoEstudiante,
            tCodGrado: estudiante.tCodGrado,
            tCodTipoDocumento: estudiante.tCodTipoDocumento,
            tAPaterno: estudiante.tAPaterno,
            tAMaterno: estudiante.tAMaterno,
            tNombres: estudiante.tNombres,
            tSexo: estudiante.tSexo,
            fNacimiento: estudiante.fNacimiento,
            nEdad: estudiante.nEdad,
            tEstadoMatricula: '01',
            tNroDocumento: estudiante.tNroDocumento,
            lActivo: estudiante.lActivo,
            tCodSeguro: estudiante.tCodSeguro,
            tCodDistrito: estudiante.tCodDistrito,
            tDireccion: estudiante.tDireccion,
            tTelefono: estudiante.tTelefono,
            tEmail: estudiante.tEmail,
            lDiscapacidad: estudiante.lDiscapacidad,
            tDiscapacidadObs: estudiante.tDiscapacidadObs,
            lExonaradoR: estudiante.lExonaradoR,
            tEstadoRegistro: '02',
            tNivel: estudiante.tNivel,

            tVive: estudiante.tVive,
            tApoderado: estudiante.tApoderado,
            lHermanos: estudiante.lHermanos,
            nCantHermanos: estudiante.nCantHermanos || 0, // Si está vacío, usar 0
          },
          type: QueryTypes.INSERT,
          transaction,
        }
      );
      // Función para manejar apoderados
      const upsertApoderado = async (apoderado: any) => {
        const [existe] = await sequelize.query(
          `SELECT tCodApoderado as d FROM TAPODERADO WHERE tNroDocumento = :tNroDocumento`,
          {
            replacements: { tNroDocumento: apoderado.tNroDocumento },
            type: QueryTypes.SELECT,
            transaction,
          }
        );
        //   console.log(existe);

        if (existe) {


          //    console.log(existe.d);
          // Actualizar apoderado existente

          //   console.log("APODERADO EXISTENTE " + (existe as { d: string }).d);



          await sequelize.query(
            `UPDATE TAPODERADO
             SET 
               tApNombres = :tApNombres,
               tCodParentesco = :tCodParentesco,
               tCodTipoDocumento = :tCodTipoDocumento,
               tEmail = :tEmail,
               tTelefono = :tTelefono,
               tDireccion = :tDireccion,
               fRegistro = GETDATE(),
               lActivo = :lActivo
             WHERE tCodApoderado = :tCodApoderado`,
            {
              replacements: {
                tApNombres: apoderado.tApNombres,
                tCodParentesco: apoderado.tCodParentesco,
                tCodTipoDocumento: apoderado.tCodTipoDocumento,
                tEmail: apoderado.tEmail,
                tTelefono: apoderado.tTelefono,
                tDireccion: apoderado.tDireccion,
                lActivo: apoderado.lActivo || true,
                //   tCodApoderado: existe.d,      14/01/2024
                tCodApoderado: (existe as { d: string }).d,
              },
              type: QueryTypes.UPDATE,
              transaction,
            }
          );


          await sequelize.query(
            ` INSERT TESTUDIANTEAPODERADO (tCodEstudiante, tCodApoderado)
     VALUES   (:tCodEstudiante , :tCodApoderado)`,
            {
              replacements: {
                tCodEstudiante: codigoEstudiante,
                //  tCodApoderado: existe.d,   14/01/2024
                tCodApoderado: (existe as { d: string }).d,
              },
              type: QueryTypes.INSERT,
              transaction,
            }
          );
          //  console.log("llego");
        }
        else {

          const [nuevocodigoA] = await sequelize.query(
            ` SELECT CAST((max(tCodApoderado)+1) as varchar) as codigo from TAPODERADO`,
            {
              type: QueryTypes.SELECT,
              transaction,
            }
          );

          // Ahora, 'nuevocodigo.d' contendrá el valor como un string
          //    const codApoNuevo: string = nuevocodigoA.codigo;    14/01/2025

          const codApoNuevo: string = (nuevocodigoA as { codigo: string }).codigo;

          //    console.log("cod apo nuevo " + codApoNuevo)




          //   console.log("codigo apoderado" + codApoNuevo);

          //      const codigoEstudiante: string = nuevocodigo.d;


          // Insertar nuevo apoderado
          await sequelize.query(
            `INSERT INTO TAPODERADO (tCodApoderado,
               tApNombres, tCodParentesco, tCodTipoDocumento, tNroDocumento,
               tEmail, tTelefono, tDireccion, fRegistro, lActivo
             ) VALUES (
              :tCodApoderado, :tApNombres,  :tCodParentesco, :tCodTipoDocumento, :tNroDocumento,
                :tEmail, :tTelefono, :tDireccion, GETDATE(), :lActivo
             )`,
            {
              replacements: {
                tCodApoderado: codApoNuevo,
                tApNombres: apoderado.tApNombres,
                // tSexo: apoderado.tSexo,
                tCodParentesco: apoderado.tCodParentesco,
                tCodTipoDocumento: apoderado.tCodTipoDocumento,
                tNroDocumento: apoderado.tNroDocumento,
                lValidadoReniec: apoderado.lValidadoReniec || false,
                tEmail: apoderado.tEmail,
                tTelefono: apoderado.tTelefono,
                tDireccion: apoderado.tDireccion,
                lActivo: apoderado.lActivo || true,
              },
              type: QueryTypes.INSERT,
              transaction,
            }
          );

          await sequelize.query(
            ` INSERT TESTUDIANTEAPODERADO (tCodEstudiante, tCodApoderado)
     VALUES   (:tCodEstudiante , :tCodApoderado)`,
            {
              replacements: {
                tCodEstudiante: codigoEstudiante,
                tCodApoderado: codApoNuevo,
              },
              type: QueryTypes.INSERT,
              transaction,
            }
          );

        }
      };

      // Manejar padre y madre
      await upsertApoderado({ ...padre });
      await upsertApoderado({ ...madre });



      await transaction.commit();




      res.status(201).json({
        message: 'Estudiante matriculado correctamente',
      });

    }
    catch (error) {
      await transaction.rollback();
      //  console.error('Error al matricular estudiante:', error);
      res.status(500).json({ message: 'Error interno del servidor', error });
    }
  }
}






