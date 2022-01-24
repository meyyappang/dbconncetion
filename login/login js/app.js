var express = require('express');
var app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const { MongoClient, ObjectId } = require('mongodb');
const url = "mongodb://127.0.0.1:27017"

var cors = require("cors")

app.use(cors())

app.post("/newlogin", function(req, res){
    MongoClient.connect(url, (err, conn) => {
        var db = conn.db("mey")
        db.collection("empolyee").insertOne(req.body,(err,data)=>{
           if (err){
               console.log(err);
           }
           else{
               console.log(data);
               res.send(data)
           }
        })
    })
})

app.listen(3032,function(){
    console.log("running 3032")
})