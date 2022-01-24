var express=require("express");
var app=express();
const{ MongoClient, ObjectId }=require('mongodb');
var url="mongodb://127.0.0.1:27017";

const dbname="mey"

app.use(express.urlencoded({ extended:true}))
app.use(express.json());

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session=require('express-session');
app.use(session({secret:"shh,its a secret!"}));

app.set('view engine','pug');
app.set('views','./views');

app.get("/",function(req,res){
    res.sendFile(__dirname+"/home.html")
})
app.get("/aboutus",function(req,res){
    res.sendFile(__dirname+"/aboutus.html")
})


app.get("/products",authenticate,function(req,res){
    
    res.render("products",{
        user:req.session
    })
})

app.get("/services",authenticate,function(req,res){
    res.render("services")
    
})

app.get("/logout",function(req,res){
    req.session.destroy(res.redirect("/"))
    res.sendFile(__dirname+"/login.html")
})
    
app.get("/signupform",function(req,res){
    res.sendFile(__dirname+"/userregistrationform.html")
})

app.post("/register",function(req,res){
    console.log("req fields",req.body);
    if(req.body.pwd!==req.body.cpwd){
        res.sendFile(__dirname+"/confirmpaasswordError.html")
    }
    else{
        MongoClient.connect(url,function(err,conn){
            var db=conn.db("mey");
            db.collection("empolyee").find({username:req.body.username})
            .toArray(function(err,data){
                if(data.length===0){

                    db.collection("empolyee").insertOne(req.body,function(err,data){

                        res.send(data)

                    })
                }
                else{
                    res.sendFile(__dirname+"/usernameexit.html")
                }
            })
        })
    }
})
app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html")
})
app.post("/login",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("mey");
        db.collection("empolyee").find({username:req.body.username})
        .toArray(function(err,data){
            if(data.length===0){
                res.sendFile(__dirname+"/usernamenotfound.html")
            
            }
            else{
                if(data[0].pwd===req.body.pwd){
                    req.session.username=req.body.username;
                    req.session.pwd=req.body.pwd;
                   // res.cookie("username",req.body.username);
                   // res.cookie("pwd",req.body.pwd);
                    res.send("login successful")
                }
                else{
                    res.send("Incorrect password or username")
                }

            }
        })
    })
})

function authenticate(req,res,next){
    if(req.session.username){
        MongoClient.connect(url,function(err,conn){
            var db=conn.db('mey');
            db.collection('empolyee').find({username:req.session.username,pwd:req.session.pwd})
            .toArray(function(err,data){
                next();
    
            })

        })
       
        
    }

else{
    res.redirect('/login')
}
}
app.listen(9092,function(){console.log("App runing on 9092")})