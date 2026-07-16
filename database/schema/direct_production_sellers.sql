-- VNDRX direct production model.
-- En VNDRX, quien vende debe ser quien produce.

create table if not exists direct_sellers (
  id uuid primary key,
  user_id uuid not null,
  seller_type text not null check (seller_type in ('PRODUCER', 'MANUFACTURER')),
  producer_type text,
  legal_name text not null,
  commercial_name text,
  tax_id text not null,
  country text not null,
  region text not null,
  city text not null,
  production_address text not null,
  verification_status text not null default 'REGISTRATION_STARTED' check (
    verification_status in (
      'REGISTRATION_STARTED',
      'DOCUMENTS_PENDING',
      'IN_REVIEW',
      'INSUFFICIENT_EVIDENCE',
      'VIDEO_CALL_REQUIRED',
      'INSPECTION_REQUIRED',
      'PRODUCER_APPROVED',
      'MANUFACTURER_APPROVED',
      'REJECTED',
      'SUSPENDED',
      'VERIFICATION_EXPIRED'
    )
  ),
  produces_directly boolean not null default false,
  production_description text,
  production_capacity text,
  years_producing integer,
  worker_count integer,
  website text,
  phone text,
  email text,
  approved_at timestamptz,
  suspended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists direct_seller_evidence (
  id uuid primary key,
  seller_id uuid not null references direct_sellers(id) on delete cascade,
  evidence_type text not null check (evidence_type in (
    'PRODUCTION_PLACE_PHOTO',
    'PROCESS_VIDEO',
    'MACHINERY_PHOTO',
    'CROP_PHOTO',
    'WORKSHOP_PHOTO',
    'CERTIFICATION',
    'PERMIT',
    'PROPERTY_OR_AUTHORIZATION',
    'DIRECT_PRODUCTION_DECLARATION'
  )),
  url text not null,
  notes text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists direct_seller_reports (
  id uuid primary key,
  seller_id uuid not null references direct_sellers(id) on delete cascade,
  product_id uuid,
  reason text not null check (reason in (
    'Falso fabricante',
    'Falso productor',
    'Producto revendido',
    'Uso de fotos ajenas',
    'Informacion de fabrica falsa',
    'Empresa inexistente',
    'Producto de terceros',
    'Certificacion falsa'
  )),
  details text,
  status text not null default 'OPEN' check (status in ('OPEN', 'IN_REVIEW', 'RESOLVED', 'REJECTED')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- Product publication services must reject anything that does not satisfy:
-- seller_type in ('PRODUCER', 'MANUFACTURER')
-- produces_directly = true
-- verification_status in ('PRODUCER_APPROVED', 'MANUFACTURER_APPROVED')
-- suspended_at is null
