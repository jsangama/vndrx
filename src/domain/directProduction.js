export const SELLER_TYPES = Object.freeze({
  PRODUCER: "PRODUCER",
  MANUFACTURER: "MANUFACTURER",
});

export const PROHIBITED_SELLER_TYPES = Object.freeze([
  "DISTRIBUTOR",
  "AUTHORIZED_DISTRIBUTOR",
  "RESELLER",
  "WHOLESALER",
  "IMPORTER",
  "BROKER",
  "MARKETER",
  "SALES_AGENT",
  "THIRD_PARTY_STORE",
]);

export const VERIFICATION_STATUSES = Object.freeze({
  REGISTRATION_STARTED: "REGISTRATION_STARTED",
  DOCUMENTS_PENDING: "DOCUMENTS_PENDING",
  IN_REVIEW: "IN_REVIEW",
  INSUFFICIENT_EVIDENCE: "INSUFFICIENT_EVIDENCE",
  VIDEO_CALL_REQUIRED: "VIDEO_CALL_REQUIRED",
  INSPECTION_REQUIRED: "INSPECTION_REQUIRED",
  PRODUCER_APPROVED: "PRODUCER_APPROVED",
  MANUFACTURER_APPROVED: "MANUFACTURER_APPROVED",
  REJECTED: "REJECTED",
  SUSPENDED: "SUSPENDED",
  VERIFICATION_EXPIRED: "VERIFICATION_EXPIRED",
});

export const APPROVED_VERIFICATION_STATUSES = Object.freeze([
  VERIFICATION_STATUSES.PRODUCER_APPROVED,
  VERIFICATION_STATUSES.MANUFACTURER_APPROVED,
]);

export const DIRECT_PRODUCTION_DECLARATION =
  "Declaro que fabrico, cultivo, crio, proceso o elaboro directamente los productos que publicare en VNDRX. No soy revendedor, distribuidor, mayorista, importador comercial ni intermediario.";

export const DIRECT_PRODUCTION_LABEL = "Vendido directamente por quien lo produce.";

export const DIRECT_MARKETPLACE_MESSAGES = Object.freeze([
  "Compra directamente de quien produce.",
  "Del productor a tus manos.",
  "Productos con origen real.",
  "Fabricantes y productores verificados.",
  "Aqui sabes quien produce lo que compras.",
  "Sin intermediarios. Sin cadenas ocultas.",
  "Descubre fabricas y productores de todo el mundo.",
  "VNDRX conecta a quienes producen con quienes compran.",
]);

export const VERIFIED_PRODUCTION_BADGES = Object.freeze([
  "Fabricante verificado por VNDRX",
  "Productor verificado por VNDRX",
  "Agricultor verificado",
  "Artesano verificado",
  "Cooperativa productora verificada",
  "Planta industrial verificada",
  "Agroindustria verificada",
  "Productor exportador",
  "Produccion sostenible",
  "Produccion artesanal",
  "Produccion local",
]);

export const SELLER_ROLES = Object.freeze([
  "Comprador",
  "Productor",
  "Fabricante",
  "Verificador",
  "Administrador",
]);

export const REPORT_REASONS = Object.freeze([
  "Falso fabricante",
  "Falso productor",
  "Producto revendido",
  "Uso de fotos ajenas",
  "Informacion de fabrica falsa",
  "Empresa inexistente",
  "Producto de terceros",
  "Certificacion falsa",
]);

export const PRODUCER_REQUIRED_FIELDS = Object.freeze([
  "legalName",
  "taxId",
  "country",
  "region",
  "city",
  "productionAddress",
  "producerType",
  "productiveActivity",
  "productsMade",
  "productionPhotos",
  "productionVideos",
  "productionCapacity",
  "yearsProducing",
  "workerCount",
  "directProductionDeclarationAccepted",
]);

export const DIRECT_CATEGORIES = Object.freeze([
  "Agricultura",
  "Frutas",
  "Verduras",
  "Granos",
  "Cafe",
  "Cacao",
  "Miel",
  "Ganaderia",
  "Avicultura",
  "Piscicultura",
  "Alimentos",
  "Bebidas",
  "Artesania",
  "Textiles",
  "Muebles",
  "Maquinaria industrial",
  "Herramientas",
  "Empaques",
  "Construccion",
  "Tecnologia",
  "Cosmetica",
  "Limpieza",
  "Agroindustria",
  "Insumos productivos",
  "Piezas fabricadas directamente",
  "Energia",
  "Automatizacion",
]);

export function isDirectSellerType(sellerType) {
  return Object.values(SELLER_TYPES).includes(sellerType);
}

export function isProhibitedSellerType(sellerType) {
  return PROHIBITED_SELLER_TYPES.includes(sellerType);
}

export function isApprovedDirectSeller(seller = {}) {
  return (
    isDirectSellerType(seller.sellerType) &&
    seller.producesDirectly === true &&
    APPROVED_VERIFICATION_STATUSES.includes(seller.verificationStatus) &&
    seller.suspended !== true
  );
}

export function validateSellerCanPublishProduct(seller = {}, product = {}) {
  const errors = [];

  if (!isDirectSellerType(seller.sellerType)) {
    errors.push("El vendedor debe ser productor o fabricante directo.");
  }

  if (isProhibitedSellerType(seller.sellerType)) {
    errors.push("VNDRX no permite distribuidores, revendedores, mayoristas, importadores ni brokers.");
  }

  if (seller.producesDirectly !== true) {
    errors.push("El vendedor debe declarar y demostrar que produce directamente.");
  }

  if (!APPROVED_VERIFICATION_STATUSES.includes(seller.verificationStatus)) {
    errors.push("El vendedor debe estar aprobado por verificacion manual.");
  }

  if (seller.suspended === true) {
    errors.push("El vendedor esta suspendido y no puede publicar productos.");
  }

  if (product.category && seller.authorizedCategories?.length && !seller.authorizedCategories.includes(product.category)) {
    errors.push("El producto no pertenece a una categoria autorizada para este productor o fabricante.");
  }

  if (product.madeBySeller === false) {
    errors.push("El producto debe ser fabricado, cultivado, criado, procesado o elaborado por el vendedor.");
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}
