const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async(req, res) => {

    const users = await User.find({}, 'name email role google');

    res.json({
        ok: true,
        users
    });

}

const createUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const emailExists = await User.findOne({ email });

        if ( emailExists ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const user = new User( req.body );
    
        // Encrypt psswd
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    
        await user.save();

        // Generate TOKEN - JWT
        const token = await generateJWT( user.id );


        res.json({
            ok: true,
            user,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}


const updateUser = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el user correcto

    const uid = req.params.id;


    try {

        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un user por ese id'
            });
        }

        const { password, google, email, ...campos } = req.body;

        if ( userDB.email !== email ) {

            const emailExists = await User.findOne({ email });
            if ( emailExists ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un user con ese email'
                });
            }
        }
        
        campos.email = email;
        const userActualizado = await User.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            user: userActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const deleteUser = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un user por ese id'
            });
        }

        await User.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'User eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}



module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}