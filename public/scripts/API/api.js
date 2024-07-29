// Cambia el estado del elemento indicado
const btnStatus = document.querySelector('#btn-status')
if (btnStatus) {
    btnStatus.addEventListener('click', () => {
        const status = btnStatus.getAttribute('data-status')
        const id = btnStatus.getAttribute('data-id')
        const item = btnStatus.getAttribute('data-item')
        const url = `/${item}/${id}/status/${status}`

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, fetchOptions)
            .then(response => { if (response) { window.location.href = `/${item}/${id}` } })
            .catch(error => {
                console.log(error)
            })
    })
}

// Eliminar elemento
const btnDelete = document.querySelector('#btn-delete')
if (btnDelete) {
    btnDelete.addEventListener('click', async () => {
        deleteAlert(btnDelete)
    })
}

// Formulario
const form = document.querySelector('#form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const id = form.getAttribute('data-id')
        const route = form.getAttribute('data-route')
        const type = form.getAttribute('data-type')
        const formData = new FormData(form)

        const data = {}
        formData.forEach((value, key) => {
            data[key] = value
        })

        let url = ''
        if (type == 'new') {
            url = `/${route}/${type}`
        } else {
            url = `/${route}/${id}/${type}`
        }

        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        try {
            const response = await fetch(url, fetchOptions)
            if (response.ok) {
                const result = await response.json()
                successAlert(route, type, result.id)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    })
}

// Filtros
const formFilters = document.querySelector('#form-filters')
if (formFilters) {
    formFilters.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = new FormData(formFilters)
        const data = {}
        let queryString = "/product/all?"
        formData.forEach((value, key) => {
            data[key] = value
            if (value != "none" && value != "") {
                queryString += `${key}=${value}&`
            }
        })
        console.log(queryString.slice(0, -1))
        window.location.href = queryString.slice(0, -1)
    })
}

// Acciones
/* const actionStatusActivate = document.querySelector('#actionStatusActivate')

if (actionStatusActivate) {
    const listCheckbox = document.querySelectorAll('.action-checkbox')
    console.log(listCheckbox)
} */

/* const actionStatusDeactivate = document.querySelector('#actionStatusDeactivate')
const actionDiscount = document.querySelector('#actionDiscount')
const actionPayment = document.querySelector('#actionPayment')
const actionFlag = document.querySelector('#actionFlag') */