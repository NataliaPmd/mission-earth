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
    borrarProject,
    getProjectById,
    getProjectsByCenter,
    getTopProjects,
    getFavoriteProjects
} = require('../controllers/projects')


const router = Router();

router.get( '/', 
    validarJWT,
    getProjects );

router.get('/byCenter', 
    validarJWT,
    getProjectsByCenter);

router.get('/top', 
    validarJWT,
    getTopProjects);

router.get('/favorites', 
    validarJWT,
    getFavoriteProjects);

router.post( '/',
    [
        validarJWT,
        check('name','El nombre del proyecto es necesario').not().isEmpty(),
        check('center','El center id debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearProject 
);

router.put( '/:id',
    [
        validarJWT,
        check('name','El nombre del proyecto es necesario').not().isEmpty(),
        check('center','El center id debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarProject
);

router.delete( '/:id',
    borrarProject
);

router.get( '/:id',
    validarJWT,
    getProjectById
);



module.exports = router;



