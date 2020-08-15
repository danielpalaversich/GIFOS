
/* 
// ------------------------------ COMENTARIOS ------------------------------

- Objeto y constructor para los resultados
- Usar una sola llamada para el servidor con fecth
- Guardar en el Localstorage





- Como detectar segun lo escrito la llamada de sugerencias

// ------------------------------ SOLICITUD DE GIF ------------------------------ 
*/

const api_key = 'EicHCCDXaZm71xQ9PRc09A6G1J1Zkfao';

// seleccionar elementos e id con variables
let barra_busqueda = document.getElementById('barra_busqueda');
let resultado_titulo = document.getElementById('resultado_titulo');
let ver_mas = document.getElementById('ver_mas');
let lupa_close = document.getElementById('lupa-close');
let sugerencias_lista = document.getElementById('sugerencias_lista');
let contenedor_resultado = document.getElementById('contenedor_resultado');

let sinresultado_contenedor = document.querySelector('.sinresultado_contenedor');

//seccion maxgif
let maxgif = document.querySelector('.maxgif');
let boton_cerrar = document.querySelector('.boton_cerrar');


// variagle global de contenido que busca
var busqueda = "";
let limit = 12; //cantidad de gif solicitados al servidor
let offset = 0;

//lamada a la api
async function llamadaApi(url) {
  const resp = await fetch(url);
  const data = await resp.json();
  return data
  // console.log(data); //mostrar lo obtenido en consola
}

function buscar(q,limit,offset){

    eliminar_lista_sugerencias();

    resultado_titulo.textContent = q;

    let url = `http://api.giphy.com/v1/gifs/search?q=${q}&api_key=${api_key}&limit=${limit}&offset=${offset}`;

    let info = llamadaApi(url);
    info.then(data => {
        
        // console.log(data.data[0]);
        // console.log(data.pagination.count);

        let cantidad = data.pagination.count; //cantidad de gif devuelto por el servidor

        if (cantidad > 0) {

          for (var i = 0; i < cantidad; i++) {

            crearimg(
            data.data[i].images.preview_gif.url,
            data.data[i].username,
            data.data[i].title,
            data.data[i].id,
            data.data[i].images.original.url
            );
          }

          maximixar();

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

function trending(q,limit,offset){

    eliminar_lista_sugerencias();

    resultado_titulo.textContent = q;

    let url = `http://api.giphy.com/v1/gifs/search?q=${q}&api_key=${api_key}&limit=${limit}&offset=${offset}`;

    let info = llamadaApi(url);
    info.then(data => {
        
        // console.log(data.data[0]);
        // console.log(data.pagination.count);

        let cantidad = data.pagination.count; //cantidad de gif devuelto por el servidor

        if (cantidad > 0) {

          for (var i = 0; i < cantidad; i++) {

            crearimg(
            data.data[i].images.preview_gif.url,
            data.data[i].username,
            data.data[i].title,
            data.data[i].id,
            data.data[i].images.original.url
            );
          }

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

// contenedor de resultado busqueda
/*let contenedor = document.getElementById('contenedor');

function addToDOM(info){
    let ctn = document.createElement('div');
    let name = document.createElement('h2');
    name.textContent = `${info.name} #${info.id}`;
    let img = document.createElement('img');
    img.setAttribute('src', info.sprites.front_default);
    ctn.appendChild(name);
    ctn.appendChild(img);
    contenedor.appendChild(ctn);
}*/

/*let imgCtn = document.getElementById('imgCtn');

async function getDogImg() {
    let url = "https://dog.ceo/api/breeds/image/random";
    const resp = await fetch(url);
    const data = await resp.json();
    return data
};
let dog = getDogImg();
dog.then(data => {
    let dogImg = document.createElement('img');
    dogImg.setAttribute('src', data.message);
    dogImg.style.width = '300px';
    imgCtn.appendChild(dogImg);
    console.log(data);
}).catch(err => {
    console.error('fetch failed', err);
})*/

function crearimg(imagen,usuario,titulo,id, original) {
    let cadena = `
    <div class='caja'>
      <img src=${imagen} class='imagen'>
      <div class='contenido'>
        <a class='icono'><img src='./assets/icon-fav-hover.svg' class='icon_fav'/></a>
        <a href="https://i.giphy.com/media/${id}/giphy.gif" download="filename" class='icono'><img src='./assets/icon-download.svg' class='icon_download'/></a>
        <a class='icono'><img src='./assets/icon-max.svg' class='icon_max' data-link='${original}' data-id='${id}'/></a>
        <h6>${usuario}</h6>
        <h5>${titulo}</h5>
      </div>
    </div>
    `;

    //DOM Buscar ubicacion para crear los elementos
    let elemento = document.createElement('DIV');
    elemento.setAttribute('class', 'xxx');
    document.querySelector('#contenedor_resultado').appendChild(elemento);
    let x = document.querySelector('.xxx');
    x.outerHTML = cadena;
}

// llamar busqueda con tecla aceptar
barra_busqueda.addEventListener('keyup', ()=> {
    if (event.which === 13 || event.keyCode == 13) {

        eliminar_lista_resultado();

        busqueda = barra_busqueda.value;

        buscar(busqueda, 12, 0);
    }
})

if ( busqueda.length = 0 ) {

    lupa_close.addEventListener('click', ()=>{

    busqueda = barra_busqueda.value;

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
}

ver_mas.addEventListener('click', ()=>{
    offset += 12;
    buscar(busqueda, limit, offset);
})

boton_cerrar.addEventListener('click', ()=>{
    //console.log("Click boton cerrar");
    maxgif.style.visibility = "hidden";
})


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



function resultado_vacio(estado) {

  sinresultado_contenedor.style.display = estado;
}


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
          eliminar_lista_resultado()
          barra_busqueda.value = item.textContent;
          busqueda = item.textContent;
          buscar(item.textContent, limit, offset);

      });

    });

  }

}

maximixar();

function maximixar() {

  const boton = document.querySelectorAll('.icon_max');

  boton.forEach(function (item) {

    item.addEventListener('click', function 
    () {

        let imagen_maxgif = document.querySelector(".imagen_maxgif");
        console.log(item.dataset.link);
        let imagen = maxgif.dataset.link
        maxgif.style.visibility = "visible";
        imagen_maxgif.setAttribute('src', imagen);

    });

  });

}