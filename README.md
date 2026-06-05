# VNDRX

Tienda multi-marca para pedidos reales por web, WhatsApp y medios de pago del cliente.

## Demo publica

- [Abrir tienda VNDRX](https://jsangama.github.io/vndrx/)

## Que incluye

- Selector de marcas para entrar solo a la tienda que el cliente quiere.
- Carrito de compras y checkout guiado.
- Pedido directo por WhatsApp.
- Tarjetas de pago con Yape y cuentas bancarias.
- Vista con imagenes de producto y zoom al tocar la foto.
- Secciones separadas para cada linea de negocio.
- Funcionamiento como PWA para abrirse como app.

## Marcas dentro de la app

- **Rey Leon**: arroz y derivados.
- **ASWA La Rica Chicha**: chicha, bidon, escolar y promos sanjuaneras.
- **Jora**: chicha de jora para sazonar o beber.
- **Tela**: bolsas, alforjas, panueletas, vestidos regionales, mochilas, sabanas, edredones, colchas y cubrecamas.
- **Bocaditos Regionales**: mani, rosquitas, turcas, suspiros, chifles y otros dulces artesanales.
- **Artesania Lamista**: tinajas, platos, pate, olla arrocera, tiestos y floreros de barro.

## Pagos y pedidos

- WhatsApp central de pedidos: `955 273 229`
- Yape del molino: `918 429 034`
- Titular Yape: `Noyolith Quine Rojas`
- Cuentas bancarias del molino visibles en el checkout de Rey Leon.

## Base de datos

La app trabaja con `localStorage` y, si configuras Supabase, también respalda y sincroniza pedidos, perfil y reseñas en la nube.

### Para activarlo

1. Crea un proyecto en Supabase.
2. Ejecuta el SQL de [supabase/schema.sql](./supabase/schema.sql).
3. Elige una de estas dos opciones para configurar la conexion:

```bash
# Opcion A: archivo .env.local
```

```bash
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anon_publica
```

```bash
# Opcion B: panel "Base de datos" dentro de la app
```

Pega la URL y la anon key en el hub interno y guarda la conexion.

4. Reinicia el servidor de desarrollo con `npm run dev`, o deja que la app recargue si usaste el panel interno.
5. Usa el botón `Probar conexión` del panel para confirmar que Supabase responde antes de empezar a vender.
6. Si ya tenías pedidos guardados en el navegador, usa `Subir datos locales` para copiarlos a la nube.
7. Usa `Descargar respaldo` si quieres guardar una copia JSON antes de migrar o cambiar algo grande.
8. Crea usuarios en Supabase Auth y asigna el rol de cada uno en `vndrx_user_roles` para activar el acceso al panel interno.

### Tablas que usa

- `vndrx_orders`
- `vndrx_profiles`
- `vndrx_reviews`
- `vndrx_user_roles`

### Importante

- Sin esas variables de entorno, la app sigue funcionando en modo local.
- Con Supabase activo, los pedidos del panel se comparten entre dispositivos.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de produccion

```bash
npm run build
```

## Estructura

- `src/VNDRX.jsx`: app principal de ventas y pedidos.
- `src/assets/`: imagenes y artes de las marcas.
- `public/`: service worker y archivos publicos.
- `docs/`: build publicado para GitHub Pages.

## Notas

- El sitio publico se publica desde `docs/`.
- Si en el perfil de GitHub no aparece en la portada, busca el repositorio en la pestaña `Repositories` o fijalo en `Pinned`.
