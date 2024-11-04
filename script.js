
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
// Función para reproducir el sonido
function playSound() {
    let audio = new Audio('alarma.mp3'); // Cambia 'reloj.mp3' por la ruta correcta a tu archivo de sonido
    audio.play();
}

// Función para verificar las actividades programadas
function verificarHorarios() {
    const ahora = new Date();
    const diaSemana = ahora.getDay();  // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();

    // Formato para facilitar la comparación (hora.minutos)
    const horaActual = horas + minutos / 60;

    if (diaSemana >= 1 && diaSemana <= 5) {  // Lunes a Viernes
        // Dormir (8:00pm-4:00am)
        if (horaActual >= 20 || horaActual < 4) playSound();

        // Colegio (6:30am-1:40pm)
        if (horaActual >= 6.5 && horaActual <= 13.666) playSound();

        // Alistarse para el siguiente día (1:40pm-2:15pm)
        if (horaActual >= 13.666 && horaActual <= 14.25) playSound();

        // Poner a remojar la ropa (2:45pm-3:00pm)
        if (horaActual >= 14.75 && horaActual <= 15) playSound();

        // Lavar platos (3:00pm-3:20pm)
        if (horaActual >= 15 && horaActual <= 15.333) playSound();

        // Deberes, estudiar y adelantar materia (3:20pm-6:20pm)
        if (horaActual >= 15.333 && horaActual <= 18.333) playSound();

        // Entretenimiento (6:20pm-7:30pm)
        if (horaActual >= 18.333 && horaActual <= 19.5) playSound();

        // Acostarse (7:20pm-4:00am)
        if (horaActual >= 19.333 || horaActual < 4) playSound();

    } else {  // Festivos, sábados y domingos
        // Dormir (8:00pm-7:00am)
        if (horaActual >= 20 || horaActual < 7) playSound();

        // Alistarse (7:00am-8:00am)
        if (horaActual >= 7 && horaActual <= 8) playSound();

        // Estudiar (8:00am-12:00pm)
        if (horaActual >= 8 && horaActual <= 12) playSound();

        // Entretenimiento (no hay horario específico, si quieres algo concreto, lo puedes agregar)
    }
}

// Revisión del horario cada minuto
setInterval(verificarHorarios, 60000); // Revisa cada minuto
