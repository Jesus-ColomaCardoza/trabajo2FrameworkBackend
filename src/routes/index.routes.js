
const express=require('express');//usamos express
const router=express.Router();//metodo de express
const controller=require('../controllers/index.controller');

//get, post, put y delete se le llaman verbos
//rutas get
router.get('/',controller.index)

//rutas post
router.post('/add-user',controller.addUser)
router.post('/update-user/:userId',controller.updateUser)// para pasar parametros colocamos :nombreIdentificador

//rutas put-para actualizar
router.put('/update-user/:userId',controller.updateUser)// para pasar parametros colocamos :nombreIdentificador

//rutas delete-apara eliminar
router.delete('/delete-user/:userId',controller.deleteUser)


module.exports=router//exportamos para poder llamar al archivo para usarlo