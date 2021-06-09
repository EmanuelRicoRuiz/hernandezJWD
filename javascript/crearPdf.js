function facturaPdf(element) {
    var user = firebase.auth().currentUser;
    db.collection("usuarios").where("uid","==",user.uid).get().then((querySnapshot)=>{
        querySnapshot.forEach((doc6)=>{
            var datos6=doc6.data();
            db.collection("tiposUsuario").where("usuario","==",datos6.tipoDeUsuario).get().then((querySnapshot)=>{
                querySnapshot.forEach((doc7)=>{
                    var datos7=doc7.data();
                    if(datos7.permisos[11]){
                        var IdVenta = element.id;
    var doc = new jsPDF();
    
    var x = 5;
    var y = 30;
    
    var entrada = false;
    

    doc.setFontSize(9);
    db.collection("ventas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc1) => {
            if (doc1.id == IdVenta) {
                var datos = doc1.data();
                db.collection("clientes").where("nit", "==", datos.cliente).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc2) => {
                        var datos2 = doc2.data();
                        db.collection("usuarios").where("uid", "==", datos.vendedor).get().then(async (querySnapshot) => {
                            querySnapshot.forEach((doc3) => {
                                function cabecera() {
                                    var datos3 = doc3.data();
                                    var titulo="Comercializadora los Hernandez G";
                                    var datosCliente = ` Nombre: ${datos2.RazonSocial}\nNit: ${datos2.nit}\nDirección: ${datos2.Direccion}\nTeléfono: ${datos2.telefono}\nCiudad: ${datos2.ciudad}\nBarrio: ${datos2.barrio}`
                                    var datosFactura = `Remisión: #${datos.NumeroFactura}\nPago: ${datos.plazo} Días\nFecha: ${datos.fecha}\nFecha de vencimiento: ${datos.fechaVencimiento}\nVendedor: ${datos3.nombre} ${datos3.apellido}`
                                    doc.setFontSize(15);
                                    doc.text(x,y,titulo);
                                    doc.setFontSize(9);
                                    y+=20
                                    doc.text(x, y, datosCliente);
                                    doc.text(x + 80, y, datosFactura);
                                }
                                cabecera();
                                var y1 = y + 50;
                                var columns = ["item", "Código", "Descripción", "Cantidad", "Unitario","Descuento", "Total"];
                                var data = [];
                                var cantidades = datos.cantidades;
                                var idProducto = datos.idProducto;
                                var cont = 0;
                                for (let i = 0; i < idProducto.length; i++) {
                                    db.collection("productos").get().then((querySnapshot) => {
                                        querySnapshot.forEach((doc4) => {
                                            if (doc4.id == idProducto[i]) {
                                                cont += 1;
                                                datos4 = doc4.data();
                                                
                                                console.log();
                                                data.push([cont, datos4.CODIGO, datos4.DESCRIPCION, ingresar(cantidades[i]), ingresar(datos4.PRECIO_VENTA),datos.descuentos[i], ingresar(cantidades[i]*datos4.PRECIO_VENTA-(cantidades[i]*datos4.PRECIO_VENTA*(datos.descuentos[i]/100)))]);
                                                xp = 10;
                                                yp = 90;
                                                xc = 5;
                                                yc = 90;
                                                if (idProducto.length == i + 1) {
                                                    function columnas() {
                                                        doc.setFontType("bold");
                                                        for (let h = 0; h < columns.length; h++) {
                                                            doc.text(xc, yc, columns[h].toString())
                                                            if (h == 2) {
                                                                xc += 65
                                                            } else {
                                                                xc += 22
                                                            }
                                                        }
                                                        xc = 5;
                                                        yc = 90;
                                                        doc.setFontType("normal");
                                                    }
                                                    columnas();
                                                    for (let j = 0; j < data.length; j++) {
                                                        aux = data[j]
                                                        xp = 5
                                                        yp += 5

                                                        for (let k = 0; k < aux.length; k++) {

                                                            doc.text(xp, yp, aux[k].toString())
                                                            if (k == 2) {
                                                                xp += 65
                                                            } else {
                                                                xp += 22
                                                            }


                                                        }
                                                        if (j % 16 == 0 && j != 0) {
                                                            yp = 90
                                                            doc.addPage();
                                                            
                                                            cabecera();
                                                            columnas();
                                                        }
                                                        if (data.length == j + 1) {
                                                            doc.setFontSize(20);
                                                            doc.text(150, yp + 15, `Total: ${ingresar(datos.suma)}`)
                                                        }
                                                    }

                                                    doc.save("test.pdf");
                                                }
                                            }
                                        })


                                    })

                                }

                            })

                        })

                    })

                })

            }
        })

    })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'No permitido',
                            text: 'Usted no tiene permitido hacer esta acción',
                            
                          })
                    }
                })
            })
        })
    })
    


}