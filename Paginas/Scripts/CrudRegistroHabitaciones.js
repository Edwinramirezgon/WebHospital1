jQuery(function () {
    LlenarComboXServiciosAuth("https://localhost:44389/api/Habitaciones/LlenarCombo", "#cbohabitacion");
    LlenarComboXServiciosAuth("https://localhost:44389/api/Habitaciones/LlenarCombo", "#editTipoHabitacion");
    LlenarTabla();
});
function LlenarTabla() {

    const tabla = $('#tblhabitacion').DataTable();
    tabla.clear().destroy();
    LlenarTablaXServiciosAuth("https://localhost:44389/api/Habitaciones/LlenarTabla", "#tblhabitacion");
    const tabla2 = $('#tblhabitacion').DataTable();
    tabla2.clear().destroy();
    LlenarTablaXServiciosAuth("https://localhost:44389/api/Habitaciones/LlenarTabla", "#tblhabitacion");
}


function Eliminar(ID) {
    const habitaciones = new Habitacion(ID, "", "", "", "");
    let URL = "https://localhost:44389/api/Habitaciones/Eliminar?id_habitacion=" + ID;
    EjecutarServicioAuth('DELETE', URL, habitaciones);
}



async function Ejecutar(Metodo, Funcion) {

    const habitaciones = new Habitacion($("#txtid_habitacion").val(), $("#txtnumero_habitacion").val(), $("#cbohabitacion").val(),
        $("#txtestado_habitacion ").val(), $("#txtdescripcion").val());
    let URL = "https://localhost:44389/api/Habitaciones/" + Funcion;
    EjecutarServicioAuth(Metodo, URL, habitaciones);
}


async function EjecutarModal(Metodo, Funcion) {

    const habitaciones = new Habitacion($("#editIdHabitacion").val(), $("#editNumeroHabitacion").val(), $("#editTipoHabitacion").val(),
        $("#editEstadoHabitacion ").val(), $("#editDescripcion").val());
    let URL = "https://localhost:44389/api/Habitaciones/" + Funcion;
    EjecutarServicioAuth(Metodo, URL, habitaciones);
    LlenarTabla();
}

function abrirModalEditar(id, numero, estado, descripcion, tipoId) {
    $('#editIdHabitacion').val(id);
    $('#editNumeroHabitacion').val(numero);
    $('#editEstadoHabitacion').val(estado);
    $('#editDescripcion').val(descripcion);
    $('#editTipoHabitacion').val(tipoId);

    $('#modalEditar').modal('show');
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