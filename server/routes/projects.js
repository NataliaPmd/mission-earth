/*
    Proyectos
    ruta: '/api/project'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getProjects,
    crearProject,
    actualizarProject,
    borrarProject
} = require('../controllers/projects')


const router = Router();

router.get( '/', getProjects );

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('center','El center id debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearProject 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('center','El center id debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarProject
);

router.delete( '/:id',
    borrarProject
);



module.exports = router;


