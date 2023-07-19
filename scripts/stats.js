let statsContainer = document.getElementById("statsContainer");
let tdOne = document.getElementById("tdOne")
let tdTwo = document.getElementById("tdTwo")
let tdThree = document.getElementById("tdThree")
let tableTwo = document.getElementById("tableTwo")
let tableThree = document.getElementById("tableThree")

let data;
let current;


fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(resulte => resulte.json())
    .then(resulte => {
        data = resulte.events
        current = resulte.currentDate
        let arrayOrder = data.sort((a, b) => b.capacity - a.capacity)
        let pastEvents = arrayOrder.filter(event => event.date < current)

        let majorEvent = pastEvents[pastEvents.length - 1];
        let nameMajorEvent = pastEvents[pastEvents.length - 1].name
        let percentageMajor = calculatePercentage(majorEvent.assistance, majorEvent.capacity).toFixed(2)
        createFirstTable(nameMajorEvent, percentageMajor, tdOne)

        let minorEvent = pastEvents[0];
        let nameMinorEvent = pastEvents[0].name
        let percentageMinor = calculatePercentage(minorEvent.assistance, minorEvent.capacity).toFixed(2)
        createFirstTable(nameMinorEvent, percentageMinor, tdTwo)

        let nameEventMajorCapacity = arrayOrder[0].name
        let eventMajorCapacity = arrayOrder[0].capacity
        createFirstTableTwo(nameEventMajorCapacity, eventMajorCapacity.toLocaleString(), tdThree)

        let categoryPast = Array.from(new Set(pastEvents.map(event => event.category)))

        let forCategoryPast = categoryPast.map(category => {
            let eventFiltred = pastEvents.filter(event => event.category === category)
            let assistance = 0;
            let capacity = 0;
            let revenuesUpComing = 0;
            let percentageOfAssistanceUpComing = 0;
            for (const event of eventFiltred) {
                revenuesUpComing += event.price * event.assistance
                assistance += event.assistance
                capacity += event.capacity
            }
            percentageOfAssistanceUpComing = calculatePercentage(assistance, capacity)
            return { name: category, reveneus: revenuesUpComing, assistance: percentageOfAssistanceUpComing };
        })
        printTable(forCategoryPast, tableThree, createTableTwo)

        let upComingEvents = arrayOrder.filter(event => event.date >= current)
        let categoryUpComing = Array.from(new Set(upComingEvents.map(event => event.category)))
        let forCategoryUpComing = categoryUpComing.map(category => {
            let eventFiltred = upComingEvents.filter(event => event.category == category)
            let estimate = 0;
            let capacity = 0;
            let revenuesUpComing = 0;
            let percentageOfAssistanceUpComing = 0;
            for (const event of eventFiltred) {
                revenuesUpComing += event.price * event.estimate
                estimate += event.estimate
                capacity += event.capacity
            }
            percentageOfAssistanceUpComing = calculatePercentage(estimate, capacity)
            return { name: category, reveneus: revenuesUpComing, assistance: percentageOfAssistanceUpComing };
        })
        printTable(forCategoryUpComing, tableTwo, createTableTwo)
    })
    .catch(error => console.error(error))

function calculatePercentage(assistance, capacidad) {
    let porcentaje = (assistance / capacidad) * 100
    return porcentaje
}

function createFirstTable(eventName, percentage, containerTable) {
    containerTable.innerHTML = `<td>${eventName} + ${percentage}%</td>`
}
function createFirstTableTwo(eventName, capacity, containerTable) {
    containerTable.innerHTML = `<td>${eventName} + ${capacity}</td>`
}


function createTableTwo(event) {
    return `<tr>
        <td class="col-3">${event.name}</td>
        <td class="col-4">${event.reveneus.toLocaleString()}USD</td>
        <td class="col-3">${event.assistance.toFixed()}%</td>
        </tr>`
}

function printTable(events, containerHTML, fnCreate) {
    let template = ""
    for (let event of events) {
        template += fnCreate(event)
    }
    containerHTML.innerHTML += template
}



