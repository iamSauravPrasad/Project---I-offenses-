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


//<-----------------------------------------------Add a record to criminal-------------------------------------------------->
app.post('/postinsert', (req, res) => {
    //    console.log(req.body);
        let add = req.body.add;
        console.log(add);
        sqlconnection.query("insert into criminal(crime_id,name,dob,address) values('"+add.crime_id+"','"+add.name+"','"+add.dob+"','"+add.address+"');", (err, rows, fields) => {
            if (!err)
            {
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



// <-----------------------------------------------search user by id for login ------------------------------------------------!>
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
app.post('/createsession/:id', (req, res) => {
    req.session.user_id = req.params.id;
    req.session.login = true;
    req.session.save();
    console.log(JSON.stringify(req.session));
    res.send('session created');
});

// <------------------------------------------------get session user id------------------------------------------------------------->
app.get('/getsessionusrid', (req, res) =>{
    var uid = req.session.user_id;
    res.send(uid);
});

// <------------------------------------------------get session login(true/false)------------------------------------------------------------->
app.get('/getsessionlogin', (req, res) =>{
    var login = req.session.login;
    res.send(login);
});


exports.getsessionlogin = (req, res) => {
    var login = req.session.login;
    res.send(login);
};


// <------------------------------------------------destroy session------------------------------------------------------------->
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('session destroyed');
});


// <-----------------------------------------------Get all the withdraw request list for the logged in user------------------------------------------------!>
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


// <-----------------------------------------------Get user_name from users by id------------------------------------------------!>
app.delete('/delete/litigation/:id',(req, res) =>{
    let auth = req.body.id;
    sqlconnection.query('delete from reported_crime where reported_id = ?',[req.params.id],(rows,err,fields)=>{
        if(!err)
            console.log('Deleted Successfully');
        else
            console.log(err);
    })
})



// <-----------------------------------------------Get criminals details from criminlas------------------------------------------------!>
app.get('/criminals', (req, res) => {
    // res.send('Welcome To CRMS');
    let sql = "SELECT * FROM criminal";
    let query = sqlconnection.query(sql, (err, rows) => {
        if (err) throw err;
        res.send(rows);
        });
    });

// <-----------------------------------------------Get criminals details from criminlas by id------------------------------------------------!>
app.get('/criminals/:id', (req, res) => {
    // res.send('Welcome To CRMS');
    // let sql = "SELECT * FROM criminal";
    sqlconnection.query("select * from criminal where crimianl_id = ?;",[req.params.id], (err, rows) => {
        if (err) throw err;
        res.send(rows);
        });
    });
    



// <-----------------------------------------------Update criminals details from criminlas------------------------------------------------!>
app.post('/addcriminal', (req, res) => {
          console.log(req.body);
           let add = req.body.add;
           console.log(add);
           sqlconnection.query("update criminal set name = '"+add.name+"',dob="+add.dob+",address='"+add.address+"' where crime_id = "+add.crime_id+";", (err, rows, fields) => {
               if (!err)
               {
                    console.log("Submitted");
                    res.send('Inserted successfully');
                }
                else
                    console.log(err);
           })
        });

// <-----------------------------------------------Get case details from litigation------------------------------------------------!>
app.get('/litigations', (req, res) => {
    // res.send('Welcome To CRMS');
    let sql = "SELECT * FROM litigation";
    let query = sqlconnection.query(sql, (err, rows) => {
        if (err) throw err;
        res.send(rows);
        });
    });

// <-----------------------------------------------Get case details from litigation by id------------------------------------------------!>
app.get('/litigations/:id', (req, res) => {
    // res.send('Welcome To CRMS');
    // let sql = "SELECT * FROM criminal";
    let query = sqlconnection.query("select * from litigation where crime_id=?",[req.params.id], (err, rows) => {
        if (err) throw err;
        res.send(rows);
        });
    });

// <-----------------------------------------------Update case details from litigation------------------------------------------------!>
app.post('/updatecase', (req, res) => {
        console.log(req.body);
         let update = req.body.update;
         console.log(update);
         sqlconnection.query("update litigation set crime_type = '"+add.crime_type+"',crime_place='"+add.crime_place+"',crime_date='"+add.crime_date+"',crime_time='"+add.crime_time+"',crime_description='"+add.crime_description+"',area_pin='"+add.area_pin+"',police_id='"+add.police_id+"',curr_status='"+add.curr_status+"' where crime_id = "+add.crime_id+";", (err, rows, fields) => {
             if (!err)
             {
                  console.log("Submitted");
                  res.send('Inserted successfully');
              }
              else
                  console.log(err);
         })
      });



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




// AMINA


//<-----------------------------------------------Add a withdraw request-------------------------------------------------->
app.post('/withdrawinsert', (req, res) => {
    //    console.log(req.body);
        let withdraw = req.body.withdraw;
        console.log(withdraw);
        sqlconnection.query("insert into withdrawals(reported_id,request_reason) values('"+withdraw.reported_id+"','"+withdraw.request_reason+"');", (err, rows, fields) => {
            if (!err)
            {
                console.log("Submitted");
                res.send("Inserted successfully");
            }
            else
                console.log(err);
        })
    });


 // <-----------------------------------------------add by reportid and user id ------------------------------------------------!>

 app.post('/postreported', (req, res) => {
    //    console.log(req.body);
        let repinsert = req.body.repinsert;
        console.log(repinsert);
        sqlconnection.query("insert into reported_crime(user_id,area_pin,reported_place,reported_ctype,reprorted_desc,reported_date,reported_time) values('"+repinsert.user_id+"','"+repinsert.area_pin+"','"+repinsert.reported_place+"','"+repinsert.reported_ctype+"','"+repinsert.reprorted_desc+"','"+repinsert.reported_date+"','"+repinsert.reported_time+"');", (err, rows, fields) => {
            if (!err)
            {
                console.log("Submitted");
                res.send('Inserted successfully');
            }
            else
                console.log(err);
        })
    });



    //<-----------------------------------------------Get all the reported crimes list-------------------------------------------------->
app.get('/reported_crime_user/:id', (req, res) => {
    sqlconnection.query('SELECT * FROM reported_crime where user_id = ?',[req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


    