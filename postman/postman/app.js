var express = require('express');
var app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

var path = require("path")
const multer = require('multer')

var cors = require("cors")
app.use(cors())

const { MongoClient, ObjectId } = require('mongodb');

const url = "mongodb://127.0.0.1:27017"
const dbName = 'mey'





// app.post('/testaddrecordinfo',(req,res)=>{

    
//     req.body.ReqNo = "ST-"+req.body.trip+"-"+ Math.floor(Math.random() * (999) + 100)
    
//     MongoClient.connect(url, (err, conn) => {
//         var db = conn.db('sample');
//         db.collection('spacetrip').find({ email: req.body.email }).toArray((err, data) => {
//             console.log(data.length);
//             if (err) {
//                 res.send(err);
//             }
//             else {
//                 if (data.length >= 1) {
//                     res.send('Email already registered with us.');
//                 }
//                 else {
//                     db.collection('spacetrip').insertOne(req.body, (err, data) => {
//                         if (err) {
//                             //console.log(err);
//                             res.send(err)
//                         } else {
//                             res.send(data);
//                         }
//                     });
//                 }
//             }
//         });
//     });
// })


// app.get("/record", (req, res) => {
//     MongoClient.connect(url, function (err, conn) {
//         var db = conn.db("sample")
//         db.collection("spacetrip").find().toArray((err, data) => {
//             res.send(data)
//             console.log(data)
//         })
//     })
// })


// app.listen(3091, function () {
//     console.log("running 3091")
// })