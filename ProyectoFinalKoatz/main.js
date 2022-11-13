// dom
let input = document.getElementById('input');
let boton = document.getElementById('boton');
let msg = document.getElementById('msg');
let gif = document.getElementById('gif');


//mockup de base de datos//
const monedas = [
    {
        id: 1,
        name: 'dolar',
        price: 0.0063 
    },
    {
        id: 2,
        name: 'euro',
        price: 0.0061
    },
    {
        id: 3,
        name: 'pound',
        price: 0.0053
    },
];


//evento click "calcular"
boton.addEventListener('click', function() {
    let monedaSeleccionada = document.querySelector('input[name="status"]:checked');
    if(monedaSeleccionada) {
        let carga = input.value;
        validar();
        if(validacion) {
            conversor(carga, monedaSeleccionada);
        }else{
        }
    } else {
        Toastify({
        text: "No se seleccionó moneda.",
      }).showToast();
       
    }
    
});

// Evento: enter en input
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.getElementById("boton").click();
    }
});


//Validación de datos: caso ingreso de letras o null
function validar() {
    let carga = input.value;
    if (carga == null || carga == "") {
        Toastify({
            text: "No se ingresó nada.",
          }).showToast();
        return validacion = false;
    } else if (/^[a-zA-Z]+$/.test(carga)) {
        Toastify({
            text: "Solo números.",
          }).showToast();
        return validacion = false;
    } else {
        return validacion = true;
    }
}

//Funcion conversor
function conversor(carga, monedaSeleccionada){
    let precioMoneda = monedas.find( e => e.name === `${monedaSeleccionada.value}`).price;
    let resultado = carga * precioMoneda;
    let rounded = Math.round((resultado + Number.EPSILON) * 1000) / 1000;
    msg.innerHTML =  `$ ${rounded}`;
   
}

//Fech API Giphy - Fake add

const apiKey = 'ATdlUkrZJWOT8htk6FIArAj4roIFL4g8';

const apiCall = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${ apiKey }`); 

apiCall
    .then( resp => resp.json() )
    .then( ({data}) => {
        const { url } = data.images.fixed_height_small;
        const img = document.createElement('img');
        img.src = url;
        gif.append( img );        
    })
    .catch( console.warn );

 
  

