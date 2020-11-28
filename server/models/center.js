const { Schema, model } = require('mongoose');

const CenterSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {  collection: 'centers' });


CenterSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Center', CenterSchema );
