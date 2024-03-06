//// S'insrcire sur Open Weather Map 

// Récupérer la clé API dans votre compte - en haut à droite (My API keys)

// Parcourir la doc pour récupérer le lien que vous utiliserez

// Pour le bouton de Geolocalisation : 
// récupérer les coords de vore position avec navigator.geolocation -> Regarder comment ca marche dans la doc (w3 ou MDN) !

// 1) Créer le HTML et importer script + css, ne pas oublier d'importer axios si besoin

// 2) Ajouter un écouteur d'événement sur votre bouton Geolocate (récupérer les coords)

// 3) Passer ces coords dans votre lien lors de la requete vers l'API ainsi que la clé API

// api : https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid=${key}

// 4) Récupérer la data recu et l'afficher dans votre page

// 5) Il faudra afficher les degrés, le temps, la ville et les 2 premières lettres du pays et surtout l'image qui correspond au temps

// BONUS :

// Ajouter un input dans lequel on renseigne le nom de la ville et qui nous affiche le temps correspondant
// (Astuce : vous devrez utiliser un autre type de requete API d'Open Weather en plus de celle utilisée précedemment)

// Pour cherche par ville : https://openweathermap.org/api/geocoding-api

// Pour les icones : https://openweathermap.org/weather-conditions

// BONUS DES BONUS : Afficher le temps pour une semaine (celle en cours par exemple)

// Recup des éléments HTML 
const btn = document.querySelector('.btn-location')
const img = document.querySelector('img')
const degrees = document.querySelector('.degrees')
const weather = document.querySelector('.weather')
const city = document.querySelector('.city')
const input = document.querySelector('.search')

// Variables d'environnement
const key = '89c8c009188a5d75af1cd22c697cd4ad';

// Je viens écouter mon bouton de geolocalisation
btn.addEventListener('click', getLocation)

window.addEventListener('keydown', (e) => {
    if ((e.key === "Enter") && (input.value !== "")) {
        const city = input.value
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`

        axios.get(url)
        .then(res => res.data[0])
        .then(data => {
            const lat = data.lat
            const lon = data.lon
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
            getData(apiUrl)
        })
        .catch(error => console.log(error))
    }
})

// Je définis la fonction à appeller lors du click
function getLocation() {
    weather.textContent = "Chargement ..."
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError)
    } else {
        alert('Geolocalisation non disponible')
    }
}

// Récupération des coordonnées suite à la geoloc
function showPosition(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    getData(url)
}

// Traitement des erreurs lors de la geoloc
function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
    }
}

// Définition de getData() qui fait notre requete API (et donc est asynchrone)
async function getData(url) {
    // On utilise axios pour notre requete
    const response = await axios.get(url)

    const currentCity = response.data.name 
    const description = response.data.weather[0].description
    const main = response.data.weather[0].main
    const icon = response.data.weather[0].icon
    const temp = response.data.main.temp

    displayData(currentCity, description, main, icon, temp)
}

// Définition de displayData qui va afficher nos infos dans le HTML
function displayData(currentCity, description, main, icon, temp) {
    weather.textContent = main + ", " + description
    city.textContent = currentCity
    degrees.textContent = temp + " °C"
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
}