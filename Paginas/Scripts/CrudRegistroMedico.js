jQuery(function () {
    LlenarComboXServiciosAuth("https://localhost:44389/api/RegistroMedicos/LlenarCombo", "#cbopais");

    LlenarTabla();
});
function LlenarTabla() {
    LlenarTablaXServiciosAuth("https://localhost:44389/api/RegistroMedicos/LlenarTabla", "#tblMedicos");
}

async function Consultar() {
    let id_persona = $("#txtid_persona").val();
    URL = "https://localhost:44389/api/RegistroMedicos/ConsultarXID?id=" + id_persona;
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
        URL2 = "https://localhost:44389/api/RegistroMedicos/ConsultarXIDp?id=" + id_persona;
        const usuario = await ConsultarServicioAuth(URL2);
        $("#txttipo").val(usuario.usuario1);
        $("#txtrol").val(usuario.rol);
        URL3 = "https://localhost:44389/api/Medicos/ConsultarXID?id=" + usuario.id_usuario;
        const medico = await ConsultarServicioAuth(URL3);
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
        $("#txtpassword").val("");
        $("#txtConfirmPassword").val("");
        $("#txtcontacto").val("");
        $("#cbopais").val("");

    }
}


function Editar(ID, PAIS, NOMBRES, APELLIDOS, FECHA_DE_NACIMIENTO, DIRECCION, TELEFONO, EMAIL, GENERO, TIPO_DE_USUARIO, ROL, ESPECIALIDAD, HORARIO,CONTACTO_DE_EMERGENCIA) {
    $("#txtid_persona").val(ID);
    $("#txtnombre").val(NOMBRES);
    $("#txtapellido").val(APELLIDOS);
    $("#txtfecha_nacimiento").val(FECHA_DE_NACIMIENTO.split('T')[0]);
    $("#txtdireccion").val(DIRECCION);
    $("#txttelefono").val(TELEFONO);
    $("#txtemail").val(EMAIL);
    $("#txtgenero").val(GENERO);
    $("#cbopais").val(PAIS);  
    $("#txttipo").val(TIPO_DE_USUARIO);
    $("#txtrol").val(ROL);    
    $("#txtespecialidad").val(ESPECIALIDAD);
    $("#txthorario").val(HORARIO);
    $("#txtcontacto").val(CONTACTO_DE_EMERGENCIA);
}

function Eliminar(ID) {
    const personas = new PERSONA(ID, $("#txtnombre").val(), $("#txtapellido").val(), $("#txtfecha_nacimiento ").val(),
        $("#txtdireccion").val(), $("#txttelefono").val(), $("#txtemail").val(), $("#txtgenero").val(), $("#cbopais").val(), $("#txtpassword").val());
    let URL = "https://localhost:44389/api/RegistroMedicos/Eliminar?id_persona=" + ID;
    EjecutarServicioAuth('DELETE', URL, personas);
}

async function Ejecutar(Metodo, Funcion) {


    let id_persona = $("#txtid_persona").val();
    let usuario1 = $("#txttipo").val();
    let rol = $("#txtrol").val();
    let especialidad = $("#txtespecialidad").val();
    let horario = $("#txthorario").val();
    let contacto = $("#txtcontacto").val();
    let password = $("#txtpassword").val();
    let confirmpassword = $("#txtConfirmPassword").val();
    if (password != confirmpassword) {
        $("#dvMensaje").html("Las contraseñas no coinciden");
        return;
    } else if (password == confirmpassword) {
        const personas = new PERSONA($("#txtid_persona").val(), $("#txtnombre").val(), $("#txtapellido").val(), $("#txtfecha_nacimiento ").val(),
            $("#txtdireccion").val(), $("#txttelefono").val(), $("#txtemail").val(), $("#txtgenero").val(), $("#cbopais").val(), $("#txtpassword").val());
        let URL = "https://localhost:44389/api/RegistroMedicos/" + Funcion + "?id_persona=" + id_persona + "&usuario1=" + usuario1 + "&rol=" + rol + "&especialidad=" + especialidad
            + "&horario=" + horario + "&contacto=" + contacto + "&password=" + password;
        EjecutarServicioAuth(Metodo, URL, personas);
        LlenarTabla();
    }
}



const especialidadesPorRol = {
    "Médico general": [
        "Medicina General",
        "Medicina Interna",
        "Pediatría",
        "Geriatría"
    ],
    "Médico quirúrgico": [
        "Cirugía General",
        "Neurocirugía",
        "Cirugía Cardiotorácica",
        "Cirugía Plástica y Reconstructiva",
        "Traumatología y Ortopedia",
        "Cirugía Pediátrica"
    ],
    "Médico enfocado en órganos o sistemas": [
        "Cardiología",
        "Neumología",
        "Gastroenterología",
        "Hematología",
        "Endocrinología",
        "Nefrología",
        "Dermatología",
        "Oftalmología",
        "Otorrinolaringología",
        "Urología"

    ],
    "Médico diagnóstico": [
        "Radiología",
        "Patología Clínica",
        "Medicina Nuclear"
    ],
    "Médico relacionado con salud mental y comportamiento": [
        "Psiquiatría",
        "Psicología Clínica"
    ],
    "Médicina preventiva y social": [
        "Epidemiología",
        "Medicina del Trabajo",
        "Salud Pública"

    ],
    "Médico especialista": [
        "Oncología",
        "Reumatología",
        "Alergología e Inmunología Clínica",
        "Anestesiología",
        "Cuidados Intensivos",
        "Medicina Deportiva",
        "Medicina Familiar y Comunitaria",
        "Toxicología"
    ],
};


document.getElementById('txtrol').addEventListener('change', function () {
    const rolSeleccionado = this.value; 
    const especialidadSelect = document.getElementById('txtespecialidad'); 

  
    especialidadSelect.innerHTML = '<option value="0">-- Selecciona una Especialidad --</option>';

    
    if (especialidadesPorRol[rolSeleccionado]) {
       
        especialidadesPorRol[rolSeleccionado].forEach((especialidad) => {
            const option = document.createElement('option');
            option.value = especialidad;
            option.textContent = especialidad;
            especialidadSelect.appendChild(option);
        });
    }
});

class PERSONA {
    constructor(id_persona, nombre, apellido, fecha_nacimiento, direccion, telefono, email, genero, id_pais, password) {
        this.id_persona = id_persona;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fecha_nacimiento = fecha_nacimiento;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.genero = genero;
        this.id_pais = id_pais;
        this.password = password;


    }


}