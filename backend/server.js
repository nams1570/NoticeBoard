//Module imports
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var noticeClass = require('./models/notice.js')
var List = require("collections/list");
var fs = require('fs')
const cors = require('cors');

//constant declarations
const mainPage = "index.html";

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var noticeList = new List(JSON.parse(fs.readFileSync('noticeBoard.json')));

//app.use(express.static(path.resolve(`../frontend`)))
app.use(cors());
app.use(bodyParser.json())
app.get('/',(request,response)=>{
    console.log("Get request to homepage received.")
    response.sendFile(path.resolve(`./noticeBoard.json`))
})
app.get('/get/:nname',(request,response)=>{
    console.log(`Get request for notice ${request.params.nname} found.`)
    var foundNotice =noticeList.toArray().find(notice=>notice.noticeName === request.params.nname);
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
app.post('/new_notice',urlencodedParser,(request,response,next)=>{
    console.log("POST REQUEST RECEIVED")
    var priorityClass = '';
    /*if(request.body.hPriority == 'on')
    {
        priorityClass = 'high';
    }
    else if(request.body.mPriority == 'on')
    {
        priorityClass = 'medium';
    }
    else{
        priorityClass = 'low';
    } */
    newNotice= new noticeClass.Notice(request.body.noticeName,request.body.dueDate,request.body.priority);
    console.log(newNotice);
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
    noticeList = new List(noticeList.toArray().filter(notice=>notice.noticeName != request.params.nname));
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