function maximixar_propiedades(seccion, posicion) {

  if (seccion == "resultado") {

    console.log("Imagen resultado");

    imagen_maxgif.setAttribute('src', bd[posicion].images.original.url);
    maxgif_usuario.textContent = bd[posicion].username || "sin nombre";
    maxgif_titulo.textContent = bd[posicion].title || "sin titulo";


  } else if (seccion == "trending") {

    console.log("Imagen trending");

    imagen_maxgif.setAttribute('src', bd_trending[posicion].images.original.url);
    maxgif_usuario.textContent = bd_trending[posicion].username || "sin nombre";
    maxgif_titulo.textContent = bd_trending[posicion].title || "sin titulo";

  }

}

let imagen_maxgif = document.querySelector(".imagen_maxgif");
let loader = document.querySelector(".loader");

maxgif_usuario = document.querySelector(".maxgif_usuario");
maxgif_titulo = document.querySelector(".maxgif_titulo");


boton_cerrar.addEventListener('click', ()=>{
    //console.log("Click boton cerrar");
    maxgif.style.visibility = "hidden";
    imagen_maxgif.style.display = "none";
    posicion_maxgif = 0;
})


maximixar();

function maximixar() {

  const boton = document.querySelectorAll('#icon_max');
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

        seccion_actual = item.dataset.seccion;
        posicion_maxgif = item.dataset.pos;
        posicion_trending = item.dataset.pos;

        if (seccion_actual == "resultado") {

          maximixar_propiedades("resultado", posicion_maxgif);

        } else if (seccion_actual == "trending") {

          maximixar_propiedades("trending", posicion_maxgif);

        }

        imagen_maxgif.addEventListener("load", function(event) {
        imagen_maxgif.style.display = "inline";
        loader.style.display = "none";

        });

    });

  });

}

//////////////////////////////////////////////////

// FLECHAS SECCION MAXGIFOS

let flecha_maxgifos_left = document.querySelector(".left_maxgifos");
let flecha_maxgifos_right = document.querySelector(".right_maxgifos");

flecha_maxgifos_left.addEventListener('click', ()=>{

  maximixar_flecha_izq(seccion_actual, posicion_maxgif)

});

flecha_maxgifos_right.addEventListener('click', ()=>{

  maximixar_flecha_der(seccion_actual, posicion_maxgif)

});

function maximixar_flecha_izq(seccion, posicion) {

  if (seccion == "resultado") {

    contenedor = contenedor_resultado.childElementCount - 1;

  } else if (seccion == "trending") {

    contenedor = contenedor_trending.childElementCount;

  }

  const boton = document.querySelectorAll('#icon_max');

  imagen_maxgif.style.display = "none";
  loader.style.display = "block";

  if (posicion_maxgif > 0) {
    posicion_maxgif--;
    console.log("Flecha izq");
    maximixar_propiedades(seccion, posicion_maxgif);
  }else{
    posicion_maxgif = contenedor;
    console.log("Devuelta al final");
    maximixar_propiedades(seccion, posicion_maxgif);
  }

  imagen_maxgif.addEventListener("load", function(event) {
  imagen_maxgif.style.display = "inline";
  loader.style.display = "none";
  });

}

function maximixar_flecha_der(seccion, posicion) {

  if (seccion == "resultado") {

    contenedor = contenedor_resultado.childElementCount - 1;

  } else if (seccion == "trending") {

    contenedor = contenedor_trending.childElementCount;

  }

  const boton = document.querySelectorAll('#icon_max');

  imagen_maxgif.style.display = "none";
  loader.style.display = "block";

  if (posicion_maxgif < contenedor) {
    posicion_maxgif++;
    console.log("Flecha der");
    maximixar_propiedades(seccion, posicion_maxgif);
  }else{
    posicion_maxgif = 0;
    console.log("Devuelta al inicio");
    maximixar_propiedades(seccion, posicion_maxgif);
  }

  imagen_maxgif.addEventListener("load", function(event) {
  imagen_maxgif.style.display = "inline";
  loader.style.display = "none";
  });

}