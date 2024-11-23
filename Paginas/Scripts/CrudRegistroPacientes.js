jQuery(function () {  
    LlenarComboXServiciosAuth("https://localhost:44389/api/RegistroPacientes/LlenarCombo", "#cbopais");
    LlenarComboXServiciosAuth("https://localhost:44389/api/RegistroPacientes/LlenarCombo", "#editcbopais");
    LlenarTabla();
});
function LlenarTabla() {
    const tabla = $('#tblPacientes').DataTable();
    tabla.clear().destroy();
    LlenarTablaXServiciosAuth("https://localhost:44389/api/RegistroPacientes/LlenarTabla", "#tblPacientes");
    const tabla2 = $('#tblPacientes').DataTable();
    tabla2.clear().destroy();
    LlenarTablaXServiciosAuth("https://localhost:44389/api/RegistroPacientes/LlenarTabla", "#tblPacientes");

}


function abrirModalEditar(ID, PAIS, NOMBRES, APELLIDOS, FECHA_DE_NACIMIENTO, DIRECCION, TELEFONO, EMAIL, GENERO, CONTACTO_DE_EMERGENCIA, ALERGIAS, ANTECEDENTES) {
    $("#edittxtid_persona").val(ID);
    $("#edittxtnombre").val(NOMBRES);
    $("#edittxtapellido").val(APELLIDOS);
    $("#edittxtfecha_nacimiento").val(FECHA_DE_NACIMIENTO.split('T')[0]);
    $("#edittxtdireccion").val(DIRECCION);
    $("#edittxttelefono").val(TELEFONO);
    $("#edittxtemail").val(EMAIL);
    $("#edittxtgenero").val(GENERO);
    $("#editcbopais").val(PAIS);
    $("#edittxtalergias").val(ALERGIAS);
    $("#edittxtantecedentes").val(ANTECEDENTES);
    $("#edittxtcontacto").val(CONTACTO_DE_EMERGENCIA);

    $('#modalEditar').modal('show');
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

async function EjecutarModal(Metodo, Funcion) {


    let idpersona = $("#edittxtid_persona").val();
    let contacto = $("#edittxtcontacto").val();
    let alergias = $("#edittxtalergias").val();
    let antecedentes = $("#edittxtantecedentes").val();

    const personas = new PERSONA($("#edittxtid_persona").val(), $("#edittxtnombre").val(), $("#edittxtapellido").val(), $("#edittxtfecha_nacimiento ").val(),
        $("#edittxtdireccion").val(), $("#edittxttelefono").val(), $("#edittxtemail").val(), $("#edittxtgenero").val(), $("#editcbopais").val());
    let URL = "https://localhost:44389/api/RegistroPacientes/" + Funcion + "?idpersona=" + idpersona + "&contacto=" + contacto + "&alergias=" + alergias + "&antecedentes=" + antecedentes;
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