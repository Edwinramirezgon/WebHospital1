jQuery(function () {
    $("#dvMenu").load("../Paginas/Menu.html")
});

async function Ejecutar(Metodo, Funcion) {

    const usuarios = new USUARIO($("#txtid_usuario").val(), $("#txtid_persona").val(), $("#txtusuario1").val(), $("#txtpass ").val(),
        $("#txtrol").val());
    let URL = "https://localhost:44389/api/Usuarios/" + Funcion;
    EjecutarComandoServicio(Metodo, URL, usuarios);
}
async function Consultar() {
    let id_usuario = $("#txtid_usuario").val();
    URL = "https://localhost:44389/api/Usuarios/ConsultarXID?id=" + id_usuario;
    const usuario = await ConsultarServicio(URL);
    if (usuario != null) {
        $("#txtid_persona").val(usuario.id_persona);
        $("#txtusuario1").val(usuario.usuario1);
        $("#txtpass").val(usuario.pass);
        $("#txtrol").val(usuario.rol);
      

    }
    else {

        $("#dvMensaje").html("El usuario no existe en la base de datos");
    }
}

class USUARIO {
    constructor(id_usuario, id_persona, usuario1, pass, rol) {
        this.id_usuario = id_usuario;
        this.id_persona = id_persona;
        this.usuario1 = usuario1;
        this.pass = pass;
        this.rol = rol;       

    }
}