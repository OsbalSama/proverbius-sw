//Objetos
const datos = {
    txtName: '',
    txtPhone: '',
    txtEmail: '',
    txtMessage: ''
}

//Variables y componentes
const txtName = document.querySelector('#txtName');
const txtPhone = document.querySelector('#txtPhone');
const txtEmail = document.querySelector('#txtEmail');
const txtMessage = document.querySelector('#txtMessage');
const formulario = document.querySelector('#formulario');

//eventos
txtName.addEventListener('input', leerTexto);
txtPhone.addEventListener('input', leerTexto);
txtEmail.addEventListener('input', leerTexto);
txtMessage.addEventListener('input', leerTexto);
formulario.addEventListener('submit', enviarForm)

//Metodos y funciones
function leerTexto(e) {
    datos[e.target.id] = e.target.value;    
}

function enviarForm(e) {
    e.preventDefault();
    if (datos.txtName === '' || datos.txtPhone === '' || datos.txtEmail === '' || datos.txtMessage === '') {
        createAlertMessage('Todos los campos son obligatorios', true);
    } else {
        createAlertMessage('Enviando Formulario');                
    }
}

function createAlertMessage(mensaje, error = null) {
    const message = document.createElement('P');
    message.textContent = mensaje;
    if(error){
        message.classList.add('warningMessage');
    } else {
        message.classList.add('successMessage');
    }
    formulario.appendChild(message);   
    setTimeout(() => {
        message.remove();
        sended = false;
    }, 4000); 
}
