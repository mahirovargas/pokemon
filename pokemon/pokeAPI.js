const apiURL = "https://pokeapi.co/api/v2/pokemon";
let currentPage = 1;
const limit = 20;

async function fetchPokemon(page) {
    const offset = (page - 1) * limit;
    const response = await fetch(`${apiURL}?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results;
}

async function renderPokemon(page) {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = ""; // Clear previous content
    const pokemons = await fetchPokemon(page);

    for (const pokemon of pokemons) {
        const res = await fetch(pokemon.url);
        const details = await res.json();

        const card = document.createElement("div");
        card.className = "pokemon-card";
        card.innerHTML = `
            <img src="${details.sprites.front_default}" alt="${details.name}">
            <h2>${details.name}</h2>
            <p>Status: ${details.status || 'Atrapado'}</p>
            <p>Species: ${details.species.name}</p>
        `;
        container.appendChild(card);
    }
}

function setupPagination() {
    document.getElementById("prev").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPokemon(currentPage);
            document.getElementById("page-number").textContent = `Page ${currentPage}`;
        }
    });

    document.getElementById("next").addEventListener("click", () => {
        currentPage++;
        renderPokemon(currentPage);
        document.getElementById("page-number").textContent = `Page ${currentPage}`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderPokemon(currentPage);
    setupPagination();
});
