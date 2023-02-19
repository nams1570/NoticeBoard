const mysql = require('mysql');
require('dotenv').config()

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

async function make_sql_query(con,sql)
{
    let pro = new Promise(function(resolve,reject){
        con.query(sql, function (err, result) 
        {
            if(err) throw err
            resolve(result);      
        });
    });
    return pro.then((val)=>
    {
        return val
    })
}

module.exports = {con,make_sql_query}