//Module imports
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

//constant declarations
const mainPage = "index.html";

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('frontend'))
app.get('/',(request,response)=>{
    console.log("Get request to homepage received.")
    response.sendFile(path.resolve(`../frontend/${mainPage}`))
})
app.get('/get/*')
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
    newNotice= {
        noticeName : request.body.noticeName,
        dueDate    : request.body.dueDate,
        priority   : priorityClass
    };
    response.send(JSON.stringify(newNotice))
})
var server = app.listen(8081,()=>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

})