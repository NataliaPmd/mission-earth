/*
    Centers
    ruta: '/api/centers'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCenters,
    createCenter,
    updateCenter,
    deleteCenter,
    getCenterProjects
} = require('../controllers/centers')


const router = Router();

router.get( '/', getCenters );

router.get('/:id/projects', 
    validarJWT,
    getCenterProjects
);

router.post( '/',
    [
        validarJWT,
        check('name','El nombre del centro es necesario').not().isEmpty(),
        validarCampos
    ], 
    createCenter 
);

router.put( '/:id',
    [
        validarJWT,
        check('name','El nombre del centro es necesario').not().isEmpty(),
        validarCampos
    ],
    updateCenter
);

router.delete( '/:id',
    validarJWT,
    deleteCenter
);



module.exports = router;
