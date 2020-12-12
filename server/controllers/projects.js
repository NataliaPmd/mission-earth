const { response } = require('express');

const Project = require('../models/project');
const Center = require('../models/center');
const User = require('../models/usuario');


const getProjects = async(req, res = response) => {
    console.log(req.uid);
    const user = await User.findById(req.uid);
    let filter = {};
    console.log(user)
    if(user.role === "USER_ROLE") {
        filter = {usuario: user._id};
    }
    if(user.role === "MODERATOR_ROLE") {
        filter = {center: user.center};
    }
    console.log(filter);
    const projects = await Project.find(filter)
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

const getProjectById = async(req, res = response) => {
    const id  = req.params.id;
    try {
        
        const project = await Project.findById( id )
                            .populate('usuario','nombre img')
                            .populate('center','name img');

        if ( !project ) {
            return res.status(404).json({
                ok: true,
                msg: 'Project no encontrado por id',
            });
        }
        res.json({
            ok: true,
            project: project
        }); 

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

const getProjectsByCenter = async (req, res = response) => {
    const projects = [];
    const centers = await Center.find();
    for (const center of centers) {
        const projectsByCenter = await getFirstProjectsByCenter(center._id);
        const centerProjects = {
            center: center,
            projects: projectsByCenter
        }
        projects.push(centerProjects);
    };
    res.json({
        ok: true,
        projects
    })
}

const getFirstProjectsByCenter = async (centerId) => {
    const projects = await Project.aggregate([
        {$match : { center : centerId } },
        {$sort: {score: -1}},
        {$limit : 4 }
     ]);
     return projects;
}
const getFavoriteProjects = async (req, res = response) => {
    try {
        const uid = req.uid;
        const user = await User.find({_id: uid});
        const promises = [];
        user[0].favs.forEach(function(id) {
            promises.push(Project.findById(id).populate('center'));
        })
        Promise.all(promises).then(projects => { 
            res.json({
                ok: true,
                projects
            })          
        });        
    } catch {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}

const getTopProjects = async (req, res = response) => {
    try {
        const projects = await Project.aggregate([
            {$sort: {score: -1}},
            {$limit : 10 },
            {
                $lookup: {
                    from: "centers",
                    localField: "center",
                    foreignField: "_id",
                    as: "center"
                }
            }
         ])
         res.json({
            ok: true,
            projects
        })
    }
     catch (error) {

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
    borrarProject,
    getProjectById,
    getProjectsByCenter,
    getTopProjects,
    getFavoriteProjects
}