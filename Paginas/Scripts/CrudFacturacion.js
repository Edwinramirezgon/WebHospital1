
async function Ejecutar(Metodo, Funcion) {

    const facturas = new Facturacion($("#txtid_factura").val(), $("#txtid_paciente").val(), $("#txtid_evento").val(), $("#txttotal ").val(),
        $("#txtmetodo_pago").val(), $("#txtfecha_emision").val(), $("#txtestado_pago").val());
    let URL = "https://localhost:44389/api/Facturaciones/" + Funcion;
    EjecutarServicioAuth(Metodo, URL, facturas);
}
async function Consultar() {
    let id_factura = $("#txtid_factura").val();
    URL = "https://localhost:44389/api/Facturaciones/ConsultarXID?id=" + id_factura;
    const factura = await ConsultarServicioAuth(URL);
    if (factura != null) {
        $("#txtid_paciente").val(factura.id_paciente);
        $("#txtid_evento").val(factura.id_evento);
        $("#txttotal").val(factura.total);
        $("#txtmetodo_pago").val(factura.metodo_pago);
        $("#txtfecha_emision").val(factura.fecha_emision.split('T')[0]);
        $("#txtestado_pago").val(factura.estado_pago);
        $("#dvMensaje").html("");
    }
    else {

        $("#dvMensaje").html("La cita no existe en la base de datos");
        $("#txtid_paciente").val("");
        $("#txtid_evento").val("");
        $("#txttotal").val("");
        $("#txtmetodo_pago").val("");
        $("#txtfecha_emision").val("");
        $("#txtestado_pago").val("");
    }
}

class Facturacion {
    constructor(id_factura, id_paciente, id_evento, total, metodo_pago, fecha_emision, estado_pago ) {
        this.id_factura = id_factura;
        this.id_paciente = id_paciente;
        this.id_evento = id_evento;
        this.total = total;
        this.metodo_pago = metodo_pago;
        this.fecha_emision = fecha_emision;
        this.estado_pago = estado_pago;

    }
}