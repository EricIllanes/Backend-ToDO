const { Router } = require('express');
const userRoute= require('./users.js')
const userTask= require('./tasks.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Agregar todos los routers;
router.use(userRoute);
router.use(userTask)


module.exports = router;
