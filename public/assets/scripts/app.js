document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('movie-form');
    const movieTableBody = document.getElementById('movie-table-body');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const movie = {
            title: formData.get('title'),
            year: formData.get('year'),
            genre: formData.get('genre'),
            director: formData.get('director')
        };

        addMovieToTable(movie);
        form.reset();
    });

    function addMovieToTable(movie) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.year}</td>
            <td>${movie.genre}</td>
            <td>${movie.director}</td>
        `;
        movieTableBody.appendChild(row);
    }

    // Function to retrieve movie data from URL parameters
    function getMoviesFromURL() {
        const params = new URLSearchParams(window.location.search);
        const movies = [];

        for (const [key, value] of params.entries()) {
            if (key === 'title' || key === 'year' || key === 'genre' || key === 'director') {
                movies.push({ [key]: value });
            }
        }

        return movies;
    }

    // Populate the table with movies from URL parameters
    const movies = getMoviesFromURL();
    movies.forEach(movie => addMovieToTable(movie));
});

document.querySelectorAll('.text-muted').forEach(button => {
    button.addEventListener('click', function () {
        this.classList.add('click-effect');
        setTimeout(() => {
            this.classList.remove('click-effect');
        }, 200); 
    });
});

// Faz uma requisição para buscar os filmes
fetch('http://localhost:3000/filmes')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro ao buscar filmes:', error));

// Adiciona funcionalidade ao botão de voltar
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html'; // Redireciona para a página inicial
        });
    }
});