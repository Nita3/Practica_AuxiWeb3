//Estudiante: Ana Camila Aguirre Chuquimia --
//C.I.: 6997906 --
let currentPage = 0;
const container = document.getElementById('pokemonContainer');
const pageNumber = document.getElementById('pageNumber');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

async function cargarPokemons(page = 0, nombre = '') {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`;

  if (nombre) {
    url = `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Pokémon no encontrado');
      const data = await res.json();
      container.innerHTML = `
        <div class="card">
          <img src="${data.sprites.front_default}" alt="${data.name}">
          <p><strong>${data.name}</strong></p>
          <p>ID: ${data.id}</p>
        </div>
      `;
      pageNumber.textContent = `Resultado: ${data.name}`;
      return;
    } catch (err) {
      container.innerHTML = `<p>No se encontró el Pokémon ingresado.</p>`;
      return;
    }
  }

  const res = await fetch(url);
  const data = await res.json();
  container.innerHTML = '';

  for (const pokemon of data.results) {
    const resDetalle = await fetch(pokemon.url);
    const dataDetalle = await resDetalle.json();

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${dataDetalle.sprites.front_default}" alt="${pokemon.name}">
      <p><strong>${pokemon.name}</strong></p>
      <p>ID: ${dataDetalle.id}</p>
    `;
    container.appendChild(card);
  }

  pageNumber.textContent = `Página ${page + 1}`;
}

document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    cargarPokemons(currentPage);
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentPage++;
  cargarPokemons(currentPage);
});

searchBtn.addEventListener('click', () => {
  const nombre = searchInput.value.trim();
  cargarPokemons(0, nombre);
});

cargarPokemons();
