const API_KEY = 'at_cGNi9rZxZy1FNgyrQKjJNcBPaQ1nA'
const URL = 'https://geo.ipify.org/api/v2/country,city'

const formEntrada = document.querySelector('.form-entrada')
const IP = document.getElementById('IP')
const location2 = document.getElementById('location')
const timezone = document.getElementById('timezone')
const isp = document.getElementById('isp')

formEntrada.addEventListener('submit', (event) => {
    event.preventDefault()
    const ip = entradaIP.value

    let urlGet = `${URL}?apiKey=${API_KEY}`
    if(ip !== '' && ip.trim() !== ''){
        urlGet = `${urlGet}&ipAddress=${ip}&domain=${ip}`
    }
    fetch(urlGet)
    .then(response => {
        if (!response.ok) throw response
        return response.json()
    })
    .then(json => {
        const locationJson = json.location
        IP.textContent = json.ip
        location2.textContent = `${locationJson.country}, ${locationJson.city} ${json.postalCode === undefined ? '': json.postalCode === undefined}`
        timezone.textContent =  `UTC ${locationJson.timezone}`            
        isp.textContent = `${json.isp}`

        var map = L.map('map').setView([locationJson.lat, locationJson.lng], 16);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
        var mapIcon = L.icon({
            iconUrl: '/images/icon-location.svg',
            iconSize:     [38, 50], // size of the icon
            iconAnchor:   [22, 49], // point of the icon which will correspond to marker's location
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        })
        var marker = L.marker([locationJson.lat, locationJson.lng], {icon: mapIcon}).addTo(map);
        
    })
    .catch(e => {
        console.log(e.statusText)
        swal({
            title: "Error",
            text: "Something went wrong!",
            icon: "error",
          })
    })

})