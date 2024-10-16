
async function Ejecutar(Metodo, Funcion) {

    const altas = new Altas($("#txtid_alta").val(), $("#txtid_hospitalizacion").val(), $("#txtid_medico").val(), $("#txtfecha_alta").val(),
        $("#txtdescripcion_alta").val(), $("#txtrecomendaciones").val());
    let URL = "https://localhost:44389/api/Altas/" + Funcion;
    EjecutarComandoServicio(Metodo, URL, altas);
}
async function Consultar() {
    let id_alta = $("#txtid_alta").val();
    URL = "https://localhost:44389/api/Altas/ConsultarXID?id=" + id_alta;
    const alta = await ConsultarServicio(URL);
    if (alta != null) {
        $("#txtid_hospitalizacion").val(alta.id_hospitalizacion);
        $("#txtid_medico").val(alta.id_medico);
        $("#txtfecha_alta").val(alta.fecha_alta.split('T')[0]);
        $("#txtdescripcion_alta").val(alta.descripcion_alta);
        $("#txtrecomendaciones").val(alta.recomendaciones);
    }
    else {

        $("#dvMensaje").html("El alta no existe en la base de datos");
    }
}

class Altas {
    constructor(id_alta, id_hospitalizacion, id_medico, fecha_alta, descripcion_alta, recomendaciones) {
        this.id_alta = id_alta;
        this.id_hospitalizacion = id_hospitalizacion;
        this.id_medico = id_medico;
        this.fecha_alta = fecha_alta;
        this.descripcion_alta = descripcion_alta;
        this.recomendaciones = recomendaciones;
    }
}