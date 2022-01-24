var express = require("express");
var app=express();

const multer=require('multer')


var path = require("path")

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
      cb(null,__dirname+ '/uploads')
    },
    filename: function (req,file,cb) {
      console.log("File in filename function:",file);
      var filetext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+filetext)
    }
  })

const upload=multer({storage: storage})

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.get("/regform",function(req,res){
    res.sendFile(__dirname+"/regform.html")
})

app.post("/registerStudent",upload.single("profilepic"),function(req,res){
    console.log("req.body::",req.body)
    res.send("wait")
})

app.listen(9091,function(){console.log("App running on 9091")})