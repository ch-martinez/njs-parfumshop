// Regresa a la pagina anterior
const btnBack = document.querySelector('#btnBack')
if (btnBack) {
    btnBack.addEventListener('click', () => {
        window.history.back()
    })
}

const btnFiltersClear = document.querySelector('#btn-filters-clear')
if (btnFiltersClear) {
    btnFiltersClear.addEventListener('click', () => {
        window.location.href = '/product/all'
    })
}

// Seleccina todos los checkboxes
const checkboxAll = document.querySelector('#checkbox-all')
if (checkboxAll) {
    const checkboxArray = document.querySelectorAll('.checkbox')
    checkboxAll.addEventListener('click', () => {
        if (checkboxAll.checked) {
            checkboxArray.forEach(checkbox => {
                checkbox.checked = true
            })
        } else {
            checkboxArray.forEach(checkbox => {
                checkbox.checked = false
            })
        }
    })

    // Si se deselecciona un checkbox, el select de todos los checkboxes se deselecciona
    checkboxArray.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            if (!checkbox.checked) {
                checkboxAll.checked = false
            }
        })
    })
}