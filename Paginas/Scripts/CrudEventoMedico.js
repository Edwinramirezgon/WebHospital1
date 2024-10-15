jQuery(function () {
    $("#dvMenu").load("../Paginas/Menu.html")
});

async function Ejecutar(Metodo, Funcion) {

    const eventomedico = new EventoMedico($("#txtid_evento").val(), $("#txtid_paciente").val(), $("#txtid_medico").val(), $("#txtfecha_evento").val(),
        $("#txtdescripcion").val());
    let URL = "https://localhost:44389/api/EventosMedicos/" + Funcion;
    EjecutarComandoServicio(Metodo, URL, eventomedico);
}
async function Consultar() {
    let id_evento = $("#txtid_evento").val();
    URL = "https://localhost:44389/api/EventosMedicos/ConsultarXID?id=" + id_evento;
    const evento = await ConsultarServicio(URL);
    if (evento != null) {
        $("#txtid_paciente").val(evento.id_paciente);
        $("#txtid_medico").val(evento.id_medico);
        $("#txtfecha_evento").val(evento.fecha_evento.split('T')[0]);
        $("#txtdescripcion").val(evento.descripcion);
       
    }
    else {

        $("#dvMensaje").html("El evento medico no existe en la base de datos");
    }
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