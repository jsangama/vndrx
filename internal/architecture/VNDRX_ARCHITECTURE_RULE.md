# Regla oficial de arquitectura para VNDRX

VNDRX debe desarrollarse utilizando una arquitectura modular, escalable y mantenible.

El proyecto estara distribuido en multiples archivos y carpetas organizados segun su responsabilidad. La interfaz, la logica de negocio, el acceso a datos, las integraciones externas y las configuraciones deberan mantenerse separadas.

No se permitira concentrar toda la aplicacion, sus estilos y su logica dentro de un unico archivo `index.html`.

La solucion debera utilizar componentes reutilizables, paginas independientes, servicios, modulos, rutas, modelos, utilidades y configuraciones separadas. Esta estructura permitira mantener, probar, ampliar y escalar la plataforma sin afectar innecesariamente otras partes del sistema.

## Declaracion publica

Este proyecto utiliza una arquitectura modular. Esta distribuido en multiples archivos y carpetas, con componentes, servicios y paginas independientes, en lugar de concentrar todo en un unico `index.html`. Esto facilita su mantenimiento y escalabilidad.

## Separacion obligatoria de plataforma

VNDRX debe separar claramente:

- Frontend: todo lo que ve y utiliza el usuario.
- Backend: reglas comerciales, autenticacion, pedidos, seguridad, pagos e integraciones.
- Base de datos: usuarios, productores, negocios, productos, inventario, pedidos, pagos y reputacion.
- Paneles independientes: comprador, vendedor, administrador y operador.
- Servicios independientes: catalogo, busqueda, carrito, pagos, logistica, mensajes, notificaciones y analitica.

Ejemplo de regla practica: el proceso de compra no debe estar escrito directamente dentro de la pagina del producto. La pagina muestra la informacion; un servicio gestiona el carrito; otro valida el inventario; otro crea el pedido; y otro coordina el pago.

## Responsabilidades por capa

- `index.html`: solo debe actuar como documento base para cargar la app.
- `src/main.jsx`: punto de arranque de React.
- `src/App.jsx`: enrutador o shell principal de la aplicacion.
- `src/components/`: piezas reutilizables de interfaz.
- `src/pages/`: pantallas completas o vistas principales.
- `src/layouts/`: estructuras visuales compartidas por tipo de usuario.
- `src/services/`: acceso a datos, integraciones y operaciones externas.
- `src/domain/`: reglas de negocio puras.
- `src/app/`: configuracion de entrada, identidad, contenido y estado de aplicacion.
- `src/models/`: estructuras de datos del dominio.
- `src/utils/`: utilidades sin dependencia directa de UI.
- `src/constants/`: valores compartidos y opciones de negocio.
- `src/validations/`: reglas de validacion de formularios, pedidos y catalogos.
- `backend/`: API, seguridad, autenticacion, reglas comerciales y orquestacion.
- `database/`: migraciones, semillas y diseno de esquema cuando no se use solo Supabase.
- `internal/`: documentacion privada de producto, roadmap y arquitectura.
- `supabase/`: esquema, migraciones y configuracion de base de datos Supabase.
- `docs/`: build publicado por GitHub Pages. No usar como fuente editable de documentacion.

## Estructura objetivo

```text
vndrx/
|-- public/
|   |-- images/
|   |-- icons/
|   `-- favicon/
|-- src/
|   |-- assets/
|   |-- components/
|   |   |-- common/
|   |   |-- navigation/
|   |   |-- products/
|   |   |-- stores/
|   |   |-- checkout/
|   |   `-- dashboard/
|   |-- pages/
|   |   |-- Home/
|   |   |-- Marketplace/
|   |   |-- ProductDetail/
|   |   |-- StoreProfile/
|   |   |-- Cart/
|   |   |-- Checkout/
|   |   |-- Login/
|   |   |-- Register/
|   |   `-- Dashboard/
|   |-- layouts/
|   |   |-- PublicLayout/
|   |   |-- CustomerLayout/
|   |   |-- SellerLayout/
|   |   `-- AdminLayout/
|   |-- services/
|   |-- hooks/
|   |-- context/
|   |-- store/
|   |-- routes/
|   |-- types/
|   |-- models/
|   |-- utils/
|   |-- validations/
|   |-- constants/
|   |-- config/
|   |-- styles/
|   |-- App.jsx
|   `-- main.jsx
|-- backend/
|   |-- app/
|   |   |-- api/
|   |   |-- models/
|   |   |-- schemas/
|   |   |-- services/
|   |   |-- repositories/
|   |   |-- security/
|   |   `-- database/
|   |-- tests/
|   `-- main.py
|-- database/
|   |-- migrations/
|   |-- seeds/
|   `-- schema/
|-- internal/
|   |-- architecture/
|   `-- ROADMAP.md
|-- supabase/
|-- tests/
|-- .env.example
|-- README.md
`-- package.json
```

## Regla para futuros cambios

Cada nueva funcionalidad debe ubicarse en la carpeta que corresponde a su responsabilidad. Si una funcionalidad mezcla UI, reglas de negocio e integracion externa, se debe dividir en componentes, dominio y servicios antes de crecer.

Evitar archivos excesivamente grandes. Cuando un archivo tenga mas de una responsabilidad, debe dividirse en modulos menores.

`src/VNDRX.jsx` puede seguir funcionando como superficie principal mientras se migra por etapas, pero no debe recibir nuevas secciones grandes si esas secciones pueden vivir como componentes, paginas o servicios separados.
