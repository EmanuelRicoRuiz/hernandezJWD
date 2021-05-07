function RegistrarUsuario() {
    var main = document.getElementById("main");
    main.innerHTML = "";
    main = document.getElementById("login-page");
    main.innerHTML = `

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
function gestionarusuario() {


    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<div class="wrap">
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
function inicio() {
    event.preventDefault();
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<h1>estadísticas</h1>`;
}

function menuInicio(permisos) {
    var menu = document.getElementById("accciones");
    var validado = false;
    for (let i = 0; i < permisos.length; i++) {
        if (permisos[i]) {
            validado = true;
        }
    }
    if (validado) {
        menu.innerHTML = "";

    }
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
        "Administración de clientes"];
    if (permisos[0]) {
        menu.innerHTML += `<a class="list-group-item list-group-item-action bg-light" onclick="gestionarusuario()"
        href="#">Gestión de Usuarios</a>`;
    }
    if (permisos[1]) {
        menu.innerHTML += `<a class="list-group-item list-group-item-action bg-light" onclick="RegistrarUsuario()"
        href="#">Registrar Usuario</a>`;
        menu.innerHTML += `<a class="list-group-item list-group-item-action bg-light" onclick="listaDeUsuarios()" 
                    href="#">Lista de usuarios</a>`;
    } if (permisos[5]) {
        menu.innerHTML += `<a class="list-group-item list-group-item-action bg-light" onclick="ingresarProductosInterface()" 
                    href="#">Gestión de productos</a>`;
    } if (permisos[2]) {
        menu.innerHTML += `<a class="list-group-item list-group-item-action bg-light" onclick="VentasInterface()" 
                    href="#">Ventas</a>`;
    } if (permisos[7]) {
        menu.innerHTML += `<a class="list-group-item list-group-item-action bg-light" onclick="VerCompras()" 
                    href="#">Lista de compras</a>`;
    }if(permisos[10]){
        menu.innerHTML += `<a class="list-group-item list-group-item-action bg-light" onclick="cargarClientes()" 
                    href="#">Clientes</a>`;
    }

}
function ingresarProductosInterface() {
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<div class="wrap">
    <center>
    <ul class="tabs">
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Registro Individual</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Registro Archivo XLSX</span></a></li>
        <li><a href="#tab3"><span class="fa fa-group"></span><span class="tab-text">Lista de productos</span></a></li>
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div id="tabOne">
              <h3>Ingreso de productos individuales</h3>
        
            <div id="nombre">

            <div>
            <br>
            <div id="permisos">
            
            </div>
            </div>
        </article>
        <article id="tab2">
            <div id="tabTwo">
            <h3>Ingreso de productos por medio de un archivo XLSX</h3>
            </div>
        </article>
        <article id="tab3">
            <div id="tabTree">
            <h3>Lista de productos</h3>
            </div>
        </article>

        
    </div>
</div>`;
    cargarTabs();
    cargarLasTabs();
}
function cargarLasTabs() {
    var tabOne = document.getElementById("tabOne");
    var tabTwo = document.getElementById("tabTwo");

    tabOne.innerHTML = `<center><div class="col-md-10" >
    <div class="card">
        <div class="card-body" id="contenido3">
            <form>
                <div class="form-gruop">
                    <h3>Registrar Producto</h3>
                    <br><hr><br>
                </div>
                <div class="form-group">
                    <h5>Código del producto</h5>
                    <input type="text" id="codidoPR" class="form-control" placeholder="código">
                </div>
                <div class="form-group">
                    <h5>Nombre del producto</h5>
                    <input type="text" id="nombrePR" class="form-control" placeholder="Nombre">
                </div>
                <div class="form-group">
                    <h5>Precio del producto</h5>
                    <input type="text" id="precioPr" class="form-control" placeholder="precio">
                </div>
                <div class="form-group">
                    <h5>Costo del producto</h5>
                    <input type="text" id="costoPr" class="form-control" placeholder="Costo" >
                </div>
                <div class="form-group">
                    <h5>Cantidad del producto</h5>
                    <input type="text" id="stockPr" class="form-control" placeholder="cantidad" >
                </div>
                <div class="form-group">
                    <h5>Proveedor</h5>
                    <select class="form-control" id="proveedores1">
                    
                <option value="01">proveedores</option>
            </select>
                </div>
                <div class="form-group">
                    <h5>Límite Mínimo del producto</h5>
                    <input type="text" id="limiteM" class="form-control" placeholder="límite mínimo">
                </div>
                <hr>
                <div id="sugerencias" class="form-gruop">

                </div>
                <br>
                <div id="botonE">
                    <button onclick="hacerRegistroProducto()" class="btn btn-danger" id="btn-task-form">
                        Registrar Producto
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>
<br><hr><br></center>`;
    tabTwo.innerHTML = `<center><input id="archivoXLSX" class="form-control" type="file" accept=".xls,.xlsx"><br>
    <button class="btn btn-primary" onclick="SubirXLSX()">Subir archivo</button><center>
    <div id="carga"></div>`;
    cargarProductosLista();

}
function VentasInterface() {
    var main = document.getElementById("main");
    main.innerHTML = ``;
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    main.innerHTML += `<div class="wrap">
    <center>
    <ul class="tabs">
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Hacer pedido</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Lista de pedidos</span></a></li>
        
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div id="tabOne">
            <br>
            <center><h2>Montar pedido</h2></center>
            <center>
                <table class="table">
                    <tr>
                        <td>
                            <input list="productos" id="productos1" class="form-control"
                                placeholder="Nombre del producto">
                        </td>
        
                        <td>
                            <input id="cantidadVenta" class="form-control col-md-5" placeholder="cantidad">
                        </td>
                        <td>
                            <input list="clientes" id="clientes1" class="form-control"
                                placeholder="Nombre del cliente">
                        </td>
                    </tr>
                </table>
                <br><button class="btn btn-primary" onclick="Emitir()">Emitir</button>
                    <br><br>
            </center>
            <div class="overflow-auto">
                <table>
                    <datalist class="form-select" id="productos">
                    </datalist>
                    <datalist class="form-select" id="clientes">
                    </datalist>
                    
                    <h3>Lista de productos:</h3><br>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Código del producto</th>
                                <th>Nombre del producto</th>
                                <th>stock</th>
                                <th>precio del producto</th>
                                <th>Cantidad</th>
                                <th colspan=2>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="tabla5"></tbody>
                        <tbody id="tabla4"></tbody>
                        <tr>
                            <td colspan=7>
                                <center>
                                    <div id="botonGuadar"></div>
                                </center>
                            </td>
                        </tr>
                        </tbody>
        
                    </table>
                </table>
            </div>
        
            <div id="nombre">

            <div>
            <br>
            <div id="permisos">
            
            </div>
            </div>
        </article>
        <article id="tab2">
            <div id="tabTwo">
            <h3>Lista de pedidos: </h3>
            </div>
        </article>
        

        
    </div>
</div>
  `;
    var listaProductos = document.getElementById("productos")
    db.collection("productos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            var option = document.createElement("option");
            option.value = doc.id;
            option.text = `Nombre: ${datos.nombreProducto}\n Cantidad: ${datos.inventarioProd}`;
            listaProductos.appendChild(option);
        });
    })
    var clientes = document.getElementById("clientes")
    db.collection("clientes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            var option = document.createElement("option");
            option.value = doc.id;
            option.text = `Nombre: ${datos.RazonSocial}`;
            clientes.appendChild(option);
        });
    })
    var tabTwo=document.getElementById("tabTwo");
    db.collection("ventas").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            var datos=doc.data();
            tabTwo.innerHTML+=`<div class="overflow-auto"><table  class="table table-striped table-bordered" id="Cabecera${doc.id}">
                <tr>
                    <th>Cliente</th>
                    <th>Estado de entrega</th>
                    <th>Estado de pago</th>
                    <th>Valor</th>
                    <th>debe</th>
                    <th>fecha</th>
                    <th colspan=4>Acciones</th>
                </tr>
            </table></div>`;
            
            var tablaPedidos=document.getElementById("Cabecera"+doc.id);
            tablaPedidos.innerHTML+=`
                <tr>
                    <td>${datos.cliente}</td>
                    <td>${datos.entregado}</td>
                    <td>${datos.pagado}</td>
                    <td>${datos.suma}</td>
                    <td>${datos.debe}</td>
                    <td>${datos.fecha[0]}/${datos.fecha[1]}/${datos.fecha[2]}</td>
                    <td>
                    <button class="btn btn-success btn-block" id="${doc.id}" onclick="AbonarPedido(this)">Abonar</button><br>
                    
                    <button class="btn btn-success btn-block" id="${doc.id}" onclick="facturaPdf(this)">Generar factura</button></center></td>
                </tr>
                
                    <td colspan=10>
                    <table  class="table table-striped table-bordered" id="contenido${doc.id}">
                        <tr>
                            <th>Código del producto</th>
                            <th>Cantidad</th>
                        </tr>
                    </table>
                    </td>
                
            `
            var contenido=document.getElementById("contenido"+doc.id);
            for(let i=0; i<datos.cantidades.length;i++){
                contenido.innerHTML+=`
                        <tr>
                            <th>${datos.idProducto[i]}</th>
                            <th>${datos.cantidades[i]}</th>
                        </tr>
                `;
            }
        })
    })
    cargarTabs();
}
function VerCompras() {
    var feed = document.getElementById("main");
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    feed.innerHTML = ``;
    feed.innerHTML = `<br><h3>Lista de compras:</h3><br><div class="overflow-auto" id="tabla6"></div>`;
    var tabla6 = document.getElementById("tabla6");
    db.collection("compras")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                datos = doc.data();

                tabla6.innerHTML +=
                    `<table  class="table table-striped table-bordered" id="${doc.id}"><tr>
            <td colspan=4>Número de factura:${doc.id}</td>
            </tr>
            <tr>
            <th>Codigo producto</th>
            <th>cantidad</th>
            <th>costo</th>
            <th>fecha</th>
            
          </tr></table>`;
                costos = datos.costos;
                var suma = 0;

                for (let i = 0; i < costos.length; i++) {
                    suma += costos[i];
                }
                var tabla7 = document.getElementById(doc.id);
                for (let i = 0; i < costos.length; i++) {
                    tabla7.innerHTML += `
                    <tr>
                    <td>${datos.productos[i]}</td>
                    <td>${datos.cantidades[i]}</td>
                    <td>${datos.costos[i]}</td>
                    <td>${datos.fecha1[0]}/${datos.fecha1[1]}/${datos.fecha1[2]}</td>
                    </tr>`;
                }
                tabla7.innerHTML += `
                    <tr>
                        <td colspan=4 id="tablaSuma">
                            suma de la compra:${suma}
                        </td>
                    </tr>`

            })
        });
}
function cargarClientes(){
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<div class="wrap">
    <center>
    <ul class="tabs">
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Lista de clientes</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Registrar nuevo cliente</span></a></li>
        
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div id="tabOne">
              <h3>Lista de clientes</h3>
                <div id="ListaClientes"></div>
            <div id="nombre">

            
        </article>
        <article id="tab2">
            <div id="tabTwo">
            
            <div id="RegistroClientes">
            
            </div>
            </div>
        </article>
        

        
    </div>
</div>`;
    cargarTabs();
    var ListaClientes=document.getElementById("ListaClientes");
    ListaClientes.innerHTML=`<table class="table table-striped table-bordered" id="tabla8">
        <tr>
            <th>Nit</th>
            <th>Razón social</th>
            <th>Direccion</th>
            <th>Cartera</th>
            <th colspan=2>Acciones</th>
        </tr>
    </table>`;
    db.collection("clientes").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            var datos=doc.data();
            var RazonSocial=datos.RazonSocial
            var nit=datos.nit;
            var Direccion=datos.Direccion;
            var Cartera=datos.Cartera;
            var tabla8=document.getElementById("tabla8");
            tabla8.innerHTML+=`
            <tr>
                <td>${nit}</td>
                <td>${RazonSocial}</td>
                <td>${Direccion}</td>
                <td>${Cartera}</td>
                <td><button id="${doc.id}" class="btn btn-success" onclick="EditarCliente(this)">Editar</button></td>
                <td><button id="${doc.id}" class="btn btn-danger" onclick="EliminarCliente(this)">Eliminar</button></td>
            </tr>`;
        })
    })
    var RegistroClientes=document.getElementById("RegistroClientes");
    RegistroClientes.innerHTML=`<center><div class="col-md-10" >
    <div class="card">
        <div class="card-body" id="contenido3">
            <form>
                <div class="form-gruop">
                    <h3>Registrar Cliente</h3>
                    <br><hr><br>
                </div>
                <div class="form-group">
                    <h5>Nit del cliente*</h5>
                    <input type="text" id="nit" class="form-control" placeholder="Nit*">
                </div>
                <div class="form-group">
                    <h5>Razón Social*</h5>
                    <input type="text" id="RazonSocial" class="form-control" placeholder="Razon Social*">
                </div>
                <div class="form-group">
                    <h5>Direccion*</h5>
                    <input type="text" id="Direccion" class="form-control" placeholder="Direccion*">
                </div>
                
                
                <br>
                <div id="botonE">
                    <button onclick="hacerRegistroCliente()" class="btn btn-danger" id="btn-task-form">
                        Registrar cliente
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>
<br><hr><br></center>`;
    
}
