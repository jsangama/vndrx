# Database VNDRX

Esta carpeta reserva la capa de base de datos para VNDRX.

Responsabilidades previstas:

- Usuarios.
- Productores.
- Negocios.
- Productos.
- Inventario.
- Pedidos.
- Pagos.
- Reputacion.
- Trazabilidad.
- Logistica.

El esquema `schema/direct_production_sellers.sql` define la base propuesta para productores y fabricantes directos verificados. Ese modelo exige que el vendedor sea `PRODUCER` o `MANUFACTURER`, que produzca directamente y que su verificacion este aprobada antes de publicar productos.

Cuando se agreguen migraciones o esquemas fuera de Supabase, deberan vivir en esta carpeta. Si se usa Supabase, los archivos especificos continuan en `supabase/`.
