const btn = document.querySelector('.btn');
const result = document.querySelector('.result');

btn.addEventListener('click', getMovies);

function getMovies() {
    const input = document.querySelector('.title');
    const movieName = input.value;

    const key = 'fbf35dd6';
    const dataUrl = `http://www.omdbapi.com/?apikey=${key}&s=${movieName}`;

    axios.get(dataUrl)
        .then(response => {
            // Traitement de la réponse de l'API
            const movies = response.data.Search;
            console.log(movies); // Afficher les données des films dans la console

            // Afficher les détails des films dans votre élément de résultat
            result.innerHTML = '';
            if (movies) {
                movies.forEach(movie => {
                    result.innerHTML += `
                        <div class="movie">
                            <img src="${movie.Poster}" alt="${movie.Title} Poster">
                            <h2>${movie.Title}</h2>
                            <p>Year: ${movie.Year}</p>
                            <p>Type: ${movie.Type}</p>
                            <button class="favoris" data-id="${movie.imdbID}">Ajouter aux favoris</button>
                            <button class="unfavoris" data-id="${movie.imdbID}">Retirer des favoris</button>
                        </div>
                    `;  
                if (document.querySelector('.favoris')) {
                    const favoris = document.querySelectorAll('.favoris');
                    favoris.forEach(favori => {
                        favori.addEventListener('click', (e) => {
                            const id = e.target.getAttribute('data-id');
                            const movie = movies.find(movie => movie.imdbID === id);
                            console.log('Ajout du film aux favoris:', movie);
                            // Disable the button after it is clicked
                            e.target.disabled = true;
                            // change the button text
                            e.target.textContent = 'favoris';
                            if (e.target.disabled === true) {
                                const unfav = document.querySelector('.unfavoris');
                                unfav.style.display = inline;
                            }
                        });
                    });
                }
            })} else {
                result.textContent = 'Aucun résultat trouvé';
            }
        })
        .catch(error => {
            console.error('Une erreur est survenue lors de la récupération des données du film:', error);
            result.textContent = 'Erreur lors de la récupération des données du film';
        });
}
