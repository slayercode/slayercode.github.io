const form = document.getElementById('form');
const nombres = document.getElementById('nombres');
const carrera = document.getElementById('carrera');
const semestre = document.getElementById('semestre');
const tema = document.getElementById('tema');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefomo');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
  // trim to remove the whitespaces
  const nombresvalue = nombres.nodeValue.trim();
  const carreravalue = carrera.nodeValue.trim();
  const semestrevalue = semestre.nodeValue.trim();
  const temavalue = tema.nodeValue.trim();
  const correovalue = correo.nodeValue.trim();
  const telefonovalue = telefono.nodeValue.trim();
  const mensajevalue = mensaje.nodeValue.trim();

  if (nombresvalue === '') {
    setErrorFor(nombres, 'No puede dejar el campo en blanco');
  } else {
    setSuccessFor(nombres);
  }

  if (carreravalue === '') {
    setErrorFor(carrera, 'No puede dejar el campo en blanco');
  } else {
    setSuccessFor(carrera);
  }

  if (semestrevalue === '') {
    setErrorFor(semestre, 'No puede dejar el campo en blanco');
  } else {
    setSuccessFor(semestre);
  }

  if (temavalue === '') {
    setErrorFor(tema, 'No puede dejar el campo en blanco');
  } else {
    setSuccessFor(tema);
  }

  if (correovalue === '') {
    setErrorFor(correo, 'No puede dejar el campo en blanco');
  } else if (!isEmail(correovalue)) {
    setErrorFor(correo, 'No ingreso un correo válido');
  } else {
    setSuccessFor(correo);
  }

  if (telefonovalue === '') {
    setErrorFor(telefono, 'No puede dejar el campo en blanco');
  } else if (!isNumber(telefonovalue)) {
    setErrorFor(telefono, 'No ingreso un correo válido');
  } else {
    setSuccessFor(telefono);
  }

  if (mensajevalue === '') {
    setErrorFor(mensaje, 'No puede dejar el campo en blanco');
  } else {
    setSuccessFor(mensaje);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isEmail(correo) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(correo);
}

function isNumber(telefono) {
  return /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/.test(telefono);
}