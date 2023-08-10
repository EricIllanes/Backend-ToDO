const { Router } = require('express');
const userRoute= require('./Users')
const userTask= require('./Tasks');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Agregar todos los routers;
router.use(userRoute);
router.use(userTask)


module.exports = router;
