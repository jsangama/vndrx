// Configuración de zonas horarias
const timezones = [
    {
        id: 'lima',
        timezone: 'America/Lima',
        locale: 'es-PE'
    },
    {
        id: 'newyork',
        timezone: 'America/New_York',
        locale: 'en-US'
    },
    {
        id: 'london',
        timezone: 'Europe/London',
        locale: 'en-GB'
    },
    {
        id: 'tokyo',
        timezone: 'Asia/Tokyo',
        locale: 'ja-JP'
    },
    {
        id: 'sydney',
        timezone: 'Australia/Sydney',
        locale: 'en-AU'
    },
    {
        id: 'dubai',
        timezone: 'Asia/Dubai',
        locale: 'ar-AE'
    }
];

/**
 * Formatea la hora con ceros a la izquierda
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado
 */
function pad(num) {
    return String(num).padStart(2, '0');
}

/**
 * Obtiene la hora actual en una zona horaria específica
 * @param {string} timezone - Zona horaria (ej: 'America/Lima')
 * @returns {object} Objeto con hora, minuto, segundo
 */
function getTimeInTimezone(timezone) {
    const now = new Date();
    
    // Crear formateador para la zona horaria
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const parts = formatter.formatToParts(now);
    
    const timeParts = {};
    parts.forEach(part => {
        timeParts[part.type] = part.value;
    });

    return {
        hour: timeParts.hour,
        minute: timeParts.minute,
        second: timeParts.second,
        day: timeParts.day,
        month: timeParts.month,
        year: timeParts.year
    };
}

/**
 * Actualiza el reloj para una zona horaria específica
 * @param {object} tzConfig - Configuración de la zona horaria
 */
function updateClock(tzConfig) {
    const time = getTimeInTimezone(tzConfig.timezone);
    
    const timeElement = document.querySelector(`#${tzConfig.id} .time`);
    const dateElement = document.querySelector(`#${tzConfig.id}-date`);

    if (timeElement) {
        timeElement.textContent = `${time.hour}:${time.minute}:${time.second}`;
    }

    if (dateElement) {
        // Formatear fecha según locale
        const date = new Date(`${time.year}-${time.month}-${time.day}`);
        const dateFormatter = new Intl.DateTimeFormat(tzConfig.locale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        dateElement.textContent = dateFormatter.format(date);
    }
}

/**
 * Actualiza todos los relojes
 */
function updateAllClocks() {
    timezones.forEach(tz => {
        updateClock(tz);
    });
}

/**
 * Inicializa los relojes y configura actualización cada segundo
 */
function initClocks() {
    // Actualizar inmediatamente
    updateAllClocks();
    
    // Actualizar cada segundo
    setInterval(updateAllClocks, 1000);
    
    // Mejora: Actualizar más preciso al inicio de cada segundo
    const now = new Date();
    const ms = now.getMilliseconds();
    const delay = 1000 - ms;
    
    setTimeout(() => {
        updateAllClocks();
        setInterval(updateAllClocks, 1000);
    }, delay);
}

// Iniciar los relojes cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClocks);
} else {
    initClocks();
}

// Actualizar también cuando la pestaña vuelve a tener foco
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updateAllClocks();
    }
});
