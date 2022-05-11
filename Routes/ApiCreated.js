const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const parser = require('body-parser');




var app = express();
app.use(express.json());
var genuuid = require('uuid/v4');

let cors = require("cors");
const res = require('express/lib/response');
app.use(cors());
app.use(cookieParser());
app.use(parser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// const oneDay = 1000 * 60 * 60 * 24;
// app.use(
//     session({
//         key: "userId",
//         secret: "this is a secret",
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             maxAge: oneDay,
//         },
//     })
// );


// app.use(
//     session({
//         name:'SessionCookie',
//         genid: function(req) {
//             console.log.log('session id generated');
//             return genuuid();
//         },
//         secret: "Shsh!Secret!",
//         resave: false,
//         saveUninitialized: false,
//         cookie: {secure: false, maxAge: oneDay}
//         })
// );

const PORT = 5000;
app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));


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


//<-----------------------------------------------Get all the reported crimes list-------------------------------------------------->
app.get('/reported_crime', (req, res) => {
    sqlconnection.query('SELECT * FROM reported_crime r, users u where u.user_id = r.user_id AND r.reported_id not in(select reported_id from litigation);', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


//<-----------------------------------------------Get reported crimes list by id-------------------------------------------------->
app.get('/reported_crimes/:id', (req, res) => {
    sqlconnection.query('SELECT * FROM reported_crime WHERE reported_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//<-----------------------------------------------Add a report to litigation-------------------------------------------------->
app.post('/authenticateinsert', (req, res) => {
    //    console.log(req.body);
    let auth = req.body.auth;
    console.log(auth);
    sqlconnection.query("insert into litigation(crime_type,crime_place,crime_time,crime_description,area_pin,police_id,reported_id) values('" + auth.crime_type + "','" + auth.crime_place + "','" + auth.crime_time + "','" + auth.crime_description + "'," + auth.area_pin + "," + auth.police_id + "," + auth.reported_id +");", (err, rows, fields) => {
        if (!err) {
            console.log("Submitted");
            res.send('Inserted successfully');
        }
        else
            console.log(err);
    })
});



// <-----------------------------------------------search user by id from login ------------------------------------------------!>
// app.get('/suser/:id/:pass', (req, res) => {
//     console.log('console main');
//     sqlconnection.query('SELECT * FROM login WHERE login_id =? and password=?', [req.params.id], [req.params.pass], (err, rows, fields) => {
//         if (!err) {
//             if (res.length > 0) {
//                 // Authenticate the user
//                 var user = res[0];
//                 console.log("Logged in successfully!!");
//                 req.session.usrid = user.login_id;
//                 req.session.loggedin = true;
//                 req.session.save();

//                 if (user.user_type == "Admin") {
//                     res.redirect('/#login=true');
//                 }
//                 else if (user.user_type == "Police") {
//                     res.redirect('http://127.0.0.1:5501/HTML/PoliceHomepage.html');
//                 }
//                 else {
//                     res.redirect('/#login=true');
//                 }
//                 // Redirect to home page
//                 res.send(user);
//             }
//         } else {
//             console.log('Incorrect Username and/or Password!');
//             // res.redirect('/#login=false');
//         }
//         //     // req.session.username = rows[0].login_id;
//         //     // console.log(rows[0].login_id);
//         //     res.send(rows);
//         // }
//         // else
//         //     console.log(err);
//     })
// });



// <-----------------------------------------------search user by id from login ------------------------------------------------!>
app.get('/suser/:id', (req, res) => {
    console.log('console main');
    sqlconnection.query('SELECT * FROM login WHERE login_id =?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

// <------------------------------------------------create session------------------------------------------------------------->
app.post('/reqsession/:id', (req, res) => {
    req.session.user_id = req.params.id;
    req.session.login = true;
    req.session.save();
    console.log(JSON.stringify(req.session));
    res.send('session created');
});


// <-----------------------------------------------Get all the requestx`1 request list for the logged in user------------------------------------------------!>
// app.get('/withdraw_crime/:id',(req,res)=>{
//     sqlconnection.query('SELECT * FROM reported_crime WHERE user_id = ?;)',[req.params.id],(err,rows,fields)=>{
//         if(!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });


// <-----------------------------------------------Get all the withdraw request list------------------------------------------------!>
app.get('/withdraw_crime', (req, res) => {
    sqlconnection.query('SELECT * FROM withdrawals w,reported_crime r, users u WHERE (w.reported_id = r.reported_id AND r.user_id = u.user_id)', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//<-----------------------------------------------Get withdrawals list by id-------------------------------------------------->
app.get('/withdraw_crime/:id', (req, res) => {
    sqlconnection.query('SELECT * FROM withdrawals WHERE reported_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


// <-----------------------------------------------Get user_name from users by id------------------------------------------------!>
app.delete('/delete/reported_crime', (req, res) => {
    let auth = req.body.reported.user_id;
    sqlconnection.query('delete from reported_crime where reported_id = ?', [auth], (rows, err, fields) => {
        if (!err) {
            console.log('Deleted Successfully');
            // res.send()
        }
        else {
            res.send(err);
        }
    })
})


// <-----------------------------------------------Get user_name from users by id------------------------------------------------!>
app.get('/user_name/:id', (req, res) => {
    sqlconnection.query('Select * from users where user_id = ?', [req.params.id], (rows, err, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
})


// <---------------------------------------------------------Upload pics -----------------------------------------------------!>
app.post('/upload_pic', (req, res) => {
    const formidable = require('formidable');
    var form = formidable.IncomingForm();
    form.uploadDir = "./Uploads";
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.multiples = false;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({
                result: 'failed',
                data: {},
                message: `Cannot  upload images. Error is: ${err}`
            })
        }
        var arrayOfFiles = files[""];
        if (arrayOfFiles.length > 0) {
            var Filename = [];
            arrayOfFiles.forEach((eachFile) => {
                Filename.push(eachFile.path)
            });
        } else {

        }
    })
})



