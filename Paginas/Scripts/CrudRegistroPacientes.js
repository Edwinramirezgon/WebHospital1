jQuery(function () {  
    LlenarTabla();
});
function LlenarTabla() {
    LlenarTablaXServicios("https://localhost:44389/api/RegistroPacientes/LlenarTabla", "#tblPacientes");
}


async function Consultar() {
    let id_persona = $("#txtid_persona").val();
    URL = "https://localhost:44389/api/RegistroPacientes/ConsultarXID?id=" + id_persona;
    const persona = await ConsultarServicio(URL);
    if (persona != null) {
        $("#txtnombre").val(persona.nombre);
        $("#txtapellido").val(persona.apellido);
        $("#txtfecha_nacimiento").val(persona.fecha_nacimiento.split('T')[0]);
        $("#txtdireccion").val(persona.direccion);
        $("#txttelefono").val(persona.telefono);
        $("#txtemail").val(persona.email);
        $("#txtgenero").val(persona.genero);
        $("#txtpais").val(persona.id_pais);
        URL2 = "https://localhost:44389/api/RegistroPacientes/ConsultarXIDp?id=" + id_persona;
        const paciente = await ConsultarServicio(URL2);
       $("#txtcontacto").val(paciente.contacto_emergencia);
       $("#txtalergias").val(paciente.alergias);
        $("#txtantecedentes").val(paciente.antecedentes_medicos);  
        $("#dvMensaje").html("");
      


    }
    else {

        $("#dvMensaje").html("El paciente no existe en la base de datos");
        $("#txtnombre").val("");
        $("#txtapellido").val("");
        $("#txtfecha_nacimiento").val("");
        $("#txtdireccion").val("");
        $("#txttelefono").val("");
        $("#txtemail").val("");
        $("#txtgenero").val("");
        $("#txtcontacto").val("");
        $("#txtalergias").val("");
        $("#txtantecedentes").val("");
        $("#txtpais").val("");


    }
}

async function Ejecutar(Metodo, Funcion) {


    let idpersona = $("#txtid_persona").val();
    let contacto = $("#txtcontacto").val();
    let alergias = $("#txtalergias").val();
    let antecedentes = $("#txtantecedentes").val();

    const personas = new PERSONA($("#txtid_persona").val(), $("#txtnombre").val(), $("#txtapellido").val(), $("#txtfecha_nacimiento ").val(),
        $("#txtdireccion").val(), $("#txttelefono").val(), $("#txtemail").val(), $("#txtgenero").val(), $("#txtpais").val());
    let URL = "https://localhost:44389/api/RegistroPacientes/" + Funcion + "?idpersona=" + idpersona + "&contacto=" + contacto + "&alergias=" + alergias +  "&antecedentes=" + antecedentes;
    EjecutarComandoServicio(Metodo, URL, personas);
    LlenarTabla();
}

class PERSONA {
    constructor(id_persona, nombre, apellido, fecha_nacimiento, direccion, telefono, email, genero, id_pais) {
        this.id_persona = id_persona;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fecha_nacimiento = fecha_nacimiento;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.genero = genero;
        this.id_pais = id_pais;



    }
}