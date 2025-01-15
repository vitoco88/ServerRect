"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatricularEstudiante = exports.updateEstudiante = exports.ValidaNroDocumentoEstudiante = exports.ValidaNroDocumentoEstudiante2 = exports.getMadre = exports.getPadre = exports.getEstudiante = exports.getEstudianteUnico = exports.getEstudiantes = exports.getGrado = exports.getNiveles = exports.getTipoDocumento = exports.getDistritos = void 0;
const sequelize_1 = require("../models/sequelize");
const getDistritos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT tCodigo, tDetallado FROM vDistrito`; // Tu consulta SQL aquí
        const results = yield sequelize_1.sequelize.query(query, { type: sequelize_1.QueryTypes.SELECT });
        res.json(results); // Enviar los resultados al frontend
    }
    catch (error) {
        //  console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data from database' });
    }
});
exports.getDistritos = getDistritos;
const getTipoDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT tCodigo, tDetallado FROM vTipoDocumento`; // Tu consulta SQL aquí
        const results = yield sequelize_1.sequelize.query(query, { type: sequelize_1.QueryTypes.SELECT });
        res.json(results); // Enviar los resultados al frontend
    }
    catch (error) {
        // console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data from database' });
    }
});
exports.getTipoDocumento = getTipoDocumento;
const getNiveles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT tCodigo, tDetallado FROM vNivel`; // Tu consulta SQL aquí
        const results = yield sequelize_1.sequelize.query(query, { type: sequelize_1.QueryTypes.SELECT });
        res.json(results); // Enviar los resultados al frontend
        //   console.log(results);
    }
    catch (error) {
        //  console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data from database' });
    }
});
exports.getNiveles = getNiveles;
const getGrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT tCodigo, tDetallado FROM vGradosPrim`; // Tu consulta SQL aquí
        const results = yield sequelize_1.sequelize.query(query, { type: sequelize_1.QueryTypes.SELECT });
        res.json(results); // Enviar los resultados al frontend
    }
    catch (error) {
        //  console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data from database' });
    }
});
exports.getGrado = getGrado;
const getEstudiantes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tNroDocumento } = req.params;
    try {
        // Realizar la consulta SQL cruda con LEFT JOIN
        const results = yield sequelize_1.sequelize.query(`select  M.tCodEstudiante, e.tNroDocumento, (e.tAPaterno + ' ' +e.tAMaterno +', '+ tNombres) as tApellidosNombres, e.tnivel, 
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
ORDER BY m.tCodEstudiante asc`, {
            replacements: { tNroDocumento },
            type: sequelize_1.QueryTypes.SELECT
        });
        // Mostrar los resultados
        //        console.log(results);
        // Verificar que results es un array
        //  console.log(typeof results);
        if (Array.isArray(results)) {
            res.json(results); // Devolver los resultados como un array de objetos
        }
        else {
            res.status(500).json({ error: 'No se encontraron resultados.' });
        }
    }
    catch (error) {
        //   console.error('Error al obtener los datos:', error);
    }
});
exports.getEstudiantes = getEstudiantes;
const getEstudianteUnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tNroDocumento } = req.params;
    try {
        // Realizar la consulta SQL cruda con LEFT JOIN
        const results = yield sequelize_1.sequelize.query(`select  e.tCodEstudiante, e.tNroDocumento, (e.tAPaterno + ' ' +e.tAMaterno +', '+ tNombres) as tApellidosNombres, e.tnivel, 
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
ORDER BY e.tCodEstudiante asc`, {
            replacements: { tNroDocumento },
            type: sequelize_1.QueryTypes.SELECT
        });
        // Mostrar los resultados
        //        console.log(results);
        // Verificar que results es un array
        //  console.log(typeof results);
        if (Array.isArray(results)) {
            res.json(results); // Devolver los resultados como un array de objetos
        }
        else {
            res.status(500).json({ error: 'No se encontraron resultados.' });
        }
    }
    catch (error) {
        //   console.error('Error al obtener los datos:', error);
    }
});
exports.getEstudianteUnico = getEstudianteUnico;
const getEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tCodEstudiante } = req.params; // Obtener el parámetro `tCodEstudiante` de la URL
    // Realizar la consulta SQL con `await`
    const [result] = yield sequelize_1.sequelize.query(`SELECT tCodEstudiante,
              tAPaterno , tAMaterno , tNombres,
              tCodTipoDocumento, tNroDocumento, fNacimiento,
              tSexo, tCodDistrito, tDireccion, tTelefono, tEmail,
              tCodGrado, lActivo, lDiscapacidad, tDiscapacidadObs,
              lExonaradoR, tNivel, s.tDetallado as tDetSexo, lRatificacion, tEstadoRegistro, tCodSeguro, tVive, tApoderado, lHermanos, 
                    tNroDocumentoRepre      ,tAPaternoRepre      ,tAMaternoRepre      ,tNombresRepre      ,tTipoDocumentoRepre      ,tParentescoRepre
      ,tDireccionRepre      ,tTelefonoRepre      ,tEmailRepre      ,tCodParentescoRepre, nCantHermanos

       FROM TESTUDIANTE e
       left join vSexo s ON e.tsexo = s.tCodigo
       WHERE tCodEstudiante = :tCodEstudiante`, // Usar el parámetro en la consulta
    {
        replacements: { tCodEstudiante }, // Pasar el valor del parámetro como `replacements`
        type: sequelize_1.QueryTypes.SELECT
    });
    // console.log(result);
    res.json(result); // Enviar los resultados como respuesta
});
exports.getEstudiante = getEstudiante;
const getPadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tCodEstudiante } = req.params; // Obtener el parámetro `tCodEstudiante` de la URL
    // Realizar la consulta SQL con `await`
    const [result] = yield sequelize_1.sequelize.query(`SELECT 
    A.tCodApoderado,     A.tNroDocumento,     A.tCodParentesco,    A.tNroDocumento, 
    A.tDireccion,     A.tEmail,     A.tTelefono,  A.tCodTipoDocumento, 
    SUBSTRING(A.tApNombres, 1, CHARINDEX(' ', A.tApNombres) - 1) AS tAPaterno,    
    SUBSTRING(        A.tApNombres,         CHARINDEX(' ', A.tApNombres) + 1,         CHARINDEX(' ', A.tApNombres + ' ', CHARINDEX(' ', A.tApNombres) + 1) - CHARINDEX(' ', A.tApNombres) - 1    ) AS tAMaterno,
    LTRIM(SUBSTRING(        A.tApNombres,         CHARINDEX(' ', A.tApNombres + ' ', CHARINDEX(' ', A.tApNombres) + 1) + 1,         LEN(A.tApNombres)    )) AS tNombres
FROM     TESTUDIANTEAPODERADO R LEFT JOIN     TAPODERADO A     ON A.tCodApoderado = R.tCodApoderado 
WHERE     R.tCodEstudiante = :tCodEstudiante AND A.tCodParentesco = '01'`, {
        replacements: { tCodEstudiante }, // Pasar el valor del parámetro como `replacements`
        type: sequelize_1.QueryTypes.SELECT
    });
    // console.log(result);
    res.json(result); // Enviar los resultados como respuesta
});
exports.getPadre = getPadre;
const getMadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tCodEstudiante } = req.params; // Obtener el parámetro `tCodEstudiante` de la URL
    // Realizar la consulta SQL con `await`
    const [result] = yield sequelize_1.sequelize.query(`SELECT 
    A.tCodApoderado,     A.tNroDocumento,     A.tCodParentesco,    A.tNroDocumento, 
    A.tDireccion,     A.tEmail,     A.tTelefono, A.tCodTipoDocumento,    
    SUBSTRING(A.tApNombres, 1, CHARINDEX(' ', A.tApNombres) - 1) AS tAPaterno,    
    SUBSTRING(        A.tApNombres,         CHARINDEX(' ', A.tApNombres) + 1,         CHARINDEX(' ', A.tApNombres + ' ', CHARINDEX(' ', A.tApNombres) + 1) - CHARINDEX(' ', A.tApNombres) - 1    ) AS tAMaterno,
    LTRIM(SUBSTRING(        A.tApNombres,         CHARINDEX(' ', A.tApNombres + ' ', CHARINDEX(' ', A.tApNombres) + 1) + 1,         LEN(A.tApNombres)    )) AS tNombres
FROM     TESTUDIANTEAPODERADO R LEFT JOIN     TAPODERADO A     ON A.tCodApoderado = R.tCodApoderado 
WHERE     R.tCodEstudiante = :tCodEstudiante AND A.tCodParentesco = '02'`, {
        replacements: { tCodEstudiante }, // Pasar el valor del parámetro como `replacements`
        type: sequelize_1.QueryTypes.SELECT
    });
    // console.log(result);
    res.json(result); // Enviar los resultados como respuesta
});
exports.getMadre = getMadre;
const ValidaNroDocumentoEstudiante2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tNroDocumento } = req.params; // Obtener el parámetro `tCodEstudiante` de la URL
    // Realizar la consulta SQL con `await`
    const [result] = yield sequelize_1.sequelize.query(`select count(*) as nCantExiste from TESTUDIANTE where tNroDocumento = :tNroDocumento`, // Usar el parámetro en la consulta
    {
        replacements: { tNroDocumento }, // Pasar el valor del parámetro como `replacements`
        type: sequelize_1.QueryTypes.SELECT
    });
    const existente = result.nCantExiste;
    //  console.log("tanto es " + existente);
    res.json(result); // Enviar los resultados como respuesta    
});
exports.ValidaNroDocumentoEstudiante2 = ValidaNroDocumentoEstudiante2;
const ValidaNroDocumentoEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tNroDocumento } = req.params; // Obtener el parámetro `tCodEstudiante` de la URL
    // Realizar la consulta SQL con `await`
    const [result] = yield sequelize_1.sequelize.query(`select count(*) as nCantExiste from TESTUDIANTE where tNroDocumento = :tNroDocumento`, // Usar el parámetro en la consulta
    {
        replacements: { tNroDocumento }, // Pasar el valor del parámetro como `replacements`
        type: sequelize_1.QueryTypes.SELECT
    });
    // const existente: number = result.nCantExiste;
    // console.log(result);
    res.json(result); // Enviar los resultados como respuesta    
});
exports.ValidaNroDocumentoEstudiante = ValidaNroDocumentoEstudiante;
const updateEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tCodEstudiante } = req.params; // Suponiendo que el ID del producto se pasa como parámetro en la URL.
    const { tTelefono, tDireccion, tEmail, tCodDistrito, tCodTipoDocumento, lExonaradoR, lDiscapacidad, fNacimiento, tAMaterno, tAPaterno, tNombres, nCantHermanos, tDiscapacidadObs, lRatificacion, tCodGrado, tNivel, tEstadoRegistro, tCodSeguro, tVive, lHermanos, tApoderado, tAMaternoRepre, tAPaternoRepre, tCodParentescoRepre, tDireccionRepre, tEmailRepre, tNombresRepre, tTipoDocumentoRepre, tNroDocumentoRepre, tTelefonoRepre } = req.body; // Suponiendo que los nuevos valores del producto se pasan en el cuerpo de la solicitud.
    // Inicia una transacción
    const t = yield sequelize_1.sequelize.transaction();
    try {
        //  console.log("llego tipo docu " + tCodTipoDocumento);
        // Ejecutamos la consulta UPDATE dentro de la transacción
        const result = yield sequelize_1.sequelize.query(`UPDATE TESTUDIANTE
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
      WHERE tCodEstudiante = :tCodEstudiante`, {
            replacements: {
                tCodEstudiante, tTelefono, tDireccion,
                tEmail, tCodDistrito, lExonaradoR, lDiscapacidad, tDiscapacidadObs, lRatificacion,
                tCodGrado, tNivel, tEstadoRegistro, tApoderado, tVive, lHermanos, tCodSeguro,
                tNroDocumentoRepre, tAPaternoRepre, tAMaternoRepre, tCodTipoDocumento,
                tNombresRepre, tTipoDocumentoRepre, tDireccionRepre, tNombres, tAMaterno, tAPaterno,
                tTelefonoRepre, tEmailRepre, tCodParentescoRepre, fNacimiento, nCantHermanos
            },
            type: sequelize_1.QueryTypes.UPDATE,
            transaction: t, // Aquí indicamos que esta consulta debe usar la transacción `t`
        });
        const affectedRows = result[1];
        // Si no se actualizaron filas, significa que no se encontró el producto
        //    if (affectedRows && affectedRows > 0) {
        // Si la actualización fue exitosa, confirmamos la transacción
        yield t.commit();
        res.json({ msg: 'Producto actualizado correctamente' });
        //    } else {
        // Si no se encontró el producto, deshacemos la transacción
        //    await t.rollback();
        //       res.status(404).json({ msg: 'Producto no encontrado' });
        //       }
    }
    catch (error) {
        // Si ocurrió un error, deshacemos la transacción
        yield t.rollback();
        res.status(500).json({
            msg: 'Error al actualizar el producto',
        });
    }
});
exports.updateEstudiante = updateEstudiante;
const MatricularEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estudiante, padre, madre } = req.body;
    /*
      // Validar que los datos necesarios estén presentes
      if (!estudiante || !padre || !madre) {
        return res.status(400).json({ message: 'Datos incompletos para la matrícula' });
      }*/
    // Realizar la consulta SQL con `await`
    const [result] = yield sequelize_1.sequelize.query(`select count(*) as nCantExiste from TESTUDIANTE where tNroDocumento = :tNroDocumento`, // Usar el parámetro en la consulta
    {
        replacements: { tNroDocumento: estudiante.tNroDocumento }, // Pasar el valor del parámetro como `replacements`
        type: sequelize_1.QueryTypes.SELECT
    });
    // const existente: number = result.nCantExiste;    14/01/2025
    const existente = result.nCantExiste;
    // console.log("si existre " + existente);
    if (existente > 0) {
        res.json(result);
    }
    else {
        const transaction = yield sequelize_1.sequelize.transaction();
        try {
            const [nuevocodigo] = yield sequelize_1.sequelize.query(`SELECT   CAST((MAX(tcodestudiante)+1) as VARCHAR) as d from TESTUDIANTE`, {
                type: sequelize_1.QueryTypes.SELECT,
                transaction,
            });
            // Ahora, 'nuevocodigo.d' contendrá el valor como un string
            //   const codigoEstudiante: string = nuevocodigo.d;   14/01/2024
            const codigoEstudiante = nuevocodigo.d;
            //  console.log("cod estudiante " + codigoEstudiante);
            // Insertar estudiante
            const [nuevoEstudiante] = yield sequelize_1.sequelize.query(`INSERT INTO TESTUDIANTE (tCodEstudiante, tCodGrado, tCodTipoDocumento, 
        tAPaterno, tAMaterno, tNombres, tSexo, fNacimiento, tEstadoMatricula,
        tNroDocumento, fRegistro, lActivo, tCodSeguro, tCodDistrito, tDireccion,
        tTelefono, tEmail, lDiscapacidad, tDiscapacidadObs, lExonaradoR, lCierre,
        tEstadoRegistro, tNivel,  tVive, tApoderado, lHermanos, nCantHermanos
      ) VALUES (
        :tCodEstudiante, :tCodGrado, :tCodTipoDocumento, :tAPaterno, :tAMaterno, :tNombres, :tSexo , :fNacimiento,  :tEstadoMatricula,
        :tNroDocumento, getdate(), 1 , :tCodSeguro, :tCodDistrito, :tDireccion,
        :tTelefono, :tEmail, :lDiscapacidad, :tDiscapacidadObs, :lExonaradoR, 1,
        :tEstadoRegistro, :tNivel,  :tVive, :tApoderado, :lHermanos, :nCantHermanos
      )`, {
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
                type: sequelize_1.QueryTypes.INSERT,
                transaction,
            });
            // Función para manejar apoderados
            const upsertApoderado = (apoderado) => __awaiter(void 0, void 0, void 0, function* () {
                const [existe] = yield sequelize_1.sequelize.query(`SELECT tCodApoderado as d FROM TAPODERADO WHERE tNroDocumento = :tNroDocumento`, {
                    replacements: { tNroDocumento: apoderado.tNroDocumento },
                    type: sequelize_1.QueryTypes.SELECT,
                    transaction,
                });
                //   console.log(existe);
                if (existe) {
                    //    console.log(existe.d);
                    // Actualizar apoderado existente
                    //   console.log("APODERADO EXISTENTE " + (existe as { d: string }).d);
                    yield sequelize_1.sequelize.query(`UPDATE TAPODERADO
             SET 
               tApNombres = :tApNombres,
               tCodParentesco = :tCodParentesco,
               tCodTipoDocumento = :tCodTipoDocumento,
               tEmail = :tEmail,
               tTelefono = :tTelefono,
               tDireccion = :tDireccion,
               fRegistro = GETDATE(),
               lActivo = :lActivo
             WHERE tCodApoderado = :tCodApoderado`, {
                        replacements: {
                            tApNombres: apoderado.tApNombres,
                            tCodParentesco: apoderado.tCodParentesco,
                            tCodTipoDocumento: apoderado.tCodTipoDocumento,
                            tEmail: apoderado.tEmail,
                            tTelefono: apoderado.tTelefono,
                            tDireccion: apoderado.tDireccion,
                            lActivo: apoderado.lActivo || true,
                            //   tCodApoderado: existe.d,      14/01/2024
                            tCodApoderado: existe.d,
                        },
                        type: sequelize_1.QueryTypes.UPDATE,
                        transaction,
                    });
                    yield sequelize_1.sequelize.query(` INSERT TESTUDIANTEAPODERADO (tCodEstudiante, tCodApoderado)
     VALUES   (:tCodEstudiante , :tCodApoderado)`, {
                        replacements: {
                            tCodEstudiante: codigoEstudiante,
                            //  tCodApoderado: existe.d,   14/01/2024
                            tCodApoderado: existe.d,
                        },
                        type: sequelize_1.QueryTypes.INSERT,
                        transaction,
                    });
                    //  console.log("llego");
                }
                else {
                    const [nuevocodigoA] = yield sequelize_1.sequelize.query(` SELECT CAST((max(tCodApoderado)+1) as varchar) as codigo from TAPODERADO`, {
                        type: sequelize_1.QueryTypes.SELECT,
                        transaction,
                    });
                    // Ahora, 'nuevocodigo.d' contendrá el valor como un string
                    //    const codApoNuevo: string = nuevocodigoA.codigo;    14/01/2025
                    const codApoNuevo = nuevocodigoA.codigo;
                    //    console.log("cod apo nuevo " + codApoNuevo)
                    //   console.log("codigo apoderado" + codApoNuevo);
                    //      const codigoEstudiante: string = nuevocodigo.d;
                    // Insertar nuevo apoderado
                    yield sequelize_1.sequelize.query(`INSERT INTO TAPODERADO (tCodApoderado,
               tApNombres, tCodParentesco, tCodTipoDocumento, tNroDocumento,
               tEmail, tTelefono, tDireccion, fRegistro, lActivo
             ) VALUES (
              :tCodApoderado, :tApNombres,  :tCodParentesco, :tCodTipoDocumento, :tNroDocumento,
                :tEmail, :tTelefono, :tDireccion, GETDATE(), :lActivo
             )`, {
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
                        type: sequelize_1.QueryTypes.INSERT,
                        transaction,
                    });
                    yield sequelize_1.sequelize.query(` INSERT TESTUDIANTEAPODERADO (tCodEstudiante, tCodApoderado)
     VALUES   (:tCodEstudiante , :tCodApoderado)`, {
                        replacements: {
                            tCodEstudiante: codigoEstudiante,
                            tCodApoderado: codApoNuevo,
                        },
                        type: sequelize_1.QueryTypes.INSERT,
                        transaction,
                    });
                }
            });
            // Manejar padre y madre
            yield upsertApoderado(Object.assign({}, padre));
            yield upsertApoderado(Object.assign({}, madre));
            yield transaction.commit();
            res.status(201).json({
                message: 'Estudiante matriculado correctamente',
            });
        }
        catch (error) {
            yield transaction.rollback();
            //  console.error('Error al matricular estudiante:', error);
            res.status(500).json({ message: 'Error interno del servidor', error });
        }
    }
});
exports.MatricularEstudiante = MatricularEstudiante;
