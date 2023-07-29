const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

// IMPORTANDO LAS RUTAS 

const users = require('./routes/user');

// FIN DE IMPORTACION DE RUTAS
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.disable('x-powered-by');

app.set('port', port);

// LLAMADO DE LAS RUTAS

users(app);


// FIN LLAMADO DE LAS RUTAS

server.listen(3000, '192.168.1.17' || 'localhost', function(){
    console.log('Ejecutando la aplicacion '+process.pid+' Iniciado en el puerto '+port)
});

app.get('/', (req, res)=>{
    res.send('Ruta raiz del backend')
});
app.get('/test', (req, res)=>{
    res.send('Es un test')
});

//ERROR HANDLER
app.use((err, req, res, next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack)
});

module.exports = {
    app: app,
    server: server
}