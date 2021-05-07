function hacerRegistroCliente() {
    event.preventDefault();
    var nit = document.getElementById("nit").value;
    var RazonSocial = document.getElementById("RazonSocial").value;
    var Direccion = document.getElementById("Direccion").value;
    if (nit != "" && RazonSocial != "" && Direccion != "") {
        var Cartera = 0;
        db.collection("clientes").doc(nit).set({
            nit,
            RazonSocial,
            Direccion,
            Cartera
        })
        Swal.fire('Guardado!', '', 'success');
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Campos en blanco',
            text: 'Al parecer no llenaste los campos obligatorios',

        })
    }

}
function EditarCliente(element) {
    event.preventDefault();
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<center><div class="col-md-10" >
    <div class="card">
        <div class="card-body" id="contenido3">
            <form>
                <div class="form-gruop">
                    <h3>Editar Cliente</h3>
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
                    <button onclick="GuardarCambiosCliente()" class="btn btn-danger" id="btn-task-form">
                        Guardar cambios
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>
<br><hr><br></center>`;
    var nit = document.getElementById("nit");
    var RazonSocial = document.getElementById("RazonSocial");
    var Direccion = document.getElementById("Direccion");
    db.collection("clientes").where("nit", "==", element.id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            nit.value = datos.nit;
            RazonSocial.value = datos.RazonSocial;
            Direccion.value = datos.Direccion;
        })
    })
}
function GuardarCambiosCliente() {
    var nit = document.getElementById("nit").value;
    var RazonSocial = document.getElementById("RazonSocial").value;
    var Direccion = document.getElementById("Direccion").value;
    var Cartera = 0;
    if (nit != "" && RazonSocial != "" && Direccion != "") {
        db.collection("clientes").where("nit", "==", nit).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var datos = doc.data();
                Cartera = datos.Cartera;
            })
            db.collection("clientes").doc(nit).set({
                nit,
                RazonSocial,
                Direccion,
                Cartera
            })
            Swal.fire('Guardado!', '', 'success');
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Campos en blanco',
            text: 'Al parecer no llenaste los campos obligatorios',

        })
    }
}
function EliminarCliente(element){
    Swal.fire({
        title: '¿Quieres borrar el cliente?',
        showDenyButton: true,
        confirmButtonText: `borrar`,
        denyButtonText: `No borrar`,
    }).then((result) => {
        if(result.isConfirmed){
            db.collection("clientes").doc(element.id).delete();
            Swal.fire('Borrado!', '', 'success');
        }
    })
}