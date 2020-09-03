let modo_nocturno_boton = document.querySelector('#modo_nocturno');

if (window.matchMedia("(min-width: 1000px)").matches) {



} else if (window.matchMedia("(max-width: 999px)").matches) {



}

let modo_nocturno = false;
let buscador_general = document.querySelector('#buscador_general');
let seccion_trending = document.querySelector('.trending');
let seccion_busqueda = document.querySelector('.busqueda');
let footer = document.querySelector('footer');

modo_nocturno_boton.addEventListener('click', ()=>{

	if (modo_nocturno == false) {

		document.body.style.backgroundColor = "#37383C";
		barra_busqueda.style.backgroundColor = "#37383C";
		buscador_general.style.backgroundColor = "#37383C";
		seccion_trending.style.backgroundColor = "#222326";
		seccion_busqueda.style.color = "#ffffff";
		footer.style.color = "#ffffff";
		

		modo_nocturno = true;

	} else {

		document.body.style.backgroundColor = "#ffffff";
		barra_busqueda.style.backgroundColor = "#ffffff";
		buscador_general.style.backgroundColor = "#ffffff";
		seccion_trending.style.backgroundColor = "#F3F5F8";
		seccion_busqueda.style.color = "#572EE5";
		footer.style.color = "#572EE5";
		
		
		modo_nocturno = false;
	}

	console.log(modo_nocturno);

})

//img_menu.setAttribute('src', "./assets/close.svg");