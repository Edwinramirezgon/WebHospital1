


function GrabarMedicamento() {
       
  
        const medicamentoId = $('#cboMedicamento').val();
        const nombreMedicamento = $('#cboMedicamento option:selected').text();
        const cantidad = $('#txtCantidad').val();
        const dosis = $('#txtDosis').val();

     
        if (medicamentoId === '0' || !cantidad || !dosis) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        }

    
     const descripcionMedicamento = $('#cboMedicamento option:selected').data('descripcion') || 'Sin Descripción';

      
        const newRow = [
            medicamentoId,
            nombreMedicamento,
            descripcionMedicamento,
            dosis,
            cantidad
        ];

        const table = $('#tblmedicamentos').DataTable();
        table.row.add(newRow).draw(false);

    
        $('#cboMedicamento').val('0');
        $('#txtCantidad').val('');
        $('#txtDosis').val('');

     
        $('#dvMensajemodal').html('<div class="alert alert-success">Medicamento agregado exitosamente.</div>');
}




   
    $(document).ready(function () {
        $('#tblmedicamentos').DataTable({
            "columns": [
                { "width": "10%" },   
                { "width": "30%" },   
                { "width": "30%" },   
                { "width": "15%" },   
                { "width": "15%" }    
            ]
        });
    });


async function GrabarMedicamentosEnCiclo() {
    const table = $('#tblmedicamentos').DataTable();

    
    for (let i = 0; i < table.rows().count(); i++) {
        const data = table.row(i).data();

        const medicamentoId = data[0];     
        const dosis = data[3];
        const cantidad = data[4];

       
        await EjecutarM(medicamentoId, cantidad, dosis);
    }
}



async function Ejecutar(Metodo, Funcion) {

    const formulas = new Formula($("#txtid_formula").val(), $("#edittxtDocumento2").val(), $("#edittxtDocumentoM").val(), $("#edittxtid ").val(),
        $("#txtFechaFormula").val(), $("#txtindicaciones").val());
    let URL = "https://localhost:44389/api/RegistroFormulas/" + Funcion;
    await EjecutarServicioAuth(Metodo, URL, formulas);
    await GrabarMedicamentosEnCiclo()

}

async function EjecutarM(medicamentoId, cantidad, dosis) {

    const detallesf = new DetallesFormulas(0, $("#txtid_formula").val(), medicamentoId, cantidad ,
        dosis );
    let URL = "https://localhost:44389/api/DetallesFormulas/Insertar";
    EjecutarServicioAuth("POST", URL, detallesf);
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

async function abrirModalAsignar(ID, ID_PACIENTE, ID_PACIENTE2,  NOMBRE_PACIENTE, APELLIDO_PACIENTE, ID_MEDICO, NOMBRE_MEDICO, APELLIDO_MEDICO, FECHA_DE_EVENTO, DESCRIPCION_DE_EVENTO) {
    const numeroFormula = await EjecutarServicioRptaAuth("GET", "https://localhost:44389/api/RegistroFormulas/NFormula")
    // $("#txtFechaFormula").val(FechaHoy());
    LlenarComboXServiciosAuth2("https://localhost:44389/api/RegistroFormulas/LlenarCombo", "#cboMedicamento");
    $("#txtid_formula").val(numeroFormula);
    $("#txtFechaFormula").val(FechaHoy());
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


class Formula {
    constructor(id_formula, id_paciente, id_medico, id_evento, fecha_formula, instrucciones) {
        this.id_formula = id_formula;
        this.id_paciente = id_paciente;
        this.id_medico = id_medico;
        this.id_evento = id_evento;
        this.fecha_formula = fecha_formula;
        this.instrucciones = instrucciones;

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




