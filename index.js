

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
    }

    console.log(transaccion)
    // tipoTransaccion.value  = '';
    for (const tipo of tipoTransaccion){
        if(tipo.checked){
            tipo.checked = false
        }
    }
    conceptoTransaccion.value = '';
    cantidadTransaccion.value = '';
    fechaTransaccion.value = '';
})


function mostrarTransaccionHistorial() {
    const transaccionElement = document.createElement('article')

}