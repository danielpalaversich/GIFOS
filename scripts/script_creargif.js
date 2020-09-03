console.log("creargif.js cargado");

let boton_comenzar = document.querySelector('.boton_comenzar');
let tiempo = document.querySelector('#tiempo');
let pasos = document.querySelector('.pasos');
let titulos = document.querySelector('#titulos');
let texto = document.querySelector('#texto');
let image = document.querySelector('#gif_imagen');
let video = document.querySelector('#gif_video');
let contenedor_titulos = document.querySelector('.contenedor_titulos');

let estado = 0;
let s;
let recorder;

boton_comenzar.addEventListener('click', ()=>{
    //console.log(boton_comenzar.className);
    //getStreamAndRecord()

    if (estado == 0) {
      getStreamAndRecord();
      boton_comenzar.textContent = "Grabar";
      titulos.innerHTML = '¿Nos das acceso a tu cámara?';
      texto.innerHTML = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.';
    } else if (estado == 1) {
      grabar();
      boton_comenzar.textContent = "Finalizar";
    } else if (estado == 2) {
      grabar_parar(rec);
      boton_comenzar.textContent = "Subir Gifo";
    } else if (estado == 3) {
      subir();
    }

})

////////////////////////////////////////////////////////////

  // PASO 1

  function getStreamAndRecord () {
    estado = 1;
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
      s = stream;
      contenedor_titulos.style.display = "none";
    })
    .catch(error => {
      console.log(error);
  })}

  ////////////////////////////////////////////////////////////

  // PASO 2

  function rec() {

    recorder = RecordRTC(s, {
      type: 'gif',
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      onGifRecordingStarted: function() {
       console.log('started')
      },
    });
  }

  function grabar() {
    rec();
    estado = 2;
    recorder.startRecording();
  }

  ////////////////////////////////////////////////////////////

  // PASO 3

  function grabar_parar (callback) {

    recorder.stopRecording(callback);
    estado = 3;
  }

  ////////////////////////////////////////////////////////////

  // PASO 4

  function subir() {

    estado = 4;

    console.log(recorder);

    let form = new FormData();
    //form.append('file', recorder.getBlob(), 'myGif.gif'); //no funciona no se porque
    form.append('file', recorder.getBlob());
    console.log(form.get('file'))

  }

  //Uncaught TypeError: Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'.

  ////////////////////////////////////////////////////////////

/*// OPCIONAL

  function captureCamera(callback) {
      titulos.innerHTML = '¿Nos das acceso a tu cámara?';
      texto.innerHTML = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.';
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(camera) {
          callback(camera);
      }).catch(function(error) {
          console.error(error);
      });
  }

  //bytesToSize(recorder.getBlob().size);

  var recorder; // globally accessible

  function Grabar() {
      estado = 1;
      this.disabled = true;
      captureCamera();
  };

  function Grabar_parar() {
      this.disabled = true;
      recorder.stopRecording(stopRecordingCallback);
  };

  function stopRecordingCallback() {
      image.src = URL.createObjectURL(recorder.getBlob());
      recorder.camera.stop();
      recorder.destroy();
      recorder = null;
  }



  function(camera) {
    //document.querySelector('h1').innerHTML = 'Waiting for Gif Recorder to start...';
    recorder.startRecording();

    // release camera on stopRecording
    recorder.camera = camera;

    //document.getElementById('btn-stop-recording').disabled = false;
  }

  recorder = RecordRTC(camera, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifPreview: function Previsualizacion(gifURL) {
        image.src = gifURL;
    }
  });*/