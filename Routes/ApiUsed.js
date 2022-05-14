App = {
    getreported: function() {
        const api_url ="http://localhost:5000/reported_crime";
        // console.log(api_url);
        // let usr_name = sessionStorage.getItem('usrname');
        tab_Content.innerHTML = " ";
        data =this.getapi(api_url).then(data=>{
            
            for(var i = 0; i <= data.length; i++) {
                var a = "<tr  scope='row'><td>"+data[i].reported_id+"</td><td>"+data[i].user_id+"</td><td>"+data[i].f_name+"</td><td><span class='material-icons' data-target='#changedata' onclick='rep_display("+data[i].reported_id+")'>unfold_more</span></td></tr>";

                tab_Content.innerHTML += a;
            }
        });
    },

    //PoliceAuthenticateapi
    getpatreported: function(i) {
        var x = document.getElementById("changeRecordForm");
        const api_url ="http://localhost:5000/reported_crimes/"+i;
       
        // /* console.log(api_url);reported_id int primary key	auto_increment,
        
        data =this.getapi(api_url).then(data=>{
                x.elements[0].value = data[0].reported_id,
                x.elements[1].value = data[0].user_id,
                x.elements[2].value = data[0].area_pin,
                x.elements[3].value = data[0].reported_time,
                x.elements[4].value = data[0].reported_date,
                x.elements[5].value = data[0].reported_ctype,
                x.elements[6].value = data[0].reprorted_desc,
                x.elements[7].value = data[0].reported_place,
                x.elements[8].value = data[0].doc
                $("#changedata").modal()
        });
    },

    postauthenticate: function() {
        var xhr = new XMLHttpRequest();
        var dta = JSON.stringify({
            "auth": 
                {
                    "user_id": document.getElementById("usr_id").value,
                    "area_pin": parseInt(document.getElementById("area_pin").value),
                    "crime_time": document.getElementById("rep_time").value,
                    "crime_date": document.getElementById("rep_date").value,
                    "crime_type": document.getElementById("rep_type").value,
                    "crime_description": document.getElementById("rep_des").value,
                    "crime_place": document.getElementById("rep_place").value,
                    "document": document.getElementById("doc").value,
                    "curr_status": "Authenticated",
                    "police_id": sessionStorage.getItem('usrname'),
                    "reported_id": document.getElementById('rep_idn').value
                }
        });
        xhr.open("POST", "http://localhost:5000/Authenticateinsert", true);        
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(dta);
        xhr.send(dta);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
               App.getreported();
            }
          };
    },



    // login: function(){
    //     console.log('yes');
    //     var usr_id = parseInt(document.getElementById("uid").value);
    //     var usr_passw = document.getElementById("upassw").value ;
    //     const api_url = "http://localhost:5000/suser/"+usr_id+"/"+usr_passw;
    //     console.log('calling url');
    //     // this.getapi(api_url);
    //     data=this.getapi(api_url).then(data =>{
    //         console.log(session.usr_id);
    //     });
    // },





    login: function(){
        var usr_id = (document.getElementById("uid").value);
        var usr_passw = document.getElementById("upassw").value ;
        const api_url = "http://localhost:5000/suser/"+usr_id;
        data = this.getapi(api_url).then(data=>{
            if(data.length > 0)
            {
                if(data[0].login_password==usr_passw)
                {
                    const sess = "http://localhost:5000/createsession"+usr_id;
                    this.getapi(sess);
                    sessionStorage.setItem('usrname',data[0].login_id)
                    if(data[0].user_type == "police" || data[0].user_type == "Police" || data[0].user_type == "POLICE")
                    {
                        window.location.href = 'http://127.0.0.1:5501/HTML/Police/PoliceHomepage.html';
                    }
                    else if(data[0].user_type == "admin" || data[0].user_type == "Admin" || data[0].user_type == "ADMIN")
                    {
                        window.location.href = "http://127.0.0.1:5501/HTML/Admin/AdminHomepage.html";
                    }
                    else
                    {
                        window.location.href = 'http://127.0.0.1:5501/HTML/Homepage.html';
                    }
                }
                else{
                    alert("Wrong Password !!");
                }
            }
            else
            {
                alert("User Dosen't Exist !!");
            }
        })
    },


    logout: function() {
        const api_url ="http://localhost:5000/logout";
        this.getapi(api_url);
        window.location.href = "http://127.0.0.1:5501/HTML/Homepage.html";
    },
    

    checklog: function() {
        const api_url ="http://localhost:5000/getsessionlogin";
        data = this.getapi(api_url);
        return data;
    },

    
    // getwithdraw: function() {
    //     let usr_id =sessionStorage.getItem('usrname');
    //     const api_url ="http://localhost:5000/withdraw_crime/"+usr_id;
    //     data =this.getapi(api_url).then(data=>{
    //         console.log(data);
    //         for(var i = 0; i <= data.length; i++) {
    //             var a = "<tr  scope='row'><td>"+data[i].request_id+"</td><td>"+data[i].reported_id+"</td><td>"+data[i].request_time+"</td><td>"+data[i].request_date+"</td><td>"+data[i].request_reason+"</td><td><span class='material-icons' data-target='#changedata' onclick='with_display("+data[i].request_id+")'>unfold_more</span></td></tr>";

    //             tab_Content.innerHTML += a;
    //         }
    //     });
    // },


    getwithdraw: function() {
        let usr_id =sessionStorage.getItem('usrname');
        const api_url ="http://localhost:5000/withdraw_crime";
        data =this.getapi(api_url).then(data=>{
            for(var i = 0; i <= data.length; i++) {
                var a = "<tr  scope='row'><td>"+data[i].request_id+"</td><td>"+data[i].reported_id+"</td><td>"+data[i].f_name+"</td><td><span class='material-icons' data-target='#changedata' onclick='with_display("+data[i].request_id+")'>unfold_more</span></td></tr>";
                tab_Content.innerHTML += a;
            }
        });
    },

    //PoliceAuthenticateapi
    getpatwithdraw: function(i) {
        var x = document.getElementById("changeRecordForm");
        const api_url ="http://localhost:5000/withdraw_crime/"+i;
       
        // /* console.log(api_url);reported_id int primary key	auto_increment,
        
        data =this.getapi(api_url).then(data=>{
                x.elements[0].value = data[0].request_id,
                x.elements[1].value = data[0].reported_id,
                x.elements[2].value = data[0].request_time,
                x.elements[3].value = data[0].request_date,
                x.elements[4].value = data[0].request_reason
                $("#changedata").modal()
        });
    },


    getlitigations: function() {
        const api_url ="http://localhost:5000/litigations";
        // console.log(api_url);
        // let usr_name = sessionStorage.getItem('usrname');
        data =this.getapi(api_url).then(data=>{
            console.log(data);
            for(var i = 0; i <= data.length; i++) {
                var a = "<tr  scope='row'><td>"+data[i].crime_id+"</td><td>"+data[i].crime_type+"</td><td>"+data[i].crime_place+"</td><td>"+data[i].crime_date+"</td><td>"+data[i].crime_time+"</td><td>"+data[i].crime_description+"</td><td>"+data[i].area_pin+"</td><td>"+data[i].police_id+"</td><td>"+data[i].curr_status+"</td><td></td><td><span class='material-icons' data-target='#updatecase' onclick='case_display("+data[i].crime_id+")'>edit</span></td></tr>";

                tab_Content.innerHTML += a;
            }
        });
    },


    getcriminals: function() {
        const api_url ="http://localhost:5000/criminals";
        // console.log(api_url);
        // let usr_name = sessionStorage.getItem('usrname');
        data =this.getapi(api_url).then(data=>{
            console.log(data);
            for(var i = 0; i <= data.length; i++) {
                var a = "<tr  scope='row'><td>"+data[i].crime_id+"</td><td>"+data[i].criminal_name+"</td><td>"+data[i].criminal_dob+"</td><td>"+data[i].criminal_address+"</td><td></td><td><span class='material-icons' data-target='#addcriminal' onclick='criminal_display("+data[i].id+")'>edit</span></td></tr>";

                tab_Content.innerHTML += a;
            }
        });
    },


    deleterequest: function(){
        var xhr = new XMLHttpRequest();
        var data = JSON.stringify({
            "reported": 
                {
                    "user_id": document.getElementById("with_rep_id").value
                }
        });
        xhr.open("DELETE", "http://localhost:5000/delete/reported_crime", true);        
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(data);
        xhr.send(data);

    },


    postinsert: function() {
        var xhr = new XMLHttpRequest();
        var dta = JSON.stringify({
            "add":
                {
                    "crime_id": parseInt(document.getElementById("crime_id").value),
                    "name": (document.getElementById("name").value),
                    "dob": document.getElementById("dob").value,
                    "address": document.getElementById("address").value,
                   
                   
                }
        });
        xhr.open("POST", "http://localhost:5000/postinsert", true);        
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(dta);
        xhr.send(dta);
    
    },

    //updatecriminal
    getaddcriminals: function(i) {
        var x = document.getElementById("addrecord");
        const api_url ="http://localhost:5000/criminals/"+i;
       
        // /* console.log(api_url);reported_id int primary key	auto_increment,
        
        data =this.getapi(api_url).then(data=>{
            console.log(data[0]);
                x.elements[0].value = data[0].crime_id,
                x.elements[1].value = data[0].name,
                // x.elements[2].value = data[0].area_pin,
                x.elements[2].value = data[0].dob,
                x.elements[3].value = data[0].address,
                $("#addcriminal").modal()
        });
    },


    postadd: function() {
        var xhr = new XMLHttpRequest();
        var dta = JSON.stringify({
            "add": 
                {
                    "crime_id": document.getElementById("crime_id").value,
                    "name": (document.getElementById("name").value),
                    "dob": document.getElementById("dob").value,
                    "address": document.getElementById("address").value,
                    //"police_id": sessionStorage.getItem('usrname')
                }
        });
        xhr.open("POST", "http://localhost:5000/addcriminal", true);        
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(dta);
        xhr.send(dta);
    
    },





    //update litigation
    getaddcase: function(i) {
        var x = document.getElementById("updaterecord");
        const api_url ="http://localhost:5000/litigations/"+i;
       
        // /* console.log(api_url);reported_id int primary key	auto_increment,
        
        data =this.getapi(api_url).then(data=>{
            console.log(data[0]);
                x.elements[0].value = data[0].crime_id,
                x.elements[1].value = data[0].crime_type,
                x.elements[2].value = data[0].crime_place,
                x.elements[3].value = data[0].crime_date,
                x.elements[4].value = data[0].crime_time,
                x.elements[5].value = data[0].crime_description,
                x.elements[6].value = data[0].area_pin,
                x.elements[7].value = data[0].police_id,
                x.elements[8].value = data[0].curr_status,
                $("#updatecase").modal()
        });
    },

    postupdate: function() {
        var xhr = new XMLHttpRequest();
        var dta = JSON.stringify({
            "update": 
                {
                    "crime_id": document.getElementById("crime_id").value,
                    "crime_type": (document.getElementById("crime_type").value),
                    "crime_place": (document.getElementById("crime_place").value),
                    "crime_date": (document.getElementById("crime_date").value),
                    "crime_time": (document.getElementById("crime_time").value),
                    "crime_description": (document.getElementById("crime_description").value),
                    "area_pin": document.getElementById("area_pin").value,
                    "police_id": document.getElementById("police_id").value,
                    "curr_status": (document.getElementById("curr_status").value),
                    //"police_id": sessionStorage.getItem('usrname')
                }
        });
        xhr.open("POST", "http://localhost:5000/updatecase", true);        
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(dta);
        xhr.send(dta);
    
    },


    // AMINA


    getpatusrep: function() {
        var usr_id = sessionStorage.getItem('usrname');
        const api_url ="http://localhost:5000/reported_crime_user/"+usr_id;
        // console.log(api_url);
        // let usr_name = sessionStorage.getItem('usrname');
        data =this.getapi(api_url).then(data=>{
            
            for(var i = 0; i <= data.length; i++) {
                var a = "<tr  scope='row'><td>"+data[i].reported_id+"</td><td>"+ data[i].reported_ctype+"</td><td>"+data[i].reported_place+"</td><td><span class='material-icons' data-target='#changedata' onclick='rep_display("+data[i].user_id+")'>unfold_more</span></td></tr>";
               
                tab_Content.innerHTML += a;
            }
        });
    },


    getpatreport: function(i) {
        var x = document.getElementById("changeRecordForm");
        const api_url ="http://localhost:5000/reported_crimes/"+i;
       
        // /* console.log(api_url);reported_id int primary key	auto_increment,
        
        data =this.getapi(api_url).then(data=>{
            console.log(data[0]);
                x.elements[0].value = data[0].reported_id,
                x.elements[1].value = data[0].user_id,
                x.elements[2].value = data[0].area_pin,
                x.elements[3].value = data[0].reported_time,
                x.elements[4].value = data[0].reported_date,
                x.elements[5].value = data[0].reported_ctype,
                x.elements[6].value = data[0].reprorted_desc,
                x.elements[7].value = data[0].reported_place,
                x.elements[8].value = data[0].doc,
                $("#reportedcrimetable").modal()
        });
    },



    postreported: function() {
        var xhr = new XMLHttpRequest();
        var dta = JSON.stringify({
            "repinsert":
                {
                    "user_id": parseInt(sessionStorage.getItem("usrname")),
                    "area_pin": parseInt(document.getElementById("area_pin").value),
                    "reported_date":document.getElementById("reported_date").value,
                    "reported_time":document.getElementById("reported_time").value,
                    "reported_place": document.getElementById("repoted_place").value,
                    "reported_ctype": document.getElementById("reported_ctype").value,
                    "reprorted_desc": document.getElementById("reprorted_desc").value,
                }
        });
        xhr.open("POST", "http://localhost:5000/postreported", true);        
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(dta);
        xhr.send(dta);
        alert("Thankyou, report submitted");
    
    },


    postwithdraw: function() {
        var xhr = new XMLHttpRequest();
        var dta = JSON.stringify({
            "withdraw": 
                {
                    "reported_id": parseInt(document.getElementById("reported_id").value),
                    
                    "request_reason": document.getElementById("request_reason").value,
                    
                    
                }
        });
        xhr.open("POST", "http://localhost:5000/withdrawinsert", true);        
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(dta);
        xhr.send(dta);
        alert("Thankyou, request submitted")
    
    },


    getapi:async function(url) {
        
        // Storing response
        const response = await fetch(url);
        // Storing data in form of JSON
        var data = await response.json();
        // console.log(data);
        return data;
    }


}

// export default App{ login, logout, checklog};