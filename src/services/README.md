# Services

Servicios para acceso a datos e integraciones externas.

Archivos objetivo:

- `auth.service.js`
- `product.service.js`
- `store.service.js`
- `order.service.js`
- `payment.service.js`
- `delivery.service.js`

Las llamadas a Supabase, WhatsApp, pagos o delivery no deben mezclarse directamente con componentes visuales cuando puedan aislarse aqui.
