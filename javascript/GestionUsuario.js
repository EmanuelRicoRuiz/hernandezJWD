const firebaseConfig = {
  apiKey: "AIzaSyDwEIo1vy-N1WC0EFYPZsJjjXn2PRHQAFg",
  authDomain: "hernandezjwd.firebaseapp.com",
  projectId: "hernandezjwd",
  storageBucket: "hernandezjwd.appspot.com",
  messagingSenderId: "615453878393",
  appId: "1:615453878393:web:4b027fdb02cd191cd6cca8",
  measurementId: "G-SJRTK7NWFZ"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();


function ingreso() {
  var email = document.getElementById('correo2').value;
  var password = document.getElementById('contraseña2').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      window.location.href = "main.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/wrong-password") {
        aviso = document.getElementById("sugerencias");
        aviso.innerHTML = `<div>
        <p id="sugerencia">la contraseña es incorrecta</p>
        </div>`;
      } if (errorCode == "auth/invalid-email") {
        aviso = document.getElementById("sugerencias");
        aviso.innerHTML = `<div>
        <p id="sugerencia">el correo es incorrecto</p>
        </div>`;
      } if (errorCode == "auth/user-not-found") {
        aviso = document.getElementById("sugerencias");
        aviso.innerHTML = `<div>
        <p id="sugerencia">usted no tiene una cuenta</p>
        </div>`;
      }
      console.log(errorCode, errorMessage);
    });
}
var uid;

function registrar() {
  aviso = document.getElementById("sugerencias");
  aviso.innerHTML = `<div>
          <p id="segerencia">Registrando...</p>
          </div>`;
  var correoAdmin = document.getElementById("correoAdmin").value;
  var contraAdmin = document.getElementById("contraseñaAdmin").value;
  firebase.auth().signInWithEmailAndPassword(correoAdmin, contraAdmin)
    .then((user) => {
      var entrada = false;
      var idPrincipal;
      var user = firebase.auth().currentUser;
      idPrincipal = user.uid;
      console.log(idPrincipal);
      db.collection("usuarios").where("uid", "==", idPrincipal)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            datos = doc.data();
            if (datos.tipoDeUsuario == "admin") {
              var email = document.getElementById('correo').value;
              var contraseña = document.getElementById('contraseña').value;
              var confirmarContraseña = document.getElementById('confirmarContra').value;
              if (contraseña != confirmarContraseña) {
                aviso = document.getElementById("sugerencias");
                aviso.innerHTML = `<div>
          <p id="segerencia">las contraseñas no coinciden</p>
          </div>`;
              } else {
                firebase.auth().createUserWithEmailAndPassword(email, contraseña)
                  .then((user) => {
                    uid = user.user.uid
                    aviso = document.getElementById("sugerencias");
                    aviso.innerHTML = `<div>
          <p id="aviso">registrado exitosamente</p>
          </div>`;

                    firebase.auth().signInWithEmailAndPassword(correoAdmin, contraAdmin)
                      .then((user) => {
                        console.log("validado");
                      })
                    LlenarDatos();
                  })
                  .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage)
                    if (errorCode == "auth/email-already-in-use") {
                      aviso = document.getElementById("sugerencias");
                      aviso.innerHTML = `<div>
              <p id="sugerencia">el correo ya está en uso</p>
              </div>`;
                    }
                    if (errorCode == "auth/weak-password") {
                      aviso = document.getElementById("sugerencias");
                      aviso.innerHTML = `<div>
              <p id="sugerencia">la contraseña es demasiado débil</p>
              </div>`;
                    } if (errorCode == "auth/invalid-email") {
                      aviso = document.getElementById("sugerencias");
                      aviso.innerHTML = `<div>
              <p id="sugerencia">el correo no es válido</p>
              </div>`;
                    }
                  });
              }


            } else {
              aviso = document.getElementById("sugerencias");
              aviso.innerHTML = `<div>
              <p id="sugerencia">este usuario no tiene permitido hacer este tipo de operaciones</p>
              </div>`;
            }
          });
        })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode," ",errorMessage);
      if (errorCode == "auth/wrong-password") {
        aviso = document.getElementById("sugerencias");
        aviso.innerHTML = `<div>
        <p id="sugerencia">la contraseña es incorrecta</p>
        </div>`;
      } if (errorCode == "auth/invalid-email") {
        aviso = document.getElementById("sugerencias");
        aviso.innerHTML = `<div>
        <p id="sugerencia">correo del gerente inválido</p>
        </div>`;
      } if (errorCode == "auth/user-not-found") {
        aviso = document.getElementById("sugerencias");
        aviso.innerHTML = `<div>
        <p id="sugerencia">correo del gerente inválido</p>
        </div>`;
      }
      console.log(errorCode, errorMessage);
    });







}
function cerrarS() {
  console.log("holis");
  firebase.auth().signOut()
    .then(function () {

      window.location.href = "index.html";
    })
    .catch(function (error) {

    })
}
function LlenarDatos() {

  event.preventDefault();
  var LlenarDatos = document.getElementById("registroPermiso");
  LlenarDatos.innerHTML = `
  <div class="cabecera">
      <h1>Llenar datos </h1>
  </div>
  <form class="login-form">
      <input class="input" id="Nombre" type="text" placeholder="Nombre" />
      <input class="input" id="Apellido" type="text" placeholder="Apellido"/>
     
      <select id="tipoDeUsuario" class="form-control">
          <option value="">Elegir tipo de usuario</option>
      </select>
      <div id="sugerencias" class="form-gruop">
      </div>
      <br>
      <input onclick="GuardarDatos()" type="button" class="boton" value="Guardar">


  </form>`
  var tipoDeUsuario = document.getElementById("tipoDeUsuario");
  db.collection("tiposUsuario")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var datos = doc.data();
        var option = document.createElement("option");
        option.value = doc.id;
        option.text = doc.id;
        tipoDeUsuario.appendChild(option);
      })
    })




}
function GuardarDatos() {
  var nombre = document.getElementById("Nombre").value;
  var Apellido = document.getElementById("Apellido").value;
  var tipoDeUsuario = document.getElementById("tipoDeUsuario").value;
  if (nombre != "" && Apellido != "" && tipoDeUsuario != "" && (uid != "" || uid != undefined)) {
    db.collection("usuarios").doc().set({
      nombre,
      Apellido,
      tipoDeUsuario,
      uid
    })
    nombre = document.getElementById("Nombre");
    Apellido = document.getElementById("Apellido");
    tipoDeUsuario = document.getElementById("tipoDeUsuario");
    nombre.value = "";
    Apellido.value = "";
    tipoDeUsuario.value = "";
    Swal.fire('Guardado!', '', 'success');
    uid = "";
    var LlenarDatos = document.getElementById("registroPermiso");
    LlenarDatos.innerHTML = `<div class="cabecera">
  <h1>Registrar</h1>
</div>
<form class="login-form">
  <input class="input" id="correo" type="text" placeholder="correo electrónico" />
  <input class="input" id="contraseña" type="password" placeholder="contraseña" />
  <input class="input" id="confirmarContra" type="password" placeholder="confirmar contraseña" />
  <h1>Datos del gerente</h1>
  <input class="input" id="correoAdmin" type="text" placeholder="correo electrónico del gerente" />
  <input class="input" id="contraseñaAdmin" type="password" placeholder="contraseña del gerente" />
  <div id="sugerencias" class="form-gruop">

  </div>
  <input onclick="registrar()" href="#datosPersonales" type="button" class="boton" value="registrar">
  <div id="formularioRegistro">

  </div>

</form>`;
  } else {
    var aviso = document.getElementById("sugerencias");
    aviso.innerHTML = `<br><p>debes llenar todos los campos</p>`;
  }
}


function gestionPerfiles() {



  var selectT1 = document.getElementById("selectT1");
  db.collection("tiposUsuario")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var datos = doc.data();
        selectT1.innerHTML += `<option value="${datos.usuario}" onclick="buscarTU()">${datos.usuario}</option>`;
      })
    })

}
function buscarTU() {
  
  var feeder1 = document.getElementById("nombre");
  var permisos = document.getElementById("permisos");
  var select = document.getElementById("selectT1");
  var encontrado = false;
  var permisos1=[]
  var ListaPermisos=["especificar tipos de usuarios",
    "registro de nuevos usuarios",
    "Montaje de pedidos",
    "Registro de pagos",
    "generación de facturas",
    "ingreso de productos",
    "Gestión de bodega e inventarios",
    "Ingresar compras",
    "vender",
    "Registro de clientes",
    "Administración de clientes"];
    
  db.collection("tiposUsuario").where("usuario", "==", select.value)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        
        encontrado = true;
        var datos = doc.data();
        feeder1.innerHTML = `<h1>${datos.usuario}:</h1>`;
        console.log(datos.permisos);
        var cont=0;
        for (let i=0; i<datos.permisos.length;i++){
          if(datos.permisos[i]){
            cont+=1;
            feeder1.innerHTML+=cont+". "+ListaPermisos[i]};
            feeder1.innerHTML+=`<br>`;
          }
          
        
      })
    })
  if (!encontrado) {

    feeder1.innerHTML = `<br><br><h3>tipo de usuario no encontrado, debe seleccionar uno válido</h3>`;
  }
}
observador();
function observador() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("usuario activo");
    } else {
      try {
        var main = document.getElementById("wrapper");
        main.innerHTML = `<h1>Usted no ha iniciado sesión</h1>
        <br>
        <a href="index.html"><button class="btn btn-danger">Iniciar sesión</button></a>`
          ;
      } catch (E) {
        console.log(E);
      }

    }
  })
}
function guardarTipoDeUsuario() {
  Swal.fire({
    title: '¿Quiere guardar o actualizar el usuario? \nSi el usuario ya existe se actualizarán los permisos.',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Guardar`,
    denyButtonText: `No guardar`,
  }).then((result) => {

    if (result.isConfirmed) {
      var permisos = [];
      permisos[0] = document.getElementById("permiso1").checked;
      permisos[1] = document.getElementById("permiso2").checked;
      permisos[2] = document.getElementById("permiso3").checked;
      permisos[3] = document.getElementById("permiso4").checked;
      permisos[4] = document.getElementById("permiso5").checked;
      permisos[5] = document.getElementById("permiso6").checked;
      permisos[6] = document.getElementById("permiso7").checked;
      permisos[7] = document.getElementById("permiso8").checked;
      permisos[8] = document.getElementById("permiso9").checked;
      permisos[9] = document.getElementById("permiso10").checked;
      permisos[10] = document.getElementById("permiso11").checked;
      var usuario = document.getElementById("NombreUsuario").value;
      var sugerencia = document.getElementById("sugerencia");
      var aviso = document.getElementById("aviso");

      if (usuario != "") {


        db.collection("tiposUsuario").doc(usuario).set({
          permisos,
          usuario

        })
        Swal.fire('Guardado!', '', 'success');
        var tabTwo = document.getElementById("tabTwo");
        tabTwo.innerHTML = `<input class="form-control" type="text" id="NombreUsuario" placeholder="ingrese el tipo de usuario*">
       <br>
       <input  type="checkbox" id="permiso1">
       <label  for="permiso1">especificar tipos de usuarios</label>
       <br>
       <input  type="checkbox" id="permiso2">
       <label  for="permiso2">registro de nuevos usuarios</label>
       <br>
       <input  type="checkbox" id="permiso3">
       <label  for="permiso3">Montaje de pedidos</label>
       <br>
       <input  type="checkbox" id="permiso4">
       <label  for="permiso4">Registro de pagos</label>
       <br>
       <input  type="checkbox" id="permiso5">
       <label  for="permiso5">generación de facturas</label>
       <br>
       <input  type="checkbox" id="permiso6">
       <label  for="permiso6">ingreso de productos</label>
       <br>
       <input  type="checkbox" id="permiso7">
       <label  for="permiso7">Gestión de bodega e inventarios</label>
       <br>
       <input  type="checkbox" id="permiso8">
       <label  for="permiso8">Ingresar compras</label>
       <br>
       <input  type="checkbox" id="permiso9">
       <label  for="permiso9">vender</label>
       <br>
       <input  type="checkbox" id="permiso10">
       <label  for="permiso10">Registro de clientes</label>
       <br>
       <input  type="checkbox" id="permiso11">
       <label  for="permiso11">Administración de clientes</label>
       <br>
      
       <button class="btn btn-success" onclick="guardarTipoDeUsuario()">Guardar</button>
       <br><br>
       <div id="sugerencia">
      </div>
      <div id="aviso">
      </div>`;

        



      } else {

        sugerencia.innerHTML = "Debe elegir un nombre para el tipo del usuario.";
      }
    } else if (result.isDenied) {
      Swal.fire('No se guardó la información.', '', 'info')
      var tabTwo = document.getElementById("tabTwo");
        tabTwo.innerHTML = `<input class="form-control" type="text" id="NombreUsuario" placeholder="ingrese el tipo de usuario*">
       <br>
       <input  type="checkbox" id="permiso1">
       <label  for="permiso1">especificar tipos de usuarios</label>
       <br>
       <input  type="checkbox" id="permiso2">
       <label  for="permiso2">registro de nuevos usuarios</label>
       <br>
       <input  type="checkbox" id="permiso3">
       <label  for="permiso3">Montaje de pedidos</label>
       <br>
       <input  type="checkbox" id="permiso4">
       <label  for="permiso4">Registro de pagos</label>
       <br>
       <input  type="checkbox" id="permiso5">
       <label  for="permiso5">generación de facturas</label>
       <br>
       <input  type="checkbox" id="permiso6">
       <label  for="permiso6">ingreso de productos</label>
       <br>
       <input  type="checkbox" id="permiso7">
       <label  for="permiso7">Gestión de bodega e inventarios</label>
       <br>
       <input  type="checkbox" id="permiso8">
       <label  for="permiso8">Ingresar compras</label>
       <br>
       <input  type="checkbox" id="permiso9">
       <label  for="permiso9">vender</label>
       <br>
       <input  type="checkbox" id="permiso10">
       <label  for="permiso10">Registro de clientes</label>
       <br>
       <input  type="checkbox" id="permiso11">
       <label  for="permiso11">Administración de clientes</label>
       <br>
      
       <button class="btn btn-success" onclick="guardarTipoDeUsuario()">Guardar</button>
       <br><br>
       <div id="sugerencia">
      </div>
      <div id="aviso">
      </div>`;
    }
  })



}
