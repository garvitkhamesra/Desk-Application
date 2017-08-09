  var config = {
    apiKey: "AIzaSyAontmXakB9GLfdnKr9a2u9kg1-YzVYubk",
    authDomain: "desk-27087.firebaseapp.com",
    databaseURL: "https://desk-27087.firebaseio.com",
    storageBucket: "desk-27087.appspot.com",
    messagingSenderId: "430297452819"
  };
  firebase.initializeApp(config);

// refistration function


function regfun() {
    var emailreg = document.getElementById('reg_email').value;
    var password = document.getElementById('reg_pass').value;
    var regnoreg =document.getElementById('reg_regno').value;
    var namereg =document.getElementById('reg_name').value;
    var vale = document.getElementById('Occupation').value;
    var split=emailreg.split('@');
    
    if(split[1]=="srmuniv.edu.in" || split[1]=="ktr.srmuniv.edu.in" || emailreg=="garkumk@gmail.com"){
        firebase.auth().createUserWithEmailAndPassword(emailreg, password).then(function (user) {
            firebase.auth().onAuthStateChanged(function(user) {
                                //write(emailreg,namereg,regnoreg,user.uid,vale);
              sendEmailVerification(user,emailreg,namereg,regnoreg,vale);
            });

        }).catch(function(error) {
        // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage+errorCode);
        });
    }
    else {
        alert("Check Email address");
    }

}

// Sending Email verification 


function sendEmailVerification( user,e,n,r,v) {
     user.sendEmailVerification().then(function() {
         writeToDb(e,n,r,user.uid,v);
        alert('Email Verification Sent! Verify and Login!');
      });
    }


// Writing User details to Firebase
function writeToDb( emailw,namew ,reg_now, uid,val){
var dataToPut =    {
        email       :   emailw,
        name        :   namew,
        regno       :   reg_now,
        uid         :   uid
    };
 firebase.database().ref(val+'/' + uid).set(dataToPut).then(function() {
        window.location.href = "login.html";
      });;
}

function loginfun(){
    var emailreg = document.getElementById('reg_email').value;
    var password = document.getElementById('password').value;
    var optionVal = document.getElementById('lOccupation').value;
    var splitemail = emailreg.split('@');
      firebase.auth().signInWithEmailAndPassword(emailreg, password).then(function (user) {

          if(user.emailVerified){
               if(splitemail[1]=="ktr.srmuniv.edu.in" && optionVal == "Teacher"){
                window.location.href = "teacherRedirect.html";
              }
              else if(splitemail[1]=="srmuniv.edu.in" && optionVal == "Student"){
                window.location.href = "redirect.html";
              }
              else if(emailreg=="garkumk@gmail.com" || emailreg == "ravitripathi1996@gmail.com"){
                window.location.href = "teacherRedirect.html";
              }
              else{
                alert("Check Occupation and E-Mail Address");
                firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                  }, function(error) {
                    // An error happened.
                  });
              }
          }
          else{
            alert("Verify Your Mail");
          }
             
        });

}

// Subscribed Classes function
var putx;
var majory;
 function SubsClass() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          //var uid = user.uid;
          var y = firebase.database().ref('SubscribedClass/'+user.uid);
          y.on('child_added', function(data) {
            newf(data.key,data.val().subject_code,data.val().subject_name);
          });  }
          else{
            window.location.href="login.html";
          } 
      });      

}

function newf(w,t,r){

      var user = firebase.auth().currentUser;
      if(user){
        var w=w;
        var r=r;
        var t=t;
        var html  =
              '<div align="center" class="w3-card-2" style="margin:30px;align:center; padding:10px; width:96%;" id="' + w + '" onclick=funSub(this.id)>' +
                    '<h2 id="' + t + '">' + t + '</h2>' +
                    '<p id="' + t + '"> ' + r+ '</p>' +
                '</div>' 
    ;
    var div = document.createElement('div');
    div.innerHTML = html; 
        var sp2 = document.getElementById("childElement1");
        var parentDiv = sp2.parentNode;
        parentDiv.insertBefore(div, sp2);
      }
   
}
// Function for onclick of SubscribedClass
function funSub(x){
    var y = firebase.database().ref('Messages/'+x);
window.putx=x;
    y.on('child_added', function(data) {
      msg(data.key,data.val().title,data.val().body,data.key);
    });
}
// Function for onclick of SubscribedClass
function msg(w,t,r,p){
      var user = firebase.auth().currentUser;
      document.getElementById('parentElement1').style.display = "none";
      if(user){
        var w=w;
        var r=r;
        var t=t;
        var pt=p;
        var html  =
              '<div style="margin-left:20px;margin-right:20px;padding:10px" class=" w3-card" id="' + w + '"  onclick="MessagesClick(this.id)">' +
                    '<h2 id="' + t + '">' + t + '</h2>' +
                    '<p id="' + t + '"> ' + r+ '</p>' +
                '</div>' 
    ;
    var div = document.createElement('div');
    div.innerHTML = html; 
        var sp2 = document.getElementById("childElement2");
        var parentDiv = sp2.parentNode;
        parentDiv.insertBefore(div, sp2);
      }
   
}

// Function for onclick of Messages
function MessagesClick(y){
    document.getElementById('x').innerHTML="";
    var sd=document.createElement('div');
    sd.id='childElement3';

    document.getElementById('x').appendChild(sd);
    
    var valx = window.putx;
    window.majory = valx;
var z = '/'
    window.majory = window.majory + z ;
    window.majory = window.majory + y;
    document.getElementById('input').style.display = "block";
    document.getElementById('bin').style.display = "block";
    var y = firebase.database().ref('Comments/'+valx+'/'+y);
    y.on('child_added', function(data) {

      comm(data.val().user,data.val().comment);
    });
}
// Function for onclick of SubscribedClass
function comm(t,r){

      var user = firebase.auth().currentUser;
      document.getElementById('parentElement1').style.display = "none";
      document.getElementById('parentElement2').style.display = "block";
      document.getElementById('input').style.display = "block";
      document.getElementById('bin').style.display = "block";

      if(user){
        var r=r;
        var t=t;
        var html  =
              '<div class="w3-container w3-card" >' +
                    '<h2 id="' + t + '">' + t + '</h2>' +
                    '<p id="' + t + '"> ' + r+ '</p>' +
                '</div>' 
    ;
     var div = document.createElement('div');
     div.innerHTML = html; 
     var sp2 =document.getElementById('childElement3');
     var parentDiv = sp2.parentNode;
     parentDiv.insertBefore(div, sp2);



      }
   
}

function writeTocomm( ){
  console.log(window.majory);
  var df;
  var com = window.majory;
  df = document.getElementById("input").value;

  if((df.trim()).length > 0){
    var user = firebase.auth().currentUser;
    var date =    new Date().toLocaleString();
      var dataToPut =    {
        category       :   "Student",
        comment        :   df,
        timestamp      :   date,
        user           :   user.displayName
    };
    firebase.database().ref('Comments/' + com).push(dataToPut).then(function() {
      });
  }
  else{
      console.log(df.trim().length);

  }

}

function listSubClass(x){
    var user = firebase.auth().currentUser;

    uid = user.uid;
    var dataToPut =    {
        key              :   x,
        subject_code     :   a,
        subject_name     :   b,
        teacher_name     :   d,
        tid              :   c
    };
 firebase.database().ref('SubscribedClass/' + uid+'/'+x).set(dataToPut).then(function() {
        window.location.href = "redirect.html";
      });;

}

function listClass(x){
      document.getElementById('parentElement').style.display = "none";
      showL(x);

}
var a;
var b;
var c;
var d;
function showL(x){
    var user = firebase.auth().currentUser;
    if (user) {
        var ref = firebase.database().ref('Classes/');
        ref.orderByChild('tid').equalTo(x).on("child_added", function(snapshot) {
        var subN=snapshot.val().subject_name;
        var subC = snapshot.val().subject_code;
        var k = snapshot.val().key;
        window.a = subC;
        window.b =subN;
        window.c = snapshot.val().tid;
        window.d =snapshot.val().teacher_name;
        Tclass(k,subC,subN);
      });
    }
}
function Tclass(w,t,r){
      var user = firebase.auth().currentUser;
      if(user){
   var w=w;
var r=r;
var t=t;
var html    =
                '<div class="w3-container w3-card" id="' + w + '" onclick=listSubClass(this.id)>' +
                    '<h2 id="' + t + '">' + t + '</h2>' +
                    '<p id="' + t + '"> ' + r+ '</p>' +
                '</div>' 
    ;
    var div = document.createElement('div');
    div.innerHTML = html; 
        var sp2 = document.getElementById("childElement2");
        var parentDiv = sp2.parentNode;
        parentDiv.insertBefore(div, sp2);
      }
   
}
//Teacher List

function teacherList(){
    var user = firebase.auth().currentUser;

    var y = firebase.database().ref('Teacher/');
    y.on('child_added', function(data) {
      newteacher(data.key,data.val().name,data.val().email);
    });
    
}
function newteacher(w,t,r){
  var user = firebase.auth().currentUser;
if (user) {
   var w=w;
var r=r;
var t=t;
var html    =
                '<div class="w3-container w3-card" id="' + w + '" onclick=listClass(this.id)>' +
                    '<h2 id="' + t + '">' + t + '</h2>' +
                    '<p id="' + t + '"> ' + r+ '</p>' +
                '</div>' 
    ;
    var div = document.createElement('div');
    div.innerHTML = html; 
        var sp2 = document.getElementById("childElement");
        var parentDiv = sp2.parentNode;
        parentDiv.insertBefore(div, sp2);

   
}  else{
            window.location.href="login.html";
          } 
   
}

/// Teacher Login

// subject list of teacher_name
function SubjectList(){
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
    var uid = user.uid;
    var ref = firebase.database().ref("Classes/");
    ref.orderByChild('tid').equalTo(uid).on("child_added", function(snapshot) {
            ListDisp(snapshot.key,snapshot.val().subject_code,snapshot.val().subject_name);
          });
  } 

  });
  
}
function ListDisp(w,t,r){
      var user = firebase.auth().currentUser;
      if (user) {
      var w=w;
      var r=r;
      var t=t;
      var html    =
                      '<div class="w3-container w3-card" id="' + w + '" onclick=msgCall(this.id)>' +
                          '<h2 id="' + t + '">' + t + '</h2>' +
                          '<p id="' + t + '"> ' + r+ '</p>' +
                      '</div>' 
          ;
          var div = document.createElement('div');
          div.innerHTML = html; 
              var sp2 = document.getElementById("childElement1");
              var parentDiv = sp2.parentNode;
              parentDiv.insertBefore(div, sp2);

        
      }  else{
                  window.location.href="login.html";
                } 
}
function AddClass(){
  var name = document.getElementById("subject_name").value;
  var code = document.getElementById("subject_code").value;
  if((name.trim()).length > 0 && (code.trim()).length > 0){
    var nameUser = firebase.auth().currentUser.displayName;
    var uid = firebase.auth().currentUser.uid;
    var keyR = firebase.database().ref("Classes/").push().key;
    var daTA ={
      key   : keyR,
      subject_code : code,
      subject_name : name,
      teacher_name : nameUser,
      tid : uid
    };
    firebase.database().ref("Classes/").child(keyR).set(daTA).then(function(User){
      window.location.href = "teacherRedirect.html";
    });
  }
  else{
    alert("inappropriate Input");
  }
}
var forT;
function msgCall(x){
                window.putx = x;
                window.forT = x;
    var y = firebase.database().ref('Messages/'+x);

    y.on('child_added', function(data) {
      window.majory = data.key;
      messages(data.key,data.val().title,data.val().body,data.key);
    });
}
function messages(w,t,r,p){
      var user = firebase.auth().currentUser;
      document.getElementById('parentElement1').style.display = "none";
      if(user){
        var w=w;
        var r=r;
        var t=t;
        var pt=p;
        var html  =
              '<div class="w3-container w3-card" id="' + w + '"  onclick="OnMessagesClick(this.id)">' +
                    '<h2 id="' + t + '">' + t + '</h2>' +
                    '<p id="' + t + '"> ' + r+ '</p>' +
                '</div>' 
    ;
    var div = document.createElement('div');
    div.innerHTML = html; 
        var sp2 = document.getElementById("childElement2");
        var parentDiv = sp2.parentNode;
        parentDiv.insertBefore(div, sp2);
      }
   
}
function OnMessagesClick(w){
       document.getElementById("parentElement3").style.display == "block";

}
function AddFunction(){
  var user = firebase.auth().currentUser;
    if(user){
      if(document.getElementById("parentElement1").style.display == "none"){
       // window.location.href = "AddMessage.html";
       document.getElementById("parentElement3").style.display == "block";
      }
      else if(document.getElementById("parentElement1").style.display == "block"){
        window.location.href = "AddClass.html";
      }
    }
}
function AddMessage(){
  var name = document.getElementById("title").value;
  var code = document.getElementById("content").value;
  if((name.trim()).length > 0 && (code.trim()).length > 0){
    var date =    new Date().toLocaleString();
    var keyR = firebase.database().ref("Messages/").push().key;
    var daTA ={
      body  : code,
      key   : keyR,
      timestamp : date,
      title : name
    };
    firebase.database().ref("Messages/").child(keyR).set(daTA).then(function(User){
      window.location.href = "teacherRedirect.html";
    });
  }
  else{
    alert("inappropriate Input");
  }
}


// Validations 
   function validateName(x){
      // Validation rule
      var re = /[A-Za-z -']$/;
      // Check input
      if(re.test(document.getElementById(x).value)){
        // Style green
        document.getElementById(x).style.background ='#ccffcc';
        // Hide error prompt
        document.getElementById('nameError').style.display = "none";
        return true;
      }else{
        // Style red
        document.getElementById(x).style.background ='#e35152';
        // Show error prompt
        document.getElementById('nameError').style.display = "block";
        return false; 
      }
    }
    // Validate email
    function validateEmail(x){ 
      var spl = x.split('@');
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(x)){
          if(spl[1]=='srmuniv.edu.in' || spl[1]=='ktr.srmuniv.edu.in' || x == "garkumk@gmail.com" ||x=="ravitripathi1996@gmail.com"){
            document.getElementById('reg_email').style.background ='#ccffcc';
            document.getElementById('emailError').style.display = "none";
            return true;
          }
          else{
            document.getElementById('reg_email').style.background ='#e35152';
            document.getElementById('emailError').style.display = "block";
            return false;
          }

      }else{
        document.getElementById('reg_email').style.background ='#e35152';
        document.getElementById('emailError').style.display = "block";
        return false;
      }
    }
    // Validate Select boxes
    function validateSelect(x){
      if(document.getElementById(x).selectedIndex !== 0){
        document.getElementById(x).style.background ='#ccffcc';
        document.getElementById('animalError').style.display = "none";
        return true;
    }else{
        document.getElementById('animalError').style.display = "block";
        document.getElementById(x).style.background ='#e35152';
        return false; 
      }
    }
    // Validate Password
    function validatePassword(x){
        var passLength = document.getElementById(x).value.length;
        if(passLength>=6){
            document.getElementById(x).style.background ='#ccffcc';
            document.getElementById('pass_Error').style.display = "none";
            return true;
        }
        else{
            document.getElementById('pass_Error').style.display = "block";
            document.getElementById(x).style.background ='#e35152';
            return false;
        }


    }
//Main Validation and Redirect 
    function validateForm(){
      // Set error catcher
      var error = 0;
      // Check name
      if(!validateName('reg_name')){
        document.getElementById('nameError').style.display = "block";
        error++;
      }
      // Validate email
      var x =document.getElementById('reg_email').value;
      if(!validateEmail(x)){
        document.getElementById('emailError').style.display = "block";
        error++;
      }
      // Validate animal dropdown box
      if(!validateSelect('Occupation')){
        document.getElementById('animalError').style.display = "block";
        error++;
      }
      if(!validatePassword('reg_pass')){
        document.getElementById('pass_Error').style.display = "block";
        error++;
      }
      // Don't submit form if there are errors
      if(error > 0){
        return false;
      }
      else if(error == 0){
          regfun();
      }
    } 

        function validateLoginForm(){
      // Set error catcher
      var error = 0;
      // Validate email
      var x =document.getElementById('reg_email').value;
      if(!validateEmail(x)){
        document.getElementById('emailError').style.display = "block";
        error++;
      }
      // Validate animal dropdown box
      if(!validateSelect('lOccupation')){
        document.getElementById('animalError').style.display = "block";
        error++;
      }
      if(!validatePassword('password')){
        document.getElementById('pass_Error').style.display = "block";
        error++;
      }
      // Don't submit form if there are errors
      if(error > 0){
        return false;
      }
      else if(error == 0){
          loginfun();
      }
    }    


    // Logout

  function logout(){
                    firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                    window.location.href = "login.html"
                  }, function(error) {
                    // An error happened.
                  });
  }