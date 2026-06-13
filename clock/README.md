# ⏰ Reloj Digital Multi-Zona Horaria

Un reloj digital moderno y responsivo que muestra la hora actual en diferentes zonas horarias del mundo. Incluye Lima (Perú) como zona principal y otras ciudades importantes.

## 🌍 Zonas Horarias Incluidas

- 🇵🇪 **Lima, Perú** (PET - Zona Horaria Estándar de Perú)
- 🗽 **Nueva York, USA** (EST - Hora Estándar del Este)
- 🇬🇧 **Londres, UK** (GMT - Hora de Greenwich)
- 🗾 **Tokio, Japón** (JST - Hora Estándar de Japón)
- 🦘 **Sídney, Australia** (AEDT - Zona Horaria de Verano del Este Australiano)
- 🏙️ **Dubai, UAE** (GST - Hora Estándar del Golfo)

## ✨ Características

✅ **Diseño Moderno**
- Gradiente de colores atractivo
- Tarjetas con efecto hover
- Sombras y efectos visuales

✅ **Totalmente Responsivo**
- Adaptado para desktop (1200px+)
- Optimizado para tablet (768px)
- Diseño móvil completo (480px)
- Soporte para modo oscuro

✅ **Actualización en Tiempo Real**
- Se actualiza cada segundo
- Precisión sincronizada con el inicio de cada segundo
- Muestra hora, minuto y segundo

✅ **Información Completa**
- Hora con formato HH:MM:SS
- Fecha completa en el idioma local
- Zona horaria identificada para cada ciudad

✅ **Rendimiento**
- Animaciones suaves
- Carga rápida
- Sin dependencias externas

## 🚀 Uso

### Opción 1: Archivo Local
1. Descarga los archivos `index.html`, `styles.css` y `script.js`
2. Colócalos en la misma carpeta
3. Abre `index.html` en tu navegador

### Opción 2: Servidor Web
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000/clock/`

## 📁 Estructura de Archivos

```
clock/
├── index.html      # Estructura HTML
├── styles.css      # Estilos y responsividad
├── script.js       # Lógica del reloj
└── README.md       # Este archivo
```

## 🎨 Personalización

### Agregar más zonas horarias

Edita el array `timezones` en `script.js`:

```javascript
const timezones = [
    {
        id: 'madrid',
        timezone: 'Europe/Madrid',
        locale: 'es-ES'
    },
    // Agrega más...
];
```

Luego agrega una tarjeta en `index.html`:

```html
<div class="clock-card">
    <div class="clock-header">
        <span class="city">🇪🇸 Madrid</span>
        <span class="timezone">Spain (CET)</span>
    </div>
    <div class="clock-display" id="madrid">
        <span class="time">--:--:--</span>
    </div>
    <div class="date" id="madrid-date">--/--/----</div>
</div>
```

### Cambiar colores

Modifica los gradientes en `styles.css`:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.clock-display {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🌐 Zonas Horarias Disponibles (IANA)

Algunas zonas horarias que puedes usar:

**América:**
- America/Mexico_City
- America/Toronto
- America/Denver
- America/Los_Angeles
- America/Sao_Paulo
- America/Buenos_Aires

**Europa:**
- Europe/Paris
- Europe/Berlin
- Europe/Moscow
- Europe/Istanbul

**Asia:**
- Asia/Hong_Kong
- Asia/Shanghai
- Asia/Bangkok
- Asia/Singapore
- Asia/Seoul

**Pacífico:**
- Pacific/Auckland
- Pacific/Fiji
- Pacific/Honolulu

## 🔧 Requisitos Técnicos

- Navegador moderno (Chrome 24+, Firefox 29+, Safari 11+, Edge 12+)
- JavaScript habilitado
- Conexión a internet NO requerida (funciona offline)

## 📱 Compatibilidad

| Navegador | Soporte |
|-----------|---------|
| Chrome    | ✅ Completo |
| Firefox   | ✅ Completo |
| Safari    | ✅ Completo |
| Edge      | ✅ Completo |
| Opera     | ✅ Completo |
| IE 11     | ⚠️ Parcial |

## 🎯 Mejoras Futuras

- [ ] Seleccionar zonas horarias personalizadas
- [ ] Guardar preferencias en localStorage
- [ ] Reloj analógico adicional
- [ ] Convertidor de zonas horarias
- [ ] Notificaciones horarias
- [ ] Exportar información de zonas horarias
- [ ] PWA (Progressive Web App)

## 📄 Licencia

Este proyecto es open source y está disponible bajo licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz fork del repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**Creado con ❤️ para vndrx**
