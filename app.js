const {sequelize} = require('./db.js');
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const routes = require('./routes/index.js')
const cookieParser = require("cookie-parser");
const { PORT, URL } = process.env;
const morgan = require("morgan");
const app = express();
require('./models/Users.js')
require('./models/Tasks.js')

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Origin", URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "*"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(routes);

const startDB = async () =>{
  await sequelize.sync({force:false});
  app.listen(PORT, () => {
    console.log(`Server listening on  ${PORT}`);
  });
}

// const startDB =  () =>{
//   sequelize.sync({alter:true}).then(()=>{
//     app.listen(PORT, () => {
//       console.log(`Server listening on  ${PORT}`);
//     });
//   });
// }

startDB();


