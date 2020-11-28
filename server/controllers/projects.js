const { response } = require('express');

const Project = require('../models/project');

const getProjects = async(req, res = response) => {

    const projects = await Project.find()
                                .populate('usuario','nombre img')
                                .populate('center','name img')


    res.json({
        ok: true,
        projects
    })
}

const crearProject = async (req, res = response) => {

    const uid = req.uid;
    const project = new Project({
        usuario: uid,
        ...req.body
    });


    try {

        const projectDB = await project.save();

        
        res.json({
            ok: true,
            project: projectDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarProject = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const project = await Project.findById( id );

        if ( !project ) {
            return res.status(404).json({
                ok: true,
                msg: 'Project no encontrado por id',
            });
        }

        const cambiosProject = {
            ...req.body,
            usuario: uid
        }

        const projectActualizado = await Project.findByIdAndUpdate( id, cambiosProject, { new: true } );


        res.json({
            ok: true,
            project: projectActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarProject = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const project = await Project.findById( id );

        if ( !project ) {
            return res.status(404).json({
                ok: true,
                msg: 'Project no encontrado por id',
            });
        }

        await Project.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Médico borrado'
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
    getProjects,
    crearProject,
    actualizarProject,
    borrarProject
}