console.log("declaracion.js cargado");

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

let seccion_actual;

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

let img_menu = document.querySelector('#img_menu');
let checkbox = document.querySelector('#checkbox');
let ul = document.querySelector('.ul');

if (window.matchMedia("(min-width: 1000px)").matches) {
  
	ul.style.display = "flex";

} else if (window.matchMedia("(max-width: 999px)").matches) {

	let mostrar_menu = false;
	ul.style.display = "none";

	checkbox.addEventListener('click', ()=>{

		if (mostrar_menu == false) {

			ul.style.display = "grid";
			img_menu.setAttribute('src', "./assets/close.svg");
			mostrar_menu = true;

		} else {

			ul.style.display = "none";
			img_menu.setAttribute('src', "./assets/burger.svg");
			mostrar_menu = false;
		}

		console.log(mostrar_menu);

})

}

let logo = document.querySelector('.logo');

if (window.matchMedia("(min-width: 1000px)").matches) {
  
	logo.setAttribute('src', "./assets/logo-desktop.svg");

} else if (window.matchMedia("(max-width: 999px)").matches) {

	logo.setAttribute('src', "./assets/logo-mobile.svg");

}