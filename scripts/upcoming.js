import {
    crearCheckBox, imprimirCheckBox, crossedFilter
} from "./module/functions.js"

const containerCards = document.getElementById("upcoming-js");
const containerCheckBox = document.getElementById("containerCheckBox")
const inputTypeSearch = document.getElementById("containerSreach")

let events = []
let current = ""
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(resulte => resulte.json())
    .then(resulte => {
        events = resulte.events
        current = resulte.currentDate
        imprimirMaqueta(events, containerCards, crearMaqueta)
        let categorys = events.map(events => events.category)
        let myArray = Array.from(new Set(categorys))
        imprimirCheckBox(myArray, containerCheckBox, crearCheckBox)
        let checkboxCategorys = document.querySelectorAll("input[type='checkbox']")
        containerCheckBox.addEventListener("change", () => {
            let arrayCrossedFilter = crossedFilter(events, inputTypeSearch.value, checkboxCategorys)
            containerCards.innerHTML = ""
            if (arrayCrossedFilter.length == 0) {
                containerCards.innerHTML = '<h2>No events were found</h2>'
            } else {
                imprimirMaqueta(arrayCrossedFilter, containerCards, crearMaqueta)
            }
        })
        inputTypeSearch.addEventListener("input", () => {
            let arrayCrossedFilter = crossedFilter(events, inputTypeSearch.value, checkboxCategorys)
            containerCards.innerHTML = ""
            if (arrayCrossedFilter.length == 0) {
                containerCards.innerHTML = '<h2>No events were found</h2>'
            } else {
                imprimirMaqueta(arrayCrossedFilter, containerCards, crearMaqueta)
            }
        })
    })
    .catch(error => console.error(error))

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
            <a href="./details.html?idEvent=${propertiesCards._id}" class= "btn btn-primary">Details</a>
            </div>
        </section>
        </div>`
}

function imprimirMaqueta(parametroArray, container, fnCreate) {
    let arrayFiltrado = parametroArray.filter(evento => evento.date >= current)
    let template = ""
    for (let evento of arrayFiltrado) {
        template += fnCreate(evento)
    }
    container.innerHTML += template
}