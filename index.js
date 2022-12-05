

let historial = [];
const historialElement = document.querySelector('#historial')

// FORMULARIO
const FormNuevaTransaccion = document.querySelector('#form-nueva-transaccion');

FormNuevaTransaccion.addEventListener("submit", (event) => {
    event.preventDefault();
    

    const tipoTransaccion = document.querySelectorAll('.switch-input-button[name="switch-input"]')
    const conceptoTransaccion = document.querySelector('#input-concepto')
    const cantidadTransaccion = document.querySelector('#input-cantidad')
    const fechaTransaccion = document.querySelector('#input-fecha')

    let tipoTransaccionElegido
    for (const tipo of tipoTransaccion){
        if(tipo.checked){
            tipoTransaccionElegido = tipo.value
        }
    }

    let transaccion = {
        tipo: tipoTransaccionElegido,
        concepto: conceptoTransaccion.value,
        cantidad: cantidadTransaccion.value,
    }

    if (fechaTransaccion.value){
        transaccion.fecha = fechaTransaccion.value
    }else{
        // Añadir fecha actual
    }

    console.log(transaccion)
    historial.unshift(transaccion)
    PintarTransaccion(transaccion)

    for (const tipo of tipoTransaccion){
        if(tipo.checked){
            tipo.checked = false
        }
    }
    conceptoTransaccion.value = '';
    cantidadTransaccion.value = '';
    fechaTransaccion.value = '';

    // PintarTodoHistorial()
    
})


// sort historial por fecha

function PintarTodoHistorial() {
    historialElement.innerText = ''
 historial.forEach(transaccion => {
    const transaccionElement = document.createElement('article')
    transaccionElement.setAttribute("class", "transaccionElement")
    
    const conceptoElement = document.createElement('p')
    conceptoElement.setAttribute("class", "conceptoElement") 
    conceptoElement.innerText = transaccion.concepto

    const cantidadElement = document.createElement('p')
    cantidadElement.setAttribute("class", "cantidadElement")
    cantidadElement.innerText = transaccion.cantidad

    transaccionElement.appendChild(conceptoElement)
    transaccionElement.appendChild(cantidadElement)

    historialElement.appendChild(transaccionElement)
    
 });
}

function PintarTransaccion(transaccion) {
        const transaccionElement = document.createElement('article')
        transaccionElement.setAttribute("class", "transaccionElement")
        
        const conceptoElement = document.createElement('p')
        conceptoElement.setAttribute("class", "conceptoElement") 
        conceptoElement.innerText = transaccion.concepto

        const cantidadElement = document.createElement('p')
        cantidadElement.setAttribute("class", "cantidadElement")
        if(transaccion.tipo === 'ingreso'){
            cantidadElement.innerHTML = `+${transaccion.cantidad} €`
        }else{
            cantidadElement.innerHTML = `-${transaccion.cantidad} €`
        }

        transaccionElement.appendChild(conceptoElement)
        transaccionElement.appendChild(cantidadElement)

        historialElement.prepend(transaccionElement)
}