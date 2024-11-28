async function Ejecutar(Metodo, Funcion) {

    const facturas = new Factura($("#txtid_factura").val(), $("#edittxtDocumento2").val(), $("#edittxtid").val(), $("#txtTotal").val(), $("#cboMetodoPago").val(), $("#txtFechaFactura").val(),"POR PAGAR");
    let URL = "https://localhost:44389/api/RegistroFacturas/" + Funcion;
    EjecutarServicioAuth(Metodo, URL, facturas);

}

function LlenarTabla() {


    let Documento = $("#txtDocumento").val();
    const tabla = $('#tbleventos').DataTable();
    tabla.clear().destroy();
    LlenarTablaXServiciosAuth("https://localhost:44389/api/RegistroFacturas/LlenarTabla?id=" + Documento, "#tbleventos");
    const tabla2 = $('#tbleventos').DataTable();
    tabla2.clear().destroy();
    LlenarTablaXServiciosAuth("https://localhost:44389/api/RegistroFacturas/LlenarTabla?id=" + Documento, "#tbleventos");

}

async function abrirModalAsignar(ID, ID_PACIENTE, ID_PACIENTE2, NOMBRE_PACIENTE, APELLIDO_PACIENTE, ID_MEDICO, NOMBRE_MEDICO, APELLIDO_MEDICO, FECHA_DE_EVENTO, DESCRIPCION_DE_EVENTO) {
    const numeroFactura = await EjecutarServicioRptaAuth("GET", "https://localhost:44389/api/RegistroFacturas/NFactura")
    $("#txtid_factura").val(numeroFactura);
    $("#txtFechaFactura").val(FechaHoy());
    $("#edittxtid").val(ID);
    $("#edittxtDocumento").val(ID_PACIENTE);
    $("#edittxtDocumento2").val(ID_PACIENTE2);
    $("#txtNombrePaciente").val(NOMBRE_PACIENTE + " " + APELLIDO_PACIENTE);
    $("#edittxtnombremedico").val(NOMBRE_MEDICO + " " + APELLIDO_MEDICO);
    $("#edittxtDocumentoM").val(ID_MEDICO);
    $("#edittxtfecha_evento").val(FECHA_DE_EVENTO.split('T')[0]);
    $("#edittxtdescripcion").val(DESCRIPCION_DE_EVENTO);
    $("#dvMensaje").html("");

    $('#modalEditar').modal('show');
}


class Factura {
    constructor(id_factura, id_paciente, id_evento, total, metodo_pago, fecha_emision, estado_pago) {
        this.id_factura = id_factura;
        this.id_paciente = id_paciente; 
        this.id_evento = id_evento; 
        this.total = total; 
        this.metodo_pago = metodo_pago; 
        this.fecha_emision = fecha_emision; 
        this.estado_pago = estado_pago; 
    }
}

function cotizar() {
    const tipoCita = $('#cboTipoCita').val();
    const eps = $('#cboEps').val();

    let total = 0;
    if (tipoCita === 'general') total = 50000;
    else if (tipoCita === 'especialista') total = 100000;
    else if (tipoCita === 'urgencia') total = 150000;
    else if (tipoCita === 'hospitalizacion') total = 300000;

    if (eps !== 'ninguna') total *= 0.8; // Descuento del 20%

    $('#txtTotal').val(total);
}

function grabarFactura() {
    const data = {
        id_paciente: $('#txtPaciente').val(),
        id_evento: 0, // Ajustar según la lógica
        total: parseFloat($('#txtTotal').val()),
        metodo_pago: $('#cboMetodoPago').val(), // Se puede ajustar dinámicamente
        fecha_emision: new Date().toISOString(),
        estado_pago: 'POR PAGAR'
    };

    $.ajax({
        url: 'https://localhost:44306/api/Facturaciones/Insertar',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            alert('Factura registrada con éxito');
        },
        error: function () {
            alert('Error al registrar la factura');
        }
    });
}