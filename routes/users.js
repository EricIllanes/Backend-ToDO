const { Users } = require("../models/Users.js");
const { Router } = require("express");
const { Tasks } = require("../models/Tasks.js");
const bcryptjs = require("bcryptjs");
const router = Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY, JWT_EXPIRATION, JWT_COOKIE_EXPIRES} = process.env

router.get("/user", async (req, res) => {
  try {
    const allUsers = await Users.findAll({
      include: [{ model: Tasks, attributes: ["name", "content", "done"] }],
    });
    res.send(allUsers);
  } catch (error) {
    console.log(error);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let user = await Users.findByPk(id, {
      include: [
        {
          model: Tasks,
        },
      ],
    });
    res.send(user);
  } catch (err) {
    console.error("EEEH! CAMPEÓN EL ERROR ES:", err);
  }
});

//// RUTAS PARA REGISTER, LOGIN AND AUTHENTICATION & LOGOUT
router.post("/user", async (req, res) => {
  try {
    let user;
    const { name, password } = req.body;
    user = await Users.findOne({ where: { name } });
    if (user) {
      res.status(403).send({message:"El usuario ya existe" });
    } else {
     let passHash= await bcryptjs.hash(password, 10)
      user = await Users.create({
        name,
        password: passHash,
      });
      res.send(user);
      console.log(11, passHash)
    }
  } catch (error) {
    console.error("EEEH! CAMPEÓN EL ERROR ES:", error);
  }
});

router.post("/login", async (req, res) =>{
  try{
    const {name, password} = req.body;
    let usuarioFind = await Users.findOne({
      where:{
        name,
      }
    })
   
    if (!usuarioFind){
      return res.status(403).send({message: "Usuario incorrecto"});
    } else if (usuarioFind){
      let passCheck = await bcryptjs.compare(password, usuarioFind.password);
      if (!passCheck){
       return res.status(403).send({message: "Contraseña incorrecta"});
      } else if (passCheck){
      const id= usuarioFind.id;
      const tokenLogin= jwt.sign({id: id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRATION});
      res.status(200).json({tokenLogin, name: usuarioFind.name, id: usuarioFind.id});

  
      }
    }
  } catch (error){
    console.error(error)
    res.status(500).send({message: "Error en el servidor"})
  }
})

router.post("auth", async (req, res) =>{
const token = req.headers['authorization'];
jwt.verify(token, `${JWT_SECRET_KEY}`, (err, response)=>{
  if(err){
    res.status(401).send({message: "Token invalido"});
  } else {
    res.status(200).send({message: "Token valido", response});
  }
} )
})



module.exports = router;
