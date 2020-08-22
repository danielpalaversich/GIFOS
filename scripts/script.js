
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

let posicion_maxgif = 0;
let bd = []; 

let bd_favoritos = []; 

let bd_trending = []; 
let posicion_trending = 0;

let ubicacion; // variables para id secciones

// variagle global de contenido que busca
var busqueda = "";
let limit = 12; //cantidad de gif solicitados al servidor
let offset = 0;

//lamada a la api
async function llamadaApi(url) {
  const resp = await fetch(url);
  const data = await resp.json();
  return data
}

function buscar(q,limit,offset){

    console.log("funcion buscar");
    console.log(offset);

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

trending(6);

function trending(limit){

    console.log("funcion trending");

    let url = `http://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=${limit}`;

    let info = llamadaApi(url);
    info.then(data => {

        console.log(data);
        posicion_trending = 0

        let cantidad = 3

        if (cantidad > 0) {

          for (var i = 0; i < cantidad; i++) {

            crearimg(
              data.data[i].images.preview_gif.url,
              data.data[i].username,
              data.data[i].title,
              data.data[i].id,
              data.data[i].images.original.url,
              (bd_trending.length),
              "trending"
            );

            bd_trending.push(data.data[i]);

            comprobar_favoritos((bd_trending.length), data.data[i].id);
          }

          maximixar("trending");
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

function crearimg(imagen,usuario,titulo,id,original,pos,seccion) {
    let cadena = `
    <div class='caja'>
      <img src=${imagen} class='imagen'>
      <div class='contenido'>
        <a onclick='agregar_favoritos(${pos}, "${id}")' class='icono'><img src='./assets/icon-fav-hover.svg' class='icon_fav'/></a>
        <a onclick='descargar("${original}", ${pos})' class='icono'><img src='./assets/icon-download.svg' class='icon_download'/></a>
        <a class='icono'><img src='./assets/icon-max.svg' class='icon_max' data-seccion='${seccion}' data-link='${original}' data-id='${id}' data-pos=${pos} ></a>
        <h6 class='caja_usuario'>${usuario}</h6>
        <h5 class='caja_titulo'>${titulo}</h5>
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
})

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
}

ver_mas.addEventListener('click', ()=>{
    offset += 12;
    buscar(busqueda, limit, offset);
})

boton_cerrar.addEventListener('click', ()=>{
    //console.log("Click boton cerrar");
    maxgif.style.visibility = "hidden";
    imagen_maxgif.style.display = "none";
    posicion_maxgif = 0;
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

let imagen_maxgif = document.querySelector(".imagen_maxgif");
let loader = document.querySelector(".loader");

maxgif_usuario = document.querySelector(".maxgif_usuario");
maxgif_titulo = document.querySelector(".maxgif_titulo");

maximixar("");

function maximixar() {

  const boton = document.querySelectorAll('.icon_max');
  const caja_usuario = document.querySelectorAll(".caja_usuario");
  const caja_titulo = document.querySelectorAll(".caja_titulo");
  //console.log(boton);

  boton.forEach(function (item) {

    item.addEventListener('click', function 
    () {

        //console.log("Imagen maximixada");

        maxgif.style.visibility = "visible";
        imagen_maxgif.style.display = "none";
        loader.style.display = "block";

        seccion = item.dataset.seccion;
        posicion_maxgif = item.dataset.pos

        if (seccion == "resultado") {

          //console.log("Imagen resultado");

          imagen_maxgif.setAttribute('src', bd[posicion_maxgif].images.original.url);
          maxgif_usuario.textContent = bd[posicion_maxgif].username || "sin nombre";
          maxgif_titulo.textContent = bd[posicion_maxgif].title || "sin titulo";

        } else if (seccion == "trending") {

          //console.log("Imagen trending");

          imagen_maxgif.setAttribute('src', bd_trending[posicion_maxgif].images.original.url);
          maxgif_usuario.textContent = bd_trending[posicion_maxgif].username || "sin nombre";
          maxgif_titulo.textContent = bd_trending[posicion_maxgif].title || "sin titulo";

        }

        imagen_maxgif.addEventListener("load", function(event) {
        imagen_maxgif.style.display = "inline";
        loader.style.display = "none";

        });

    });

  });

}


let flecha_left = document.querySelector(".left");
let flecha_right = document.querySelector(".right");

flecha_left.addEventListener('click', ()=>{

    const boton = document.querySelectorAll('.icon_max');

    imagen_maxgif.style.display = "none";
    loader.style.display = "block";

    if (posicion_maxgif > 0) {
      posicion_maxgif--;
      console.log("Flecha izq");
      imagen_maxgif.setAttribute('src', bd[posicion_maxgif].images.original.url);
      maxgif_usuario.textContent = bd[posicion_maxgif].username || "sin nombre";
      maxgif_titulo.textContent = bd[posicion_maxgif].title || "sin titulo";
      //imagen_maxgif.setAttribute('src', boton[posicion_maxgif].dataset.link);
    }else{
      posicion_maxgif = contenedor_resultado.childElementCount - 1;
      console.log("Devuelta al final");
      imagen_maxgif.setAttribute('src', bd[posicion_maxgif].images.original.url);
      maxgif_usuario.textContent = bd[posicion_maxgif].username || "sin nombre";
      maxgif_titulo.textContent = bd[posicion_maxgif].title || "sin titulo";
      //imagen_maxgif.setAttribute('src', boton[posicion_maxgif].dataset.link);
    }

    (function(){
      imagen_maxgif.addEventListener("load", function(event) {
      imagen_maxgif.style.display = "inline";
      loader.style.display = "none";
      });
    }());

    //  (function(){}());  funcion aninima que se ejecuta asimisma.

});

flecha_right.addEventListener('click', ()=>{

    const boton = document.querySelectorAll('.icon_max');

    imagen_maxgif.style.display = "none";
    loader.style.display = "block";

    if (posicion_maxgif < contenedor_resultado.childElementCount - 1) {
      posicion_maxgif++;
      console.log("Flecha der");
      imagen_maxgif.setAttribute('src', bd[posicion_maxgif].images.original.url);
      maxgif_usuario.textContent = bd[posicion_maxgif].username || "sin nombre";
      maxgif_titulo.textContent = bd[posicion_maxgif].title || "sin titulo";
      //imagen_maxgif.setAttribute('src', boton[posicion_maxgif].dataset.link);
    }else{
      posicion_maxgif = 0;
      console.log("Devuelta al inicio");
      imagen_maxgif.setAttribute('src', bd[posicion_maxgif].images.original.url);
      maxgif_usuario.textContent = bd[posicion_maxgif].username || "sin nombre";
      maxgif_titulo.textContent = bd[posicion_maxgif].title || "sin titulo";
      //imagen_maxgif.setAttribute('src', boton[posicion_maxgif].dataset.link);
    }

    imagen_maxgif.addEventListener("load", function(event) {
    imagen_maxgif.style.display = "inline";
    loader.style.display = "none";
    });

});

function agregar_favoritos(pos, id) {

  const icon_fav = document.querySelectorAll('.icon_fav');

  resultado = bd_favoritos.find((elemento) => {
      return elemento.id === id;
  });

  if (resultado === undefined ) {

    bd_favoritos.push(bd[pos]);
    icon_fav[pos].setAttribute("src", "./assets/icon-fav-active.svg")
    //console.log("fav agregado");

  } else {

    icon_fav[pos].setAttribute("src", "./assets/icon-fav-hover.svg")

    function eliminar_id(id) {
      let index = bd_favoritos.findIndex(elemento => {
        return elemento.id === id;
      });
      bd_favoritos.splice(index,1);
    }

    eliminar_id(id); // ELIMINA OBJETO Y DEVUELVE EL ARRAY
    //console.log("fav eliminado");

  }

}

function comprobar_favoritos(pos, id) {

  const icon_fav = document.querySelectorAll('.icon_fav');

  resultado = bd_favoritos.find((elemento) => {
      return elemento.id === id;
  });

  if ( resultado ) {

    icon_fav[pos].setAttribute("src", "./assets/icon-fav-active.svg")
    //console.log("fav agregado");
  }

}

// ------------------------------ DESCARGAR DE GIF ------------------------------ 

function descargar(enlace, pos) {

  const boton = document.querySelectorAll('.icon_download');
  boton[pos].addEventListener('click', des(enlace));

  function des (enlace) {

    var x=new XMLHttpRequest();
    x.open("GET", enlace, true);
    x.responseType = 'blob';
    x.onload=function(e){download(x.response, "descarga.gif", "image/gif" ); }
    x.send();

  };

};

//boton.removeEventListener("click", descargar(), true); // no entiendo como hacerlo funcionar

function download(data, strFileName, strMimeType) {
    var self = window, // this script is only for browsers anyway...
      defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
      mimeType = strMimeType || defaultMime,
      payload = data,
      url = !strFileName && !strMimeType && payload,
      anchor = document.createElement("a"),
      toString = function(a){return String(a);},
      myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
      fileName = strFileName || "download",
      blob,
      reader;
      myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
    if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
      payload=[payload, mimeType];
      mimeType=payload[0];
      payload=payload[1];
    }
    if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
      fileName = url.split("/").pop().split("?")[0];
      anchor.href = url; // assign href prop to temp anchor
        if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
            var ajax=new XMLHttpRequest();
            ajax.open( "GET", url, true);
            ajax.responseType = 'blob';
            ajax.onload= function(e){ 
          download(e.target.response, fileName, defaultMime);
        };
            setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
          return ajax;
      } // end if valid url?
    } // end if url?
    //go ahead and download dataURLs right away
    if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){
      if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
        payload=dataUrlToBlob(payload);
        mimeType=payload.type || defaultMime;
      }else{      
        return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
          navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
          saver(payload) ; // everyone else can save dataURLs un-processed
      }
    }//end if dataURL passed?
    blob = payload instanceof myBlob ?
      payload :
      new myBlob([payload], {type: mimeType}) ;
    function dataUrlToBlob(strUrl) {
      var parts= strUrl.split(/[:;,]/),
      type= parts[1],
      decoder= parts[2] == "base64" ? atob : decodeURIComponent,
      binData= decoder( parts.pop() ),
      mx= binData.length,
      i= 0,
      uiArr= new Uint8Array(mx);
      for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);
      return new myBlob([uiArr], {type: type});
     }
    function saver(url, winMode){
      if ('download' in anchor) { //html5 A[download]
        anchor.href = url;
        anchor.setAttribute("download", fileName);
        anchor.className = "download-js-link";
        anchor.innerHTML = "downloading...";
        anchor.style.display = "none";
        document.body.appendChild(anchor);
        setTimeout(function() {
          anchor.click();
          document.body.removeChild(anchor);
          if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
        }, 66);
        return true;
      }
      // handle non-a[download] safari as best we can:
      if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
        url=url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
        if(!window.open(url)){ // popup blocked, offer direct download:
          if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
        }
        return true;
      }
      //do iframe dataURL download (old ch+FF):
      var f = document.createElement("iframe");
      document.body.appendChild(f);
      if(!winMode){ // force a mime that will download:
        url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
      }
      f.src=url;
      setTimeout(function(){ document.body.removeChild(f); }, 333);
    }//end saver
    if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
      return navigator.msSaveBlob(blob, fileName);
    }
    if(self.URL){ // simple fast and modern way using Blob and URL:
      saver(self.URL.createObjectURL(blob), true);
    }else{
      // handle non-Blob()+non-URL browsers:
      if(typeof blob === "string" || blob.constructor===toString ){
        try{
          return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
        }catch(y){
          return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
        }
      }
      // Blob but not URL support:
      reader=new FileReader();
      reader.onload=function(e){
        saver(this.result);
      };
      reader.readAsDataURL(blob);
    }
    return true;
  }; /* end download() */