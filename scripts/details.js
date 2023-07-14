let cardsDetails = document.getElementById("cardsDetails")
let arrayEventos = data.events
let idDetails = location.search
let paramsDetails = new URLSearchParams(idDetails)
let objectEvent = paramsDetails.get('idEvent')
let eventDetails = arrayEventos.find(event => event._id === objectEvent)

function crearMaqueta(arrayFiltrado, container) {
    container.innerHTML += `<div
    class="card card-details-js mb-2 col-9 d-flex flex-column align-items-center flex-lg-row"
    >
    <img
        src="${arrayFiltrado.image}"
        class="card-img-top image-details"
        alt=""
    />
    <section>
        <h5 class="card-title text-center mt-1 text-decoration-underline">
        ${arrayFiltrado.name}
        </h5>
        <p>Date: ${arrayFiltrado.date}</p>
        <p>
        Description: ${arrayFiltrado.description}
        </p>
        <p>Category: ${arrayFiltrado.category}</p>
        <p>Place: ${arrayFiltrado.place}</p>
        <p>Capacity: ${arrayFiltrado.capacity}</p>
        <p>Assistance: ${arrayFiltrado.assistance}</p>
        <p>Price: $ ${arrayFiltrado.price} USD</p>
    </section>
    </div>`
}
crearMaqueta(eventDetails, cardsDetails)



