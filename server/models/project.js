const { Schema, model } = require('mongoose');

const ProjectSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    center: {
        type: Schema.Types.ObjectId,
        ref: 'Center',
        required: true
    },
    score: {
        type: Number
    }
    
});


ProjectSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Project', ProjectSchema );
