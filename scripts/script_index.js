
/* 
// ------------------------------ COMENTARIOS ------------------------------

- Objeto y constructor para los resultados
- Guardar en el Localstorage

// ------------------------------ SOLICITUD DE GIF ------------------------------ 
*/

bd_favoritos = JSON.parse(localStorage.getItem("bd_favoritos"));

if (bd_favoritos == null) {bd_favoritos = []}


function buscar(q,limit,offset){

    //console.log("funcion buscar");

    eliminar_lista_sugerencias();

    resultado_titulo.textContent = q;

    let url = `http://api.giphy.com/v1/gifs/search?q=${q}&api_key=${api_key}&limit=${limit}&offset=${offset}`;

    let info = llamadaApi(url);
    info.then(data => {

        //console.log(data);
        posicion_maxgif = 0
        
        // console.log(data.data[0]);
        // console.log(data.pagination.count);

        let cantidad = data.pagination.count; //cantidad de gif devuelto por el servidor

        if (cantidad > 0) {

          for (var i = 0; i < cantidad; i++) {

            bd.push(data.data[i]);

            crearimg(
            data.data[i].images.preview_gif.url,
            data.data[i].username,
            data.data[i].title,
            data.data[i].id,
            data.data[i].images.original.url,
            bd.length - 1,
            "resultado"
            );

            comprobar_favoritos(bd.length - 1, data.data[i].id);

          }

          maximixar("resultado");

          resultado_vacio("none")

          if (cantidad < 12) {
            ver_mas.style.display = "none";
          } else {
            ver_mas.style.display = "inline";
          }

        } else {

          resultado_vacio("inline");
          ver_mas.style.display = "none";

        }

    }).catch(error => {
        console.log(error);
    })
}

function sugerencias(q){

    console.log("funcion sugerencias");

    let ultima_busqueda = "";

    let url = `https://api.giphy.com/v1/gifs/search/tags?q=${q}&api_key=${api_key}`;

    let info = llamadaApi(url);
    info.then(data => {

      let cantidad = data.pagination.count; //cantidad de gif devuelto por el servidor
        
      let elemento = document.createElement('li');
      elemento.setAttribute('id', 'linea');
      document.querySelector('#sugerencias_lista').appendChild(elemento);

      if (barra_busqueda.value != ultima_busqueda) {

        for (let i = 0; i<cantidad; i++){
          crear_sugerencias(data.data[i].name)
        }

        ultima_busqueda = barra_busqueda.value

        busqueda_sugerencia();

      }

    }).catch(error => {
        console.log(error);
    })
}

trending_listas();

function trending_listas(){

    console.log("funcion trending_listas");

    let ultima_busqueda = "";

    let url = `https://api.giphy.com/v1/trending/searches?api_key=${api_key}`;

    let info = llamadaApi(url);
    info.then(data => {

      // let cantidad = data.pagination.count; //cantidad de gif devuelto por el servidor
      let cantidad = 5;
        
      let elemento = document.createElement('h4');
      elemento.innerHTML = "Trending:";
      document.querySelector('#trending_lista').appendChild(elemento);

        for (let i = 0; i<cantidad; i++){
          crear_trending(data.data[i])
        }

        ultima_busqueda = barra_busqueda.value

        busqueda_trending();

    }).catch(error => {
        console.log(error);
    })
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

// llamar busqueda con tecla aceptar
barra_busqueda.addEventListener('keyup', ()=> {
  if (event.which === 13 || event.keyCode == 13) {

      eliminar_lista_resultado();

      busqueda = barra_busqueda.value;

      bd = []; //vaciar la los resultados.

      buscar(busqueda, 12, 0);
  }
});

if ( busqueda.length = 0 ) {

    lupa_close.addEventListener('click', ()=>{

    busqueda = barra_busqueda.value;

    bd = []; //vaciar la los resultados.

    buscar(busqueda, 12, 0);
    //console.log("realizando busqueda");
  })

} else {

    lupa_close.addEventListener('click', ()=>{

    eliminar_lista_sugerencias()

    barra_busqueda.value = "";
    // busqueda = "";
    //console.log("borrando busqueda");
  })
};

barra_busqueda.addEventListener('keyup', ()=> {

  if (event.which === 32 || event.keyCode == 32) {
    sugerencias(barra_busqueda.value);
  }
})

barra_busqueda.addEventListener('keyup', ()=> {

  if (event.which === 8 || event.keyCode == 8) {
    eliminar_lista_sugerencias();
  }
})

// ------------------------------ LISTA DE SUGERENCIAS ------------------------------ 

function eliminar_lista_sugerencias() {

  while (sugerencias_lista.hasChildNodes()) {  
    sugerencias_lista.removeChild(sugerencias_lista.firstChild);
  }

}

function crear_sugerencias(name) {
    let cadena = `
    <li class="sugerencia_item"><img src="./assets/icon-search.svg" class="lupa"/>${name}</li>
    `;

    //DOM Buscar ubicacion para crear los elementos
    let elemento = document.createElement('li');
    elemento.setAttribute('class', 'xxx');
    document.querySelector('#sugerencias_lista').appendChild(elemento);
    let x = document.querySelector('.xxx');
    x.outerHTML = cadena;

}

function eliminar_lista_resultado() {

  //Eliminando todos los hijos de un elemento
  while (contenedor_resultado.hasChildNodes()) {  
    contenedor_resultado.removeChild(contenedor_resultado.firstChild);
  }

}

function busqueda_sugerencia() {

  if (sugerencias_lista.childElementCount > 0) {

    const boton = document.querySelectorAll('.sugerencia_item');

    boton.forEach(function (item) {

      item.addEventListener('click', function 
      () {
          //console.log(item.textContent);
          eliminar_lista_resultado()
          barra_busqueda.value = item.textContent;
          busqueda = item.textContent;
          buscar(item.textContent, limit, offset);

      });

    });

  }

}

// ------------------------------ LISTA TRENDING ------------------------------ 

function crear_trending(name) {
    let cadena = `
    <a class="trending_item">${name}</a>,
    `;

    //DOM Buscar ubicacion para crear los elementos
    let elemento = document.createElement('a');
    elemento.setAttribute('class', 'xxx');
    document.querySelector('#trending_lista').appendChild(elemento);
    let x = document.querySelector('.xxx');
    x.outerHTML = cadena;

}

function busqueda_trending() {

  if (trending_lista.childElementCount > 0) {

    const boton = document.querySelectorAll('.trending_item');

    boton.forEach(function (item) {

      item.addEventListener('click', function 
      () {
          //console.log(item.textContent);
          bd = []; //vaciar la los resultados.
          offset= 0;
          eliminar_lista_resultado()
          barra_busqueda.value = item.textContent;
          busqueda = item.textContent;
          buscar(item.textContent, limit, offset);

      });

    });

  }

}

// ------------------------------ RESULTADOS ------------------------------ 

ver_mas.addEventListener('click', ()=>{
  offset += 12;
  buscar(busqueda, limit, offset);
})

function resultado_vacio(estado) {
  sinresultado_contenedor.style.display = estado;
}