// =====================
// Create required vars
// =====================
var output = $(".output");
var input = $("textarea.input");
var toOutput;

//variables
var tamanio;
var matriz;
var transpuesta;
var sumaa;
var multiplicacion;

window.onload = function () {
  var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
  document.getElementById('loadTime').innerHTML = loadTime + "ms ok!";
}

// Creates the event listner for the comands ==
// Yes this is a long one - could do with some
// improvements ===============================
input.keypress(function (e) {
  if (e.which == 13) {
    var inputVal = $.trim(input.val());
    //console.log(inputVal);
    if (inputVal == "ayuda") {
      ayuda();
      input.val("");
    } else if (inputVal == "acerca") {
      acerca();
      input.val("");
    } else if (inputVal == "clear") {
      clearConsole();
      input.val("");
    } else if (inputVal > 1) {
      tamanio = inputVal;
      rellenar(inputVal);
      transpuesta_matriz();
      suma();
      Multiplicar();
      input.val("");
    } else {
      Output("<span>comando no encontrado</span></br>");
      input.val("");
    }
  }
});

// prints out a seperator
function seperator() {
  Output(
    '<span class="seperator">== == == == == == == == == == == == == == == == == ==</span></br>'
  );
}

//clears the screen
function clearConsole() {
  Output("<span>clear</span></br>");
  output.html("");
}

// prints out a list of "all" comands available
function ayuda() {
  var commandsArray = [
    "ayuda: Lista de todos los comandos",
    ">ayuda",
    ">(2-n) escriba un número para definir el tamaño de la matriz",
    ">acerca",
    ">clear",
  ];
  for (var i = 0; i < commandsArray.length; i++) {
    var out = "<span>" + commandsArray[i] + "</span><br/>";
    Output(out);
  }
}

function acerca() {
  var aboutMeArray = [
    ">Acerca de:",
    "+ Michael Perez",
  ];
  seperator();
  for (var i = 0; i < aboutMeArray.length; i++) {
    var out = "<span>" + aboutMeArray[i] + "</span><br/>";
    Output(out);
  }
  seperator();
}

// Prints out the result of the command into the output div
function Output(data) {
  $(data).appendTo(output);
}

//MATRICES
function rellenar(valor) {
  matriz = crear()
  for (var i = 0; i < valor; i++) {
    for (var j = 0; j < valor; j++) {
      matriz[i][j] = Random(1, 100);
    }
  }
  Output("<span>" + "Matriz Original" + "</span><br/>");
  for (var i = 0; i < tamanio; i++) {
    for (var j = 0; j < tamanio; j++) {
      var out = "<span>" + "[" + i + "]" + " [" + j + "]: " + matriz[i][j] + "</span><br/>";
      Output(out);
    }
  }
  // console.log(tamanio);
}

function Random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function transpuesta_matriz() {
  transpuesta = crear()

  for (var i = 0; i < tamanio; i++) {
    for (var j = 0; j < tamanio; j++) {
      transpuesta[i][j] = matriz[j][i];
    }
  }

  Output("<span>" + "Transpuesta" + "</span><br/>");
  for (var i = 0; i < tamanio; i++) {
    for (var j = 0; j < tamanio; j++) {
      var out = "<span>" + "[" + i + "]" + " [" + j + "]: " + transpuesta[i][j] + "</span><br/>";
      Output(out);
    }
  }
}

function suma(){
  sumaa = crear();
  for (var i = 0; i < tamanio; i++) {
    for (var j = 0; j < tamanio; j++) {
      sumaa[i][j] = matriz[i][j] + transpuesta[i][j]
    }
  }
  Output("<span>" + "Suma" + "</span><br/>");
  for (var i = 0; i < tamanio; i++) {
    for (var j = 0; j < tamanio; j++) {
      var out = "<span>" + "[" + i + "]" + " [" + j + "]: " + sumaa[i][j] + "</span><br/>";
      Output(out);
    }
  }
}

function Multiplicar () {
  multiplicacion = crear();
	for (i=0; i < tamanio; i++){
		for (j=0; j < tamanio; j++){
			for (k=0; k < tamanio; k++){
				multiplicacion[i][j] = matriz[i][k] * transpuesta[k][j];
			}
		}
	}
  Output("<span>" + "Multiplicación" + "</span><br/>");
  for (var i = 0; i < tamanio; i++) {
    for (var j = 0; j < tamanio; j++) {
      var out = "<span>" + "[" + i + "]" + " [" + j + "]: " + multiplicacion[i][j] + "</span><br/>";
      Output(out);
    }
  }
}

function crear() {
  var matrix = new Array(tamanio);
  for (var h = 0; h < tamanio; h++) {
    matrix[h] = new Array(tamanio).fill(0);
  }
  return matrix;
}