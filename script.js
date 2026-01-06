document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    
    if (path === 'movies.html') loadMovies();
    if (path === 'series.html') loadSeries();
    if (path === 'games.html') loadGames();
});

async function loadMovies() {
    try {
        const response = await fetch('data/movies.json');
        const movies = await response.json();
        const container = document.getElementById('movies-list');
        
        movies.forEach(movie => {
            const card = createItemCard(movie.title, movie.rating, movie.poster);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка загрузки фильмов');
    }
}

async function loadGames() {
    try {
        const response = await fetch('data/games.json');
        const games = await response.json();
        const container = document.getElementById('games-list');
        
        games.forEach(game => {
            const card = createItemCard(game.title, game.rating, game.poster);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка загрузки игр');
    }
}

async function loadSeries() {
    try {
        const response = await fetch('data/series.json');
        const seriesList = await response.json();
        const container = document.getElementById('series-list');
        
        seriesList.forEach(item => {
            const card = createItemCard(item.title, item.rating, item.poster, item.status);
            card.onclick = () => {
                localStorage.setItem('currentSeries', JSON.stringify(item));
                window.location.href = 'series-detail.html';
            };
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка загрузки сериалов');
    }
}

function createItemCard(title, rating, poster, status = null) {
    const card = document.createElement('div');
    card.className = 'item-card';
    
    let statusHtml = status ? `<div class="status">${status}</div>` : '';
    
    card.innerHTML = `
        <img src="${poster}" class="poster" alt="${title}" loading="lazy">
        <div class="info">
            <div class="title">${title}</div>
            <div class="rating">${rating}</div>
            ${statusHtml}
        </div>
    `;
    
    return card;
}
