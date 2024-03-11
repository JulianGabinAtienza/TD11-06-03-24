const btn = document.querySelector('.btn');
const result = document.querySelector('.result');
const favorites = [];

btn.addEventListener('click', getMovies);

function getMovies() {
    const input = document.querySelector('.title');
    const movieName = input.value;

    const key = 'fbf35dd6';
    const dataUrl = `http://www.omdbapi.com/?apikey=${key}&s=${movieName}`;

    axios.get(dataUrl)
        .then(response => {
            const movies = response.data.Search;
            result.innerHTML = '';
            if (movies) {
                movies.forEach(movie => {
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movie');
                    movieElement.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title} Poster">
                        <h2>${movie.Title}</h2>
                        <p>Year: ${movie.Year}</p>
                        <p>Type: ${movie.Type}</p>
                        <button class="favoris" data-id="${movie.imdbID}">Ajouter des favoris</button>
                    `;
                    const favoriButton = movieElement.querySelector('.favoris');
                    favoriButton.addEventListener('click', (e) => {
                        const id = e.target.getAttribute('data-id');
                        const isFavori = favoriButton.classList.toggle('isFavori');
                        favoriButton.textContent = isFavori ? 'Retirer des favoris' : 'Ajouter aux favoris';
                        if (isFavori) {
                            favorites.push(id);
                            favoriButton.style.backgroundColor = 'red';
                        } else {
                            const index = favorites.indexOf(id);
                            if (index > -1) {
                                favorites.splice(index, 1);
                            }
                            favoriButton.style.backgroundColor = '#efefef';
                        }
                        console.log(isFavori ? 'Ajout du film aux favoris:' : 'Retrait du film des favoris:', movie);
                    });

                    result.appendChild(movieElement);
                });
            } else {
                result.textContent = 'Aucun résultat trouvé';
            }
        })
        .catch(error => {
            console.error('Une erreur est survenue lors de la récupération des données du film:', error);
            result.textContent = 'Erreur lors de la récupération des données du film';
        });
}

const favorisBtn = document.querySelector('.favlist');
favorisBtn.addEventListener('click', showFavorites);

function showFavorites() {
    result.innerHTML = '';
    const key = 'fbf35dd6';
    const dataUrl = `http://www.omdbapi.com/?apikey=${key}&i=`;
    favorites.forEach(id => {
        axios.get(dataUrl + id)
            .then(response => {
                const movie = response.data;
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title} Poster">
                    <h2>${movie.Title}</h2>
                    <p>Year: ${movie.Year}</p>
                    <p>Type: ${movie.Type}</p>
                `;
                result.appendChild(movieElement);
            })
            .catch(error => {
                console.error('Une erreur est survenue lors de la récupération des données du film:', error);
            });
    });
}
