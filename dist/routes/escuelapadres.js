"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const escuelapadres_1 = require("../controllers/escuelapadres");
const router = (0, express_1.Router)();
router.post('/valor/', escuelapadres_1.FilterEstudiante);
// Ruta para insertar y obtener la fecha del servidor
router.post('/Registrar', escuelapadres_1.InsertEstudiante);
router.put('/cod/:tCodEstudiante', escuelapadres_1.QuitarAsistencia);
exports.default = router;
