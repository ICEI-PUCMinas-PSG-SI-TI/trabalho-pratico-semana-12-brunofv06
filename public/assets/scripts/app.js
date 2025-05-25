document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('movieForm');
    const movieTableBody = document.getElementById('moviesTableBody');

    // Preenche a tabela com os filmes do backend
    function addMovieToTable(movie) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.year}</td>
            <td>${movie.genre || ''}</td>
            <td>${movie.director || ''}</td>
        `;
        movieTableBody.appendChild(row);
    }

    // Carrega todos os filmes do backend ao abrir a página
    if (movieTableBody) {
        fetch('http://localhost:3000/filmes')
            .then(response => response.json())
            .then(movies => {
                movies.forEach(movie => addMovieToTable(movie));
            })
            .catch(error => console.error('Erro ao buscar filmes:', error));
    }

    // Envia novo filme para o backend ao cadastrar
    if (form && movieTableBody) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const movie = {
                id: formData.get('title').toLowerCase().replace(/\s/g, ''), // id simples
                title: formData.get('title'),
                year: formData.get('year'),
                genre: formData.get('genre'),
                director: formData.get('director')
            };

            fetch('http://localhost:3000/filmes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movie)
            })
            .then(response => response.json())
            .then(data => {
                addMovieToTable(data);
                form.reset();
            });
        });
    }

    // Botão de voltar
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    });