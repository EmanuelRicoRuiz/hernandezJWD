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
    <br><h3>Lista de productos:</h3><br><table id="tabla3" class="table table-striped table-bordered">
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
   </table>`;
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
        var id = element.id;
        console.log(id);
        db.collection("productos").doc(id).delete();
        Swal.fire('Borrado!', '', 'success');

        cargarProductosLista();
    })

}
function EditarProducto(element) {

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
    console.log(ventaGarray);
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
                console.log(botonGuardar);
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
    
    


}