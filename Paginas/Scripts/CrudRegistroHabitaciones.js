jQuery(function () {
    LlenarComboXServicios("https://localhost:44389/api/Habitaciones/LlenarCombo", "#cbohabitacion");
    LlenarTabla();
});
function LlenarTabla() {
    LlenarTablaXServicios("https://localhost:44389/api/Habitaciones/LlenarTabla", "#tblhabitacion");
}


async function Ejecutar(Metodo, Funcion) {

    const habitaciones = new Habitacion($("#txtid_habitacion").val(), $("#txtnumero_habitacion").val(), $("#cbohabitacion").val(),
        $("#txtestado_habitacion ").val(), $("#txtdescripcion").val());
    let URL = "https://localhost:44389/api/Habitaciones/" + Funcion;
    EjecutarComandoServicio(Metodo, URL, habitaciones);
}
async function Consultar() {
    let id_habitacion = $("#txtid_habitacion").val();
    URL = "https://localhost:44389/api/Habitaciones/ConsultarXID?id=" + id_habitacion;
    const habitacion = await ConsultarServicio(URL);
    if (habitacion != null) {
        $("#txtnumero_habitacion").val(habitacion.numero_habitacion);
        $("#cbohabitacion").val(habitacion.id_tipo_habitacion);
        $("#txtestado_habitacion").val(habitacion.estado_habitacion);
        $("#txtdescripcion").val(habitacion.descripcion);
        $("#dvMensaje").html("");

    }
    else {

        $("#dvMensaje").html("La habitacion no existe en la base de datos");
        $("#txtnumero_habitacion").val("");
        $("#cbohabitacion").val("");
        $("#txtestado_habitacion").val("");
        $("#txtdescripcion").val("");
    }
}

class Habitacion {
    constructor(id_habitacion, numero_habitacion, id_tipo_habitacion, estado_habitacion, descripcion) {
        this.id_habitacion = id_habitacion;
        this.numero_habitacion = numero_habitacion;
        this.id_tipo_habitacion = id_tipo_habitacion;
        this.estado_habitacion = estado_habitacion;
        this.descripcion = descripcion;

    }
}