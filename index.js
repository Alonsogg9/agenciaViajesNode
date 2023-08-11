// const express = require('express');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';


const app=express();


//CONECTAR A LA BASE DE DATOS
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error=> console.log(error));



//DEFINIR PUERTO
const port = process.env.PORT || 4000;




//HABILITAR PUG
app.set('view engine', 'pug');

//OBTENER EL AÑO ACTUAL
app.use((req, res, next)=>{
   const year= new Date();
   res.locals.actualYear = year.getFullYear();
   res.locals.nombresitio="Agencia de Viajes";
    next();
})

//AGREGAR BODY PARSER PARA LEER LOS DATOS DEL FORMULARIO
app.use(express.urlencoded({extended:true}));

//DEFINIR LA CARPETA PUBLICA
app.use(express.static('public'));

//AGREGAR ROUTER
app.use('/',router);



app.listen(port,()=>{
    console.log(`El Servidor esta funcionando en el puerto ${port}`);
})