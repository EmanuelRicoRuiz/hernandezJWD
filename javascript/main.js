function RegistrarUsuario(){
    var main=document.getElementById("main");
    main.innerHTML="";
    main=document.getElementById("login-page");
    main.innerHTML=`

    <div class="form" id="registroPermiso">
        <div class="cabecera">
            <h4>datos del nuevo usuario</h4>
        </div>
        <form class="login-form">
            <input class="input" id="correo" type="text" placeholder="correo electrónico" />
            <input class="input" id="contraseña" type="password" placeholder="contraseña" />
            <input class="input" id="confirmarContra" type="password" placeholder="confirmar contraseña" />
            <h4>Tus datos</h4>
            <input class="input" id="correoAdmin" type="text" placeholder="correo electrónico del gerente" />
            <input class="input" id="contraseñaAdmin" type="password" placeholder="contraseña del gerente" />
            <div id="sugerencias" class="form-gruop">

            </div>
            <input onclick="registrar()" href="#datosPersonales" type="button" class="boton" value="registrar">
            <div id="formularioRegistro">

            </div>

        </form>
    </div>
`;
}
function gestionarusuario(){
    var login=document.getElementById("login-page");
    login.innerHTML="";
    var main=document.getElementById("main");
    main.innerHTML=`<div class="wrap">
    <center>
    <ul class="tabs">
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Tipos
                    de usuario</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Agregar o editar</span></a></li>
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div id="tabOne">
              
        
            <div id="nombre">

            <div>
            <br>
            <div id="permisos">
            
            </div>
            </div>
        </article>
        <article id="tab2">
            <div id="tabTwo">
            <input class="form-control" type="text" id="NombreUsuario" placeholder="ingrese el tipo de usuario*">
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
               </div>
            </div>
        </article>

        
    </div>
</div>`;
cargarTabs();

buscarTU();
}
function inicio(){
    event.preventDefault();
    var login=document.getElementById("login-page");
    login.innerHTML="";
    var main=document.getElementById("main");
    main.innerHTML=`<h1>estadísticas</h1>`;
}
function menuInicio(permisos){
    var menu=document.getElementById("accciones");
    var validado=false;
    for (let i=0; i<permisos.length;i++){
        if(permisos[i]){
            validado=true;
        }
    }
    if( validado){
        menu.innerHTML="";

    }
    
    if(permisos[0]){
        menu.innerHTML+=`<a class="list-group-item list-group-item-action bg-light" onclick="gestionarusuario()"
        href="#">Gestión de Usuario</a>`;
    }
    if(permisos[1]){
        menu.innerHTML+=`<a class="list-group-item list-group-item-action bg-light" onclick="RegistrarUsuario()"
        href="#">Registrar Usuario</a>`;
        menu.innerHTML+=`<a class="list-group-item list-group-item-action bg-light" onclick="listaDeUsuarios()" 
                    href="#">Lista de usuarios</a>`;
    }
    
}
