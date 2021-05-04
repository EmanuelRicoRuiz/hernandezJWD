function RegistrarUsuario(){
    var main=document.getElementById("main");
    main.innerHTML="";
    main=document.getElementById("login-page");
    main.innerHTML=`

    <div class="form" id="registroPermiso">
        <div class="cabecera">
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
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">gestionar tipos
                    de usuario</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">agregar tipo de
                    usuario</span></a></li>
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div id="tabOne">
            <table>
            <tr>
              <td>
                <select class="form-control" id="selectT1">
                  <option value="">seleccione el tipo de usuario<option>
                </select> 
              </td>
            </tr>
            <tr>
              <td>
                <br>
              </td>
            </tr>
            <tr>
              <td>
                <button class="btn btn-success" onclick="buscarTU()">Gestionar<button>
              </td>
            </tr>
        </table>  
        
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
gestionPerfiles();
}
function inicio(){
    event.preventDefault();
    var login=document.getElementById("login-page");
    login.innerHTML="";
    var main=document.getElementById("main");
    main.innerHTML=`<h1>estadísticas</h1>`;
}
