//Module imports
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const noticeClass = require('./models/notice.js')
const cors = require('cors');
const mysql = require('mysql');
const utils = require('./utils');
require('dotenv').config()

//constant declarations

const app = express();
const con = mysql.createConnection({
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

async function make_sql_query(con,sql)
{
        let pro = new Promise(function(resolve,reject){
        con.query(sql, function (err, result) {
          if(err) throw err
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
    response.status(200).send(await make_sql_query(con,"SELECT * FROM noticeList"));
})
app.get('/get/:nname',async (request,response)=>{
    console.log(`Get request for notice ${request.params.nname} found.`)
    var sql = `SELECT * FROM noticeList WHERE noticeName = '${request.params.nname}'`
    var foundNotices = await make_sql_query(con,sql);
    if(foundNotices)
    {
        response.send(foundNotices[0])
    }
    else
    {
        response.status(500).send('No such notice!')
    }
})

app.get('/auth',(request,response)=>{
    try {
        response.redirect(utils.request_get_auth_code_url);
      } catch (error) {
        response.sendStatus (500);
        console.log(error.message)
      }
})
app.get(process.env.REDIRECT_URI,(request,response)=>{
    const authorization_code = request.query.code
})

app.put('/updateTime',(request,response)=>{
    updatedNotice = new noticeClass.Notice(request.body.noticeName,request.body.dueDate, request.body.priority)
    updatedNotice.setDueClass(dateTime);
    var sql = `UPDATE noticeList SET dueClass = '${updatedNotice.dueClass}', dueDate = '${updatedNotice.dueDate}' WHERE noticeName = '${updatedNotice.noticeName}'`
    make_sql_query(con,sql);
    response.status(200).send("Notice updated successfully!")
})
app.put('/updateDesc',(request,response)=>{
    updatedNotice = new noticeClass.Notice(request.body.noticeName,request.body.dueDate, request.body.priority)
    updatedNotice.setDescription(request.body.description)
    var sql = `UPDATE noticeList SET description = '${updatedNotice.description}' WHERE noticeName = '${updatedNotice.noticeName}'`
    make_sql_query(con,sql);
    response.status(200).send("Notice updated successfully!")
})
app.post('/new_notice',urlencodedParser,(request,response,next)=>{
    console.log("POST REQUEST RECEIVED")
    newNotice= new noticeClass.Notice(request.body.noticeName,request.body.dueDate,request.body.priority);
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