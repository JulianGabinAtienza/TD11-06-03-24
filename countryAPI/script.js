const key = "57Hq9FkFIvOKisYBvHk5jCQJKbKBm13ihkrtVAAj"
const url = `https://countryapi.io/api/all?apikey=${key}`

const countryName = document.querySelector('.country-name')
const input = document.querySelector('.capital-input')
const flag = document.querySelector('.flag')
const scoreZone = document.querySelector('.score')
const submit = document.querySelector('.submit')
const body = document.querySelector('body')
const next = document.querySelector('.next')
const verdict = document.querySelector('.verdict')

// Chargement initial du Quiz
window.addEventListener('DOMContentLoaded', displayQuiz)

// On ajoute l'écouteur d'événement sur le bouton suivant 
next.addEventListener('click', displayQuiz)

// Ma fonction pour afficher le contenu d'une question (pays, drapeau)
function displayQuiz() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const array = Object.keys(data)
        const randomIndex = Math.floor(Math.random() * array.length)
        const randomCode = array[randomIndex]
    
        const randomCountry = data[randomCode]
        countryName.textContent = randomCountry.name
    
        flag.src = randomCountry.flag.large
    
        let score = 0;
    
        submit.addEventListener('click', () => {
            // On recup ce que le user a tapé dans l'input
            const userGuess = input.value
    
            if (userGuess === randomCountry.capital) {
                verdict.textContent = "Bonne réponse !"
                score ++
            } else {
                verdict.textContent = `Faux, la réponse était : ${randomCountry.capital}`
            }
            scoreZone.textContent = `${score} / 10`
        })
    })
    .catch(err => console.log(err))
}