
let historial = [];
const historialElement = document.querySelector('#historial')


//LOCAL STORAGE
function recuperarHistorial() {
    const historialLocalStorage = localStorage.getItem('historial')
    if (historialLocalStorage !== null){
        historial = JSON.parse(historialLocalStorage)
    }
    pintarTodoHistorial()
    
}

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
        cantidad: parseFloat(cantidadTransaccion.value),
    }

    if (fechaTransaccion.value){
        transaccion.fecha = fechaTransaccion.value
    }else{
        transaccion.fecha = obtenerFechaActual()
    }

    // console.log(transaccion)
    historial.unshift(transaccion)
    ordenarHistorial()
    historial.map((transac, index) => transac.id = index + 1)
    pintarTodoHistorial()
    pintarTotales()
    
    localStorage.setItem('historial', JSON.stringify(historial))

    for (const tipo of tipoTransaccion){
        if(tipo.checked){
            tipo.checked = false
        }
    }
    conceptoTransaccion.value = '';
    cantidadTransaccion.value = '';
    fechaTransaccion.value = '';   
})


function obtenerFechaActual() {
    const date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let fecha = `${year}-${month}-${day}`
    return fecha
}

// HISTORIAL
function ordenarHistorial() {
    return historial.sort((a,b) => new Date(b.fecha) - new Date(a.fecha))
}

function pintarTodoHistorial() {
    historialElement.innerText = ''
    historial.forEach(transaccion => {
        pintarTransaccion(transaccion)
     });
}

function pintarTransaccion(transaccion) {
        const transaccionElement = document.createElement('article')
        transaccionElement.setAttribute("id", transaccion.id)
        
        const conceptoElement = document.createElement('p')
        conceptoElement.setAttribute("class", "conceptoElement") 
        conceptoElement.innerText = transaccion.concepto

        const cantidadElement = document.createElement('p')
        cantidadElement.setAttribute("class", "cantidadElement")
        if(transaccion.tipo === 'ingreso'){
            cantidadElement.innerHTML = `+ ${transaccion.cantidad} €`
            transaccionElement.setAttribute("class", "transaccionIngresoElement")
        }else{
            cantidadElement.innerHTML = `- ${transaccion.cantidad} €`
            transaccionElement.setAttribute("class", "transaccionGastoElement")
        }

        transaccionElement.appendChild(conceptoElement)
        transaccionElement.appendChild(cantidadElement)

        const deleteButtonElement = document.createElement('button')
        deleteButtonElement.setAttribute("class", "botonBorrar")
        deleteButtonElement.innerHTML = `&#x1F5D9;`

        transaccionElement.append(deleteButtonElement)
        historialElement.append(transaccionElement)
        
        deleteButtonElement.onclick = function(){borrarDelHistorial(transaccion)}
        
}

function borrarDelHistorial(transaccion) {
    const index = historial.indexOf(transaccion)
    historial.splice(index,1)
    localStorage.setItem('historial', JSON.stringify(historial))
    pintarTodoHistorial()
    pintarTotales()
}

// TOTALES
const ingresoTotalElement = document.querySelector('#ingreso-total')
const gastoTotalElement = document.querySelector('#gasto-total')
const ahorroTotalElement = document.querySelector('#ahorro-total')

function obtenerIngresoTotal() {
    let total = 0
    historial.forEach((transaccion) => {
        if(transaccion.tipo === 'ingreso'){
            total += transaccion.cantidad
        }
    })
    return total
}

function pintarIngresoTotal() {
    ingresoTotalElement.innerHTML = `
    ${obtenerIngresoTotal()} €
    `
}

function obtenerGastoTotal() {
    let total = 0
    historial.forEach((transaccion) => {
        if(transaccion.tipo === 'gasto'){
            total += transaccion.cantidad
        }
    })
    return total
}

function pintarGastoTotal() {
    gastoTotalElement.innerHTML = `
    ${obtenerGastoTotal()} €
    `
}

function obtenerAhorro() {
    return obtenerIngresoTotal() - obtenerGastoTotal()
}

function pintarAhorro() {
 ahorroTotalElement.innerHTML = `
 ${obtenerAhorro()} €
 `
}

function pintarTotales(){
    pintarAhorro();
    pintarIngresoTotal();
    pintarGastoTotal();
}


recuperarHistorial()
pintarTotales()