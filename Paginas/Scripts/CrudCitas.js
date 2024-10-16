
async function Ejecutar(Metodo, Funcion) {

    const citas = new Citas($("#txtid_cita").val(), $("#txtid_evento").val(), $("#txthora_cita").val(), $("#txtespecialidad").val(),
        $("#txtmotivo").val(), $("#txtestado_cita").val());
    let URL = "https://localhost:44389/api/Citas/" + Funcion;
    EjecutarComandoServicio(Metodo, URL, citas);
}
async function Consultar() {
    let id_cita = $("#txtid_cita").val();
    URL = "https://localhost:44389/api/Citas/ConsultarXID?id=" + id_cita;
    const cita = await ConsultarServicio(URL);
    if (cita != null) {
        $("#txtid_evento").val(cita.id_evento);
        $("#txthora_cita").val(cita.hora_cita);
        $("#txtespecialidad").val(cita.especialidad);
        $("#txtmotivo").val(cita.motivo);
        $("#txtestado_cita").val(cita.estado_cita);
    }
    else {

        $("#dvMensaje").html("La cita no existe en la base de datos");
        $("#txtid_evento").val("");
        $("#txthora_cita").val("");
        $("#txtespecialidad").val("");
        $("#txtmotivo").val("");
        $("#txtestado_cita").val("");
    }
}

class Citas {
    constructor(id_cita, id_evento, hora_cita, especialidad, motivo, estado_cita) {
        this.id_cita = id_cita;
        this.id_evento = id_evento;
        this.hora_cita = hora_cita;
        this.especialidad = especialidad;
        this.motivo = motivo;
        this.estado_cita = estado_cita;
    }
}