bd_favoritos = JSON.parse(localStorage.getItem("bd_favoritos"));
bd = JSON.parse(localStorage.getItem("bd_favoritos"));

if (bd_favoritos == null) {bd_favoritos = []}

let cantidad = bd_favoritos.length;


if (cantidad > 0) {

  for (var i = 0; i < cantidad; i++) {

    crearimg(
    bd_favoritos[i].images.preview_gif.url,
    bd_favoritos[i].username,
    bd_favoritos[i].title,
    bd_favoritos[i].id,
    bd_favoritos[i].images.original.url,
    i,
    "resultado"
    );

  }

  maximixar("resultado");

  resultado_vacio("none");

  if (cantidad < 12) {
    /*ver_mas.style.display = "none";*/
  } else {
    /*ver_mas.style.display = "inline";*/
  }

} else {

  resultado_vacio("inline");
  /*ver_mas.style.display = "none";*/

}

function crearimg(imagen,usuario,titulo,id,original,pos,seccion) {
    var str = titulo;
    var res = str.substring(0, 20);
    var final = res +"...";
    var usuario = usuario || "sin nombre";

    let cadena = `
    <div class='caja'>
      <img src=${imagen} class='imagen'>
      <div class='contenido'>
        <div class='contenido_top'>
          <a onclick='agregar_favoritos(${pos}, "${id}", "${seccion}")' class='boton icono'><img id="icon_fav" src='./assets/icon-fav-hover.svg'/></a>
          <a onclick='descargar("${original}", ${pos})' class='boton icono'><img id="icon_download" src='./assets/icon-download.svg'/></a>
          <a class='boton icono' id="icon_max" data-seccion='${seccion}' data-link='${original}' data-id='${id}' data-pos=${pos} ><img src='./assets/icon-max.svg'></a>
        </div>
        <div class='contenido_bottom'>
          <h6 class='caja_usuario'>${usuario}</h6>
          <h5 class='caja_titulo'>${final}</h5>
        </div>
    </div>
    `;

    if (seccion == "resultado") {

      ubicacion = '#contenedor_resultado';

    } else if (seccion == "trending") {

      ubicacion = '#contenedor_trending';

    }

    //DOM Buscar ubicacion para crear los elementos
    let elemento = document.createElement('DIV');
    elemento.setAttribute('class', 'xxx');
    document.querySelector(ubicacion).appendChild(elemento);
    let x = document.querySelector('.xxx');
    x.outerHTML = cadena;

}


function agregar_favoritos(pos, id, seccion) {

  let contenedor_resultado = document.getElementById('contenedor_resultado');
  const icon_fav = document.querySelectorAll('#icon_fav');

  icon_fav[pos+1].setAttribute("src", "./assets/icon-fav-hover.svg")

  function eliminar_id(id) {
    let index = bd_favoritos.findIndex(elemento => {
      return elemento.id === id;
    });
    bd_favoritos.splice(index,1);

    contenedor_resultado.removeChild(contenedor_resultado.childNodes[pos]);
    //se crea un objeto texto y no correlaciona bien las posiciones con la cantidad de hijos 
  }

  eliminar_id(id); // ELIMINA OBJETO Y DEVUELVE EL ARRAY
  //console.log("fav eliminado");

  localStorage.setItem("bd_favoritos", JSON.stringify(bd_favoritos));

}

// ------------------------------ RESULTADOS ------------------------------ 

/*ver_mas.addEventListener('click', ()=>{
  offset += 12;
  buscar(busqueda, limit, offset);
})*/

function resultado_vacio(estado) {
  sinresultado_contenedor.style.display = estado;
}