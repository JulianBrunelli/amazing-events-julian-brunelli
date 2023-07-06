const contenedorCartas = document.getElementById("pastevents-js");
console.log(contenedorCartas);
console.log(data.events);
const arrayEventos = data.events;
const currentDate = data.currentDate;
console.log(currentDate)
console.log(arrayEventos);

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
        <a href="./pages/details.html" class="btn btn-primary">Details</a>
        </div>
    </section>
    </div>`
}

function imprimirMaqueta(array, dataCurrendate) {
    for (let evento of array) {
        if (dataCurrendate < evento.date) {
            contenedorCartas.innerHTML += crearMaqueta(evento)
        }
    }
}
imprimirMaqueta(arrayEventos, currentDate);