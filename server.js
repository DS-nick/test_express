const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth.routes");
const imageRouter = require("./routes/image.routes")
const { verifyToken } =require("./middlewares/authJwt")
const multer = require('multer');
const fileStorage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, './uploads/images/')
  },
  filename: (req, file, cb)=> {
    cb(null, file.originalname)
  },
  
})
const upload = multer({storage: fileStorage, fileFilter: (req, file, cb)=> {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload image", false);
  }
}});

const db = require('./db/index')
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static('uploads'))
 app.use("/api/v1/auth", authRouter);
app.use("/api/v1", verifyToken, upload.array('images', 12), imageRouter);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
