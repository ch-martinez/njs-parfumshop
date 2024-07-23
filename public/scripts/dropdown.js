const btnFilters = document.getElementById('btn-filters');
if (btnFilters) {
    const dropdown = document.getElementById('section-filters');
    btnFilters.addEventListener('click', () => {
        dropdown.classList.toggle('dropdown--active');
    });
}

const btnActions = document.getElementById('btn-actions');
if (btnActions) {
    const dropdown = document.getElementById('section-actions');
    btnActions.addEventListener('click', () => {
        dropdown.classList.toggle('dropdown--active');
    });
}