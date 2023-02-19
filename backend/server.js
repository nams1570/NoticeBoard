//Module imports
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const noticeClass = require('./models/notice.js')
const cors = require('cors');
const db = require('./database/db');
const utils = require('./utils');
var session = require('express-session');

require('dotenv').config()

//constant declarations

const app = express();

var dateTime = new Date();
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var cached_user = {};

app.use(cors());

app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}))

app.use(bodyParser.json())
var authRouter = require('./routes/auth');

app.use('/',authRouter)

app.get('/',async (request,response)=>{
    //console.log("Get request to homepage received.")
    response.status(200).send(await db.make_sql_query(db.con,"SELECT * FROM noticeList"));
})
app.get('/get/:nname',async (request,response)=>{
    console.log(`Get request for notice ${request.params.nname} found.`)
    var sql = `SELECT * FROM noticeList WHERE noticeName = '${request.params.nname}'`
    var foundNotices = await db.make_sql_query(db.con,sql);
    if(foundNotices)
    {
        response.send(foundNotices[0])
    }
    else
    {
        response.status(500).send('No such notice!')
    }
})
//Oauth endpoints
app.get('/auth',(request,response)=>{
    console.log("get request for auth found")
    try {
        response.redirect(utils.request_get_auth_code_url);
      } catch (error) {
        response.sendStatus (500);
        console.log(error.message)
      }
})
app.get(process.env.REDIRECT_URI,async (request,response)=>{
    const authorization_code = request.query.code
    try {
        // ! get access token using authorization token
        const auth_response = await utils.get_access_token(authorization_code);
        console.log ({data: auth_response.data});
        // get access token from payload
        const {access_token} = auth_response.data;
        console.log(`access token is ${access_token}`)
        const user = await utils.get_profile_data(access_token);
        const user_data = user.data;
        cached_user = {name:user_data.name,picture:user_data.picture};
        console.log(cached_user)
        response.send(`
        <h1> welcome ${user_data.name}</h1>
        <img src="${user_data.picture}" alt="user_image" />
        `)
      } catch (error) {
        console.log(error.message)
        response.sendStatus (500);
      }
})
app.get("/cachedProfile",async (request,response)=>{
    response.send(cached_user);
})

//login endpoints
app.post("/login",async (request,response)=>{
    console.log(JSON.stringify(request.body))
    var sql = `SELECT * from users WHERE username = '${request.body.username}' AND password = '${request.body.password}'`;
    var foundUser = await db.make_sql_query(db.con,sql);
    console.log(foundUser)
    if(foundUser[0])
    {
        response.send(foundUser)
    }
    else
    {
        console.log("Hi")
        response.status(500).send("Username or Password was incorrect");
    }
})

app.put('/updateTime',(request,response)=>{
    updatedNotice = new noticeClass.Notice(request.body.noticeName,request.body.dueDate, request.body.priority)
    updatedNotice.setDueClass(dateTime);
    var sql = `UPDATE noticeList SET dueClass = '${updatedNotice.dueClass}', dueDate = '${updatedNotice.dueDate}' WHERE noticeName = '${updatedNotice.noticeName}'`
    db.make_sql_query(db.con,sql);
    response.status(200).send("Notice updated successfully!")
})
app.put('/updateDesc',(request,response)=>{
    updatedNotice = new noticeClass.Notice(request.body.noticeName,request.body.dueDate, request.body.priority)
    updatedNotice.setDescription(request.body.description)
    var sql = `UPDATE noticeList SET description = '${updatedNotice.description}' WHERE noticeName = '${updatedNotice.noticeName}'`
    db.make_sql_query(db.con,sql);
    response.status(200).send("Notice updated successfully!")
})
app.post('/new_notice',urlencodedParser,(request,response,next)=>{
    console.log("POST REQUEST RECEIVED")
    newNotice= new noticeClass.Notice(request.body.noticeName,request.body.dueDate,request.body.priority);
    newNotice.setDescription(request.body.description);
    newNotice.setDueClass(dateTime);
    //Check date, compare it?
    var sql = `INSERT INTO noticeList (noticeName,dueDate,priority,description,dueClass) VALUES ('${newNotice.noticeName}','${newNotice.dueDate}','${newNotice.priority}','${newNotice.description}','${newNotice.dueClass}')`
    db.make_sql_query(db.con,sql);
    response.send(JSON.stringify(newNotice))
})
app.delete('/del/:nname',(request,response,next)=>{
    console.log(`Delete request received for ${request.params.nname}`);
    var sql = `DELETE FROM noticeList WHERE noticeName = '${request.params.nname}'`
    db.make_sql_query(db.con,sql)
    response.send("Deleted successfully!")
})

var server = app.listen(8081,()=>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

})