
async function Ejecutar(Metodo, Funcion) {

    const hospitalizaciones = new Hospitalizacion($("#txtid_hospitalizacion").val(), $("#txtid_evento").val(), $("#txthabitacion").val(),
        $("#txtestado_hospitalizacion ").val());
    let URL = "https://localhost:44389/api/Hospitalizaciones/" + Funcion;
    EjecutarComandoServicio(Metodo, URL, hospitalizaciones);
}
async function Consultar() {
    let id_hospitalizacion = $("#txtid_hospitalizacion").val();
    URL = "https://localhost:44389/api/Hospitalizaciones/ConsultarXID?id=" + id_hospitalizacion;
    const hospitalizacion = await ConsultarServicio(URL);
    if (hospitalizacion != null) {
        $("#txtid_evento").val(hospitalizacion.id_evento);
        $("#txthabitacion").val(hospitalizacion.habitacion);
        $("#txtestado_hospitalizacion").val(hospitalizacion.estado_hospitalizacion);

    }
    else {

        $("#dvMensaje").html("La Hospitalizacion no existe en la base de datos");
    }
}

class Hospitalizacion {
    constructor(id_hospitalizacion, id_evento, habitacion, estado_hospitalizacion) {
        this.id_hospitalizacion = id_hospitalizacion;
        this.id_evento = id_evento;
        this.habitacion = habitacion;
        this.estado_hospitalizacion = estado_hospitalizacion;


    }
}