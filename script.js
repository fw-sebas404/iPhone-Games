let backgrounds = [
    'url("fondos/1.jpg")',
    'url("fondos/2.jpg")',
    'url("fondos/3.jpg")',
    'url("fondos/4.jpg")',
    'url("fondos/5.jpg")',
    'url("fondos/6.jpg")',
    'url("fondos/7.jpg")',
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
        try {
            new URL(url);  // Valida si es una URL válida
            window.location.href = url;
        } catch (e) {
            alert("URL no válida, por favor intente de nuevo.");
        }
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
        alert("Error al copiar: " + err);
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
    let audio = new Audio('alarma/alarma.mp3'); // Cambia 'alarma.mp3' por la ruta correcta a tu archivo de sonido
    audio.play();
}

// Variables para controlar las alarmas
let alarmaSonada = {};

// Inicializar todas las actividades en falso (alarmas no sonadas)
const actividades = {
    dormirSemana: { inicio: 20, fin: 4, dias: [1, 2, 3, 4, 5], sonada: false },
    colegio: { inicio: 6.5, fin: 13.666, dias: [1, 2, 3, 4, 5], sonada: false },
    alistarse: { inicio: 13.666, fin: 14.25, dias: [1, 2, 3, 4, 5], sonada: false },
    remojarRopa: { inicio: 14.75, fin: 15, dias: [1, 2, 3, 4, 5], sonada: false },
    lavarPlatos: { inicio: 15, fin: 15.333, dias: [1, 2, 3, 4, 5], sonada: false },
    deberes: { inicio: 15.333, fin: 18.333, dias: [1, 2, 3, 4, 5], sonada: false },
    entretenimiento: { inicio: 18.333, fin: 19.5, dias: [1, 2, 3, 4, 5], sonada: false },
    dormirFinSemana: { inicio: 20, fin: 7, dias: [0, 6], sonada: false }
};

function verificarHorarios() {
    const ahora = new Date();
    const diaSemana = ahora.getDay();  // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();
    const horaActual = horas + minutos / 60;

    for (let actividad in actividades) {
        let act = actividades[actividad];
        
        // Verifica si el día de la semana es correcto para la actividad
        if (act.dias.includes(diaSemana)) {
            // Si la hora está dentro del rango de la actividad
            if ((horaActual >= act.inicio || horaActual < act.fin)) {
                if (!act.sonada) {
                    playSound();  // Suena la alarma una vez
                    act.sonada = true;  // Marca que la alarma ya sonó para esta actividad
                }
            } else {
                act.sonada = false;  // Reinicia la alarma si ya no está en el rango de tiempo
            }
        }
    }
}

setInterval(verificarHorarios, 60000); // Verifica los horarios cada minuto
