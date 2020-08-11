
// ------------------------------ SOLICITUD DE GIF ------------------------------

const api_key = 'EicHCCDXaZm71xQ9PRc09A6G1J1Zkfao';

let limit = 12;
let offset = 0;
let q = 'dog';

// document.getElementById('buscar').addEventListener('click', busqueda);

function busqueda() {
  // var q = document.getElementById('barra_busqueda').value;
  // console.log(q);

/*
  var url = 'http://api.giphy.com/v1/gifs/search',
    params = {
        api_key : 'EicHCCDXaZm71xQ9PRc09A6G1J1Zkfao',
        q : 'dog',
        limit : 12,
        offset : 0
    };
*/

//url de solicitud
var url = `http://api.giphy.com/v1/gifs/search?q=${q}&api_key=${api_key}&limit=${limit}&offset=${offset}`;
//var url = 'http://api.giphy.com/v1/gifs/search?q=dog&api_key=EicHCCDXaZm71xQ9PRc09A6G1J1Zkfao&limit=12&offset=0';

//solicitud a web
var request = new Request( url );
//var request = new Request( url, params);
 
fetch( request ).then( r => r.json() )
  .then( data => console.dir( data ) )
  .catch( e => console.error( 'Error' ) );

}

busqueda();

/*

//función asincrónica
const resp = await fetch(''aca va el endpoint completo con los parámetros'')

//Luego lo pasas a JSON
const data = await resp.json()

//Y lo retornas
return data

*/

// ------------------------------ XXXXX ------------------------------

/*
  function crearimg() {
    var img = document.createElement('img');
    img.setAttribute('src', 'https://picsum.photos/260/200');
    img.setAttribute('class', 'image');
    document.body.appendChild(para);
  }

  function imagentotal() {

    var newDiv = document.createElement('div'); 
    var newContent = document.createTextNode('Hola!¿Qué tal?'); 
    newDiv.appendChild(newContent); //añade texto al div creado. 

    // añade el elemento creado y su contenido al DOM 
    var currentDiv = document.getElementById('overlay'); 
    document.body.insertBefore(newDiv, currentDiv); 

    var elemento = document.createElement('a');
    elemento.setAttribute('href', '#');
    elemento.setAttribute('class', 'icon');
    document.body.appendChild(elemento);
 
    var elemento = document.createElement('img');
    elemento.setAttribute('src', 'assets/icon-fav-hover.svg');
    elemento.setAttribute('class', 'xx');
    document.body.appendChild(elemento);

    var elemento = document.createElement('img');
    elemento.setAttribute('src', 'assets/icon-download.svg');
    elemento.setAttribute('class', 'xx');
    document.body.appendChild(elemento);

    var elemento = document.createElement('img');
    elemento.setAttribute('src', 'assets/icon-max.svg');
    elemento.setAttribute('class', 'xx');
    document.body.appendChild(elemento);

    var elemento = document.createElement('h6');
    var contenido = document.createTextNode('User'); 
    elemento.appendChild(contenido);

    var elemento = document.createElement('h5');
    var contenido = document.createTextNode('Titulo GIFO'); 
    elemento.appendChild(contenido);

  }



  function addElement () { 
    // crea un nuevo div 
    // y añade contenido 
    var newDiv = document.createElement('div'); 
    var newContent = document.createTextNode('Hola!¿Qué tal?'); 
    newDiv.appendChild(newContent); //añade texto al div creado. 

    // añade el elemento creado y su contenido al DOM 
    var currentDiv = document.getElementById('div1'); 
    document.body.insertBefore(newDiv, currentDiv); 
  }
  */

  // document.querySelector('.container');
  // elemento.setAttribute('src', 'dirección');

// function myFunction() {
//   var para = document.createElement('P');
//   para.innerHTML = 'This is a paragraph.';
//   document.body.getElementById('buscar').appendChild(para);
// }



function crearimg() {
    let imagen = "https://picsum.photos/260/200";
    let usuario = "Pepe";
    let titulo = "Perrito";
    let cadena = `
    <div class='caja'>
      <img src=${imagen} alt='Avatar' class='imagen'>
      <div class='overlay'>
        <a href='#' class='icono' title='User Profile'><img src='assets/icon-fav-hover.svg' class='xx'/></a>
        <a href='#' class='icono' title='User Profile'><img src='assets/icon-download.svg' class='xx'/></a>
        <a href='#' class='icono' title='User Profile'><img src='assets/icon-max.svg' class='xx'/></a>
        <h6>${usuario}</h6>
        <h5>${titulo}</h5>
      </div>
    </div>`;

    //DOM Buscar ubicacion para crear los elementos
    let elemento = document.createElement('DIV');
    elemento.setAttribute('class', 'xxx');
    document.querySelector('.contenedor').appendChild(elemento);
    let x = document.querySelector('.xxx');
    x.outerHTML = cadena;
}

for (var i = 11; i >= 0; i--) {

    crearimg();

}