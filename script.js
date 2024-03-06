//// S'insrcire sur Open Weather Map
// ----------------------------------------------------------------------------------------------------------------
// Récupérer la clé API dans votre compte - en haut à droite (My API keys)
// 89c8c009188a5d75af1cd22c697cd4ad
// ----------------------------------------------------------------------------------------------------------------
// Parcourir la doc pour récupérer le lien que vous utiliserez
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// ----------------------------------------------------------------------------------------------------------------
// Pour le bouton de Geolocalisation : 
// récupérer les coords de vore position avec navigator.geolocation -> Regarder comment ca marche dans la doc (w3 ou MDN) !
// ----------------------------------------------------------------------------------------------------------------
// navigator.geolocation.getCurrentPosition(position => {
//   const { latitude, longitude } = position.coords;
//   Show a map centered at latitude / longitude.
// });
// ----------------------------------------------------------------------------------------------------------------
// 1) Créer le HTML et importer script + css, ne pas oublier d'importer axios si besoin
// ----------------------------------------------------------------------------------------------------------------
// 2) Ajouter un écouteur d'événement sur votre bouton Geolocate (récupérer les coords)
// const button = document.querySelector('button');
// button.addEventListener('click', () => {
//   navigator.geolocation.getCurrentPosition(position => {
//     const { latitude, longitude } = position.coords;
//     console.log(latitude, longitude);
//   });
// });
// ----------------------------------------------------------------------------------------------------------------
// 3) Passer ces coords dans votre lien lors de la requete vers l'API ainsi que la clé API
// const button = document.querySelector('button');
//         button.addEventListener('click', () => {
//             navigator.geolocation.getCurrentPosition(position => {
//                 const { latitude, longitude } = position.coords;
//                 const apiKey = '89c8c009188a5d75af1cd22c697cd4ad';
//                 const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
//             });
//         });
// api : https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid=${key}
// ----------------------------------------------------------------------------------------------------------------
// 4) Récupérer la data recu et l'afficher dans votre page
// const temp = document.querySelector('.temp');
// const weather = document.querySelector('.weather');
// const city = document.querySelector('.location');

// const button = document.querySelector('button');
//         button.addEventListener('click', () => {
//             navigator.geolocation.getCurrentPosition(position => {
//                 const { latitude, longitude } = position.coords;
//                 const apiKey = '89c8c009188a5d75af1cd22c697cd4ad';
//                 const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
//                 fetch(apiUrl)
//                     .then(response => {
//                         if (!response.ok) {
//                             throw new Error('Network response was not ok');
//                         }
//                         return response.json();
//                     })
//                     .then(data => {
//                         console.log(data);
//                     })
//                     .catch(error => {
//                         console.error('There was a problem with the fetch operation:', error);
//                     });
//             });
//         });
// ----------------------------------------------------------------------------------------------------------------
// 5) Il faudra afficher les degrés, le temps, la ville et les 2 premières lettres du pays et surtout l'image qui correspond au temps
// const container = document.querySelector('.container');
// const temp = document.querySelector('.temp');
// const weather = document.querySelector('.weather');
// const city = document.querySelector('.location');

// const button = document.querySelector('button');
//         button.addEventListener('click', () => {
//             navigator.geolocation.getCurrentPosition(position => {
//                 const { latitude, longitude } = position.coords;
//                 const apiKey = '89c8c009188a5d75af1cd22c697cd4ad';
//                 const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
//                 fetch(apiUrl)
//                     .then(response => {
//                         if (!response.ok) {
//                             throw new Error('Network response was not ok');
//                         }
//                         return response.json();
//                     })
//                     .then(data => {
//                         const img = document.createElement('img');
//                         const imgData = data.weather[0].icon;
//                         const apiIcon = `http://openweathermap.org/img/wn/${imgData}.png`;
//                         img.src = apiIcon;
//                         container.appendChild(img);
//                         temp.textContent = `${Math.round(data.main.temp)}°C`;
//                         weather.textContent = data.weather[0].description;
//                         city.textContent = data.name + ', ' + data.sys.country;
//                     })
//                     .catch(error => {
//                         console.error('There was a problem with the fetch operation:', error);
//                     });
//             });
//         });
// ----------------------------------------------------------------------------------------------------------------
// BONUS :

// Ajouter un input dans lequel on renseigne le nom de la ville et qui nous affiche le temps correspondant
// (Astuce : vous devrez utiliser un autre type de requete API d'Open Weather en plus de celle utilisée précedemment)

const container = document.querySelector('.container');
const temp = document.querySelector('.temp');
const weather = document.querySelector('.weather');
const city = document.querySelector('.location');
const button = document.querySelector('button');


button.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const apiKey = '89c8c009188a5d75af1cd22c697cd4ad';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            return response.json();
            })
            .then(data => {
                const img = document.createElement('img');
                const imgData = data.weather[0].icon;
                const apiIcon = `http://openweathermap.org/img/wn/${imgData}.png`;
                img.src = apiIcon;
                container.appendChild(img);
                temp.textContent = `${Math.round(data.main.temp)}°C`;
                weather.textContent = data.weather[0].description;
                city.textContent = data.name + ', ' + data.sys.country;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });
});

// > Pour cherche par ville : https://openweathermap.org/api/geocoding-api

// Pour les icones : https://openweathermap.org/weather-conditions

// BONUS DES BONUS : Afficher le temps pour une semaine (celle en cours par exemple)