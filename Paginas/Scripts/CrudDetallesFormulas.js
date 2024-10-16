
async function Ejecutar(Metodo, Funcion) {

    const detallesf = new DetallesFormulas($("#txtid_detalle_formula").val(), $("#txtid_formula").val(), $("#txtid_medicamento").val(), $("#txtcantidad").val(),
        $("#txtdosis").val());
    let URL = "https://localhost:44389/api/DetallesFormulas/" + Funcion;
    EjecutarComandoServicio(Metodo, URL, detallesf);
}
async function Consultar() {
    let id_detalle_formula = $("#txtid_detalle_formula").val();
    URL = "https://localhost:44389/api/DetallesFormulas/ConsultarXID?id=" + id_detalle_formula;
    const detalle = await ConsultarServicio(URL);
    if (detalle != null) {
        $("#txtid_formula").val(detalle.id_formula);
        $("#txtid_medicamento").val(detalle.id_medicamento);
        $("#txtcantidad").val(detalle.cantidad);
        $("#txtdosis").val(detalle.dosis);
       
    }
    else {

        $("#dvMensaje").html("El Detalle de la formula no existe en la base de datos");
    }
}

class DetallesFormulas {
    constructor(id_detalle_formula, id_formula, id_medicamento, cantidad, dosis) {
        this.id_detalle_formula = id_detalle_formula;
        this.id_formula = id_formula;
        this.id_medicamento = id_medicamento;
        this.cantidad = cantidad;
        this.dosis = dosis;
       
    }
}