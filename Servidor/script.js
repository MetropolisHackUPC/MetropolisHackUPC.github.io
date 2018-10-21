var database = firebase.database();

function BuscaElements() {
  BuscaPregons();
  BuscaIncidents();
}

function BuscaPregons() {
    var ref = database.ref("prego/");
    ref.on("value", function(snapshot) {
    var arr = snapshot.val();
    var arr2 = Object.keys(arr);

    for (let i = arr2.length - 1; 0 <= i; i--) {
      var key = arr2[i];

      ref = database.ref("prego/" + key);
      ref.on("value", function(snapshot) {
        console.log(snapshot.val().titol);
        nom = snapshot.val().hora[11] + snapshot.val().hora[12] + snapshot.val().hora[13] + snapshot.val().hora[14] + snapshot.val().hora[15] + " " + snapshot.val().hora[8] + snapshot.val().hora[9] + "-" + snapshot.val().hora[5] + snapshot.val().hora[6] + "-" + snapshot.val().hora[0] + snapshot.val().hora[1] + snapshot.val().hora[2] + snapshot.val().hora[3] + " " + snapshot.val().titol;
        des = snapshot.val().descripcio;
        CreaPrego(nom,des);
      })
        }
    });

}

function BuscaIncidents() {
    /*var pregoRef = database.collection("prego");
    console.log(pregoRef.titol);
    console.log(pregoRef.descripcio)*/
    
    var ref = database.ref("incident/");
    ref.on("value", function(snapshot) {
    var arr = snapshot.val();
    var arr2 = Object.keys(arr);

    document.getElementById('linea2').innerHTML = "";

    for (let i = 0; i < arr2.length; i++) {
      var key = arr2[i];

      ref = database.ref("incident/" + key);
      ref.on("value", function(snapshot) {
        nom = snapshot.val().titol;
        des = snapshot.val().descripcio;
        grau = snapshot.val().grau;
        CreaIncidents(nom, des, grau);
      })
    }
    });
}

function placeholdersNous () {
  document.getElementById("TitolNou").value = "";
  document.getElementById("Hora").value = "";
  document.getElementById("DescripcioNou").value = "";
}

function CreaNouPrego() {
  nom = document.getElementById("TitolNou").value;
  hora = document.getElementById("Hora").value;
  des = document.getElementById("DescripcioNou").value;

  if (nom != "" && des != "" && hora != "") {
    AfegirFirebasePrego(nom, hora, des);
    document.getElementById('linea1').innerHTML = "";
    BuscaPregons();
  }

  placeholdersNous();
}

/*function lengthChild () {
  var ref = database.ref();
  ref.child('prego').on("value", function (snapshot) {
    console.log(snapshot.numChildren());
    return snapshot.numChildern();
  });
}*/

//(hora[11] + hora[12] + hora[13] + hora[14] + hora[15] + " " + hora[8] + hora[9] + "/" + hora[5] + hora[6] + "/" + hora[0] + hora[1] + hora[2] + hora[3] + " " + titol + " " + nom)

function AfegirFirebasePrego(nom, hora, des) {
  database.ref('prego/' + (hora[11] + hora[12] + hora[13] + hora[14] + hora[15] + " " + hora[8] + hora[9] + "-" + hora[5] + hora[6] + "-" + hora[0] + hora[1] + hora[2] + hora[3] + " " + nom)).set({
    titol: nom,
    hora: hora,
    descripcio: des
  });
  // x.id = "20:45 20-10-2018 sdfh sehstrh"
  // firebase = 2018-10-20T20:45sdfh sehstrh
}

function erasePrego(a) {
   firebase.database().ref('prego/').child(a).remove();
   document.getElementById('linea1').innerHTML = "";
   BuscaPregons();
}

function CreaPrego(nom, des) {
  document.getElementById('linea1').innerHTML += "";
  document.getElementById('linea1').innerHTML +=
  `<div class="card mb-4 shadow-sm" id="${nom}">
  <div class="card-header">
    <h4 class="my-0 font-weight-normal">${nom}</h4>
  </div>
  <div class="card-body">
      <li>${des}</li>
      <button type="button" class="btn btn-sm btn-outline-secondary" onclick="erasePrego('${nom}')">Delete</button>
  </div>`;
  /*
  document.querySelector('#eve').addEventListener("click", function (e) {
    firebase.database().ref('prego/').child(nom).remove().this(function () {
      document.getElementById(nom).remove();
      //BuscaPregons();
    });
  });*/
}

function eraseIncidents(a) {
   firebase.database().ref('incidents/').child(a).remove();
   document.getElementById('linea2').innerHTML = "";
   BuscaIncidents();
}

function CreaIncidents(nom, des, grau) {
    document.getElementById('linea2').innerHTML += "";
    document.getElementById('linea2').innerHTML +=
    `<div class="card mb-4 shadow-sm" id="${nom}">
      <div class="card-header">
      <h4 class="my-0 font-weight-normal">${nom}</h4>
     </div>
    
     <div class="card-body">
        <li>${des}</li>
        <img src="" id="${nom}" style=" width:128px; height:auto;">
        <button type="button" class="btn btn-sm btn-outline-secondary" style="display:block" onclick="eraseIncidents('${nom}')"">Delete</button>
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

    var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }