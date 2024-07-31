const dataTable = new simpleDatatables.DataTable("#panel-table", {
	locale: 'es-ES',
    searchable: true,
	fixedHeight: true,
    perPage: 10,

    labels: {
        placeholder: "Buscar...",
        searchTitle: "Buscar por Nombre, Marca, Precio, etc",
        pageTitle: "Pagina {page}",
        perPage: "registros por página",
        noRows: "Sin registros",
        info: "{rows} registos en total",
        noResults: "No hay resultados para tu busqueda",
    },
    classes: {
        input: "datatable-input input-text",
        selector: "datatable-selector input-select",
        paginationList: "datatable-pagination-list sdt-pagination-list",
        active: "datatable-active sdt-active",
    },
    columns: [
        // Sort the second column in ascending order
        { select: [0,7], sortable: false },
/*         {
            select: 6,
            filter: ["ACTIVO", "INACTIVO"],
        }, */
    ],
})