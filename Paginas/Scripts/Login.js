async function Ingresar() {
    const URL = "https://localhost:44389/api/Login/Ingresar";
    const usuario = $("#txtUsuario").val().trim();
    const clave = $("#txtClave").val().trim();

    // Validar campos vacíos
    if (!usuario || !clave) {
        mostrarMensaje("Por favor complete todos los campos.", "danger");
        return;
    }

    const login = new Login(usuario, clave);

    try {
        const Respuesta = await EjecutarServicioRpta("POST", URL, login);

        if (!Respuesta || Respuesta.length === 0) {
            // Mensaje de error si no hay respuesta o está vacía
            mostrarMensaje("El usuario no está registrado o la contraseña es incorrecta.", "danger");
            document.cookie = "token=0;path=/";
            return;
        }

        const autenticado = Respuesta[0].Autenticado;

        if (autenticado) {
            // Configuración de cookies
            const extdays = 5;
            const d = new Date();
            d.setTime(d.getTime() + (extdays * 24 * 60 * 60 * 1000));
            const expires = ";expires=" + d.toUTCString();

            document.cookie = `token=${Respuesta[0].Token}${expires};path=/`;
            document.cookie = `Perfil=${Respuesta[0].Perfil}`;
            document.cookie = `Usuario=${Respuesta[0].Usuario}`;

            // Mensaje de éxito y redirección
            mostrarMensaje("Inicio de sesión exitoso. Redirigiendo...", "success");
            setTimeout(() => {
                window.location.href = Respuesta[0].PaginaInicio;
            }, 2000);
        } else {
            // Mensaje si no tiene permisos
            mostrarMensaje("El usuario no tiene permisos.", "danger");
        }
    } catch (error) {
        // Manejo de errores
        console.error("Error al procesar la solicitud:", error);
        mostrarMensaje("Hubo un problema al intentar iniciar sesión. Inténtelo nuevamente.", "danger");
    }
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = $("#dvMensaje");
    mensajeDiv.removeClass().addClass(`alert alert-${tipo}`);
    mensajeDiv.html(mensaje).fadeIn();

    // Ocultar el mensaje automáticamente después de 5 segundos
    setTimeout(() => {
        mensajeDiv.fadeOut();
    }, 5000);
}
class Login {
    constructor(Usuario, Clave) {
        this.Usuario = Usuario;
        this.Clave = Clave;
    }
}