//Estudiante: Ana Camila Aguirre Chuquimia --
//C.I.: 6997906 --
const btnSearch = document.getElementById('btnSearch');
const btnAll = document.getElementById('btnAll');
const qInput = document.getElementById('q');
const modeSelect = document.getElementById('mode'); 
const resultsTbody = document.getElementById('results');
const status = document.getElementById('status');
function renderList(list) {
    resultsTbody.innerHTML = '';
    if (!Array.isArray(list) || list.length === 0) {
        resultsTbody.innerHTML = '<tr><td colspan="2">No se encontraron resultados</td></tr>';
        return;
    }
    for (const d of list) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${escapeHtml(d.name)}</td><td>${escapeHtml(d.level)}</td>`;
        resultsTbody.appendChild(tr);
    }
}
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' }[c]));
}

async function fetchAll() {
    status.textContent = 'Cargando...';
    try {
        const res = await fetch('https://digimon-api.vercel.app/api/digimon');
        const data = await res.json();
        renderList(data);
        status.textContent = `Mostrando ${data.length} Digimon`;
    } catch (e) {
        status.textContent = 'Error al obtener datos';
        console.error(e);
    }
}

async function fetchByMode() {
    const q = qInput.value.trim();
    if (!q) return alert('Ingresa un valor para buscar');
    const mode = modeSelect.value; // name | level
    let url;
    if (mode === 'name') url = `https://digimon-api.vercel.app/api/digimon/name/${encodeURIComponent(q)}`;
    else url = `https://digimon-api.vercel.app/api/digimon/level/${encodeURIComponent(q)}`;
    status.textContent = 'Buscando...';
    try {
        const res = await fetch(url);
        const data = await res.json();
        renderList(data);
        status.textContent = `Resultados: ${Array.isArray(data) ? data.length : 0}`;
    } catch (e) {
        status.textContent = 'Error en la búsqueda';
        console.error(e);
    }
}

btnAll.addEventListener('click', fetchAll);
btnSearch.addEventListener('click', fetchByMode);

// Opcional: carga inicial de todos los Digimon
// fetchAll();
