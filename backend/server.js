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
var dateTime = new Date();
console.log(dateTime);
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var noticeList = JSON.parse(fs.readFileSync('noticeBoard.json'));

//app.use(express.static(path.resolve(`../frontend`)))
app.use(cors());
app.use(bodyParser.json())
app.get('/',(request,response)=>{
    console.log("Get request to homepage received.")
    console.log(dateTime);
    response.sendFile(path.resolve(`./noticeBoard.json`))
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
    noticeList[objIndex] = updatedNotice;
    fs.writeFile("noticeBoard.json",JSON.stringify(noticeList),'utf8',(err)=>{
        if(err)
        {
            console.log("Error writing JSON object to file.")
            next(err)
        }
        console.log("List of notices updated")
    })
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