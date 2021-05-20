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
                <input  type="checkbox" id="permiso12">
                <label  for="permiso12">Realizar devoluciones</label>
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
        "Administración de clientes",
        "Realizar devoluciones"
    ];
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
                    href="#">Pedidos</a>`;
        menu.innerHTML += `<a class="list-group-item list-group-item-action bg-light" onclick="ventas()" 
                    href="#">ventas</a>`;
        menu.innerHTML += `<a class="list-group-item list-group-item-action bg-light" onclick="InventarioGlobal()" 
                    href="#">Inventario Global</a>`;
    } if (permisos[7]) {
        menu.innerHTML += `<a class="list-group-item list-group-item-action bg-light" onclick="VerCompras()" 
                    href="#">Lista de compras</a>`;
    } if (permisos[10]) {
        menu.innerHTML += `<a class="list-group-item list-group-item-action bg-light" onclick="cargarClientes()" 
                    href="#">Clientes</a>`;
    }
    if (permisos[11]) {
        menu.innerHTML += `<a class="list-group-item list-group-item-action bg-light" onclick="RealizarDevoluciones()" 
                    href="#">Devoluciones</a>`;
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
                    <h5>Descripción del producto</h5>
                    <input type="text" id="nombrePR" class="form-control" placeholder="Nombre">
                </div>
                <div class="form-group">
                    <h5>Precio de venta del producto</h5>
                    <input type="text" id="precioPr" class="form-control" placeholder="precio">
                </div>
                <div class="form-group">
                    <h5>Precio de costo del producto</h5>
                    <input type="text" id="costoPr" class="form-control" placeholder="Costo" >
                </div>
                <div class="form-group">
                    <h5>Cantidad del producto</h5>
                    <input type="text" id="stockPr" class="form-control" placeholder="cantidad" >
                </div>
                <div class="form-group">
                    <h5>Proveedor</h5>
                    <input type="text" class="form-control" id="proveedores1">
                </div>
                <div class="form-group">
                    <h5>Límite Mínimo del producto</h5>
                    <input type="text" id="limiteM" class="form-control" placeholder="límite mínimo">
                </div>
                <div class="form-group">
                    <h5>categoría</h5>
                    <input type="text" id="categoria" class="form-control" placeholder="categoria">
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
                            <input list="clientes" id="clientes1" class="form-control"
                                placeholder="Nombre del cliente">
                        </td>
                        <td>
                            <input id="cantidadVenta" class="form-control " placeholder="cantidad">
                        </td>
                        <td>
                            <input id="Descuento" class="form-control " placeholder="Descuento">
                        </td>
                        
                    </tr>
                </table>
                <datalist class="form-select" id="productos"></datalist>
                <datalist class="form-select" id="clientes"> </datalist>
                <br><button class="btn btn-primary" onclick="Emitir()">Emitir</button>
                    <br><br>
            </center>
            <div class="overflow-auto">
                <table>
                    <h3>Lista de productos:</h3><br>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Código del producto</th>
                                <th>Nombre del producto</th>
                                <th>stock</th>
                                <th>precio del producto</th>
                                <th>Cantidad</th>
                                <th>Descuento</th>
                                <th>Acciones</th>
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
            option.value = datos.CODIGO;
            option.text = `Nombre: ${datos.DESCRIPCION}\n Cantidad: ${datos.STOCK}`;
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
    cargarTabs();
    var tabTwo = document.getElementById("tabTwo");
    db.collection("ventas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            if (!datos.entregado) {


                tabTwo.innerHTML += `<div class="overflow-auto"><table  class="table table-striped table-bordered" id="Cabecera${doc.id}">
                <tr>
                    <th>Número de factura</th>
                    <th>Cliente</th>
                    <th>Estado de entrega</th>
                    <th>Estado de pago</th>
                    <th>Valor</th>
                    <th>debe</th>
                    <th>fecha</th>
                    <th>Rentabilidad</th>
                    <th>Plazo</th>
                   
                </tr>
            </table></div>`;

                var tablaPedidos = document.getElementById("Cabecera" + doc.id);


                tablaPedidos.innerHTML += `
                <tr>
                    <td>${datos.NumeroFactura}</td>
                    <td><button onclick="verDatosCliente(this)" class="btn btn-secundary" id=${datos.cliente}>${datos.cliente}</button></td>
                    <td>${datos.entregado}</td>
                    <td>${datos.pagado}</td>
                    <td>${datos.suma}</td>
                    <td>${datos.debe}</td>
                    <td>${datos.fecha[0]}/${datos.fecha[1]}/${datos.fecha[2]}</td>
                    <td>${datos.rentabilidad}%</td>
                    <td>${datos.plazo} Dias</td>
                    <td><a class="cursor" id="${doc.id}" onclick="AbonarPedido(this)"><img src="img/abono.png" width=30></a>
                    <a class="cursor" id="${doc.id}" onclick="cambiarEstado(this)"><img src="img/envio.png" width=30></a>
                    <a class="cursor" id="${doc.id}" onclick="facturaPdf(this)"><img src="img/factura.png" width=30></a>
                    <a class="cursor" id="${doc.id}" onclick="contenidoPedido(this)"><img src="img/contenido.png" width=30></a></td>
                    
                </tr>
                
                <tr>
                    <td colspan=8   >
                         <div id="contenido${doc.id}"></div>
                    </td>
                </tr>
                
                    `


            }
        })
    })

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
                    suma += costos[i] * datos.cantidades[i];
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
function cargarClientes() {
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
                <div id="ListaClientes" class="overflow-auto"></div>
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
    var ListaClientes = document.getElementById("ListaClientes");
    ListaClientes.innerHTML = `<table class="table table-striped table-bordered" id="tabla8">
        <tr>
            <th>Nit</th>
            <th>Razón social</th>
            <th>Direccion</th>
            <th>Cartera</th>
            <th>Ciudad</th>
            <th>Teléfono</th>
            <th>Barrio</th>
            <th>Plazo de pago</th>
            <th colspan=2>Acciones</th>
        </tr>
    </table>`;
    db.collection("clientes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            var RazonSocial = datos.RazonSocial
            var nit = datos.nit;
            var Direccion = datos.Direccion;
            var Cartera = datos.Cartera;
            var tabla8 = document.getElementById("tabla8");
            tabla8.innerHTML += `
            <tr>
                <td>${nit}</td>
                <td>${RazonSocial}</td>
                <td>${Direccion}</td>
                <td>${Cartera}</td>
                <td>${datos.ciudad}</td>
                <td>${datos.telefono}</td>
                <td>${datos.barrio}</td>
                <td>${datos.plazo}</td>
                <td><button id="${doc.id}" class="btn btn-success" onclick="EditarCliente(this)">Editar</button></td>
                <td><button id="${doc.id}" class="btn btn-danger" onclick="EliminarCliente(this)">Eliminar</button></td>
            </tr>`;
        })
    })
    var RegistroClientes = document.getElementById("RegistroClientes");
    RegistroClientes.innerHTML = `<center><div class="col-md-10" >
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
                <div class="form-group">
                    <h5>Teléfono*</h5>
                    <input type="text" id="telefono" class="form-control" placeholder="teléfono*">
                </div>
                <div class="form-group">
                    <h5>Ciudad*</h5>
                    <input type="text" id="ciudad" class="form-control" placeholder="Ciudad*">
                </div>
                <div class="form-group">
                    <h5>Barrio*</h5>
                    <input type="text" id="barrio" class="form-control" placeholder="Barrio*">
                </div>
                <div class="form-group">
                    <h5>Plazo de pago*</h5>
                    <input type="number" id="plazo" class="form-control" placeholder="Plazo de pago en días*">
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
function verDatosCliente(element) {
    console.log("holis");
    event.preventDefault();
    var nit = element.id;
    console.log(nit);
    db.collection("clientes").where("nit", "==", nit).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log("holis");
                var datos = doc.data();
                var data = `Razón social: ${datos.RazonSocial}<br>` + `Nit: ${datos.nit}<br>` + `Dirección: ${datos.Direccion}<br>` + `Cartera: ${datos.Cartera}`;
                console.log(data);
                Swal.fire({

                    title: 'Datos del cliente:',
                    html: '<p>' + data + '</p>'


                })
            })
        })
}
function ventas() {
    event.preventDefault();

    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<div class="wrap">
    <center>
    <ul class="tabs">
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Lista de ventas</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Recaudo</span></a></li>
        <li><a href="#tab3"><span class="fa fa-group"></span><span class="tab-text">Lista de vencidas</span></a></li>
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div id="tabOne">
            </div>
        </article>
        <article id="tab2">
            <div id="tabTwo">
            
            </div>
        </article>
        <article id="tab3">
            <div id="tabTree">
            
            </div>
        </article>
        

        
    </div>
</div>`;
    cargarTabs();
    var tabOne = document.getElementById("tabOne");

    db.collection("ventas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            console.log("entró")
            if (datos.entregado) {


                tabOne.innerHTML += `<div class="overflow-auto"><table  class="table table-striped table-bordered" id="Cabecera${doc.id}">
                <tr>
                    <th>Número de factura</th>
                    <th>Cliente</th>
                    <th>Estado de entrega</th>
                    <th>Estado de pago</th>
                    <th>Valor</th>
                    <th>debe</th>
                    <th>fecha</th>
                    <th>plazo</th>
                    <th>fecha de vencimiento</th>
                    <th colspan=3>Acciones</th>
                </tr>
            </table></div>`;

                var tablaPedidos = document.getElementById("Cabecera" + doc.id);
                

                tablaPedidos.innerHTML += `
                <tr>
                    <td>${datos.NumeroFactura}</td>
                    <td><button onclick="verDatosCliente(this)" class="btn btn-secundary" id=${datos.cliente}>${datos.cliente}</button></td>
                    <td>${datos.entregado}</td>
                    <td>${datos.pagado}</td>
                    <td>${datos.suma}</td>
                    <td>${datos.debe}</td>
                    <td>${datos.fecha[0]}/${datos.fecha[1]}/${datos.fecha[2]}</td>
                    <td>${datos.plazo} dias</td>
                    <td>${datos.fechaVencimiento[0]}/${datos.fechaVencimiento[1]}/${datos.fechaVencimiento[2]}</td>
                    <td><a class="cursor" id="${doc.id}" onclick="AbonarPedido(this)"><img src="img/abono.png" width=30></a><br>
                    <a class="cursor" id="${doc.id}" onclick="facturaPdf(this)"><img src="img/factura.png" width=30></a><br>
                    <a class="cursor" id="${doc.id}" onclick="contenidoPedido(this)"><img src="img/contenido.png" width=30></a></td>
                    
                </tr>
                <tr>
                    <td colspan=9>
                         <div id="contenido${doc.id}"></div>
                    </td>
                </tr>
                
                    `
            }
        })
    })
    var tabTwo = document.getElementById("tabTwo");
    tabTwo.innerHTML = `<h5 id="aviso">Lista de Abonos: </h5>
    <div id="ValorRecaudo"></div>
    <div>
        <table id="tablaRecaudo" class="table table-striped table-bordered">
            <tr>
                <th>Número de factura</th>
                <th>Cantidad del abono</th>
                <th>Fecha</th>
                <th>Rentabilidad</th>
            </tr>
        </table>
    </div>`;
    var suma = 0;
    var promedio=0;
    var suma1=0;
    db.collection("abonos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            suma += datos.cantidad_abono;
           
            suma1+=datos.cantidad_abono*(datos.rentabilidad/100)
            var tablaRecaudo = document.getElementById("tablaRecaudo");
            tablaRecaudo.innerHTML+=`
            <tr>
                <td>${datos.NumeroFactura}</td>
                <td>${datos.cantidad_abono}</td>
                <td>${datos.fecha}</td>
                <td>${datos.rentabilidad.toFixed(2)}%</td>
            </tr>
            `
        })
        
        var Valor = document.getElementById("ValorRecaudo");
        Valor.innerHTML = `<p>Valor del recaudo: ${suma}</p>`
        suma1=suma1.toFixed(2);
        Valor.innerHTML+=`<p>Utilidades: ${suma1}</p>`
    })
    var tabTree=document.getElementById("tabTree");
    tabTree.innerHTML = `No hay facturas vencidas.`;

    db.collection("ventas").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            var datos=doc.data();
            var fechaVencimiento=new Date(datos.fechaVencimiento[2],datos.fechaVencimiento[1]-1,datos.fechaVencimiento[0])
            var fechaActual=new Date();
            
            if(fechaActual>=fechaVencimiento&&datos.debe>0){
                tabTree.innerHTML += `<div class="overflow-auto"><table  class="table table-striped table-bordered" id="Vencido${doc.id}">
                <tr>
                    <th>Número de factura</th>
                    <th>Cliente</th>
                    <th>Estado de entrega</th>
                    <th>Estado de pago</th>
                    <th>Valor</th>
                    <th>debe</th>
                    <th>fecha</th>
                    <th>plazo</th>
                    <th>fecha de vencimiento</th>
                    <th colspan=3>Acciones</th>
                </tr>
            </table></div>`;

                var tablaPedidos = document.getElementById("Vencido" + doc.id);
                

                tablaPedidos.innerHTML += `
                <tr>
                    <td>${datos.NumeroFactura}</td>
                    <td><button onclick="verDatosCliente(this)" class="btn btn-secundary" id=${datos.cliente}>${datos.cliente}</button></td>
                    <td>${datos.entregado}</td>
                    <td>${datos.pagado}</td>
                    <td>${datos.suma}</td>
                    <td>${datos.debe}</td>
                    <td>${datos.fecha[0]}/${datos.fecha[1]}/${datos.fecha[2]}</td>
                    <td>${datos.plazo} dias</td>
                    <td>${datos.fechaVencimiento[0]}/${datos.fechaVencimiento[1]}/${datos.fechaVencimiento[2]}</td>
                    <td><a class="cursor" id="${doc.id}" onclick="AbonarPedido(this)"><img src="img/abono.png" width=30></a><br>
                    <a class="cursor" id="${doc.id}" onclick="facturaPdf(this)"><img src="img/factura.png" width=30></a><br>
                    <a class="cursor" id="${doc.id}" onclick="contenidoFactura(this)"><img src="img/contenido.png" width=30></a></td>
                    
                </tr>
                <tr>
                    <td colspan=9>
                         <div id="contenido1${doc.id}"></div>
                    </td>
                </tr>
                
                    `
            }
            
            
        })
    })
    
}
function contenidoPedido(element) {
    var container = document.getElementById(`contenido${element.id}`);
    db.collection("ventas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.id == element.id) {


                var datos = doc.data();
                container.innerHTML =
                    `<center><button class="btn btn-success btn-block" id="${element.id}" onclick="ocultarPedido(this)">Ocultar contenido</button></td></center>
                    <td colspan=10>
                    <table  class="table table-striped table-bordered" id="tabla${element.id}">
                        <tr>
                            <th>Código del producto</th>
                            <th>Cantidad</th>
                            <th>Descuento</th>
                        </tr>
                    </table>
                    </td>
                
            `
                var contenido = document.getElementById("tabla" + element.id);
                for (let i = 0; i < datos.cantidades.length; i++) {
                    contenido.innerHTML += `
                        <tr>
                            <th>${datos.idProducto[i]}</th>
                            <th>${datos.cantidades[i]}</th>
                            <th>${datos.descuentos[i]}%</th>
                        </tr>
                `;
                }
            }
        })
    })

}
function contenidoFactura(element) {
    var container = document.getElementById(`contenido1${element.id}`);
    db.collection("ventas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.id == element.id) {


                var datos = doc.data();
                container.innerHTML =
                    `<center><button class="btn btn-success btn-block" id="${element.id}" onclick="ocultarFactura(this)">Ocultar contenido</button></td></center>
                    <td colspan=10>
                    <table  class="table table-striped table-bordered" id="tablaV${element.id}">
                        <tr>
                            <th>Código del producto</th>
                            <th>Cantidad</th>
                            <th>Descuento</th>
                        </tr>
                    </table>
                    </td>
                
            `
                var contenido = document.getElementById("tablaV" + element.id);
                for (let i = 0; i < datos.cantidades.length; i++) {
                    contenido.innerHTML += `
                        <tr>
                            <th>${datos.idProducto[i]}</th>
                            <th>${datos.cantidades[i]}</th>
                            <th>${datos.descuentos[i]}%</th>
                        </tr>
                `;
                }
            }
        })
    })

}
function ocultarPedido(element) {
    console.log(element.id);
    var container = document.getElementById(`contenido${element.id}`);
    container.innerHTML = "";
}
function ocultarFactura(element){
    console.log(element.id);
    var container = document.getElementById(`contenido1${element.id}`);
    container.innerHTML = "";  
}
function InventarioGlobal() {

    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `
    <br><h3>Lista de productos:</h3><br><div class="overflow-auto"><table id="tabla3" class="table table-striped table-bordered">
     <thead>
       <tr>
         <th>CODIGO</th>
         <th>DESCRIPCION</th>
         <th>PRECIO DE VENTA</th>
         <th>PRECIO DE COMPRA</th>
         <th>STOCK</th>
         
        
       </tr>
     </thead>
   </table></div><div id="aviso1"</div>`;
    var validado = false;
    if (!validado) {
        var aviso1 = document.getElementById("aviso1")
        aviso1.innerHTML += `<center><div id="aviso">No hay productos registrados</div></center>`;
    }
    var tabla3 = document.getElementById("tabla3");
    db.collection("productos")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                datos = doc.data();
                validado = true;
                aviso1.innerHTML = "";
                tabla3.innerHTML +=
                    `<tr>
             <td>${datos.CODIGO}</td>
             <td>${datos.DESCRIPCION}</td>
             <td>${datos.PRECIO_VENTA}</td>
             <td>${datos.PRECIO_COMPRA}</td>
             <td>${datos.STOCK}</td>
             <td><a herf="#main" class="cursor" id="${doc.id}" onclick="observacion(this)"><img src="img/obs.png" width=30></a></td>
             <td><a herf="#main" class="cursor" id="${doc.id}" onclick="mirarObs(this)"><img src="img/ojo.png" width=30></a></td>
             
            
             
           </tr>`;
            })
        });
}
function RealizarDevoluciones() {
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<div class="wrap">
    <center>
    <ul class="tabs">
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Realizar devolución</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Listado de devoluciones</span></a></li>
        <li><a href="#tab3"><span class="fa fa-group"></span><span class="tab-text">Garantías</span></a></li>
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div id="tabOne">
            <table class="table">
            <tr>
               <td> <input list="productos" id="productos1" class="form-control"
                placeholder="Nombre del producto">
                </td>
                <td> 
                <input list="clientes" id="clientes1" class="form-control"
                                placeholder="Nombre del cliente">
                </td>
               
               <td>
               <select class="form-control" id="tipoDeDevolucion">
               <option class="form-select" value="">Seleccione el tipo de devolución</option>
                <option class="form-select" value="garantia">Garantía</option>
                <option class="form-select" value="inventario">Inventario</option>
               </select>
               </td>
               <td> <input id="cantidades" class="form-control" placeholder="cantidad"></td>
               
               
            </tr>
            <tr>
                <td><button class="btn btn-danger" onclick="Devolver()">Ingresar</button></td>
            </tr>
            </table>
            <br>
            <datalist class="form-select" id="productos">
                </datalist>
                <datalist class="form-select" id="clientes">
                </datalist>
            </div>
        </article>
        <article id="tab2">
            <div id="tabTwo">
            
            </div>
        </article>
        <article id="tab3">
            <div id="tabTree">
            
            </div>
        </article>
        

        
    </div>
</div>`;
    var listaProductos = document.getElementById("productos")
    db.collection("productos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            var option = document.createElement("option");
            option.value = datos.CODIGO;
            option.text = `Nombre: ${datos.DESCRIPCION}\n Cantidad: ${datos.STOCK}`;
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
    cargarTabs();
    cargarDevoluciones();
    cargarGarantias();
}
function cargarDevoluciones() {
    var tabTwo = document.getElementById("tabTwo");
    tabTwo.innerHTML = `<h5>Devoluciones por inventario:</h5>
           
   `
    db.collection("devoluciones").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            estado = false;
            for (let j = 0; j < datos.tipo.length; j++) {

                if (datos.tipo[j] == "inventario") {
                    estado = true;
                }
            }

            if (estado) {


                tabTwo.innerHTML += `<br><br>
                    <table id=tabla${doc.id} class="table table-striped table-bordered">
                        <tr><th colspan=2>Código del producto: ${doc.id}<th></tr>
                        <tr>
                            <td>Cantidades</td>
                            <td>Clientes</td>
                            <td>fechas</td>
                        </tr>
                    </table>
            `
                var cantidad = datos.cantidad;
                var cliente = datos.cliente;
                var fecha = datos.fecha;
                for (let j = 0; j < datos.tipo.length; j++) {

                    if (datos.tipo[j] == "inventario") {

                        var tabla = document.getElementById(`tabla${doc.id}`);
                        tabla.innerHTML +=
                            `
                                          <tr>
                                            <td>${cantidad[j]}</td>
                                            <td>${cliente[j]}</td>
                                            <td>${fecha[j]}</td>
                                        
                                          </tr>
                                        `
                    }
                }


            }
        })
    })
}

function cargarGarantias() {
    var tabTree = document.getElementById("tabTree");
    tabTree.innerHTML = `<h5>Devoluciones por Garantía:</h5>
           
   `
    db.collection("devoluciones").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            estado = false;
            for (let j = 0; j < datos.tipo.length; j++) {

                if (datos.tipo[j] == "garantia") {
                    estado = true;
                }
            }

            if (estado) {


                tabTree.innerHTML += `<br><br>
                    <table id=tablaG${doc.id} class="table table-striped table-bordered">
                        <tr><th colspan=2>Código del producto: ${doc.id}<th></tr>
                        <tr>
                            <td>Cantidades</td>
                            <td>Clientes</td>
                            <td>fechas</td>
                        </tr>
                    </table>
            `
                var cantidad = datos.cantidad;
                var cliente = datos.cliente;
                var fecha = datos.fecha;

                for (let j = 0; j < datos.tipo.length; j++) {

                    if (datos.tipo[j] == "garantia") {
                        console.log(cantidad, cliente, fecha)
                        var tabla = document.getElementById(`tablaG${doc.id}`);
                        tabla.innerHTML +=
                            `
                                          <tr>
                                            <td>${cantidad[j]}</td>
                                            <td>${cliente[j]}</td>
                                            <td>${fecha[j]}</td>
                                        
                                          </tr>
                                        `
                    }
                }

            }

        })
    })

}