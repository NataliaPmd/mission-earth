const Usuario = require('../models/usuario');
const fs = require('fs');

const Project = require('../models/project');
const Center = require('../models/center');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'projects':
            const project = await Project.findById(id);
            if ( !project ) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/projects/${ project.img }`;
            borrarImagen( pathViejo );

            project.img = nombreArchivo;
            await project.save();
            return true;

        break;
        
        case 'centers':
            const center = await Center.findById(id);
            if ( !center ) {
                console.log('No es un centro por id');
                return false;
            }

            pathViejo = `./uploads/centers/${ center.img }`;
            borrarImagen( pathViejo );

            center.img = nombreArchivo;
            await center.save();
            return true;

        break;
        
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/centers/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;
    }


}



module.exports = { 
    actualizarImagen
}
