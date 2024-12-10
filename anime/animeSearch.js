const apiURL = "https://api.jikan.moe/v4/anime";

async function searchAnime(query) {
    const response = await fetch(`${apiURL}?q=${query}`);
    const data = await response.json();
    return data.data;
}

function renderResults(animeList) {
    const container = document.getElementById("results-container");
    container.innerHTML = ""; // Clear previous results

    if (animeList.length === 0) {
        container.innerHTML = "<p>No se encontraron resultados</p>";
        return;
    }

    animeList.forEach(anime => {
        const card = document.createElement("div");
        card.className = "anime-card";
        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="anime-image">
            <h2>${anime.title}</h2>
            <p>Episodios: ${anime.episodes || 'N/A'}</p>
            <a href="${anime.url}" target="_blank">Más Información</a>
        `;
        container.appendChild(card);
    });
}

document.getElementById("search-btn").addEventListener("click", async () => {
    const query = document.getElementById("search-input").value.trim();
    if (query) {
        const results = await searchAnime(query);
        renderResults(results);
    }
});
