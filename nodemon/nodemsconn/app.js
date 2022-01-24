var express = require("express");
var sql = require("mssql/msnodesqlv8");

var app = express(); 

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const config ={
    database: 'mey_db',
    server: 'localhost',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
}
app.get('/users',(req,res) => {
        sql.connect(config,err =>{
            new sql.Request().query('select * from BOOK_NOW',(err,data) => {
                console.log(data);
                res.send(data)
            })
        })
    })
    
    // app.get('/users',(req,res) => {
    //     sql.connect(config,err =>{
    //         new sql.Request()
    //         .execute('ALL_USERS',(err,data) => {
    //             res.send(data.recordset)
    //         })
    //     })
    // })
    




// app.get("/",function(req,res){
//     res.send("Hello express")
// })
app.listen(9090);