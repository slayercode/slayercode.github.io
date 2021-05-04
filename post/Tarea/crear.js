var bd,cajadatos;
function iniciar(){
    cajadatos = document.getElementById("cajaDatos");
    var boton = document.getElementById("grabar");
    boton.addEventListener("click",agregarObjeto);
    var solicitud = indexedDB.open("michaelperez");
    solicitud.addEventListener("error",mostrarError);
    solicitud.addEventListener("success",comenzar);
    solicitud.addEventListener("upgradeneeded",crearBD);

}

function crearBD(evento){
    var basededatos = evento.target.result;
    var almacen = basededatos.createObjectStore("peliculas",{keyPath : "id"});
    almacen.createIndex("BuscarFecha","fecha",{unique:false});

}

function comenzar(evento){
    bd = evento.target.result;
    mostrar();
}
function mostrarError(evento){
    alert("Error" + evento.code + " " + evento.message);
}
function agregarObjeto(){
    var clave = document.getElementById("clave").value;
    var titulo = document.getElementById("texto").value;
    var fecha = document.getElementById("fecha").value;
    var transaccion = bd.transaction(["peliculas"],"readwrite");
    var almacen  = transaccion.objectStore("peliculas");
    transaccion.addEventListener("complete",mostrar);
    var solicitud = almacen.add({id : clave,nombre : titulo, fecha : fecha});
    document.getElementById("clave").value="";
    document.getElementById("texto").value="";
    document.getElementById("fecha").value="";


}
function mostrar(){
    cajadatos.innerHTML = "";
    var transaccion = bd.transaction(["peliculas"]);
    var almacen = transaccion.objectStore("peliculas");
    var indice  = almacen.index("BuscarFecha");
    var puntero  = indice.openCursor(null,"prev");
    puntero.addEventListener("success",mostrarlista);
    
}
function mostrarlista(evento){
    var puntero = evento.target.result;
    if(puntero){
        cajadatos.innerHTML += "<div>"+puntero.value.id +" - " + puntero.value.nombre + " - " + puntero.value.fecha;
        cajadatos.innerHTML += '<input type="button" onclick="eliminarobjeto(\''+puntero.value.id+'\')" value="Borrar"></div>';
        puntero.continue();
    }
}
function eliminarobjeto(clave){
    if(confirm("Estas seguro que deseas borrar?")){
        var transaccion = bd.transaction(["peliculas"], "readwrite");
        var almacen = transaccion.objectStore("peliculas");
        transaccion.addEventListener("complete", mostrar);
        var solicitud = almacen.delete(clave);
    }
}
window.addEventListener("load",iniciar);