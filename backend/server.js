//Module imports
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var noticeClass = require('./models/notice.js')
var List = require("collections/list");
var fs = require('fs')

//constant declarations
const mainPage = "index.html";

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var noticeList = new List(JSON.parse(fs.readFileSync('noticeBoard.json')));

app.use(express.static('frontend'))
app.get('/',(request,response)=>{
    console.log("Get request to homepage received.")
    response.sendFile(path.resolve(`../frontend/${mainPage}`))
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
app.post('/new_notice',urlencodedParser,(request,response)=>{
    console.log("POST REQUEST RECEIVED")
    var priorityClass = '';
    if(request.body.hPriority == 'on')
    {
        priorityClass = 'high';
    }
    else if(request.body.mPriority == 'on')
    {
        priorityClass = 'medium';
    }
    else{
        priorityClass = 'low';
    }
    newNotice= new noticeClass.Notice(request.body.noticeName,request.body.dueDate,priorityClass);
    console.log(newNotice);
    noticeList.push(newNotice);
    fs.writeFile("noticeBoard.json",JSON.stringify(noticeList),'utf8',(err)=>{
        if(err)
        {
            console.log("Error writing JSON object to file.")
            return console.log(err)
        }
        console.log("List of notices updated")
    })
    response.send(JSON.stringify(newNotice))
})


var server = app.listen(8081,()=>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

})