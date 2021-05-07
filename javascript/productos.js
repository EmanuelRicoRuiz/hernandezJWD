function hacerRegistroProducto() {
    event.preventDefault();

    var codigoProducto = document.getElementById("codidoPR").value;
    var nombreProducto = document.getElementById("nombrePR").value;
    var precioProducto = document.getElementById("precioPr").value;
    var CostoProducto = document.getElementById("precioPr").value;
    var inventarioProd = document.getElementById("stockPr").value;
    var proveedor = document.getElementById("proveedores1").value;
    var limiteM = document.getElementById("limiteM").value;

    CostoProducto = parseInt(CostoProducto, 10);
    inventarioProd = parseInt(inventarioProd, 10);
    limiteM = parseInt(limiteM, 10);

    estado = true;
    estado2 = false;
    db.collection("productos").where("codigoProducto", "==", codigoProducto)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                datos = doc.data();
                estado = false;

            });
            if (codigoProducto != "" && nombreProducto != "" && precioProducto != NaN && CostoProducto != NaN && inventarioProd != NaN && proveedor != "" && limiteM != NaN) {
                if (estado) {
                    firebase.auth().onAuthStateChanged((user) => {
                        registradoPor = user.uid;
                        db.collection('productos').doc(codigoProducto).set({
                            proveedor,
                            codigoProducto,
                            nombreProducto,
                            precioProducto,
                            inventarioProd,
                            CostoProducto,
                            limiteM,
                            registradoPor
                        })
                    })


                    codigoProducto.value = "";
                    nombreProducto.value = "";
                    precioProducto.value = "";
                    inventarioProd.value = "";
                    proveedor.value = "";
                    limiteM.value = "";
                    aviso = document.getElementById("sugerencias");
                    Swal.fire('Guardado!', '', 'success');
                    cargarProductosLista();
                } else {

                    Swal.fire({

                        icon: 'info',
                        title: 'Ya hay un producto con este código',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }


            } else {
                Swal.fire({

                    icon: 'info',
                    title: 'Ningún campo debe estar vacío',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
}
function SubirXLSX() {
    try {
        var carga = document.getElementById("carga");
        carga.innerHTML = `<img src="img/carga.gif" width="10%">`;
        archivoXLSX = document.getElementById("archivoXLSX").files[0];
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(archivoXLSX);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });

            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);

                firebase.auth().onAuthStateChanged((user) => {
                    try {
                        var registradoPor = user.uid;
                        for (let i = 0; i < rowObject.length; i++) {
                            var CostoProducto = rowObject[i].CostoProducto;
                            var codigoProducto = rowObject[i].codigoProducto;
                            var inventarioProd = rowObject[i].inventarioProd;
                            var limiteM = rowObject[i].limiteM;
                            var nombreProducto = rowObject[i].nombreProducto;
                            var precioProducto = rowObject[i].precioProducto;
                            var proveedor = rowObject[i].proveedor;
                            codigoProducto = codigoProducto.toString();

                            registradoPor = user.uid
                            db.collection("productos").doc(codigoProducto).set({
                                CostoProducto,
                                codigoProducto,
                                inventarioProd,
                                limiteM,
                                nombreProducto,
                                precioProducto,
                                proveedor,
                                registradoPor

                            })
                            carga.innerHTML = "";
                            Swal.fire('Guardado!', '', 'success');

                            cargarProductosLista();

                        }
                    } catch (e) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Nombre inválidos',
                            text: 'al parecer los nombres de las celdas no están correctas ',

                        })
                        carga.innerHTML = "";
                    }

                })
            });

        }

    } catch (e) {
        console.log(e);
    }

}
function cargarProductosLista() {
    var tabTree = document.getElementById("tabTree");
    tabTree.innerHTML = "";
    tabTree.innerHTML = `
    <br><h3>Lista de productos:</h3><br><div class="overflow-auto"><table id="tabla3" class="table table-striped table-bordered">
     <thead>
       <tr>
         <th>Código del producto</th>
         <th>Nombre del producto</th>
         <th>inventario</th>
         <th>Límite inferior</th>
         <th>precio del producto</th>
         <th>Proveedor</th>
         <th>costo</th>
         <th colspan=2>Acciones</th>
       </tr>
     </thead>
   </table></div>`;
    var validado = false;
    if (!validado) {
        tabTree.innerHTML += `<center><div id="aviso">No hay productos registrados</div></center>`;
    }
    var tabla3 = document.getElementById("tabla3");
    db.collection("productos")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                datos = doc.data();
                validado = true;
                var aviso = document.getElementById("aviso");
                aviso.innerHTML = "";
                tabla3.innerHTML +=
                    `<tr>
             <td>${datos.codigoProducto}</td>
             <td>${datos.nombreProducto}</td>
             <td>${datos.inventarioProd}</td>
             <td>${datos.limiteM}</td>
             <td>${datos.precioProducto}</td>
             <td>${datos.proveedor}</td>
             <td>${datos.CostoProducto}</td>
             <th><button class="btn btn-danger" id="${doc.id}" onclick="eliminarProducto(this)">Eliminar</button></th>
             <th><button class="btn btn-danger" id="${doc.id}" onclick="EditarProducto(this)">Editar</button></th>
             
           </tr>`;
            })
        });

}
function eliminarProducto(element) {
    Swal.fire({
        title: '¿Quieres borrar este producto?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Borrar`,
        denyButtonText: `No borrar`,
    }).then((result) => {
        if(result.isConfirmed){
            var id = element.id;
            console.log(id);
            db.collection("productos").doc(id).delete();
            Swal.fire('Borrado!', '', 'success');
    
            cargarProductosLista();
        }
        
    })

}
function EditarProducto(element) {
    var feed = document.getElementById("main");
    db.collection("productos").where("codigoProducto", "==", element.id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                datos = doc.data();
                feed.innerHTML = `<br><h3>Datos del producto</h3>`;

                feed.innerHTML += `<center><div class="col-md-10" >
        <div class="card">
            <div class="card-body" id="contenido3">
                <form>
                    <div class="form-group">
                        <h5>Código del producto*</h5>
                        <input type="text" id="codidoPR" readonly class="form-control" placeholder="código*" value="${datos.codigoProducto}">
                    </div>
                    <div class="form-group">
                        <h5>Nombre del producto*</h5>
                        <input type="text" id="nombrePR" class="form-control" placeholder="Nombre*" value="${datos.nombreProducto}">
                    </div>
                    <div class="form-group">
                        <h5>Precio del producto*</h5>
                        <input type="text" id="precioPr" class="form-control" placeholder="precio*" value="${datos.precioProducto}">
                    </div>
                    <div class="form-group">
                        <h5>Costo del producto*</h5>
                        <input type="text" id="costoPr" class="form-control" placeholder="Costo*" value="${datos.CostoProducto}">
                    </div>
                    <div class="form-group">
                        <h5>Cantidad del producto*</h5>
                        <input type="text" id="stockPr" class="form-control" placeholder="cantidad*" value="${datos.inventarioProd}">
                    </div>
                    <div class="form-group">
                        <h5>Proveedor</h5>
                        <select class="form-control" id="proveedores1">
                        
                    <option value="01">proveedores</option>
                </select>
                    </div>
                    <div class="form-group">
                        <h5>Límite Mínimo del producto*</h5>
                        <input type="text" id="limiteM" class="form-control" placeholder="límite mínimo*" value="${datos.limiteM}">
                    </div>
                    <div class="form-group">
                        <h5>Nueva cantidad</h5>
                        <input type="text" id="NuevaCantidad" class="form-control" placeholder="Nueva cantidad">
                    </div>
                    <div class="form-group">
                        <h5>Número de la factura de compra</h5>
                        <input type="text" id="NumeroFactura" class="form-control" placeholder="Numero de la Factura">
                    </div>
                    <hr>
                    <div id="sugerencias" class="form-gruop">
    
                    </div>
                    <br>
                    <div id="botonE">
                        <button onclick="GuardarCambiosProducto()" class="btn btn-danger" id="btn-task-form">
                            Guardar cambios
                        </button>
                    </div>
    
                </form>
            </div>
        </div>
    </div>
    
        `;
                var tipoDeUsuario = document.getElementById("tipoDeUsuario");



            })
        })
}
var ventaGarray = [];
function Emitir() {
    var cantidad = document.getElementById("cantidadVenta").value;
    var idProducto = document.getElementById("productos1").value;
    cantidad = parseInt(cantidad, 10);
    var ventaG = {
        cantidad, idProducto
    }
    ventaGarray.push(ventaG);

    pintarTabla(ventaGarray);

}
function pintarTabla(ventaGarray) {

    var items = document.getElementById("tabla4");
    items.innerHTML = "";
    for (let i = 0; i < ventaGarray.length; i++) {
        db.collection("productos").where("codigoProducto", "==", ventaGarray[i].idProducto).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var datos = doc.data();
                items.innerHTML += `
                <tr>
                    <td>${datos.codigoProducto}</td>
                    <td>${datos.nombreProducto}</td>
                    <td>${datos.inventarioProd}</td>
                    <td>${datos.precioProducto}</td>
                    <td>${ventaGarray[i].cantidad}</td>
                    <th><button class="btn btn-danger" id="${doc.id}" onclick="EliminarItem(this)">Eliminar</button></th>
                    <th><button class="btn btn-danger" id="${doc.id}" onclick="EditarItem(this)">Editar</button></th>
                </tr>
                `;

                var botonGuardar = document.getElementById("botonGuadar");

                botonGuardar.innerHTML = `<button class="btn btn-success" onclick="GuardarPedido()">Guardar</button>`;

            })
        })
    }
    var cantidad = document.getElementById("cantidadVenta");
    var idProducto = document.getElementById("productos1");
    cantidad.value = "";
    idProducto.value = "";
}
function EliminarItem(element) {
    var idElemento = element.id;
    for (let i = 0; i < ventaGarray.length; i++) {
        if (idElemento == ventaGarray[i].idProducto) {
            ventaGarray.splice(i);
        }
    }
    pintarTabla(ventaGarray);
}
function EditarItem(element) {
    var cantidad_nueva;
    Swal.fire({
        title: 'Ingrese la nueva cantidad',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Ingresar',
        showLoaderOnConfirm: true,
        CancelButtonText: 'Cancelar'

    }).then((result) => {
        if (result.isConfirmed) {
            cantidad_nueva = result.value;
            cantidad_nueva = parseInt(cantidad_nueva, 10);
            for (let i = 0; i < ventaGarray.length; i++) {
                if (element.id == ventaGarray[i].idProducto) {
                    ventaGarray[i].cantidad = cantidad_nueva;
                }
            }
            pintarTabla(ventaGarray);
        }
    })

}
function GuardarPedido() {
    var cantidades = [];
    var idProducto = [];
    for (let i = 0; i < ventaGarray.length; i++) {
        cantidades[i] = ventaGarray[i].cantidad;
        idProducto[i] = ventaGarray[i].idProducto;
    }
    var entrada = true;
    var suma=0
    db.collection("productos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            datos = doc.data();
            for (let i = 0; i < idProducto.length; i++) {
                if (datos.codigoProducto == idProducto[i]) {
                    if (datos.inventarioProd < cantidades[i]) {
                        entrada = false;
                    }else{
                        suma=suma+(cantidades[i]*datos.precioProducto)
                    }
                }
            }
        })
        if (entrada) {
            firebase.auth().onAuthStateChanged((user) => {
                var vendedor = user.uid;
                var date = new Date();
                var fecha = [date.getDate(), date.getMonth() + 1, date.getFullYear()]
                var entregado = false;
                var pagado=false;
                var debe=suma;
                db.collection("ventas").doc().set({
                    cantidades,
                    idProducto,
                    entregado,
                    vendedor,
                    fecha,
                    pagado,
                    suma,
                    debe
                })
                for (let i = 0; i < idProducto.length; i++) {

                    db.collection("productos").where("codigoProducto", "==", idProducto[i]).get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {

                                var datos = doc.data();
                                var codigoProducto = datos.codigoProducto;
                                var nombreProducto = datos.nombreProducto;
                                var inventarioProd = datos.inventarioProd;
                                var limiteM = datos.limiteM;
                                var precioProducto = datos.precioProducto;
                                var proveedor = datos.proveedor;
                                var CostoProducto = datos.CostoProducto;
                                var registradoPor = datos.registradoPor;
                                inventarioProd = inventarioProd - cantidades[i];
                                console.log(inventarioProd);
                                db.collection("productos").doc(doc.id).set({
                                    codigoProducto,
                                    nombreProducto,
                                    inventarioProd,
                                    limiteM,
                                    precioProducto,
                                    proveedor,
                                    CostoProducto,
                                    registradoPor
                                })
                            })

                            ventaGarray.splice(i);
                            var botonGuadar = document.getElementById("botonGuadar");
                            botonGuadar.innerHTML = "";

                            pintarTabla(ventaGarray)
                        })

                }
                Swal.fire('Guardado!', '', 'success');

            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Inventario insuficiente',
                text: 'Al parecer las cantidades que digitaste, superan la cantidad existente',

            })
        }
    })



}
function GuardarCambiosProducto() {
    event.preventDefault();
    var codidoPR = document.getElementById("codidoPR").value;
    var nombrePR = document.getElementById("nombrePR").value;
    var precioPr = document.getElementById("precioPr").value;
    var costoPr = document.getElementById("costoPr").value;
    var stockPr = document.getElementById("stockPr").value;
    var limiteM = document.getElementById("limiteM").value;
    var NuevaCantidad = document.getElementById("NuevaCantidad").value;
    var NumeroFactura = document.getElementById("NumeroFactura").value;
    precioPr = parseInt(precioPr, 10);
    costoPr = parseInt(costoPr, 10);
    stockPr = parseInt(stockPr, 10);
    limiteM = parseInt(limiteM, 10);

    NuevaCantidad = parseInt(NuevaCantidad, 10);
    entrada = !Number.isNaN(NuevaCantidad)
    entrada2=false;
    console.log(entrada);

    if (codidoPR != "" && nombrePR != "" && precioPr != NaN && costoPr != NaN && stockPr != NaN && limiteM != NaN) {
        if (entrada && NumeroFactura != "") {

            var productos = [];
            var cantidades = [];
            var costos=[];
            db.collection("compras").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.id == NumeroFactura) {
                        datos = doc.data();
                        productos = datos.productos;
                        cantidades = datos.cantidades;
                        costos=datos.costos;
                    }

                })

                productos.push(codidoPR);
                cantidades.push(NuevaCantidad);
                costos.push(costoPr);
                var fecha = new Date();
                var fecha1 = [fecha.getDate(), fecha.getMonth() + 1, fecha.getFullYear()];
                console.log(fecha1);
                db.collection('compras').doc(NumeroFactura).set({
                    productos,
                    cantidades,
                    fecha1,
                    NumeroFactura,
                    costos
                })
                db.collection("productos").where("codigoProducto", "==", codidoPR).get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc1) => {

                            var datos = doc1.data();
                            var codigoProducto = datos.codigoProducto;
                            var nombreProducto = nombrePR;
                            var inventarioProd = datos.inventarioProd;
                            var precioProducto = precioPr;
                            var proveedor = datos.proveedor;
                            var CostoProducto = costoPr;
                            var registradoPor = datos.registradoPor;
                            inventarioProd = inventarioProd + NuevaCantidad;
                            console.log(limiteM);
                            db.collection("productos").doc(doc1.id).set({
                                codigoProducto,
                                nombreProducto,
                                inventarioProd,
                                limiteM,
                                precioProducto,
                                proveedor,
                                CostoProducto,
                                registradoPor
                            })
                            Swal.fire('Guardado!', '', 'success');

                        })


                    })


            })
        } else if (!entrada || NumeroFactura == "") {
            Swal.fire({
                icon: 'info',
                title: 'Si va a ingresar una compra, debe especificar el código de la factura de compra y la cantidad de la compra para este producto',
                showConfirmButton: false,
                timer: 1500
            })
            Swal.fire({
                title: '¿Quieres solo actualizar los datos?',
                showDenyButton: true,
                confirmButtonText: `Guardar`,
                denyButtonText: `No Guardar`,
            }).then((result) => {
                if(result.isConfirmed){
                    db.collection("productos").where("codigoProducto", "==", codidoPR).get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc1) => {

                            var datos = doc1.data();
                            var codigoProducto = datos.codigoProducto;
                            var nombreProducto = nombrePR;
                            var inventarioProd = stockPr;
                            var precioProducto = precioPr;
                            var proveedor = datos.proveedor;
                            var CostoProducto = costoPr;
                            var registradoPor = datos.registradoPor;
                            db.collection("productos").doc(doc1.id).set({
                                codigoProducto,
                                nombreProducto,
                                inventarioProd,
                                limiteM,
                                precioProducto,
                                proveedor,
                                CostoProducto,
                                registradoPor
                            })
                            Swal.fire('Guardado!', '', 'success');

                        })


                    })
                }
                
            })
        }
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Llene los campos obligatorios',
            showConfirmButton: false,
            timer: 1500
        })
    }
}