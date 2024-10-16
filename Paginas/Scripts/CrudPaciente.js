
async function Ejecutar(Metodo, Funcion) {

    const pacientes = new PACIENTE($("#txtid_paciente").val(), $("#txtid_persona").val(), $("#txtcontacto_emergencia").val(), $("#txtalergias ").val(),
        $("#txtantecedentes_medicos").val());
    let URL = "https://localhost:44389/api/Pacientes/" + Funcion;
    EjecutarComandoServicio(Metodo, URL, pacientes);
}
async function Consultar() {
    let id_paciente = $("#txtid_paciente").val();
    URL = "https://localhost:44389/api/Pacientes/ConsultarXID?id=" + id_paciente;
    const paciente = await ConsultarServicio(URL);
    if (paciente != null) {
        $("#txtid_persona").val(paciente.id_persona);
        $("#txtcontacto_emergencia").val(paciente.contacto_emergencia);
        $("#txtalergias").val(paciente.alergias);
        $("#txtantecedentes_medicos").val(paciente.antecedentes_medicos);
  

    }
    else {

        $("#dvMensaje").html("El paciente no existe en la base de datos");
    }
}

class PACIENTE {
    constructor(id_paciente, id_persona, contacto_emergencia, alergias, antecedentes_medicos) {
        this.id_paciente = id_paciente;
        this.id_persona = id_persona;
        this.contacto_emergencia = contacto_emergencia;
        this.alergias = alergias;
        this.antecedentes_medicos = antecedentes_medicos;   

    }
}