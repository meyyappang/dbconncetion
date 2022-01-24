var express = require("express");
var app = express();


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
app.use(express.static('uploads'));

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.set('view engine', 'pug');
app.set('views','./views');



const { MongoClient, ObjectId }=require('mongodb');
var url="mongodb://localhost:27017/";
const dbname='mey'

app.get("/",function(req,res){
    res.send("Hello express")
})

app.get("/stds",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("mey");
        db.collection("students").find()
        .toArray(function(err,data){
           res.send(data);
})
    })
})

app.get("/register",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("mey");
        db.collection("students").find()
        .toArray(function(err,data){
            res.render("student",{
                allstudents:data
    })
})
    })
})

app.get("/regstu",function(req,res){
    res.sendFile(__dirname+"/stugreg.html")
})

app.post("/addStudent",upload.single("profilepic"),function(req,res){
    console.log("req.file:",req.file);
    console.log("req.body:",req.body);
    req.body.profilepic=req.file.filename;
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("mey");
        db.collection("students").insertOne(req.body,function(err,data){
            res.send(data);

        })
       
           
        })
    })


app.get("/stds/:id",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("mey");
        db.collection("students").find({_id:ObjectId(req.params.id)})
        .toArray(function(err,data){
            res.render("studentdetail",{
                details:data
            })
        })
    })
})


    


app.get("/deleteStudent/:id",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("mey");
        db.collection("students").deleteOne({_id:ObjectId(req.params.id)},function(err,data){
            res.redirect("/register");

})
    })
})

app.listen(9090,function(){console.log("app running on 9090")})