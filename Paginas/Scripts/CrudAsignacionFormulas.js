jQuery(function () {    
    $("#txtid_formula").val(0);
    $("#txtFechaFormula").val(FechaHoy());
    LlenarComboXServiciosAuth("https://localhost:44389/api/RegistroFormulas/LlenarCombo", "#cboMedicamento");
});

async function GrabarMedicamento() {
    const detalles = [new DetalleFormula(0, $("#txtid_formula").val(), $("#cboMedicamento").val(), $("#txtCantidad").val(), $("#txtDosis").val())];
    const formula = new Formula($("#txtid_formula").val(), $("#txtIDPaciente").val(), $("#txtIDMedico").val(), 0, $("#txtFechaFormula").val(),
        $("#txtDosis").val(), detalles);
    let numeroFormula = await EjecutarServicioRptaAuth("POST", "https://localhost:44389/api/RegistroFormulas/GrabarFormula", formula)
    $("#txtid_formula").val(numeroFormula);
}

class Formula {
    constructor(id_formula, id_paciente, id_medico, id_evento, fecha_formula, instrucciones, DetallesFormulas) {
        this.id_formula = id_formula;
        this.id_paciente = id_paciente;
        this.id_medico = id_medico;
        this.id_evento = id_evento;
        this.fecha_formula = fecha_formula;
        this.instrucciones = instrucciones;
        this.DetallesFormulas = DetallesFormulas;
    }
}
class DetalleFormula {
    constructor(id_detalle_formula, id_formula, id_medicamento, cantidad, dosis) {
        this.id_detalle_formula = id_detalle_formula;
        this.id_formula = id_formula;
        this.id_medicamento = id_medicamento;
        this.cantidad = cantidad;
        this.dosis = dosis;
    }
}



async function ConsultarPaciente() {
    let Documento = $("#txtDocumento").val();
    const Paciente = await ConsultarServicioAuth("https://localhost:44389/api/Personas/ConsultarXID?ID=" + Documento);
   
}

function LlenarTabla() {


    let Documento = $("#txtDocumento").val();
    const tabla = $('#tbleventos').DataTable();
    tabla.clear().destroy();
    LlenarTablaXServiciosAuth("https://localhost:44389/api/RegistroFormulas/LlenarTabla?id=" + Documento, "#tbleventos");
    const tabla2 = $('#tbleventos').DataTable();
    tabla2.clear().destroy();
    LlenarTablaXServiciosAuth("https://localhost:44389/api/RegistroFormulas/LlenarTabla?id=" + Documento, "#tbleventos");

}

function abrirModalAsignar(ID, ID_PACIENTE, NOMBRE_PACIENTE, APELLIDO_PACIENTE, NOMBRE_MEDICO, APELLIDO_MEDICO, FECHA_DE_EVENTO, DESCRIPCION_DE_EVENTO) {
    $("#edittxtid").val(ID);
    $("#edittxtDocumento").val(ID_PACIENTE); 
    $("#txtNombrePaciente").val(NOMBRE_PACIENTE + " " + APELLIDO_PACIENTE);   
    $("#edittxtnombremedico").val(NOMBRE_MEDICO + " " + APELLIDO_MEDICO); 
    $("#edittxtfecha_evento").val(FECHA_DE_EVENTO.split('T')[0]);
    $("#edittxtdescripcion").val(DESCRIPCION_DE_EVENTO);
    $("#dvMensaje").html("");

    $('#modalEditar').modal('show');
}