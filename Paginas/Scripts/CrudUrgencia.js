

async function Ejecutar(Metodo, Funcion) {

    const urgencias = new URGENCIA($("#txtid_urgencia").val(), $("#txtid_evento").val(), $("#txtestado_urgencia").val(), $("#txtid_hospitalizacion ").val());
    let URL = "https://localhost:44389/api/Urgencias/" + Funcion;
    EjecutarServicioAuth(Metodo, URL, urgencias);
}
async function Consultar() {
    let id_urgencia = $("#txtid_urgencia").val();
    URL = "https://localhost:44389/api/Urgencias/ConsultarXID?id=" + id_urgencia;
    const urgencia = await ConsultarServicioAuth(URL);
    if (urgencia != null) {
        $("#txtid_evento").val(urgencia.id_evento);
        $("#txtestado_urgencia").val(urgencia.estado_urgencia);
        $("#txtid_hospitalizacion").val(urgencia.id_hospitalizacion);
        $("#dvMensaje").html("");


    }
    else {

        $("#dvMensaje").html("La urgencia no existe en la base de datos");
        $("#txtid_evento").val("");
        $("#txtestado_urgencia").val("");
        $("#txtid_hospitalizacion").val("");
    }
}

class URGENCIA {
    constructor(id_urgencia, id_evento, estado_urgencia, id_hospitalizacion) {
        this.id_urgencia = id_urgencia;
        this.id_evento = id_evento;
        this.estado_urgencia = estado_urgencia;
        this.id_hospitalizacion = id_hospitalizacion;       

    }
}