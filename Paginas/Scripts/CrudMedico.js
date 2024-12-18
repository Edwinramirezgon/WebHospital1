﻿
async function Ejecutar(Metodo, Funcion) {

    const Medico = new MEDICO($("#txtid_medico").val(), $("#txtid_usuario").val(), $("#txtespecialidad").val(), $("#txthorario ").val(),
        $("#txttelefono_contacto").val());
    let URL = "https://localhost:44389/api/Medicos/" + Funcion;
    EjecutarServicioAuth(Metodo, URL, Medico);
}
async function Consultar() {
    let id_medico = $("#txtid_medico").val();
    URL = "https://localhost:44389/api/Medicos/ConsultarXID?id=" + id_medico;
    const medico = await ConsultarServicioAuth(URL);
    if (medico != null) {
        $("#txtid_usuario").val(medico.id_usuario);
        $("#txtespecialidad").val(medico.especialidad);
        $("#txthorario").val(medico.horario);
        $("#txttelefono_contacto").val(medico.telefono_contacto);
        $("#dvMensaje").html("");

    }
    else {

        $("#dvMensaje").html("El medico no existe en la base de datos");
        $("#txtid_usuario").val("");
        $("#txtespecialidad").val("");
        $("#txthorario").val("");
        $("#txttelefono_contacto").val("");
    }
}

class MEDICO {
    constructor(id_medico, id_usuario, especialidad, horario, telefono_contacto) {
        this.id_medico = id_medico;
        this.id_usuario = id_usuario;
        this.especialidad = especialidad;
        this.horario = horario;
        this.telefono_contacto = telefono_contacto;
        

    }
}