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

## Desarrollo local

```bash
npm install
npm run dev
```

## Modo dueño para pruebas

Abre la tienda con `?dueno=1` al final de la URL:

```text
https://jsangama.github.io/vndrx/?dueno=1
```

Ese modo muestra un panel privado para verificar cada tienda, crear pedidos de prueba, ver un reporte por marca, copiar la vista previa del WhatsApp y marcar el mensaje como `PRUEBA DUENO - NO DESPACHAR`. Tambien permite borrar carrito y pedidos de prueba guardados en ese dispositivo.

## Administracion con Supabase

1. Crea un proyecto en Supabase.
2. Ejecuta `supabase/schema.sql` en el SQL editor.
3. Crea tu usuario dueño en Supabase Auth.
4. Configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` antes del build.
5. Entra a `?dueno=1`, inicia sesion en el panel Supabase y publica el JSON editable.

El JSON permite sobrescribir productos/precios con `productOverrides`, agregar productos con `extraProducts` y cambiar metodos de pago con `paymentMethods`.

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
