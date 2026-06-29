# VNDRX

Marketplace directo del productor al consumidor.

## Slogan

Directo del productor al consumidor.

## Mision

Conectar productores, fabricantes y empresas con consumidores finales mediante una plataforma digital sin intermediarios innecesarios.

## Vision

Convertirse en el marketplace lider de Latinoamerica para comercio directo entre productores y consumidores.

## Problema

- Existen demasiados intermediarios.
- Los productores ganan menos.
- Los consumidores pagan mas.
- Es dificil encontrar proveedores confiables.

## Solucion

- Empresas venden directamente.
- Agricultores venden directamente.
- Fabricantes venden directamente.
- Distribuidores autorizados venden directamente.

## Tiendas visibles actualmente

- ASWA La Rica Chicha.
- Arroz del Pacifico.

## Modulos principales

- Marketplace.
- Catalogo.
- Carrito.
- Pedidos.
- Pagos.
- Logistica.
- Reputacion.
- Perfil de vendedor.
- Perfil de comprador.
- Analitica.

## Objetivo principal

Reducir intermediarios y aumentar ganancias para productores y consumidores.

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

## Marcas publicas actuales

- **ASWA La Rica Chicha**: chicha, bidon, escolar y promos sanjuaneras.
- **Arroz del Pacifico**: arroz y derivados.

## Marcas internas para desarrollo

Estas marcas no aparecen al publico general. Solo se muestran con `?dev=1`, `?dueno=1` o `?owner=1`.

- **Jora**: chicha de jora para sazonar o beber.
- **Tela**: bolsas, alforjas, panueletas, vestidos regionales, mochilas, sabanas, edredones, colchas y cubrecamas.
- **Bocaditos Regionales**: mani, rosquitas, turcas, suspiros, chifles y otros dulces artesanales.
- **Artesania Lamista**: tinajas, platos, pate, olla arrocera, tiestos y floreros de barro.

## Pagos y pedidos

- WhatsApp central de pedidos: `955 273 229`
- Yape del molino: `918 429 034`
- Titular Yape: `Noyolith Quine Rojas`
- Cuentas bancarias del molino visibles en el checkout de Arroz del Pacifico.

## Desarrollo local

```bash
npm install
npm run dev:local
```

## Vista del build final

```bash
npm run build
npm run preview:local
```

## Modo dueño para pruebas

Abre la tienda con `?dev=1`, `?dueno=1` o `?owner=1` al final de la URL:

```text
https://jsangama.github.io/vndrx/?dev=1
```

Ese modo muestra un panel privado para verificar cada tienda, crear pedidos de prueba, ver un reporte por marca, copiar la vista previa del WhatsApp y marcar el mensaje como `PRUEBA DUENO - NO DESPACHAR`. Tambien permite borrar carrito y pedidos de prueba guardados en ese dispositivo.

## Administracion con Supabase

1. Crea un proyecto en Supabase.
2. Ejecuta `supabase/schema.sql` en el SQL editor.
3. Crea tu usuario dueño en Supabase Auth.
4. Configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` antes del build.
5. Entra a `?dev=1`, `?dueno=1` o `?owner=1`, inicia sesion en el panel Supabase y publica el JSON editable.

El JSON permite sobrescribir productos/precios con `productOverrides`, agregar productos con `extraProducts` y cambiar metodos de pago con `paymentMethods`.

## Build de produccion

```bash
npm run build
```

## Estructura

- `src/app/`: configuracion de entrada, persistencia e identidad de producto.
- `src/domain/`: logica de pedidos, referidos y dominio de venta.
- `src/VNDRX.jsx`: shell principal de ventas y pedidos mientras se extraen componentes.
- `src/assets/`: imagenes y artes de las marcas.
- `public/`: service worker y archivos publicos.
- `docs/`: build publicado para GitHub Pages.

## Notas

- El sitio publico se publica desde `docs/`.
- Si en el perfil de GitHub no aparece en la portada, busca el repositorio en la pestaña `Repositories` o fijalo en `Pinned`.
