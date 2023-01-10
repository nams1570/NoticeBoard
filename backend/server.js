//Module imports
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var noticeClass = require('./models/notice.js')
var List = require("collections/list");
var fs = require('fs')
const cors = require('cors');
var mysql = require('mysql');
require('dotenv').config()

//constant declarations

var app = express();
var con = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "notices"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });
var dateTime = new Date();
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var sql = "SELECT * FROM noticeList"

async function make_sql_query(con,sql)
{
        let pro = new Promise(function(resolve,reject){
        con.query(sql, function (err, result) {
          if(err) throw err
            console.log("Result: " + JSON.stringify(result));
            resolve(result);
          
        });
    });
    return pro.then((val)=>{
        return val
    })
}



app.use(cors());
app.use(bodyParser.json())
app.get('/',async (request,response)=>{
    console.log("Get request to homepage received.")
    console.log(dateTime);
    response.status(200).send(await make_sql_query(con,"SELECT * FROM noticeList"));
})
app.get('/get/:nname',async (request,response)=>{
    console.log(`Get request for notice ${request.params.nname} found.`)
    var sql = `SELECT * FROM noticeList WHERE noticeName = '${request.params.nname}'`
    var foundNotices = await make_sql_query(con,sql);
    console.log(foundNotices)
    if(foundNotices)
    {
        response.send(foundNotices[0])
    }
    else
    {
        response.status(500).send('No such notice!')
    }
})
app.put('/updateTime',(request,response)=>{
    updatedNotice = new noticeClass.Notice(request.body.noticeName,request.body.dueDate, request.body.priority)
    console.log("Displaying notice is "+JSON.stringify(updatedNotice))
    updatedNotice.setDueClass(dateTime);
    var sql = `UPDATE noticeList SET dueClass = '${updatedNotice.dueClass}' WHERE noticeName = '${updatedNotice.noticeName}'`
    make_sql_query(con,sql);
    response.status(200).send("Notice updated successfully!")
})
app.post('/new_notice',urlencodedParser,(request,response,next)=>{
    console.log("POST REQUEST RECEIVED")
    newNotice= new noticeClass.Notice(request.body.noticeName,request.body.dueDate,request.body.priority);
    console.log(newNotice);
    newNotice.setDescription(request.body.description);
    newNotice.setDueClass(dateTime);
    //Check date, compare it?
    var sql = `INSERT INTO noticeList (noticeName,dueDate,priority,description,dueClass) VALUES ('${newNotice.noticeName}','${newNotice.dueDate}','${newNotice.priority}','${newNotice.description}','${newNotice.dueClass}')`
    make_sql_query(con,sql);
    response.send(JSON.stringify(newNotice))
})
app.delete('/del/:nname',(request,response,next)=>{
    console.log(`Delete request received for ${request.params.nname}`);
    var sql = `DELETE FROM noticeList WHERE noticeName = '${request.params.nname}'`
    make_sql_query(con,sql)
    response.send("Deleted successfully!")
})

var server = app.listen(8081,()=>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

})