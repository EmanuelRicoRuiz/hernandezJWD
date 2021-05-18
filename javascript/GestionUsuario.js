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
  console.log("entró");
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
      console.log(user);
      idPrincipal = user.user.uid;
      console.log(idPrincipal);
      db.collection("usuarios").where("uid", "==", idPrincipal)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            datos = doc.data();
            db.collection("tiposUsuario").where("usuario", "==", datos.tipoDeUsuario)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            datos2=doc.data();
            permisos=datos2.permisos;
            if (permisos[1]) {
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
                        
                        LlenarDatos(email);
                      })

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
          })
        })
            
            
          });
        })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, " ", errorMessage);
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

  firebase.auth().signOut()
    .then(function () {

      window.location.href = "index.html";
    })
    .catch(function (error) {

    })
}
function LlenarDatos(email) {

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
  db.collection("usuarios").doc(uid).set({
    email,

    uid
  })



}
function GuardarDatos() {
  var nombre = document.getElementById("Nombre").value;
  var apellido = document.getElementById("Apellido").value;
  var tipoDeUsuario = document.getElementById("tipoDeUsuario").value;
  if (nombre != "" && apellido != "" && tipoDeUsuario != "" && (uid != "" || uid != undefined)) {
    
    db.collection("usuarios").where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          datos = doc.data();
          email = datos.email;
          
          db.collection("usuarios").doc(uid).set({
            nombre,
            apellido,
            tipoDeUsuario,
            uid,
            email,

          })
        })
      });

    Swal.fire('Guardado!', '', 'success');
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



function buscarTU() {

  var feeder1 = document.getElementById("nombre");
  var permisos = document.getElementById("permisos");
  var select = document.getElementById("selectT1");
  var encontrado = false;
  var permisos1 = []
  var ListaPermisos = ["especificar tipos de usuarios",
        "registro de nuevos usuarios",
        "Montaje de pedidos",
        "Registro de pagos",
        "generación de facturas",
        "ingreso de productos",
        "Gestión de bodega e inventarios",
        "Ingresar compras",
        "vender",
        "Registro de clientes",
        "Administración de clientes",
        "Realizar devoluciones"
];

  db.collection("tiposUsuario")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (!encontrado) {
          encontrado = true;
          feeder1.innerHTML = "";
        }

        var datos = doc.data();
        feeder1.innerHTML += `
        <table class="table table-striped table-bordered" id="${doc.id}">
        <tr><th><h4>${datos.usuario}</h4></th><td><button id="${doc.id}" onclick="eliminarTipoDeUsuario(this)" class="btn btn-danger">Eliminar</button></td></tr>
        <tr><th>Tarea</th><th>Permiso</th></tr>
        </table>`;
        
        var cont = 0;
        var tabla = document.getElementById(doc.id);
        var imgs = [];
        for (let i = 0; i < datos.permisos.length; i++) {
          if (datos.permisos[i]) {
            imgs[i] = "img/checked.png";
          } else {
            imgs[i] = "img/remove.png";
          }
        }
        for (let i = 0; i < datos.permisos.length; i++) {
          cont += 1;
          tabla.innerHTML += `<tr>
                                <td>
                                ${ListaPermisos[i]}
                                </td>
                                <td>
                                <img width="30" src="${imgs[i]}">
                              </tr>`;
        }
        feeder1.innerHTML += `<br><br>`;
      })
    })
  if (!encontrado) {
    feeder1.innerHTML = `<h4>No se encontró ningún tipo de usuario</h4>`;
  }

}
observador();
function observador() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      
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
      permisos[11] = document.getElementById("permiso12").checked;
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

        buscarTU();



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
function eliminarTipoDeUsuario(Tusuario) {
  Swal.fire({
    title: '¡Estás seguro?',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, borrar!'
  }).then((result) => {
    if (result.isConfirmed) {
      var idTS = Tusuario.id;
      
      db.collection("tiposUsuario").doc(idTS).delete();

      Swal.fire(
        'Borrado!',
        'el tipo de usuario ha sido borrado.',
        'success'
      )
    }
  })

}
function listaDeUsuarios() {
  var feed = document.getElementById("main");
  var login = document.getElementById("login-page");
  login.innerHTML = "";
  feed.innerHTML = ``;
  feed.innerHTML = `<br><h3>Lista de usuarios:</h3><br><div class="overflow-auto"><table id="tabla2" class="table table-striped table-bordered">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Tipo de usuario</th>
        <th>Correo electrónico</th>
        <th colspan=3>Acciones</th>
      </tr>
    </thead>
  </table></div>`;
  var tabla2 = document.getElementById("tabla2");
  db.collection("usuarios")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        datos = doc.data();
        if(datos.nombre==undefined){
          nombreP="no tiene nombre";
        }else{
          nombreP=datos.nombre;
        }
        if(datos.apellido==undefined){
          apellidoP="no tiene apellido";
        }else{
          apellidoP=datos.apellido;
        }
        if(datos.tipoDeUsuario==undefined){
          tipoDeUsuarioP="no tiene tipo de usuario";
        }else{
          tipoDeUsuarioP=datos.tipoDeUsuario;
        }
        tabla2.innerHTML +=
          `<tr>
            <td>${nombreP}</td>
            <td>${apellidoP}</td>
            <td>${tipoDeUsuarioP}</td>
            <td>${datos.email}</td>
            <th><button class="btn btn-danger" id="${doc.id}" onclick="recuperarContraseña(this)">Recuperar Contraseña</button></th>
            <th><button class="btn btn-danger" id="${doc.id}" onclick="Editar(this)">Editar</button></th>
            <th><button class="btn btn-danger" id="${doc.id}" onclick="EliminarUsuario(this)">Eliminar</button></th>
            
          </tr>`;
      })
    });
}
function EliminarUsuario(element){
  var userUid=element.id;
  db.collection("usuarios").doc(userUid).delete();
  listaDeUsuarios();
}
function Editar(element) {
  var feed = document.getElementById("main");
  
  
  db.collection("usuarios").where("uid", "==", element.id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        datos = doc.data();
        feed.innerHTML = `<br><h3>Datos del usuario: ${datos.email}</h3>`;
        if(datos.nombre==undefined){
          nombreP="";
        }else{
          nombreP=datos.nombre;
        }
        if(datos.apellido==undefined){
          apellidoP="";
        }else{
          apellidoP=datos.apellido;
        }
        if(datos.tipoDeUsuario==undefined){
          tipoDeUsuarioP="";
        }else{
          tipoDeUsuarioP=datos.tipoDeUsuario;
        }
        feed.innerHTML += `<div class="col-md-8"><form class="form-gruop">
        <br>
        <input class="form-control " type="text" id="nombreP" value=${nombreP}>
        <br>
        <input class="form-control " type="text" id="apellidoP" value=${apellidoP}>
        <br>
        <select class="form-control" id="tipoDeUsuario">
          <option value="">seleccione el tipo de usuario</option>
        </select>
        <br>
        <button class="btn btn-success" id=${doc.id} onclick="GuardarCambios(this)">Guardar</button>
        </form></div>
        `;
        var tipoDeUsuario=document.getElementById("tipoDeUsuario");
         
        db.collection("tiposUsuario")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var option = document.createElement("option");
              option.value = doc.id;
              option.text = doc.id;
              tipoDeUsuario.appendChild(option);
              tipoDeUsuario.value=tipoDeUsuarioP; 
            })
          })
        
      })
    })

}
function GuardarCambios(element){
  event.preventDefault();
  Swal.fire({
    title: '¿Quiere guardar o actualizar el usuario?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Guardar`,
    denyButtonText: `No guardar`,
  }).then((result) => {
    if(result.isConfirmed){

   
    var idP=element.id;
  db.collection("usuarios").where("uid","==",idP).get().then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
        datos=doc.data();
        apellido=document.getElementById("apellidoP").value;
        email=datos.email;
        nombre=document.getElementById("nombreP").value;
        tipoDeUsuario=document.getElementById("tipoDeUsuario").value;
        uid=datos.uid;
       
        if(apellido!=""&&nombre!=""&&tipoDeUsuario!=""){
          db.collection("usuarios").doc(uid).set({
            apellido,
            email,
            nombre,
            tipoDeUsuario,
            uid
          })
          Swal.fire('Guardado!', '', 'success');
          listaDeUsuarios();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'datos en blanco',
            text: 'debes llenar todos los campos',
            
          })
        }
        
    })
  })
}
  })
  
  

  
}

function recuperarContraseña(element){
  var id=element.id;
  db.collection("usuarios").where("uid","==",id).get().then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
      datos=doc.data();
      correoUsuario=datos.email;
      firebase.auth().sendPasswordResetEmail(correoUsuario).then(function() {
        Swal.fire('correo enviado correctamente!', '', 'success');
      }).catch(function(error) {
        Swal.fire({
          icon: 'error',
          title: 'datos en blanco',
          text: 'ha ocurrido algún error.',
          
        })
      });
    })
  })
  
}
cargarFunciones();
function cargarFunciones(){
  var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged((user) => {
    
    db.collection("usuarios").where("uid","==",user.uid).get().then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
          datos=doc.data();
          tipoDeUsuario=datos.tipoDeUsuario;
          db.collection("tiposUsuario").where("usuario","==",tipoDeUsuario).get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
              datos2=doc.data();
              permisos=datos2.permisos;
              menuInicio(permisos);
            })
          });
          
      })
    })
  })
  
}