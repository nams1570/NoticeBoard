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
var noticeList = JSON.parse(fs.readFileSync('noticeBoard.json'));
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
app.get('/get/:nname',(request,response)=>{
    console.log(`Get request for notice ${request.params.nname} found.`)
    var foundNotice =noticeList.find(notice=>notice.noticeName === request.params.nname);
    console.log(foundNotice)
    if(foundNotice)
    {
        response.send(JSON.stringify(foundNotice))
    }
    else
    {
        response.status(500).send('No such notice!')
    }
})
app.put('/updateTime',(request,response)=>{
    objIndex = noticeList.findIndex(notice=>notice.noticeName===request.body.noticeName)
    updatedNotice = new noticeClass.Notice(request.body.noticeName,request.body.dueDate, request.body.priority)
    console.log("Displaying notice is "+JSON.stringify(updatedNotice))
    updatedNotice.setDueClass(dateTime);
    updatedNotice.setDescription(request.body.description)
    console.log("NoticeList is"+noticeList)
    noticeList[objIndex] = updatedNotice;
    console.log("Now NoticeList is"+noticeList)

    fs.writeFile("noticeBoard.json",JSON.stringify(noticeList),'utf8',(err)=>{
        if(err)
        {
            console.log("Error writing JSON object to file.")
            next(err)
        }
        console.log("List of notices updated")
    })
    response.status(200).send("Notice updated successfully!")
    console.log("Hello this is done")
})
app.post('/new_notice',urlencodedParser,(request,response,next)=>{
    console.log("POST REQUEST RECEIVED")
    newNotice= new noticeClass.Notice(request.body.noticeName,request.body.dueDate,request.body.priority);
    console.log(newNotice);
    newNotice.setDescription(request.body.description);
    newNotice.setDueClass(dateTime);
    //Check date, compare it?
    noticeList.push(newNotice);
    fs.writeFile("noticeBoard.json",JSON.stringify(noticeList),'utf8',(err)=>{
        if(err)
        {
            console.log("Error writing JSON object to file.")
            next(err)
        }
        console.log("List of notices updated")
    })
    response.send(JSON.stringify(newNotice))
})
app.delete('/del/:nname',(request,response,next)=>{
    console.log(`Delete request received for ${request.params.nname}`);
    noticeList = noticeList.filter(notice=>notice.noticeName != request.params.nname);
    fs.writeFile("noticeBoard.json",JSON.stringify(noticeList),'utf8',(err)=>{
        if(err)
        {
            console.log("Error writing JSON object to file.")
            next(err)
        }
        console.log("List of notices updated")
    })
    response.send("Deleted successfully!")
})

var server = app.listen(8081,()=>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

})