jQuery(function () {
    LlenarComboXServiciosAuth("https://localhost:44389/api/RegistroUrgencias/LlenarCombo", "#cbopacientes");
    LlenarComboXServiciosAuth("https://localhost:44389/api/RegistroUrgencias/LlenarCombo2", "#cbomedicos");
    LlenarComboXServiciosAuth("https://localhost:44389/api/RegistroUrgencias/LlenarCombo", "#editcbopacientes");
    LlenarComboXServiciosAuth("https://localhost:44389/api/RegistroUrgencias/LlenarCombo2", "#editcbomedicos");
    LlenarTabla();
});
function LlenarTabla() {
    const tabla = $('#tblurgencias').DataTable();
    tabla.clear().destroy();
    LlenarTablaXServiciosAuth("https://localhost:44389/api/RegistroUrgencias/LlenarTabla", "#tblurgencias");
    const tabla2 = $('#tblurgencias').DataTable();
    tabla2.clear().destroy();
    LlenarTablaXServiciosAuth("https://localhost:44389/api/RegistroUrgencias/LlenarTabla", "#tblurgencias");
}



async function EjecutarModal(Metodo, Funcion) {


    let estado_urgencia = $("#edittxtestado").val(); 
    let id_urgencia = $("#edittxtid").val();
  

    const urgencia = new EventoMedico($("#edittxtid").val(), $("#editcbopacientes").val(), $("#editcbomedicos").val(), $("#edittxtfecha_evento ").val(),
        $("#edittxtdescripcion").val());
    let URL = "https://localhost:44389/api/RegistroUrgencias/" + Funcion + "?estado_urgencia=" + estado_urgencia;
    EjecutarServicioAuth(Metodo, URL, urgencia);
    LlenarTabla();

}

function abrirModalEditar(ID, ID_PACIENTE, ID_MEDICO, FECHA_DE_URGENCIA, DESCRIPCION_DE_URGENCIA, ESTADO_DE_URGENCIA) {
    $("#edittxtid").val(ID);
    $("#editcbopacientes").val(ID_PACIENTE);
    $("#editcbomedicos").val(ID_MEDICO);
    $("#edittxtfecha_evento").val(FECHA_DE_URGENCIA.split('T')[0]);
    $("#edittxtdescripcion").val(DESCRIPCION_DE_URGENCIA);
    $("#edittxtestado").val(ESTADO_DE_URGENCIA);
    $("#dvMensaje").html("");

    $('#modalEditar').modal('show');
}



function Eliminar(ID) {
    const urgencia = new EventoMedico(ID, $("#cbopacientes").val(), $("#cbomedicos").val(), $("#txtfecha_evento ").val(),
        $("#txtdescripcion").val());
    let URL = "https://localhost:44389/api/RegistroUrgencias/Eliminar?estado_urgencia=" + ID;
    EjecutarServicioAuth('DELETE', URL, urgencia);
}

async function Ejecutar(Metodo, Funcion) {


    let estado_urgencia = $("#txtestado").val(); 
    let id_urgencia = $("#txtid").val();
  

    const urgencia = new EventoMedico($("#txtid").val(), $("#cbopacientes").val(), $("#cbomedicos").val(), $("#txtfecha_evento ").val(),
        $("#txtdescripcion").val());
    let URL = "https://localhost:44389/api/RegistroUrgencias/" + Funcion + "?estado_urgencia=" + estado_urgencia;
    EjecutarServicioAuth(Metodo, URL, urgencia);
    LlenarTabla();
}

class EventoMedico {
    constructor(id_evento, id_paciente, id_medico, fecha_evento, descripcion) {
        this.id_evento = id_evento;
        this.id_paciente = id_paciente;
        this.id_medico = id_medico;
        this.fecha_evento = fecha_evento;
        this.descripcion = descripcion;

    }
}