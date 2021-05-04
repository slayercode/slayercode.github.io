var cajaDatos;
var bd;

function iniciar(){
    cajaDatos = document.getElementById("cajaDatos");
    var boton = document.getElementById("buscar");
    boton.addEventListener("click",buscar);
    var solicitud = indexedDB.open("michaelperez");
    solicitud.addEventListener("error",mostrarError);
    solicitud.addEventListener("success",comenzar);
    solicitud.addEventListener("upgradeneeded",crearBasedeDatos);
}

function mostrarError(evento){
    alert("Error: " + evento.code + " " + evento.message);
}
function comenzar(evento){
    bd = evento.target.result;
}
function crearBasedeDatos(evento){
    var basededatos = evento.target.result;
    var almacenObjetos = basededatos.createObjectStore("peliculas",{keyPath: "id"});
    almacenObjetos.createIndex("BuscarFecha","fecha",{unique:false});
}

function buscar(){
    cajaDatos.innerHTML = "";
    var buscar = document.getElementById("fecha").value;
    var transaccion = bd.transaction(["peliculas"]);
    var alamacen =  transaccion.objectStore("peliculas");
    var indice = alamacen.index("BuscarFecha");
    var rango = IDBKeyRange.only(buscar);
    var puntero = indice.openCursor(rango);
    puntero.addEventListener("success",mostrarDatos);
}

function mostrarDatos(evento){
    var puntero = evento.target.result;
    if(puntero){
        cajaDatos.innerHTML += "<div>"+ puntero.value.id + "-" + puntero.value.nombre + "-" + puntero.value.fecha + "</div>";
        puntero.continue();

    }
}

window.addEventListener("load",iniciar);