const apiKey = "ba9c4ee9c6c64edba467c77bbc0afe3b";

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", handleSearchInput);

async function fetchGameSuggestions(searchTerm) {
    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

function updateGameSuggestions(suggestions) {
    const suggestionContainer = document.querySelector(".sugestionContainer");
    suggestionContainer.innerHTML = "";

    if (suggestions.length === 0) {
        suggestionContainer.innerHTML = `<div class="default"><h1>No game found.</h1></div>`;
        return;
    }

    const favoriteGameIds = JSON.parse(localStorage.getItem('favoriteGameIds')) || [];

    suggestions.forEach(game => {
        const isFavorite = favoriteGameIds.includes(String(game.id));

        const gameCardHTML = `
            <div class="movieCard" data-gameid="${game.id}">
                <div class="movie-poster">
                    <a href='gamepage.html?gameID=${game.id}'>
                        <img src="${game.background_image || 'default-poster.png'}" alt="game cover">
                    </a>
                </div>
                <div class="movie-info">
                    <a href='gamepage.html?gameID=${game.id}'><h6>${game.name}</h6></a>
                    <p>Released: ${game.released || "N/A"}</p>
                    <p><i class="fa-regular fa-star ${isFavorite ? 'fa-solid' : ''}" onclick="addToFavorites('${game.id}')"></i></p>
                </div>
            </div>
        `;
        suggestionContainer.innerHTML += gameCardHTML;
    });
}

async function handleSearchInput() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
        const suggestions = await fetchGameSuggestions(searchTerm);
        updateGameSuggestions(suggestions);
    } else {
        document.querySelector(".sugestionContainer").innerHTML = "";
    }
}

function addToFavorites(id) {
    let star = document.querySelector(`[data-gameid="${id}"] .fa-star`);

    if (star) {
        star.classList.toggle('fa-solid');

        let favoriteGameIds = JSON.parse(localStorage.getItem('favoriteGameIds')) || [];

        if (star.classList.contains('fa-solid')) {
            alert('Added to Favorites');
            if (!favoriteGameIds.includes(id)) {
                favoriteGameIds.push(id);
            }
        } else {
            alert('Removed from Favorites');
            favoriteGameIds = favoriteGameIds.filter(gameId => gameId !== id);
        }

        localStorage.setItem('favoriteGameIds', JSON.stringify(favoriteGameIds));
    }
}
