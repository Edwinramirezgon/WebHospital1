jQuery(function () {
    $("#dvMenu").load("../Paginas/Menu.html")
});

async function Ejecutar(Metodo, Funcion) {

    const Medico = new MEDICO($("#txtid_medico").val(), $("#txtid_usuario").val(), $("#txtespecialidad").val(), $("#txthorario ").val(),
        $("#txttelefono_contacto").val());
    let URL = "https://localhost:44389/api/Medicos/" + Funcion;
    EjecutarComandoServicio(Metodo, URL, Medico);
}
async function Consultar() {
    let id_medico = $("#txtid_medico").val();
    URL = "https://localhost:44389/api/Medicos/ConsultarXID?id=" + id_medico;
    const medico = await ConsultarServicio(URL);
    if (medico != null) {
        $("#txtid_usuario").val(medico.id_usuario);
        $("#txtespecialidad").val(medico.especialidad);
        $("#txthorario").val(medico.horario);
        $("#txttelefono_contacto").val(medico.telefono_contacto);


    }
    else {

        $("#dvMensaje").html("El medico no existe en la base de datos");
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