# VNDRX app architecture

The app is moving away from one large UI file into small modules with clear ownership.

Official architecture rule: `internal/architecture/VNDRX_ARCHITECTURE_RULE.md`.
Platform operating model: `internal/architecture/VNDRX_PLATFORM_MODEL.md`.

VNDRX must use a modular, scalable, maintainable architecture. The app should be distributed across folders by responsibility: UI, business logic, data access, external integrations, configuration, pages, components, models, utilities, validations, and routes. The project must not concentrate the full app, styles, and logic inside one `index.html`.

- `src/app/entryConfig.js`: first-entry routing and default storefront.
- `src/app/brandStrategy.js`: VNDRX slogan, mission, vision, categories, platform modules, and marketplace direction.
- `src/app/marketplaceContent.js`: public marketplace messaging, trust signals, audiences, seller steps, and recommended product highlights.
- `src/app/platformRoadmap.js`: internal roadmap data only. Do not render in the public customer app.
- `src/app/storage.js`: browser persistence and profile defaults.
- `src/components/`: reusable UI components grouped by responsibility.
- `src/pages/`: full application views.
- `src/layouts/`: shared layout shells for public, customer, seller, and admin contexts.
- `src/services/`: external integrations and data access.
- `backend/`: future API, authentication, security, payments, logistics, integrations, and operational services.
- `database/`: future migrations, seeds, and schemas when the project needs database assets outside Supabase.
- `src/domain/referrals.js`: referral code and share-link domain helpers.
- `src/domain/orders.js`: order totals, payment labels, WhatsApp messages, and order records.
- `src/supabaseCatalog.js`: Supabase catalog, orders, and payment proof I/O.
- `src/VNDRX.jsx`: current shell and legacy UI surface while components are extracted.

Current product scope: the public app is focused only on ASWA La Rica Chicha and Arroz del Pacifico. Customer-facing screens should show catalog, cart, orders, profile, payments, delivery, promotions, and purchase history.

Public visibility for now: only ASWA and Arroz del Pacifico are exposed to general visitors. Developer access to all stores remains available through private URL flags handled by `entryConfig.js`: `?dev=1`, `?dueno=1`, or `?owner=1`.

Future roadmap material belongs in internal developer documentation, not in the main app UI.

To scale the platform, add new public messaging in `marketplaceContent.js`, expose or hide companies through `entryConfig.js`, and keep each store's products, delivery zones, payment methods, and promotions attached to its company key.
