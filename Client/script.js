var database = firebase.database();
var url;

function buscarElements() {
  BuscaPregons();
  BuscaIncidents();
}

// *****************************  PREGONS  ********************************************

function BuscaPregons() {    
    var ref = database.ref("prego/");
    ref.on("value", function(snapshot) {
      var arr = snapshot.val();
      var arr2 = Object.keys(arr);
      
      document.getElementById('linea1').innerHTML = "";
      
      for (let i = arr2.length-1; i >= 0; i--) {
        var key = arr2[i];

        ref = database.ref("prego/" + key);
        ref.on("value", function(snapshot) {
          nom = snapshot.val().titol;
          hora = snapshot.val().hora;
          des = snapshot.val().descripcio;
          CreaPrego(nom, hora, des);
        });
      }
    });
}

function CreaPrego(nom, hora, des) {
  var h = hora[11] + hora[12] + hora[13] + hora[14] + hora[15] + " " + hora[8] + hora[9] + "-" + hora[5] + hora[6] + "-" + hora[0] + hora[1] + hora[2] + hora[3];
  document.getElementById('linea1').innerHTML += "";
  document.getElementById('linea1').innerHTML +=
  `<div class="card mb-4 shadow-sm">
   <div class="card-header">
   <h4 class="my-0 font-weight-normal">${h + " " + nom}</h4>
   </div>
   
   <div class="card-body">
    <li>${des}</li>
   </div>`;
}

// *****************************  INCIDENCIES  ********************************************

function BuscaIncidents() {    
  var ref = database.ref("incident/");
  ref.on("value", function(snapshot) {
    var arr = snapshot.val();
    var arr2 = Object.keys(arr);

    for (let i = 0; i < arr2.length; i++) {
      var key = arr2[i];

      ref = database.ref("incident/" + key);
      ref.on("value", function(snapshot) {
        nom = snapshot.val().titol;
        des = snapshot.val().descripcio;
        grau = snapshot.val().grau;
        CreaIncidents(nom, des, grau);
      });
    }
  });
}

function lengthChilds() {
  var ref = database.ref();
  ref.child('incident').on("value", function(snapshot) {
    console.log(snapshot.numChildren());
  });
}

function CreaNouIncident() {
  nom = document.getElementById("TitolNou").value;
  des = document.getElementById("DescripcioNou").value;
  grau = document.getElementById("GrauNou").value;

  if (nom != "" && des != "") {
    AfegirFirebaseIncident(nom, des, grau);
    document.getElementById('linea2').innerHTML = "";
  }
}

function CreaIncidents(nom, des, grau) {
    document.getElementById('linea2').innerHTML += "";
    document.getElementById('linea2').innerHTML +=
    `<div class="card mb-4 shadow-sm">
      <div class="card-header">
      <h4 class="my-0 font-weight-normal">${nom}</h4>
     </div>
    
     <div class="card-body">
        <li>${des}</li>
        <img src="" id="${nom}" style=" width:128px; height:auto;">
     </div>`;

    downloadFoto (nom);
}

function downloadFoto (a) {
  var storageRef = firebase.storage().ref();
  storageRef.child('Photos/' + a).getDownloadURL().then(function(url) {
    var img = document.getElementById(a);
    img.src = url;
  });
}

function AfegirFirebaseIncident(nom, des, grau) {
  database.ref('incident/' + nom).set({
    titol: nom,
    descripcio: des,
    grau: grau
  })
}

function fotografiaSN () {
  var x = document.getElementsByClassName("entry");
  for (let i = 0; i < x.length; i++) x[i].style.display = "none";

  var y = document.getElementsByClassName("out");
  for (let i = 0; i < y.length; ++y) y[i].style.display = "block";
}

var rei = document.getElementById("reinici");
rei.addEventListener("change", function (e) {
  nom = document.getElementById("TitolNou").value;
  //Get file
  var file = e.target.files[0];
  //Create a storage ref
  var storageRef = firebase.storage().ref().child('Photos/' + nom);
  //Upload file
  var lask = storageRef.put(file);
  CreaNouIncident();
  reiniciar();
});

function reiniciar () {
  var x = document.getElementsByClassName("entry");
  for (let i = 0; i < x.length; i++) x[i].style.display = "block";

  var y = document.getElementsByClassName("out");
  for (let i = 0; i < y.length; ++y) y[i].style.display = "none";
  
  document.getElementById('linea2').innerHTML = "";
  BuscaIncidents();
}

// *****************************  FIREBASE PHOTOs  ********************************************
var fileButton = document.getElementById("fileButton");
fileButton.addEventListener("change", function (e) {
  //Get file
  var file = e.target.files[0];
  //Create a storage ref
  var storageRef = firebase.storage().ref().child('Photos/'+'1.jpg');
  //Upload file
  storageRef.put(file);
})

document.getElementById(FormInci).addEventListener("submit", submitForm);

function submitForm(e) {
  var x = document.getElementById("foto");
  var file = x.target.files[0];
  //Create a storage ref
  var storageRef = firebase.storage().ref().child();
  //Upload file
  var lask = storageRef.put(file);
}

var Desc = document.getElementById("FD");
Desc.addEventListener("click", function () {
  var storageRef = firebase.storage().ref();
  storageRef.child(hjkhkj).getDownloadURL().then(function(url) {
    var img = document.getElementById("img");
    img.src = url;
  })
})

function Registre() {
  correu = document.getElementById("Correu").value;
  contra = document.getElementById("Contrasenya").value;
  if (correu != "" && contra != "") {
    firebase.auth().createUserWithEmailAndPassword(correu, contra)
  }
}

function IniciSessio() {
  correu = document.getElementById("Correu").value;
  contra = document.getElementById("Contrasenya").value;
  if (correu != "" && contra != "") {
    firebase.auth().signInWithEmailAndPassword(correu, contra).catch(function(error) {
      console.log("Sessió Iniciada")
    })
  }
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      console.log(email);
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      console.log("Signed Out");
    }
  })
}

function SortidaSessio() {
  firebase.auth().signOut();
}