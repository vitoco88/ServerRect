

import {Router} from 'express'
import { getDistritos, getEstudentsFilter, getEstudiante, getEstudiantes, getEstudianteUnico, getGrado, getMadre, getNiveles, getPadre, getTipoDocumento, MatricularEstudiante,  updateEstudiante, ValidaNroDocumentoEstudiante } from '../controllers/estudiante';
import { FilterEstudiante, InsertEstudiante, QuitarAsistencia,  } from '../controllers/escuelapadres';


const router = Router();

router.post('/valor/', FilterEstudiante);
// Ruta para insertar y obtener la fecha del servidor
router.post('/Registrar',  InsertEstudiante);
router.put('/cod/:tCodEstudiante', QuitarAsistencia);
export default router;