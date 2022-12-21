var express = require('express')
var app = express();
app.use(express.static('frontend'))
app.get('/',(request,response)=>{
    console.log("Get request to homepage received.")
    response.send("Homepage reached")
})
app.post('/new_notice',(request,response)=>{
    console.log("POST REQUEST RECEIVED")
    response.send("NEW FILE RECEIVED")
})
var server = app.listen(8081,()=>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

})