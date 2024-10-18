jQuery(function () {
    LlenarComboXServicios("https://localhost:44389/api/RegistroMedicos/LlenarCombo", "#cbopais");

    LlenarTabla();
});
function LlenarTabla() {
    LlenarTablaXServicios("https://localhost:44389/api/RegistroMedicos/LlenarTabla", "#tblMedicos");
}

async function Consultar() {
    let id_persona = $("#txtid_persona").val();
    URL = "https://localhost:44389/api/RegistroMedicos/ConsultarXID?id=" + id_persona;
    const persona = await ConsultarServicio(URL);
    if (persona != null) {
        $("#txtnombre").val(persona.nombre);
        $("#txtapellido").val(persona.apellido);
        $("#txtfecha_nacimiento").val(persona.fecha_nacimiento.split('T')[0]);
        $("#txtdireccion").val(persona.direccion);
        $("#txttelefono").val(persona.telefono);
        $("#txtemail").val(persona.email);
        $("#txtgenero").val(persona.genero);
        $("#cbopais").val(persona.id_pais);
        URL2 = "https://localhost:44389/api/RegistroMedicos/ConsultarXIDp?id=" + id_persona;
        const usuario = await ConsultarServicio(URL2);
        $("#txttipo").val(usuario.usuario1);
        $("#txtrol").val(usuario.rol);
        URL3 = "https://localhost:44389/api/Medicos/ConsultarXID?id=" + usuario.id_usuario;
        const medico = await ConsultarServicio(URL3);
        $("#txtespecialidad").val(medico.especialidad);
        $("#txthorario").val(medico.horario);
        $("#txtcontacto").val(medico.telefono_contacto);
        $("#dvMensaje").html("");



    }
    else {

        $("#dvMensaje").html("El medico no existe en la base de datos");
        $("#txtnombre").val("");
        $("#txtapellido").val("");
        $("#txtfecha_nacimiento").val("");
        $("#txtdireccion").val("");
        $("#txttelefono").val("");
        $("#txtemail").val("");
        $("#txtgenero").val("");
        $("#txttipo").val("");
        $("#txtrol").val("");
        $("#txtespecialidad").val("");
        $("#txthorario").val("");
        $("#txtcontacto").val("");
        $("#cbopais").val("");

    }
}

async function Ejecutar(Metodo, Funcion) {


    let id_persona = $("#txtid_persona").val();
    let usuario1 = $("#txttipo").val();
    let rol = $("#txtrol").val();
    let especialidad = $("#txtespecialidad").val();
    let horario = $("#txthorario").val();
    let contacto = $("#txtcontacto").val();


    const personas = new PERSONA($("#txtid_persona").val(), $("#txtnombre").val(), $("#txtapellido").val(), $("#txtfecha_nacimiento ").val(),
        $("#txtdireccion").val(), $("#txttelefono").val(), $("#txtemail").val(), $("#txtgenero").val(), $("#cbopais").val());
    let URL = "https://localhost:44389/api/RegistroMedicos/" + Funcion + "?id_persona=" + id_persona + "&usuario1=" + usuario1 + "&rol=" + rol + "&especialidad=" + especialidad
        + "&horario=" + horario + "&contacto=" + contacto;
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