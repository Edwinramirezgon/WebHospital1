
async function Ejecutar(Metodo, Funcion) {

    const formulas = new Formula($("#txtid_formula").val(), $("#txtid_paciente").val(), $("#txtid_medico").val(), $("#txtid_evento ").val(),
        $("#txtfecha_formula").val(), $("#txtinstrucciones").val());
    let URL = "https://localhost:44389/api/Formulas/" + Funcion;
    EjecutarComandoServicio(Metodo, URL, formulas);
}
async function Consultar() {
    let id_formula = $("#txtid_formula").val();
    URL = "https://localhost:44389/api/Formulas/ConsultarXID?id=" + id_formula;
    const formula = await ConsultarServicio(URL);
    if (formula != null) {
        $("#txtid_paciente").val(formula.id_paciente);
        $("#txtid_medico").val(formula.id_medico);
        $("#txtid_evento").val(formula.id_evento);    
        $("#txtfecha_formula").val(formula.fecha_formula.split('T')[0]);
        $("#txtinstrucciones").val(formula.instrucciones);

    }
    else {

        $("#dvMensaje").html("La formula no existe en la base de datos");
        $("#txtid_paciente").val("");
        $("#txtid_medico").val(("");
        $("#txtid_evento").val((""o);
        $("#txtfecha_formula").val(("");
        $("#txtinstrucciones").val(("");
    }
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