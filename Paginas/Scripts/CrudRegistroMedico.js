﻿jQuery(function () {
    LlenarComboXServiciosAuth("https://localhost:44389/api/RegistroMedicos/LlenarCombo", "#cbopais");
    LlenarComboXServiciosAuth("https://localhost:44389/api/RegistroMedicos/LlenarCombo", "#editcbopais");


    LlenarTabla();
});

async function verificarAutenticacion() {
    try {
        const id = getCookie("Usuario");
        const token = getCookie("token");
        
        if (!id || !token) {
            alert('No hay usuario autenticado.');
            window.location.href = 'home.html';
            return;
        }
            
        const url = "https://localhost:44389/api/RegistroMedicos/ConsultarXIDp?ID=" + id;
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        const Usuario = await response.json();
      
        if (Usuario.Tipo !== "Administrador") {
            alert('DEBES SER ADMINISTRADOR PARA ACCEDER A ESTA PAGINA.');
            window.location.href = 'home.html';
            return;
        }

        document.body.style.display = 'block';
    } catch (error) {
        console.error('Error al verificar autenticación:', error);
        alert('Error al verificar permisos de usuario.');
        window.location.href = 'home.html';
    }
}

// Ejecutar la verificación cuando se carga la página
document.addEventListener

function LlenarTabla() {

    const tabla = $('#tblMedicos').DataTable();
    tabla.clear().destroy();
    LlenarTablaXServiciosAuth("https://localhost:44389/api/RegistroMedicos/LlenarTabla", "#tblMedicos");
    const tabla2 = $('#tblMedicos').DataTable();
    tabla2.clear().destroy();
    LlenarTablaXServiciosAuth("https://localhost:44389/api/RegistroMedicos/LlenarTabla", "#tblMedicos");
}

function abrirModalEditar(ID, PAIS, NOMBRES, APELLIDOS, FECHA_DE_NACIMIENTO, DIRECCION, TELEFONO, EMAIL, GENERO, TIPO_DE_USUARIO, ROL, ESPECIALIDAD, HORARIO, CONTACTO_DE_EMERGENCIA) {
    $("#edittxtid_persona").val(ID);
    $("#edittxtnombre").val(NOMBRES);
    $("#edittxtapellido").val(APELLIDOS);
    $("#edittxtfecha_nacimiento").val(FECHA_DE_NACIMIENTO.split('T')[0]);
    $("#edittxtdireccion").val(DIRECCION);
    $("#edittxttelefono").val(TELEFONO);
    $("#edittxtemail").val(EMAIL);
    $("#edittxtgenero").val(GENERO);
    $("#editcbopais").val(PAIS);
    $("#edittxttipo").val(TIPO_DE_USUARIO);
    $("#edittxtrol").val(ROL);
    $("#edittxtespecialidad").val(ESPECIALIDAD);
    $("#edittxthorario").val(HORARIO);
    $("#edittxtcontacto").val(CONTACTO_DE_EMERGENCIA);

    $('#modalEditar').modal('show');
}



function Eliminar(ID) {
    const personas = new PERSONA(ID, $("#txtnombre").val(), $("#txtapellido").val(), $("#txtfecha_nacimiento ").val(),
        $("#txtdireccion").val(), $("#txttelefono").val(), $("#txtemail").val(), $("#txtgenero").val(), $("#cbopais").val(), $("#txtpassword").val());
    let URL = "https://localhost:44389/api/RegistroMedicos/Eliminar?id_persona=" + ID;
    EjecutarServicioAuth('DELETE', URL, personas);
}

async function Ejecutar(Metodo, Funcion) {


    let id_persona = $("#txtid_persona").val();
    let Tipo = $("#txttipo").val();
    let Mensaje = "";
    let Pagina = "";
    if (Tipo == "Administrador") {
        Mensaje = "BIENVENIDO ADMINISTRADOR"
        Pagina = "RegistroMedicos.html"

    } else if (Tipo == "Medico") {

        Mensaje = "BIENVENIDO MEDICO"
        Pagina = "Home.html"
    }
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
        let URL = "https://localhost:44389/api/RegistroMedicos/" + Funcion + "?id_persona=" + id_persona + "&Tipo=" + Tipo + "&rol=" + rol + "&Mensaje=" + Mensaje + "&Pagina=" + Pagina + "&especialidad=" + especialidad
            + "&horario=" + horario + "&contacto=" + contacto + "&password=" + password;
        EjecutarServicioAuth(Metodo, URL, personas);
        LlenarTabla();
    }
}

async function EjecutarModal(Metodo, Funcion) {


    let id_persona = $("#edittxtid_persona").val();
    let Tipo = $("#edittxttipo").val();
    if (Tipo == "Administrador") {
        Mensaje = "BIENVENIDO ADMINISTRADOR"
        Pagina = "RegistroMedicos.html"

    } else if (Tipo == "Medico") {

        Mensaje = "BIENVENIDO MEDICO"
        Pagina = "Home.html"
    }
    let rol = $("#edittxtrol").val();
    let especialidad = $("#edittxtespecialidad").val();
    let horario = $("#edittxthorario").val();
    let contacto = $("#edittxtcontacto").val();
    let password = $("#edittxtpassword").val();
    let confirmpassword = $("#edittxtConfirmPassword").val();
    if (password != confirmpassword) {
        $("#dvMensaje").html("Las contraseñas no coinciden");
        return;
    } else if (password == confirmpassword) {
        const personas = new PERSONA($("#edittxtid_persona").val(), $("#edittxtnombre").val(), $("#edittxtapellido").val(), $("#edittxtfecha_nacimiento ").val(),
            $("#edittxtdireccion").val(), $("#edittxttelefono").val(), $("#edittxtemail").val(), $("#edittxtgenero").val(), $("#editcbopais").val(), $("#edittxtpassword").val());
        let URL = "https://localhost:44389/api/RegistroMedicos/" + Funcion + "?id_persona=" + id_persona + "&Tipo=" + Tipo + "&rol=" + rol + "&Mensaje=" + Mensaje + "&Pagina=" + Pagina + "&especialidad=" + especialidad
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

document.getElementById('edittxtrol').addEventListener('change', function () {
    const rolSeleccionado = this.value;
    const especialidadSelect = document.getElementById('edittxtespecialidad');


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