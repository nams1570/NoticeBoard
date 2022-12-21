var express = require('express')
var app = express();
app.post('/new_notice',(request,response)=>{
    console.log("POST REQUEST RECEIVED")
    response.send("NEW FILE RECEIVED")
})
var server = app.listen(8081,()=>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

})