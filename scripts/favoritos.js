console.log("favoritos.js cargado");

function agregar_favoritos(pos, id, seccion) {

  const icon_fav = document.querySelectorAll('#icon_fav');

  resultado = bd_favoritos.find((elemento) => {
      return elemento.id === id;
  });

  if (resultado === undefined ) {

    if (seccion == "resultado") {

      bd_favoritos.push(bd[pos]);
      icon_fav[pos+1].setAttribute("src", "./assets/icon-fav-active.svg")
      //console.log("fav agregado");

    } else if (seccion == "trending") {

      bd_favoritos.push(bd_trending[pos]);
      icon_fav[pos+1].setAttribute("src", "./assets/icon-fav-active.svg")
      //console.log("fav agregado");

    }

  } else {

    icon_fav[pos+1].setAttribute("src", "./assets/icon-fav-hover.svg")

    function eliminar_id(id) {
      let index = bd_favoritos.findIndex(elemento => {
        return elemento.id === id;
      });
      bd_favoritos.splice(index,1);
    }

    eliminar_id(id); // ELIMINA OBJETO Y DEVUELVE EL ARRAY
    //console.log("fav eliminado");

  }

  localStorage.setItem("bd_favoritos", JSON.stringify(bd_favoritos));

}

function comprobar_favoritos(pos, id) {

  const icon_fav = document.querySelectorAll('#icon_fav');

  resultado = bd_favoritos.find((elemento) => {
      return elemento.id === id;
  });

  if ( resultado ) {

    icon_fav[pos+1].setAttribute("src", "./assets/icon-fav-active.svg")
    //console.log("fav agregado");
  }

}