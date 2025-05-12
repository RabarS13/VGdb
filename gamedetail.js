document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "ba9c4ee9c6c64edba467c77bbc0afe3b";

    function displayGameDetails(id) {
        fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
            .then(response => response.json())
            .then(game => {
                const gameContainer = document.querySelector('.game-detail-container');
                const gameCard = document.createElement('div');
                gameCard.classList.add('movieDetail');
                gameCard.innerHTML = `
                    <div class="head d-flex justify-content-between">
                        <div class="movieName">
                            <h3>${game.name}</h3>
                            <p>Released: ${game.released}</p>
                        </div>
                        <div class="movieRating">
                            <h4><a href="index.html"><i class="fa-solid fa-arrow-left"></i> Go Back</a></h4>
                        </div>
                    </div>
                    <div class="movieInfo d-flex">
                        <div class="right-side-poster">
                            <div class="Movie-poster">
                                <img src="${game.background_image}" alt="game cover">
                            </div>
                            <h4>${game.genres.map(g => g.name).join(', ')}</h4>
                        </div>
                        <div class="left-side-info">
                            <p><span>Rating:</span> ${game.rating}</p>
                            <p><span>Platforms:</span> ${game.platforms.map(p => p.platform.name).join(', ')}</p>
                            <p><span>Developers:</span> ${game.developers.map(d => d.name).join(', ')}</p>
                            <p><span>Description:</span> ${game.description_raw}</p>
                        </div>
                    </div>`;
                gameContainer.appendChild(gameCard);
            })
            .catch(error => {
                console.error("Error fetching game details:", error);
                document.querySelector('.game-detail-container').innerHTML = "Error fetching game details.";
            });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const gameID = urlParams.get("gameID");
    if (gameID) {
        displayGameDetails(gameID);
    } else {
        console.error("Game ID not found in URL parameter.");
    }
});