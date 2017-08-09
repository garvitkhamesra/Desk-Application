
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAontmXakB9GLfdnKr9a2u9kg1-YzVYubk",
    authDomain: "desk-27087.firebaseapp.com",
    databaseURL: "https://desk-27087.firebaseio.com",
    storageBucket: "desk-27087.appspot.com",
    messagingSenderId: "430297452819"
  };
  firebase.initializeApp(config);


function regfun() {
  var email = document.getElementById('reg_email').value;
  var password = document.getElementById('reg_pass').value;
 var regno =document.getElementById('reg_regno').value;
 var name =document.getElementById('reg_name').value;
var vale = document.getElementById('Occupation').value;
var split=email.split('@');
if(split[1]=="srmuniv.edu.in" || split[1]=="ktr.srmuniv.edu.in"){
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
    firebase.auth().onAuthStateChanged(function(user) {
                        write(name,email,user.uid,regno,vale);
                        sendEmailVerification(user);
    });

}).catch(function(error) {
// Handle Errors here.

var errorCode = error.code;
var errorMessage = error.message;
console.log(errorMessage+errorCode);
// ...
});
}
else {
  alert("Check Email address");
}



}
function sendEmailVerification( user) {
      // [START sendemailverification]
      user.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        
        alert('Email Verification Sent!');

                window.location=("login.html");

        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }


function func2() {
  var email = document.getElementById('emailadd').value;
  var password = document.getElementById('password').value;
  var em = email.split('@');

  if(em[1]=="srmuniv.edu.in"){
  firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
  // firebase.auth().onAuthStateChanged(function(user) {
  // });
 if (user) {
            if (user.emailVerified) {
                //call();
                write(nam,email,user.uid,reg,vale);

                
                window.location=("sin.html");

            }
            else{
              alert('Verify your Email');
            }
        }
});

}
else if(em[1]=="ktr.srmuniv.edu.in"){
firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {

 if (user) {
            if (user.emailVerified) {
                //call();
                 window.location=("redirect.html");

            }
            else{
              alert('Verify your Email');
            }
        }
    });
}
else{
  alert("the email should end with srmuniv.edu.in");

}
//     firebase.auth().onAuthStateChanged(function(user) {
//       console.log("auth");
// authcall(user);
// });
// }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // [START_EXCLUDE]
//     if (errorCode === 'auth/wrong-password') {
//       alert('Wrong password.');
//     } else {
//       alert(errorMessage);
//       console.log("err");
//
//     }
//     console.log(error);
//     // [END_EXCLUDE]
//   });

    }

function authcall(user) {
        if (user) {
            if (user.emailVerified) {
                //call();
                window.location=("sin.html");

            }
            else{
              alert('Verify your Email');
            }
        }
}

function datalist() {
  const uid=firebase.auth().currentUser.uid;
  const list=firebase.database().ref().child('Classes/');
  list.on('value',snap => console.log(snap.val()));

  // ref.once('value', function(snapshot) {
  //   snapshot.forEach(function(childSnapshot) {
  //     var childKey = childSnapshot.key;
  //     var childData = childSnapshot.val();
  //     // ...
  //   });
  // });
}

function call() {

    var auth=firebase.auth().currentUser.uid;
    var SubscribedClass =   firebase.database().ref('SubscribedClass/' + auth);
    console.log(SubscribedClass);

    SubscribedClass.on('child_added',function(data) {
        console.log("Data :: " + data.key);
        already(data.key, data.val().subject_code, data.val().subject_name, data.val().teacher_name);
    });

}


function already(key, subject_code, subject_name,teacher_name) {
    var html    =
        '<div class="container" id="container-' + key + '">' +
            '<div class="row">' +
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="SubscribedClass-' + subject_code + '">' +
                    '<h3 id="' + subject_code + '">' + subject_code + '</h3>' +
                    '<p id="' + subject_code + '-code"> Subject Name : ' + subject_name + '</p>' +
                '</div>' +
            '</div>' +
        '</div>'
    ;

    var div = document.createElement('div');
    div.innerHTML = html;
    var element = div.firstChild;
    console.log("ji");
    document.body.insertBefore(div, document.getElementById('end'));
}

function write(name , email, uid,reg_no,val){
var dataToPut = {
                    email: email,
                    name: name,
                    regno : reg_no,
                    uid : uid
                  };
 firebase.database().ref(val+'/' + uid).set(dataToPut);
}