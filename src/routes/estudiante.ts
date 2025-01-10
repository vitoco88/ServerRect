

import {Router} from 'express'
import { getDistritos, getEstudiante, getEstudiantes, getGrado, getNiveles, getTipoDocumento, postEstudiante, updateEstudiante } from '../controllers/estudiante';


const router = Router();


router.get('/:tNroDocumento', getEstudiantes)
router.get('/cod/distritos', getDistritos)
router.get('/cod/nivel', getNiveles)
router.get('/cod/Grado', getGrado)
router.get('/cod/TipoDocumento', getTipoDocumento)
router.get('/cod/:tCodEstudiante', getEstudiante)
router.post('/', postEstudiante)
router.put('/cod/:tCodEstudiante', updateEstudiante)




export default router;