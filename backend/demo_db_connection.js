var mysql = require('mysql');
require('dotenv').config()

console.log(process.env)
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "notices"
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM today", function (err, result) 
    {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
      });
  });