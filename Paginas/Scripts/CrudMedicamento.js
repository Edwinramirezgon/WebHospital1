
async function Ejecutar(Metodo, Funcion) {

    const medicamento = new MEDICAMENTO($("#txtid_medicamento").val(), $("#txtnombre").val(), $("#txtdescripcion").val());
    let URL = "https://localhost:44389/api/Medicamentos/" + Funcion;
    EjecutarServicioAuth(Metodo, URL, medicamento);
}
async function Consultar() {
    let id_medicamento = $("#txtid_medicamento").val();
    URL = "https://localhost:44389/api/Medicamentos/ConsultarXID?id=" + id_medicamento;
    const medicamento = await ConsultarServicioAuth(URL);
    if (medicamento != null) {
        $("#txtnombre").val(medicamento.nombre);
        $("#txtdescripcion").val(medicamento.descripcion);
        $("#dvMensaje").html("");

    }
    else {

        $("#dvMensaje").html("El medicamento no existe en la base de datos");
        $("#txtnombre").val("");
        $("#txtdescripcion").val("");
    }
}

class MEDICAMENTO {
    constructor(id_medicamento, nombre, descripcion) {
        this.id_medicamento = id_medicamento;
        this.nombre = nombre;
        this.descripcion = descripcion;    

    }
}