

import {Router} from 'express'
import { getDistritos, getEstudentsFilter, getEstudiante, getEstudiantes, getEstudianteUnico, getGrado, getMadre, getNiveles, getPadre, getTipoDocumento, MatricularEstudiante,  updateEstudiante, ValidaNroDocumentoEstudiante } from '../controllers/estudiante';


const router = Router();


router.get('/val/:tNroDocumento', ValidaNroDocumentoEstudiante)


router.get('/:tNroDocumento', getEstudiantes)
router.get('/cod/distritos', getDistritos)
router.get('/cod/nivel', getNiveles)
router.get('/cod/Grado', getGrado)
router.get('/cod/TipoDocumento', getTipoDocumento)
router.get('/cod/:tCodEstudiante', getEstudiante)
router.get('/id/:tNroDocumento', getEstudianteUnico)
router.post('/reg/reg/', MatricularEstudiante)
router.put('/cod/:tCodEstudiante', updateEstudiante)
router.post('/filter/', getEstudentsFilter)
router.get('/padre/:tCodEstudiante', getPadre)
router.get('/madre/:tCodEstudiante', getMadre)




export default router;