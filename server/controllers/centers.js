const { response } = require('express');

const Center = require('../models/center');
const Project = require('../models/project');

const getCenters = async(req, res = response) => {

    const centers = await Center.find()
                                    .populate('usuario','name img');

    res.json({
        ok: true,
        centers
    })
}

const getCenterProjects = async(req, res = response) => {
    const id = req.params.id;
    const center = await Center.findById( id );
    const projects = await Project.find({center: id}).sort({score: -1});
    res.json({
        ok: true,
        center: center,
        projects: projects
    })
}

const createCenter = async(req, res = response) => {

    const uid = req.uid;
    const center = new Center({ 
        usuario: uid,
        ...req.body 
    });

    try {
        const centerDB = await center.save();
        res.json({
            ok: true,
            center: centerDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    


}

const updateCenter = async (req, res = response) => {

    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const center = await Center.findById( id );

        if ( !center ) {
            return res.status(404).json({
                ok: true,
                msg: 'centro no encontrado por id',
            });
        }

        const centerChanges = {
            ...req.body,
            usuario: uid
        }

        const updatedCenter = await Center.findByIdAndUpdate( id, centerChanges, { new: true } );


        res.json({
            ok: true,
            center: updatedCenter
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const deleteCenter = async(req, res = response) => {

    const id  = req.params.id;

    try {
        
        const center = await Center.findById( id );

        if ( !center ) {
            return res.status(404).json({
                ok: true,
                msg: 'Centro no encontrado por id',
            });
        }

        await Center.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'Centro eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



module.exports = {
    getCenters,
    createCenter,
    updateCenter,
    deleteCenter,
    getCenterProjects
}