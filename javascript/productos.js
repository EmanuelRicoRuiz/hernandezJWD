function hacerRegistroProducto(){
    event.preventDefault();

    var codigoProducto = document.getElementById("codidoPR").value;
    var nombreProducto = document.getElementById("nombrePR").value;
    var precioProducto = document.getElementById("precioPr").value;
    var CostoProducto = document.getElementById("precioPr").value;
    var inventarioProd = document.getElementById("stockPr").value;
    var proveedor = document.getElementById("proveedores1").value;
    var limiteM = document.getElementById("limiteM").value;
    precioProducto = parseInt(precioProducto, 10);
    CostoProducto = parseInt(CostoProducto, 10);
    inventarioProd = parseInt(inventarioProd, 10);
    limiteM = parseInt(limiteM, 10);
    console.log(codigoProducto);
    estado = true;
    estado2 = false;
    db.collection("productos").where("codigoProducto", "==", codigoProducto)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                datos = doc.data();
                estado = false;
                console.log(estado)
            });
            if (codigoProducto != "" && nombreProducto != "" && precioProducto != NaN && CostoProducto != NaN && inventarioProd != NaN && proveedor != "" && limiteM != NaN) {
                if (estado) {
                    firebase.auth().onAuthStateChanged((user) => {
                        registradoPor=user.uid;
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
                    aviso.innerHTML = `<p id="aviso">producto registrado exitosamente</p>`;
                    window.location.href="#inicio";
                } else {
                    aviso = document.getElementById("sugerencias");
                    aviso.innerHTML = `<p id="segurencia">el producto ya existe</p>`;
                }


            } else {
                aviso = document.getElementById("sugerencias");
                aviso.innerHTML = `<p id="segurencia">ningún campo debe estar vacío</p>`;
            }
        })
}
function SubirXLSX(){
    var archivo=document.getElementById("archivoXLSX").files[0];
    ingresarXLSX(archivo);

}