
export function crearCheckBox(category) {
    return `<div class="form-check form-check-inline">
    <input
        class="border-check form-check-input"
        type="checkbox"
        id="${category}"
        value="${category}"
    />
    <label class="form-check-label" for="${category}"
        >${category}</label
    >
    </div>`
}

export function imprimirCheckBox(events, container, fnCreate) {
    let input = ""
    events.forEach(element => {
        input += fnCreate(element)
    });
    container.innerHTML += input
}

function filterByCategories(array, nodeList) {
    let checkBoxArray = Array.from(nodeList).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
    let aux = array.filter(event => checkBoxArray.includes(event.category) || checkBoxArray.length == 0)
    return aux
}

function filterByInputSearch(array, input) {
    let filteredArray = array.filter(evento => evento.name.toLowerCase().includes(input.toLowerCase()))
    return filteredArray
}

export function crossedFilter(arrayOrigin, valueUser, checkboxChecked) {
    let filterInputSearchCrossed = filterByInputSearch(arrayOrigin, valueUser)
    let filterCheckboxCrossed = filterByCategories(filterInputSearchCrossed, checkboxChecked)
    return filterCheckboxCrossed
}