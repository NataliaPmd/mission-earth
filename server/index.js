require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use( cors() );

app.use( express.json() );

dbConnection();


app.use( '/api/users', require('./routes/users') );
app.use( '/api/login', require('./routes/auth') );



app.listen( process.env.PORT, () => {
    console.log('Servidor inicializado en puerto ' + process.env.PORT );
});

