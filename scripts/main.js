const containerCards = document.getElementById("home-js");
const arrayEventos = data.events;
const containerCheckBox = document.getElementById("containerCheckBox")
const inputTypeSearch = document.getElementById("containerSreach")


function crearMaqueta(propertiesCards) {
    return `<div class="card col-10 col-md-5 mt-5 col-xl-3">
    <img
        src="${propertiesCards.image}"
        class="card-img-top card-h p-2"
        alt=""
    />
    <section class="card-body card text-center">
        <h5>${propertiesCards.name}</h5>
        <p class="card-text"> ${propertiesCards.description} </p>
    <div
        class="align-items-center d-flex w-100 justify-content-between"
        >
        <p class="fw-medium d-flex align-items-center m-0">
            Price: <span class="parrafo-card">$ ${propertiesCards.price}</span>
        </p>
        <a href="./pages/details.html?idEvent=${propertiesCards._id}" class="btn btn-primary">Details</a>
        </div>
    </section>
    </div>`
}

function imprimirMaqueta(parametroArray) {
    let template = ""
    for (let evento of parametroArray) {
        template += crearMaqueta(evento)
    }
    containerCards.innerHTML += template
}
imprimirMaqueta(arrayEventos);

let crearCheckBox = (category) => {
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


let imprimirCheckBox = (arrayEventos) => {
    let input = ""
    arrayEventos.forEach(element => {
        input += crearCheckBox(element)
    });
    containerCheckBox.innerHTML += input
}
let categorys = arrayEventos.map(arrayEventos => arrayEventos.category)
let myArray = Array.from(new Set(categorys))
imprimirCheckBox(myArray)

let checkboxCategorys = document.querySelectorAll("input[type='checkbox']")

containerCheckBox.addEventListener("change", () => {
    let arrayCrossedFilter = crossedFilter(arrayEventos, inputTypeSearch.value, checkboxCategorys)
    containerCards.innerHTML = ""
    if (arrayCrossedFilter.length == 0) {
        containerCards.innerHTML = '<h2>No events were found</h2>'
    } else {
        imprimirMaqueta(arrayCrossedFilter)
    }
})

function filterByCategories(array, nodeList) {
    let checkBoxArray = Array.from(nodeList).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
    let aux = array.filter(event => checkBoxArray.includes(event.category) || checkBoxArray.length == 0)
    return aux
}

inputTypeSearch.addEventListener("input", () => {
    containerCards.innerHTML = ""
    let arrayCrossedFilter = crossedFilter(arrayEventos, inputTypeSearch.value, checkboxCategorys)
    if (arrayCrossedFilter.length == 0) {
        containerCards.innerHTML = '<h2>No events were found</h2>'
    } else {
        imprimirMaqueta(arrayCrossedFilter)
    }
})

function filterByInputSearch(array, input) {
    let filteredArray = array.filter(evento => evento.name.toLowerCase().startsWith(input.toLowerCase()))
    return filteredArray
}

function crossedFilter(arrayOrigin, valueUser, checkboxChecked) {
    let filterInputSearchCrossed = filterByInputSearch(arrayOrigin, valueUser)
    let filterCheckboxCrossed = filterByCategories(filterInputSearchCrossed, checkboxChecked)
    return filterCheckboxCrossed
}
