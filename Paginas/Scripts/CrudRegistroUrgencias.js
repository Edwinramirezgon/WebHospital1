jQuery(function () {
    LlenarComboXServiciosAuth("https://localhost:44389/api/RegistroUrgencias/LlenarCombo", "#cbopacientes");
    LlenarComboXServiciosAuth("https://localhost:44389/api/RegistroUrgencias/LlenarCombo2", "#cbomedicos");
    LlenarTabla();
});
function LlenarTabla() {
    LlenarTablaXServiciosAuth("https://localhost:44389/api/RegistroUrgencias/LlenarTabla", "#tblurgencias");
}


async function Consultar() {
    let id_urgencia = $("#txtid").val();
    URL = "https://localhost:44389/api/RegistroUrgencias/ConsultarXID?id=" + id_urgencia;
    const urgencia = await ConsultarServicioAuth(URL);
    if (urgencia != null) {
        $("#cbopacientes").val(urgencia.id_paciente);
        $("#cbomedicos").val(urgencia.id_medico);
        $("#txtfecha_evento").val(urgencia.fecha_evento.split('T')[0]);
        $("#txtdescripcion").val(urgencia.descripcion);
        URL2 = "https://localhost:44389/api/RegistroUrgencias/ConsultarXID2?id=" + id_urgencia
        const urg = await ConsultarServicioAuth(URL2);
        $("#txtestado").val(urg.estado_urgencia);       
        $("#dvMensaje").html("");



    }
    else {

        $("#dvMensaje").html("El paciente no existe en la base de datos");
        $("#cbopacientes").val("");
        $("#cbomedicos").val("");
        $("#txtfecha_evento").val("");
        $("#txtdescripcion").val("");
        $("#txtestado").val("");     


    }
}
function Editar(ID, ID_PACIENTE, ID_MEDICO, FECHA_DE_URGENCIA, DESCRIPCION_DE_URGENCIA, ESTADO_DE_URGENCIA) {
    $("#txtid").val(ID);
    $("#cbopacientes").val(ID_PACIENTE);
    $("#cbomedicos").val(ID_MEDICO);
    $("#txtfecha_evento").val(FECHA_DE_URGENCIA.split('T')[0]);
    $("#txtdescripcion").val(DESCRIPCION_DE_URGENCIA); 
    $("#txtestado").val(ESTADO_DE_URGENCIA);
    $("#dvMensaje").html("");
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