# VNDRX app architecture

The app is moving away from one large UI file into small modules with clear ownership.

- `src/app/entryConfig.js`: first-entry routing and default storefront.
- `src/app/brandStrategy.js`: VNDRX slogan, mission, vision, categories, platform modules, and marketplace direction.
- `src/app/marketplaceContent.js`: public marketplace messaging, trust signals, audiences, seller steps, and recommended product highlights.
- `src/app/platformRoadmap.js`: internal roadmap data only. Do not render in the public customer app.
- `src/app/storage.js`: browser persistence and profile defaults.
- `src/domain/referrals.js`: referral code and share-link domain helpers.
- `src/domain/orders.js`: order totals, payment labels, WhatsApp messages, and order records.
- `src/supabaseCatalog.js`: Supabase catalog, orders, and payment proof I/O.
- `src/VNDRX.jsx`: current shell and legacy UI surface while components are extracted.

Current product scope: the public app is focused only on ASWA La Rica Chicha and Arroz del Pacifico. Customer-facing screens should show catalog, cart, orders, profile, payments, delivery, promotions, and purchase history.

Public visibility for now: only ASWA and Arroz del Pacifico are exposed to general visitors. Developer access to all stores remains available through private URL flags handled by `entryConfig.js`: `?dev=1`, `?dueno=1`, or `?owner=1`.

Future roadmap material belongs in internal developer documentation, not in the main app UI.

To scale the platform, add new public messaging in `marketplaceContent.js`, expose or hide companies through `entryConfig.js`, and keep each store's products, delivery zones, payment methods, and promotions attached to its company key.
