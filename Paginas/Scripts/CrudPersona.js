
async function Ejecutar(Metodo, Funcion) {

    const personas = new PERSONA($("#txtid_persona").val(), $("#txtnombre").val(), $("#txtapellido").val(), $("#txtfecha_nacimiento ").val(),
        $("#txtdireccion").val(), $("#txttelefono").val(), $("#txtemail").val(), $("#txtgenero").val());
    let URL = "https://localhost:44389/api/Personas/" + Funcion;
    EjecutarComandoServicio(Metodo, URL, personas);
}
async function Consultar() {
    let id_persona = $("#txtid_persona").val();
    URL = "https://localhost:44389/api/Personas/ConsultarXID?id=" + id_persona;
    const persona = await ConsultarServicio(URL);
    if (persona != null) {
        $("#txtnombre").val(persona.nombre);
        $("#txtapellido").val(persona.apellido);
        $("#txtfecha_nacimiento").val(persona.fecha_nacimiento.split('T')[0]);
        $("#txtdireccion").val(persona.direccion);
        $("#txttelefono").val(persona.telefono);
        $("#txtemail").val(persona.email);
        $("#txtgenero").val(persona.genero);
        $("#dvMensaje").html("");


    }
    else {

        $("#dvMensaje").html("La persona no existe en la base de datos");
        $("#txtnombre").val("");
        $("#txtapellido").val("");
        $("#txtfecha_nacimiento").val("");
        $("#txtdireccion").val("");
        $("#txttelefono").val("");
        $("#txtemail").val("");
        $("#txtgenero").val("");
       
    }
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