// Fetch favorite games from the backend
async function displayFavoriteGames() {
    const favContainer = document.querySelector('.fav-con');
    favContainer.innerHTML = '';

    try {
        const response = await fetch('http://localhost:3000/api/games/favorites');
        const favoriteGames = await response.json();

        if (!favoriteGames.length) {
            favContainer.innerHTML = `
                <div class="default">
                    <i class="fa-regular fa-bookmark"></i>
                    <h1>No favorite games saved.</h1>
                </div>
            `;
            return;
        }

        favoriteGames.forEach(game => {
            const gameCardHTML = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <a href='gamepage.html?gameID=${game.gameId}'>
                            <img src="${game.cover || 'default-poster.png'}" class="card-img-top" alt="${game.title} Cover">
                        </a>
                        <div class="card-body">
                            <a href='gamepage.html?gameID=${game.gameId}' style="color:Black">
                                <h5 class="card-title">${game.title}</h5>
                            </a>
                            <p class="card-text">${game.releaseDate || ''}</p>
                            <p class="card-text">${game.genre ? game.genre.join(', ') : ''}</p>
                        </div>
                    </div>
                </div>
            `;
            favContainer.innerHTML += gameCardHTML;
        });
    } catch (error) {
        console.error("Failed to fetch favorite games:", error);
        favContainer.innerHTML = "<p>Something went wrong while loading your favorites.</p>";
    }
}

// Load favorite games on page load
displayFavoriteGames();