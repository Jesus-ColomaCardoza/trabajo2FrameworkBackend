const { nextTick } = require('process');
const connection=require('../../dbConnection/connection');
const conn=connection();//hacemos la conexion a la db

const controller={}

controller.index=(req,res,next)=>{
    conn.query('SELECT * FROM users',(err,rows)=>{
        if (err) next(new Error(err))
        else res.render('index',{allUsers:rows});// en app.js establecimos que las vistas parten desde views , entonces partimos desde ahi para colocar nuestro archivo para ser renderizado.
    })
}
controller.addUser=(req,res,next)=>{
    //body contiene los datos en formato json
    conn.query('INSERT INTO users SET ?',[req.body],(err,rows)=>{//body trae la informacion del usurio q estas ingresando
        if(err) next(new Error(err))
        else res.redirect('/')//redirige a la raiz, se vuelve a leer la funcion index de arriba
    });
}
controller.updateUser=(req,res,next)=>{
    //body contiene los datos en formato json
    conn.query('UPDATE users SET ? WHERE id= ?',[req.body,req.params.userId],(err,rows)=>{//req.params.userId para colocar nuestro parametro de la ruta-> req.params.nombreParametro
        if(err) next(new Error(err))
        else res.redirect('/')//redirige a la raiz, se vuelve a leer la funcion index de arriba
    });
}
controller.deleteUser=(req,res,next)=>{
    //body contiene los datos en formato json
    conn.query('DELETE FROM users WHERE id= ?',[req.params.userId],(err,rows)=>{//req.params.userId para colocar nuestro parametro de la ruta-> req.params.nombreParametro
        if(err) next(new Error(err))
        else res.send({ok:true})//redirige a la raiz, se vuelve a leer la funcion index de arriba
    });
}
module.exports=controller