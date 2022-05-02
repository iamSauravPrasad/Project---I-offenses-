import Axios from 'axios';
import React from 'react';
import {useState} from React;

Axios.defaults.withCredentials = true;


App = {
    getreported: function() {
        const api_url ="http://localhost:5000/reported_crime";
        // console.log(api_url);
        data =this.getapi(api_url).then(data=>{
            
            for(var i = 0; i <= data.length; i++) {
                var a = "<tr  scope='row'><td>"+data[i].reported_id+"</td><td>"+data[i].user_id+"</td><td>"+data[i].f_name+"</td><td><span class='material-icons' data-target='#changedata' onclick='display("+data[i].reported_id+")'>edit</span></td></tr>";

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
            console.log("in");
                x.elements[0].value = data[0].reported_id,
                x.elements[1].value = data[0].user_id,
                x.elements[2].value = data[0].area_pin,
                x.elements[3].value = data[0].reported_time,
                x.elements[4].value = data[0].reported_date,
                x.elements[5].value = data[0].reported_ctype,
                x.elements[6].value = data[0].reprorted_desc,
                x.elements[7].value = data[0].repoted_place,
                x.elements[8].value = data[0].doc
                $("#changedata").modal()
            
        });
    },

    postauthenticate: function() {
        var xhr = new XMLHttpRequest();
        var dta = JSON.stringify({
            "authenticate": 
                {
                    "user_id": document.getElementById("usr_id").value,
                    "area_pin": document.getElementById("area_pin").value,
                    "crime_time": document.getElementById("rep_time").value,
                    "cus_name": document.getElementById("rep_date").value,
                    "crime_type": document.getElementById("rep_type").value,
                    "crime_description": document.getElementById("rep_des").value,
                    "crime_place": document.getElementById("rep_place").value,
                    "cus_email": document.getElementById("doc").value,
                    "curr_status": "authenticate",
                    "police_id":1
                }
            
        });
        xhr.open("POST", "http://localhost:5000/Authenticateinsert", true);        
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(dta);
        xhr.send(dta);
    
    },


    login: function(){
        var usr_id = document.getElementById("uid").value;
        var usr_passw = document.getElementById("upassw").value ;
        const api_url = "http://localhost:5000/suser/"+usr_id;
        data=this.getapi(api_url).then(data =>{
            if(data.length > 0)
            {
                if(data[0].login_password==usr_passw)
                {
                    if(data[0].user_type == "police" || data[0].user_type == "Police" || data[0].user_type == "POLICE")
                    {
                        window.location.href = 'http://127.0.0.1:5500/HTML/PoliceAuthenticate.html';
                    }
                    else if(data[0].user_type == "admin" || data[0].user_type == "Admin" || data[0].user_type == "ADMIN")
                    {
                        window.location.href = "";
                    }
                    else
                    {
                        window.location.href = 'http://127.0.0.1:5500/HTML/PoliceWithdraw.html';
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


    getapi:async function(url) {
        
        // Storing response
        const response = await fetch(url);
        // Storing data in form of JSON
        var data = await response.json();
        // console.log(data);
        return data;
    }
}
