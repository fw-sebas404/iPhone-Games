
let backgrounds = [
    'url("fondos/1.jpg")',
    'url("fondos/2.jpg")',
    'url("fondos/3.jpg")',
    'url("fondos/4.jpg")',
    'url("fondos/5.jpg")',
    'url("fondos/6.jpg")',
    'url("fondos/8.jpg")',
    'url("fondos/9.jpg")',
    'url("fondos/10.jpg")',
    'url("fondos/11.jpg")'
];

let currentBackgroundIndex = 0;

function changeBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length; 
    document.body.style.backgroundImage = backgrounds[currentBackgroundIndex]; 
}

function openApp(url) {
    window.open(url, '_blank');
}

function openAddressBar() {
    let url = prompt("Ingrese la dirección a la que desea ir:");
    if (url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }
        window.location.href = url; 
    }
}

function openSearchModal() {
    document.getElementById('searchModal').style.display = 'block';
}

function closeSearchModal() {
    document.getElementById('searchModal').style.display = 'none';
}

function searchScratch() {
    const query = document.getElementById('searchInput').value;
    const formattedQuery = encodeURIComponent(query);
    const url = `https://scratch.mit.edu/search/projects?q=${formattedQuery}`;
    window.open(url, '_blank');
    closeSearchModal();
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Texto copiado: " + text);
    }).catch(err => {
        alert("Error al copiar: ", err);
    });
}

// Mostrar hora con AM/PM
function actualizarHora() {
    var ahora = new Date();
    var horas = ahora.getHours();
    var minutos = ahora.getMinutes().toString().padStart(2, '0');
    var segundos = ahora.getSeconds().toString().padStart(2, '0');
    var ampm = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12;
    horas = horas ? horas : 12; // El 0 debe convertirse a 12
    var horaActual = horas + ':' + minutos + ':' + segundos + ' ' + ampm;
    document.getElementById('hora').textContent = horaActual;
}

setInterval(actualizarHora, 1000);
actualizarHora();

// Para cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('searchModal');
    if (event.target === modal) {
        closeSearchModal();
    }
}
