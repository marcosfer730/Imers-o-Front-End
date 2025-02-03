const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const gridContainer = document.querySelector('.grid-container');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;

    fetch(url)
        .then(response => response.json())
        .then(result => displaySingleResult(result, searchTerm))
        .catch(error => console.error("Erro ao buscar artistas:", error));
}

function displaySingleResult(result, searchTerm) {
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove("hidden");

    if (result.length === 0) {
        return;
    }

    // Filtra para encontrar artistas cujo nome começa com o termo pesquisado
    let filteredArtist = result.find(artist => artist.name.toLowerCase().startsWith(searchTerm.toLowerCase()));

    
    // Preenchendo as informações do card já existente no HTML
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');
    const artistCategory = document.querySelector('.artist-categorie');

    artistName.innerText = filteredArtist.name;
    artistImage.src = filteredArtist.urlImg;
    artistCategory.innerText = filteredArtist.genre;
}

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
        resultPlaylist.classList.remove("hidden");
        resultArtist.classList.add("hidden");
        return;
    }

    requestApi(searchTerm);
});
