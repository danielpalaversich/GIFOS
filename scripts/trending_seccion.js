trending(6, 0);

function trending(limit, pos){

    console.log("funcion trending");

    let url = `http://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=${limit}`;

    let info = llamadaApi(url);
    info.then(data => {

        let trending_gif_cant;
        let cantidad = 6
        bd_trending = [];

        if (window.matchMedia("(min-width: 1000px)").matches) {
  
          trending_gif_cant = 3;

        } else if (window.matchMedia("(max-width: 999px)").matches) {

          trending_gif_cant = 1;

        }

        cadena = `
        <button class="boton left_trending"><img src="./assets/button-left.svg"/></button>
        `;

        let elemento = document.createElement('DIV');
        elemento.setAttribute('class', 'xxx');
        document.querySelector('#contenedor_trending').appendChild(elemento);
        let x = document.querySelector('.xxx');
        x.outerHTML = cadena;

        if (cantidad > 0) {

          for (var i = 0 + pos; i < cantidad; i++) {

            if (i < trending_gif_cant + pos) {

              crearimg(
                data.data[i].images.preview_gif.url,
                data.data[i].username,
                data.data[i].title,
                data.data[i].id,
                data.data[i].images.original.url,
                (bd_trending.length),
                "trending"
              );

              //comprobar_favoritos((bd_trending.length), data.data[i].id);

            }

            bd_trending.push(data.data[i]);

          }

          cadena = `
          <button class="boton right_trending"><img src="./assets/button-right.svg"/></button>
          `;

          let elemento = document.createElement('DIV');
          elemento.setAttribute('class', 'xxx');
          document.querySelector('#contenedor_trending').appendChild(elemento);
          let x = document.querySelector('.xxx');
          x.outerHTML = cadena;

          flechas_trending();

          maximixar("trending");
        }

    }).catch(error => {
        console.log(error);
    })
}

function flechas_trending() {

  let flecha_trending_left = document.querySelector(".left_trending");
  let flecha_trending_right = document.querySelector(".right_trending");

  flecha_trending_left.addEventListener('click', ()=>{

    if (posicion_trending > 0) {
      //console.log("trending_izq");

      while (contenedor_trending.hasChildNodes()) {  
        contenedor_trending.removeChild(contenedor_trending.firstChild);
      }

      posicion_trending--
      trending(6, posicion_trending);
    }

  });

  flecha_trending_right.addEventListener('click', ()=>{

    if (posicion_trending < 3) {
      //console.log("trending_der");

      while (contenedor_trending.hasChildNodes()) {  
        contenedor_trending.removeChild(contenedor_trending.firstChild);
      }

      posicion_trending++
      trending(6, posicion_trending);
    }

  });

}