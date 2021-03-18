function validarNombre() {
    var nombre = null;
    nombre = document.getElementById('textName');
    var errorNombre = null;
    errorNombre = document.getElementById('errorName');
    if (nombre.value.length > 3) {
        errorNombre.innerHTML = 'You must enter a name with more than 3 characters';
        //console.log(errorNombre);
        return false;
    } else if (nombre == '' || nombre == null) {
        errorNombre.innerHTML = 'You must enter a name';
        return false;
    }
    // errorNombre.innerHTML = '';
    //console.log(nombre);
    return true;
}


function validarEmail() {
    var email = null;
    email = document.getElementById('textEmail');
    var errorEmail = null;
    errorEmail = document.getElementById('errorEmail');
    if (!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(email))) {
        errorEmail.innerHTML = 'You must enter a valid email';
        //errorEmail.placeholder = 'Debe ingresar un email valido';
        //console.log(errorEmail);
        return false;
    }
    return true;
}

function validarMensaje() {
    var mensaje = null;
    mensaje = document.getElementById('textMessage');
    var errorMensaje = null;
    errorMensaje = document.getElementById('errorMessage');
    if (mensaje.value.length > 5) {
        errorMensaje.innerHTML = "You must enter a name with more than 5 characters";
        return false;
    } else if (mensaje == '' || mensaje == null) {
        errorMensaje.innerHTML = 'You must enter a message';
        //errorMensaje.placeholder = 'Debe ingresar un mensaje valido';
        return false;
    }
    return true;
}

function enviar() {
    var ConsolaNombre = document.getElementById('textName').value;
    var ConsolaEmail = document.getElementById('textEmail').value;
    var ConsolaMensaje = document.getElementById('textMessage').value;

    if (validarNombre() && validarEmail() && validarMensaje() && confirm("Press accept if you want to send the form")) {
        //console.log('Nombre', ConsolaNombre);
        //console.log('Email', ConsolaEmail);
        //console.log('Mensaje', ConsolaMensaje);
        return false;
    }
    window.location.href = "mailto:" + ConsolaEmail + "?subject=Contacto%20de%20" + ConsolaNombre + "&body=" + ConsolaMensaje;
    return true;
}


function enviarDatos() {
    document.getElementById('Enviar').addEventListener('click', enviar, false);
}

function prevent(event) {
    event.preventDefault();
}

window.onload = enviarDatos;