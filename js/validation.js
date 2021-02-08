window.onload = enviardatos;

function enviardatos(){
    document.getElementById('Enviar').addEventListener('click', validar, false);
}

function validarNombre(){
    var nombre = document.getElementById('Name');
    var errorNombre = document.getElementById('errorName');
    if(nombre.nodeValue.length > 3){
        errorNombre.innerHTML = "Debe ingresar un nombre con más de 3 caracteres";
        return false;
    }
    else if(nombre === '' || nombre === null){
        errorNombre.innerHTML = "Debe ingresar un nombre";
        return false;
    } else{
        errorNombre.innerHTML ="";
        return true;
    }
    
}
console.log(validarNombre);

function validarEmail(){
    var email = document.getElementById('Email');
    var errorEmail = document.getElementById('errorEmail');
    if(!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(email))){
        errorEmail.innerHTML = 'Debe ingresar un email valido';
        return false;
    }
}
console.log(validarEmail);

function validarMensaje(){
    var mensaje = document.getElementById('message');
    var errorMensaje = document.getElementById('errorMessage');
    /* falta validar mensaje, averiguar como hacerlo */
}


function validar(){
 var nameConsole = document.querySelector('#textName');
 var emailConsole = document.querySelector('#textEmail');
 var messageConsole = document.querySelector('#textMessage');

 if(validarNombre && validarEmail && validarMensaje && confirm('Desea enviar el mensaje')){
    console.log('Nombre', nameConsole), console.log('Email', emailConsole), console.log('Mensaje', messageConsole);
    return false;
 } else {
     return true;
 }
 
}