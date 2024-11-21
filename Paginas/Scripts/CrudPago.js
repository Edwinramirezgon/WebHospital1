
async function Ejecutar(Metodo, Funcion) {

    const pagos = new PAGO($("#txtid_pago").val(), $("#txtid_factura").val(), $("#txtmetodo_pago").val(), $("#txtmonto_pagado ").val(),
        $("#txtfecha_pago").val());
    let URL = "https://localhost:44389/api/Pagos/" + Funcion;
    EjecutarServicioAuth(Metodo, URL, pagos);
}
async function Consultar() {
    let id_pago = $("#txtid_pago").val();
    URL = "https://localhost:44389/api/Pagos/ConsultarXID?id=" + id_pago;
    const pago = await ConsultarServicioAuth(URL);
    if (pago != null) {
        $("#txtid_factura").val(pago.id_factura);
        $("#txtmetodo_pago").val(pago.metodo_pago);
        $("#txtmonto_pagado").val(pago.monto_pagado);
        $("#txtfecha_pago").val(pago.fecha_pago.split('T')[0]);
        $("#dvMensaje").html("");


    }
    else {

        $("#dvMensaje").html("El pago no existe en la base de datos");
        $("#txtid_factura").val("");
        $("#txtmetodo_pago").val("");
        $("#txtmonto_pagado").val("");
        $("#txtfecha_pago").val("");
    }
}

class PAGO {
    constructor(id_pago, id_factura, metodo_pago, monto_pagado, fecha_pago) {
        this.id_paciente = id_paciente;
        this.id_persona = id_persona;
        this.contacto_emergencia = contacto_emergencia;
        this.alergias = alergias;
        this.antecedentes_medicos = antecedentes_medicos;

    }
}