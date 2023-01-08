//here we place el server

const express=require('express');//framework express
const path =require('path');//modulo nativo de node para trabajar con rutas de carpetas
const morgan= require('morgan');//nos permite ver todas la peticiones/Errores en tiempo real, por consola

const app=express();

/*settings, configuracion del servidor
1. asignamos el puerto,process.env.PORT || 3000-> utiliza el puerto que se nos asigna y si no se nos asigna coloquemos el puerto 3000
2.asignamos el motor de plantillas es opcional si solo trabajas con html, para este caso usamos pug y lo necesitamos, view engine=motor de vistas
3. asignamos nuestra carpeta de vistas(view), esta caperta contiene las vistas que el usuario vera cuando entre a la apicación.
path.join() ->metodo del modulo nativo path para concatenar o unir la ruta(ejemplo raiz/capeta1/etc) con la ruta de nuestras vistas.
*/

app.set('port',process.env.PORT || 3000);
app.set('view engine','pug');
app.set('views',path.join(__dirname,"/views"))


/*middlewares: se ejecutan siempre cada ves q el usuario intente accesder al servidor.
-express.urlencoded: convirte las peticiones POST en codigo JSON
*/
app.use(express.urlencoded({extended:true}));// podemos true para q solo se envie la informacion q queremos y que especificamos en el "req"
app.use(morgan("dev"));


/*Routes
las rutas estan definidas en el la carpeta routes
*/
app.use(require('./routes/index.routes'));//comentar para los chicos



/*Errors
-next: es el callback que se ejecuta despues de la funcion principal*/
app.use((err,req,res,next)=>{
    res.send({error:err.message});
});


/*public
colocamos nuestra carpeta publica,es decir la carpeta a donde tendra acceso el usuario
-express.static(): metodo de express para establer nuestra ruta de archivos estaticos(osea lo que podra ver el usuario)*/
app.use(express.static(path.join(__dirname,'../public')))

app.listen(app.get('port'),()=>{
    console.log(`server on port  ${app.get('port')}`);
}) //arrancamos el servidor con el puerto que este en port
/*  
    nota para poder actualizar el servidor automaticamnte usamos el modulo nodemon
    en el package.json cambiamos el apartado de scripts con este :  
    "scripts": {
        "dev": "nodemon src/app.js"
    }
 */











