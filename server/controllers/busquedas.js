const { response } = require('express');

const Usuario = require('../models/usuario');
const Project = require('../models/project');
const Center = require('../models/center');


const getTodo = async(req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios, projects, centers ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Project.find({ name: regex }),
        Center.find({ name: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        projects,
        centers
    })

}

const getDocumentosColeccion = async(req, res = response ) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp( busqueda, 'i' );

    let data = [];

    switch ( tabla ) {
        case 'projects':
            data = await Project.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('center', 'name img');
        break;

        case 'centers':
            data = await Center.find({ name: regex })
                                    .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/projects/centers'
            });
    }
    
    res.json({
        ok: true,
        resultados: data
    })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}

