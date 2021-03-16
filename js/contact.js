function validarNombre() {
    var nombre = null;
    nombre = document.getElementsByName('Name');
    var errorNombre = null;
    errorNombre = document.getElementById('errorName');
    if (nombre.values.length > 3) {
        errorNombre.innerHTML = "Debe ingresar un nombre con más de 3 caracteres";
        console.log(errorNombre);
        return false;
    } else if (nombre == "" || nombre == null) {
        errorNombre.innerHTML = "Debe ingresar un nombre";
        return false;
    } else {
        // errorNombre.innerHTML = '';
        console.log(nombre);
        return true;
    }
}


function validarEmail() {
    var email = null;
    email = document.getElementsByName('Email');
    var errorEmail = null;
    errorEmail = document.getElementById('errorEmail');
    if (!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(email))) {
        errorEmail.innerHTML = "Debe ingresar un email valido";
        //errorEmail.placeholder = 'Debe ingresar un email valido';
        console.log(errorEmail);
        return false;
    }
}

function validarMensaje() {
    var mensaje = null;
    mensaje = document.getElementsByName('Massage');
    var errorMensaje = null;
    errorMensaje = document.getElementById('errorMessage');
    if (mensaje.values.length > 5) {
        errorMensaje.innerHTML = "Debe ingresar un nombre con más de 5 caracteres";
        return false;
    } else if (mensaje == '' || mensaje == null) {
        errorMensaje.innerHTML = 'Debe ingresar un mensaje';
        //errorMensaje.placeholder = 'Debe ingresar un mensaje valido';
        return false;
    } else {
        // errorMensaje.innerHTML = '';
        return true;
    }
}

function validar() {
    var ConsolaNombre = document.querySelector('#textName').values;
    var ConsolaEmail = document.querySelector('#textEmail').values;
    var ConsolaMensaje = document.querySelector('#textMessage').values;

    if (validarNombre() && validarEmail() && validarMensaje() && confirm("Pulsa aceptar si deseas enviar el formulario")) {
        console.log('Nombre', ConsolaNombre);
        console.log('Email', ConsolaEmail);
        console.log('Mensaje', ConsolaMensaje);
        return false;
    } else {

        return true;
    }
}


function enviarDatos() {
    document.getElementById('Enviar').addEventListener('click', validar, false);
}

window.onload = enviarDatos;
