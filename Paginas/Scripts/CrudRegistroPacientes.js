jQuery(function () {  
    LlenarComboXServiciosAuth("https://localhost:44389/api/RegistroPacientes/LlenarCombo", "#cbopais");
    LlenarTabla();
});
function LlenarTabla() {
    LlenarTablaXServiciosAuth("https://localhost:44389/api/RegistroPacientes/LlenarTabla", "#tblPacientes");
}


async function Consultar() {
    let id_persona = $("#txtid_persona").val();
    URL = "https://localhost:44389/api/RegistroPacientes/ConsultarXID?id=" + id_persona;
    const persona = await ConsultarServicioAuth(URL);
    if (persona != null) {
        $("#txtnombre").val(persona.nombre);
        $("#txtapellido").val(persona.apellido);
        $("#txtfecha_nacimiento").val(persona.fecha_nacimiento.split('T')[0]);
        $("#txtdireccion").val(persona.direccion);
        $("#txttelefono").val(persona.telefono);
        $("#txtemail").val(persona.email);
        $("#txtgenero").val(persona.genero);
        $("#cbopais").val(persona.id_pais);
        URL2 = "https://localhost:44389/api/RegistroPacientes/ConsultarXIDp?id=" + id_persona;
        const paciente = await ConsultarServicioAuth(URL2);
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
        $("#cbopais").val("");


    }
}

function Editar(ID, PAIS, NOMBRES, APELLIDOS, FECHA_DE_NACIMIENTO, DIRECCION, TELEFONO, EMAIL, GENERO, CONTACTO_DE_EMERGENCIA, ALERGIAS, ANTECEDENTES ) {
    $("#txtid_persona").val(ID);
    $("#txtnombre").val(NOMBRES);
    $("#txtapellido").val(APELLIDOS);
    $("#txtfecha_nacimiento").val(FECHA_DE_NACIMIENTO.split('T')[0]);
    $("#txtdireccion").val(DIRECCION);
    $("#txttelefono").val(TELEFONO);
    $("#txtemail").val(EMAIL);
    $("#txtgenero").val(GENERO);
    $("#cbopais").val(PAIS);
    $("#txtalergias").val(ALERGIAS);
    $("#txtantecedentes").val(ANTECEDENTES);
    $("#txtcontacto").val(CONTACTO_DE_EMERGENCIA);
}

function Eliminar(ID) {
    const personas = new PERSONA(ID, $("#txtnombre").val(), $("#txtapellido").val(), $("#txtfecha_nacimiento ").val(),
        $("#txtdireccion").val(), $("#txttelefono").val(), $("#txtemail").val(), $("#txtgenero").val(), $("#cbopais").val());
    let URL = "https://localhost:44389/api/RegistroPacientes/Eliminar?id_persona=" + ID;
    EjecutarServicioAuth('DELETE', URL, personas);
}
async function Ejecutar(Metodo, Funcion) {


    let idpersona = $("#txtid_persona").val();
    let contacto = $("#txtcontacto").val();
    let alergias = $("#txtalergias").val();
    let antecedentes = $("#txtantecedentes").val();

    const personas = new PERSONA($("#txtid_persona").val(), $("#txtnombre").val(), $("#txtapellido").val(), $("#txtfecha_nacimiento ").val(),
        $("#txtdireccion").val(), $("#txttelefono").val(), $("#txtemail").val(), $("#txtgenero").val(), $("#cbopais").val());
    let URL = "https://localhost:44389/api/RegistroPacientes/" + Funcion + "?idpersona=" + idpersona + "&contacto=" + contacto + "&alergias=" + alergias +  "&antecedentes=" + antecedentes;
    EjecutarServicioAuth(Metodo, URL, personas);
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