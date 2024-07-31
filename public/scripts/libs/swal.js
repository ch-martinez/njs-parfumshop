// Clases de Swal
const customClasses = {
    popup: 'sa-container',
    title: 'sa-title',
    htmlContainer: 'sa-html-container',
    confirmButton: 'btn sa-btn',
    cancelButton: 'btn sa-btn sa-btn--cancel',
    denyButton: 'btn sa-btn sa-btn--danger',
}

const fetchDelete = async (item) => {
    const id = item.getAttribute('data-id')
    const route = item.getAttribute('data-route')
    const url = `/${route}/${id}/delete`
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    }
    try {
        const response = await fetch(url, fetchOptions)
        if (response.ok) {
            return {success: true, url: `/${route}/all`}
        }else{
            return {success: false}
        }

    } catch (error) {
        console.error('Error:', error)
    }
}

const deleteAlert = async (item) => {
    Swal.fire({
        title: `ELIMINAR `,
        text: `¿Está seguro de que desea eliminar de forma permanente?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        customClass: customClasses,
    }).then(async(result) => {
        if (result.isConfirmed) {
            const response = await fetchDelete(item)
            if (response.success) {
                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'El producto ha sido eliminado',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    customClass: customClasses,
                }).then(() => {
                    window.location.href = response.url
                })
            } else {
                Swal.fire({
                    title: '¡Error!',
                    text: 'Hubo un error al eliminar el producto',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    customClass: customClasses,
                });
            }

        }
    });
}

const successAlert = async (route, type,id) => {
    const url = `/${route}/${id}`
    Swal.fire({
        title: `${type == 'new' ? '¡Se creo con Éxito!' : '¡Se actualizó con Éxito!'}`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: customClasses,
    }).then(() => {
        window.location.href = url
    })
}