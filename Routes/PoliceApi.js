const mysql = require('mysql2');
const express = require('express');
var app = express();
const parser = require('body-parser');
app.use(parser.json());

let cors = require("cors");
app.use(cors());
const PORT = 5000;

app.listen(PORT, () => console.log(`Server Running on port: http://localhost${PORT}`));


var sqlconnection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "123456",
        database: "offenses"
    });
sqlconnection.connect((err) => {
    if (!err)
        console.log('DB Connected...');
    else
        console.log(err);
});

//Get all the reported crimes list
app.get('/reported_crime',(req,res)=>{
    sqlconnection.query('SELECT * FROM reported_crime r, users u where u.user_id = r.user_id',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get reported crimes list by id
app.get('/reported_crimes/:id', (req, res) => {
    sqlconnection.query('SELECT * FROM reported_crime WHERE reported_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Add a report to litigation
app.post('/Authenticateinsert', (req, res) => {
    console.log(req);
    let auth = req.body.authenticate;
    console.log(auth);
    sqlconnection.query("insert into litigation(crime_type,crime_place,crime_time,crime_description,area_pin,police_id) values('"+auth.crime_type+"','"+auth.crime_place+"','"+auth.crime_time+"','"+auth.crime_time+"',"+auth.area_pin+","+auth.police_id+");", (err, rows, fields) => {
        if (!err)
            res.send('Inserted successfully');
        else
            console.log(err);
    })
});














//Police Authenticate Withdrawl request
//Get all the reported crimes list
app.get('/withdraw_crime',(req,res)=>{
    sqlconnection.query('SELECT * FROM withdrawals WHERE reported_id IN(SELECT reported_id FROM reported_crime WHERE user_id IN (SELECT user_id FROM users WHERE ',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

