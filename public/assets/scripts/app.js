 document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('movieForm');
    const movieTableBody = document.getElementById('moviesTableBody');

    function addMovieToTable(movie) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.year}</td>
            <td>${movie.genre || ''}</td>
            <td>${movie.director || ''}</td>
        `;

        // Botão Editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', function() {
            document.getElementById('title').value = movie.title;
            document.getElementById('year').value = movie.year;
            document.getElementById('genre').value = movie.genre || '';
            document.getElementById('director').value = movie.director || '';
            form.setAttribute('data-edit-id', movie.id);
        });

        // Botão Deletar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {
            fetch(`http://localhost:3000/filmes/${movie.id}`, {
                method: 'DELETE'
            })
            .then(() => {
                row.remove();
            });
        });

        const td = document.createElement('td');
        td.appendChild(editButton);
        td.appendChild(deleteButton);
        row.appendChild(td);

        movieTableBody.appendChild(row);
    }

    // Carrega todos os filmes do backend ao abrir a página
    fetch('http://localhost:3000/filmes')
        .then(response => response.json())
        .then(movies => {
            movies.forEach(movie => addMovieToTable(movie));
        })
        .catch(error => console.error('Erro ao buscar filmes:', error));

    // Envia novo filme ou edita existente
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const movie = {
            title: formData.get('title'),
            year: formData.get('year'),
            genre: formData.get('genre'),
            director: formData.get('director')
        };

        const editId = form.getAttribute('data-edit-id');
        if (editId) {
            // Editar (PUT)
            fetch(`http://localhost:3000/filmes/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editId, ...movie })
            })
            .then(response => response.json())
            .then(data => {
                location.reload(); // Recarrega para atualizar a tabela
            });
            form.removeAttribute('data-edit-id');
        } else {
            // Criar (POST)
            movie.id = formData.get('title').toLowerCase().replace(/\s/g, '');
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
        }
        form.reset();
    });
});

    // Botão de voltar
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    