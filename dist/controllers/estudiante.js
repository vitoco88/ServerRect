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
exports.updateEstudiante = exports.postEstudiante = exports.getEstudiante = exports.getEstudiantes = exports.getGrado = exports.getNiveles = exports.getTipoDocumento = exports.getDistritos = void 0;
const sequelize_1 = require("../models/sequelize");
const getDistritos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT tCodigo, tDetallado FROM vDistrito`; // Tu consulta SQL aquí
        const results = yield sequelize_1.sequelize.query(query, { type: sequelize_1.QueryTypes.SELECT });
        res.json(results); // Enviar los resultados al frontend
    }
    catch (error) {
        console.error('Error fetching data:', error);
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
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data from database' });
    }
});
exports.getTipoDocumento = getTipoDocumento;
const getNiveles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT tCodigo, tDetallado FROM vNivel`; // Tu consulta SQL aquí
        const results = yield sequelize_1.sequelize.query(query, { type: sequelize_1.QueryTypes.SELECT });
        res.json(results); // Enviar los resultados al frontend
        console.log(results);
    }
    catch (error) {
        console.error('Error fetching data:', error);
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
        console.error('Error fetching data:', error);
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
        console.log(typeof results);
        if (Array.isArray(results)) {
            res.json(results); // Devolver los resultados como un array de objetos
        }
        else {
            res.status(500).json({ error: 'No se encontraron resultados.' });
        }
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
    }
});
exports.getEstudiantes = getEstudiantes;
const getEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tCodEstudiante } = req.params; // Obtener el parámetro `tCodEstudiante` de la URL
    // Realizar la consulta SQL con `await`
    const [result] = yield sequelize_1.sequelize.query(`SELECT tCodEstudiante,
              (tAPaterno + ' ' + tAMaterno + ', ' + tNombres) AS tApellidosNombres,
              tCodTipoDocumento, tNroDocumento, fNacimiento,
              tSexo, tCodDistrito, tDireccion, tTelefono, tEmail,
              tCodGrado, lActivo, lDiscapacidad, tDiscapacidadObs,
              lExonaradoR, tNivel, s.tDetallado as tDetSexo, lRatificacion
       FROM TESTUDIANTE e
       left join vSexo s ON e.tsexo = s.tCodigo
       WHERE tCodEstudiante = :tCodEstudiante`, // Usar el parámetro en la consulta
    {
        replacements: { tCodEstudiante }, // Pasar el valor del parámetro como `replacements`
        type: sequelize_1.QueryTypes.SELECT
    });
    console.log(result);
    res.json(result); // Enviar los resultados como respuesta
});
exports.getEstudiante = getEstudiante;
const postEstudiante = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'getProd',
        body
    });
};
exports.postEstudiante = postEstudiante;
const updateEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tCodEstudiante } = req.params; // Suponiendo que el ID del producto se pasa como parámetro en la URL.
    const { tTelefono, tDireccion, tEmail, tCodDistrito, lExonaradoR, lDiscapacidad, tDiscapacidadObs, lRatificacion, tCodGrado, tNivel, tEstadoRegistro } = req.body; // Suponiendo que los nuevos valores del producto se pasan en el cuerpo de la solicitud.
    // Inicia una transacción
    const t = yield sequelize_1.sequelize.transaction();
    try {
        // Ejecutamos la consulta UPDATE dentro de la transacción
        const result = yield sequelize_1.sequelize.query(`UPDATE TESTUDIANTE
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
      WHERE tCodEstudiante = :tCodEstudiante`, {
            replacements: { tCodEstudiante, tTelefono, tDireccion,
                tEmail, tCodDistrito, lExonaradoR, lDiscapacidad, tDiscapacidadObs, lRatificacion,
                tCodGrado, tNivel, tEstadoRegistro
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
