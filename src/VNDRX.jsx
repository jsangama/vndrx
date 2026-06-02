import { useEffect, useRef, useState } from "react";

import promoMain from "./assets/aswa/promo-san-juanero-main.png";
import promoAlt from "./assets/aswa/promo-san-juanera-alt.png";
import promoFlayer from "./assets/aswa/promo-san-juanera-flayer.png";
import promoSanJuaneroSpecial from "./assets/aswa/promo-san-juanero-special.png";
import promoSanJuaneraSpecial from "./assets/aswa/promo-san-juanera-special.png";
import bidon20l from "./assets/aswa/bidon-san-juanero-20l-2026.png";
import bidon20lAlt from "./assets/aswa/bidon-san-juanero-20l-alt.png";
import chicha400ml from "./assets/aswa/chicha-aswa-400ml.png";
import juaneEscolar from "./assets/aswa/juane-escolar.png";
import juaneEscolarAlt from "./assets/aswa/juane-escolar-alt.png";
import comboEscolar from "./assets/aswa/combo-escolar-san-juan.png";
import comboEscolarAlt from "./assets/aswa/combo-escolar-san-juan-alt.png";
import priceSheet from "./assets/rice/precios-arroz-1.jpeg";
import yapeQr from "./assets/payment/yape-qr.jpeg";
import yapeQrNumber from "./assets/aswa/yape-qr-number.jpeg";

const theme = {
  bg: "#0F1A0E",
  bgCard: "#162014",
  bgLight: "#1E2D1B",
  gold: "#D4A017",
  goldLight: "#F0C040",
  green: "#2D6A27",
  greenLight: "#4A9E3F",
  greenDark: "#1A4018",
  cream: "#F5EDD6",
  creamDim: "#C8BC9A",
  text: "#F5EDD6",
  textDim: "#7A9474",
  border: "#253823",
};

const ASSETS = {
  promoMain,
  promoAlt,
  promoFlayer,
  promoSanJuaneroSpecial,
  promoSanJuaneraSpecial,
  bidon20l,
  bidon20lAlt,
  chicha400ml,
  juaneEscolar,
  juaneEscolarAlt,
  comboEscolar,
  comboEscolarAlt,
  priceSheet,
  yapeQr,
  yapeQrNumber,
};

const ZONES_ASWA_ESCOLAR = [
  { id: "colegio", name: "Delivery gratis a tu institución", address: "Colegios · Escuelas · Jardines — Morales, Tarapoto, La Banda", cost: 0, emoji: "🎒" },
];
const ZONES_REYLEON = [
  { id: "recojo", name: "Recojo en molino", address: "Ctra. Marginal Norte Km 9.8, Cacatachi", cost: 0, emoji: "🏭" },
  { id: "tarapoto", name: "Tarapoto", address: "Distrito de Tarapoto", cost: 0, emoji: "📍" },
  { id: "morales", name: "Morales", address: "Distrito de Morales", cost: 0, emoji: "📍" },
  { id: "banda", name: "La Banda de Shilcayo", address: "Distrito de la Banda de Shilcayo", cost: 0, emoji: "📍" },
  { id: "cacatachi", name: "Cacatachi", address: "Distrito de Cacatachi", cost: 0, emoji: "📍" },
];

const ZONES_ASWA = [
  { id: "recojo", name: "Recojo en local", address: "Morales, San Martín", cost: 0, emoji: "🏭" },
  { id: "morales", name: "Morales", address: "Aprox. 25 min", cost: 3, emoji: "📍" },
  { id: "tarapoto", name: "Tarapoto", address: "Centro y alrededores, aprox. 35 min", cost: 4, emoji: "📍" },
  { id: "banda", name: "La Banda de Shilcayo", address: "Ruta a La Banda, aprox. 45 min", cost: 5, emoji: "📍" },
  { id: "agencia", name: "Envío a agencia (nacional)", address: "Coordina recojo en agencia de transporte", cost: 10, emoji: "🚌" },
];

// COLOR por línea
const LINE_COLORS = {
  premium: { accent: "#1A4A14", badge: "#4A9E3F", label: "PREMIUM", bg: "#0F2D0A" },
  superior: { accent: "#1A2E4A", badge: "#3F7A9E", label: "SUPERIOR", bg: "#0A1D2D" },
  economico: { accent: "#4A1A14", badge: "#9E3F3F", label: "ECONÓMICO", bg: "#2D0A0A" },
  derivados: { accent: "#3A2A0A", badge: "#9E7A1A", label: "DERIVADOS", bg: "#2D1E00" },
  chicha: { accent: "#4A2800", badge: "#C47A1E", label: "CHICHA ASWA", bg: "#2D1500" },
};

const products = [
  // ── PREMIUM ──────────────────────────────────────────────
  {
    id: 1,
    name: "Arroz Extra Verde",
    subtitle: "Grano entero largo · Variedad Ferón",
    line: "premium",
    img: "🌾",
    desc: "Grano blanco, pulido, de aspecto entero y largo. Produce un arroz graneado perfecto, suave y de buena textura. Favorito en chifas, restaurantes y para el emblemático Juane amazónico.",
    quality: "Extra — 95% grano entero",
    variety: "Ferón (variedad peruana nacional)",
    tags: ["95% grano entero", "ISO 9001", "HACCP", "Ideal para Juane"],
    presentations: [
      { label: "49 kg", price: 149.00, unit: "saco" },
      { label: "24.5 kg", price: 75.50, unit: "saco" },
      { label: "10 kg", price: 32.00, unit: "bolsa" },
      { label: "5 kg", price: 16.50, unit: "bolsa" },
      { label: "1 kg", price: 3.20, unit: "bolsa" },
      { label: "750 g", price: 2.60, unit: "bolsa" },
      { label: "Pqte. 750g×18.75 kg", price: 62.50, unit: "paquete" },
      { label: "Pqte. 1kg×20 und", price: 64.50, unit: "paquete" },
      { label: "Pqte. 5kg×8 und (40kg)", price: 128.00, unit: "paquete" },
    ],
    saving: 35,
    cooking: "1¼ taza de agua por taza de arroz · Fuego medio · Reposar 5 min",
    tip: "Agrega una pizca de sal y unas gotas de aceite para más sabor.",
    zones: ZONES_REYLEON,
  },
  {
    id: 2,
    name: "Arroz Añejo Ferón",
    subtitle: "Añejado 24h · Mayor rendimiento",
    line: "premium",
    img: "⚫",
    desc: "Grano más suelto, dorado, entero y largo. Sometido a 24 horas de temperatura controlada para reducir humedad y almidón. 2 tazas rinden hasta 5 tazas cocidas — supera al arroz fresco.",
    quality: "Extra — 95% grano entero",
    variety: "Ferón (variedad peruana nacional)",
    tags: ["95% grano entero", "Añejado 24h", "2 tazas = 5 cocidas", "Mayor rendimiento"],
    presentations: [
      { label: "49 kg", price: 160.00, unit: "saco" },
      { label: "24.5 kg", price: 83.30, unit: "saco" },
      { label: "10 kg", price: 34.00, unit: "bolsa" },
      { label: "5 kg", price: 17.00, unit: "bolsa" },
      { label: "1 kg", price: 3.40, unit: "bolsa" },
      { label: "750 g", price: 2.60, unit: "bolsa" },
      { label: "Pqte. 750g×18.75 kg", price: 63.75, unit: "paquete" },
      { label: "Pqte. 1kg×20 und (20kg)", price: 68.00, unit: "paquete" },
      { label: "Pqte. 5kg×8 und (40kg)", price: 136.00, unit: "paquete" },
    ],
    saving: 38,
    cooking: "1¼ taza de agua por taza de arroz · Fuego medio",
    tip: "Agrega una pizca de sal y unas gotas de aceite para más sabor.",
    zones: ZONES_REYLEON,
  },
  {
    id: 3,
    name: "Arroz Añejo Valor",
    subtitle: "Grano dorado mediano · Variedad Valor",
    line: "premium",
    img: "🟠",
    desc: "Grano dorado, mediano, de textura suave y mayor rendimiento al cocinar. Proceso industrial de 24 horas para mejorar su calidad culinaria, graneado y rendimiento en olla.",
    quality: "Extra — 95% grano entero",
    variety: "Valor (variedad sembrada a nivel nacional)",
    tags: ["95% grano entero", "Añejado 24h", "Textura suave", "Alto rendimiento"],
    presentations: [
      { label: "49 kg", price: 144.00, unit: "saco" },
      { label: "24.5 kg", price: 73.50, unit: "saco" },
      { label: "10 kg", price: 30.00, unit: "bolsa" },
      { label: "5 kg", price: 15.60, unit: "bolsa" },
      { label: "1 kg", price: 3.10, unit: "bolsa" },
      { label: "750 g", price: 2.50, unit: "bolsa" },
      { label: "Pqte. 750g×18.75 kg", price: 60.00, unit: "paquete" },
      { label: "Pqte. 1kg×20 und", price: 63.00, unit: "paquete" },
      { label: "Pqte. 5kg×8 und (40kg)", price: 125.20, unit: "paquete" },
    ],
    saving: 36,
    cooking: "1¼ taza de agua por taza de arroz · Fuego medio",
    tip: "Agrega una pizca de sal y unas gotas de aceite para más sabor.",
    zones: ZONES_REYLEON,
  },
  // ── SUPERIOR ─────────────────────────────────────────────
  {
    id: 4,
    name: "Arroz Superior Verde",
    subtitle: "Consumo diario · 92% grano entero",
    line: "superior",
    img: "🟢",
    desc: "Grano blanco, pulido, entero, largo, partido y quebrado. Calidad estándar de consumo diario. Versátil para la comida diaria familiar. Contiene mayor proporción de granos quebrados que el Extra.",
    quality: "Superior — 92% grano entero",
    variety: "Ferón (variedad peruana nacional)",
    tags: ["92% grano entero", "Consumo diario", "Versátil", "Económico"],
    presentations: [
      { label: "49 kg", price: 144.00, unit: "saco" },
    ],
    saving: 28,
    cooking: "1½ taza de agua por taza de arroz · Fuego medio",
    tip: "Agrega una pizca de sal y unas gotas de aceite para más sabor.",
    zones: ZONES_REYLEON,
  },
  {
    id: 5,
    name: "Superior Azul (Rey León)",
    subtitle: "Alta calidad · Apto exportación · 86% grano entero",
    line: "superior",
    img: "🔵",
    desc: "Grano blanco, pulido, de aspecto entero, largo. Contiene una mayor proporción de granos quebrados o partidos. Calidad estándar de consumo diario. Arroz rendidor para el día a día a menor costo. Aprobado para exportación.",
    quality: "Superior — 86% grano entero",
    variety: "Ferón (variedad peruana nacional)",
    tags: ["86% grano entero", "Apto exportación", "Rendidor", "Precio accesible"],
    presentations: [
      { label: "49 kg", price: 134.00, unit: "saco" },
    ],
    saving: 25,
    cooking: "1 taza de agua por taza de arroz · Fuego lento",
    tip: "Agrega una pizca de sal y unas gotas de aceite para más sabor.",
    zones: ZONES_REYLEON,
  },
  {
    id: 6,
    name: "Valles del Guayo",
    subtitle: "Grano perlado · Variedad Valor · 89% grano entero",
    line: "superior",
    img: "🔴",
    desc: "Grano blanco perlado o crema, pulido, de aspecto entero, corto y quebrado, textura suave al cocinar. Calidad estándar de consumo diario. Versátil y económico para la comida diaria familiar.",
    quality: "Superior — 89% grano entero",
    variety: "Valor (variedad sembrada a nivel nacional)",
    tags: ["89% grano entero", "Grano perlado", "Textura suave", "Familiar"],
    presentations: [
      { label: "49 kg", price: 105.00, unit: "saco" },
    ],
    saving: 26,
    cooking: "1 taza de agua por taza de arroz · Fuego medio",
    tip: "Agrega una pizca de sal y unas gotas de aceite para más sabor.",
    zones: ZONES_REYLEON,
  },
  // ── ECONÓMICO ────────────────────────────────────────────
  {
    id: 7,
    name: "Integrado Rojo",
    subtitle: "Línea económica · 78% grano entero",
    line: "economico",
    img: "🔴",
    desc: "Grano blanco perlado, pulido, entero, corto, quebrado y partido. Mayor porcentaje de granos partidos. Rendimiento y graneado medio. Opción económica ideal para menús de bajo presupuesto.",
    quality: "Corriente — 78% grano entero",
    variety: "Valor (variedad sembrada a nivel nacional)",
    tags: ["78% grano entero", "Precio bajo", "Menús económicos", "Familiar"],
    presentations: [
      { label: "49 kg", price: 95.00, unit: "saco" },
    ],
    saving: 18,
    cooking: "1 taza de agua por taza de arroz · Fuego lento",
    tip: "Agrega una pizca de sal y unas gotas de aceite para más sabor.",
    zones: ZONES_REYLEON,
  },
  {
    id: 8,
    name: "Integrado Lila",
    subtitle: "Opción más económica · 67% grano entero",
    line: "economico",
    img: "🟣",
    desc: "Grano blanco perlado o crema, pulido, entero, corto, quebrado con alto porcentaje de granos partidos, textura más suave al cocinar. Rendimiento y graneado bajo. La opción más económica del catálogo.",
    quality: "Corriente — 67% grano entero",
    variety: "Valor (variedad sembrada a nivel nacional)",
    tags: ["67% grano entero", "Más económico", "Alto quebrado", "Bajo costo"],
    presentations: [
      { label: "49 kg", price: 89.00, unit: "saco" },
    ],
    saving: 15,
    cooking: "1 taza de agua por taza de arroz · Fuego medio",
    tip: "Agrega una pizca de sal y unas gotas de aceite para más sabor.",
    zones: ZONES_REYLEON,
  },
  // ── DERIVADOS ────────────────────────────────────────────
  {
    id: 9,
    name: "Arroz 3/4",
    subtitle: "Granos partidos · Uso culinario e industrial",
    line: "derivados",
    img: "🫙",
    desc: "Granos partidos, tres cuartas partes del tamaño de un grano entero. Textura melosa al cocinar. Absorbe agua rápido, libera almidón. Útil para sopas, caldos, postres y alimentos procesados. Muy usado en dieta de cerdos y aves.",
    quality: "Media-baja (2/3)",
    variety: "Valor y Ferón",
    tags: ["Sopas y caldos", "Alimentación animal", "Postres", "Industrial"],
    presentations: [
      { label: "50 kg", price: 63.00, unit: "saco" },
    ],
    saving: 0,
    cooking: "Absorbe agua rápidamente — ideal cocción lenta",
    tip: "Excelente para mazamorras y postres tradicionales.",
    zones: ZONES_REYLEON,
  },
  {
    id: 10,
    name: "Arrocillo",
    subtitle: "Quebrado fino · Cervecería · Alimentación animal",
    line: "derivados",
    img: "🌾",
    desc: "Granos partidos pequeños con alto porcentaje de quebrados. Textura pegajosa al cocinar. Ideal como adjunto para cervezas tipo Lager y Pilsner: perfil sabor limpio, claridad de filtrado, cuerpo ligero. Alto rendimiento en azúcares fermentables.",
    quality: "Baja a descarte (4 a más)",
    variety: "Valor y Ferón",
    tags: ["Cervecería Lager/Pilsner", "Snacks confitados", "Alimentación animal", "Industrial"],
    presentations: [
      { label: "50 kg", price: 63.00, unit: "saco" },
    ],
    saving: 0,
    cooking: "Uso industrial — cervecería y alimentos procesados",
    tip: "Aporte de sabor limpio y refrescante en cervezas artesanales.",
    zones: ZONES_REYLEON,
  },
  {
    id: 11,
    name: "Afrecho (Salvado)",
    subtitle: "Capa externa del grano · Subproducto nutritivo",
    line: "derivados",
    img: "🟤",
    desc: "Conocido como salvado o semolina. Capa externa del grano, polvo fino con pequeñas partículas de grano. Color crema-amarillento a marrón claro. Olor dulce y fresco. Alto contenido de grasa (lípidos). El subproducto más nutritivo del pilado.",
    quality: "Baja a descarte (4 a más)",
    variety: "Valor y Ferón",
    tags: ["Alimentación animal", "Extracción de aceite", "Panadería integral", "Suplementos"],
    presentations: [
      { label: "50 kg", price: 26.00, unit: "saco" },
    ],
    saving: 0,
    cooking: "Uso industrial y animal — no requiere cocción",
    tip: "El subproducto más nutritivo del proceso de pilado.",
    zones: ZONES_REYLEON,
  },
  {
    id: 12,
    name: "Polvillo Fino",
    subtitle: "Fibra Bruta <4% · Ganadería y avicultura",
    line: "derivados",
    img: "🟡",
    desc: "Partículas finas del endospermo (tejido nutritivo de la semilla). Mayor proporción de salvado, germen y capas internas. Polvo fino harinoso, color beige claro a marrón. Aroma característico a arroz. Alto contenido de grasas saludables, almidones y fibra.",
    quality: "Alta · FB <4% · Polvillo fino",
    variety: "Valor y Ferón",
    tags: ["FB <4%", "Ganadería porcina", "Avicultura", "Alimentos concentrados"],
    presentations: [
      { label: "30 kg", price: 27.00, unit: "saco" },
    ],
    saving: 0,
    cooking: "Uso en alimentación animal e industria",
    tip: "Ideal para dietas de cerdos, ganados, cuyes y aves en granjas.",
    zones: ZONES_REYLEON,
  },
  {
    id: 13,
    name: "Polvillo Grueso",
    subtitle: "Fibra Bruta 4–11% · Ganadería y avicultura",
    line: "derivados",
    img: "🟤",
    desc: "Partículas finas del endospermo con mayor proporción de salvado, germen y capas internas. Mayor contenido de fibra bruta. Polvo fino harinoso, color beige claro. Excelente para fabricación de alimentos concentrados en la industria ganadera, porcina y avícola.",
    quality: "Media · FB 4%–11% · Polvillo grueso",
    variety: "Valor y Ferón",
    tags: ["FB 4–11%", "Ganadería", "Avicultura", "Alimentos concentrados"],
    presentations: [
      { label: "30 kg", price: 26.00, unit: "saco" },
    ],
    saving: 0,
    cooking: "Uso en alimentación animal e industria",
    tip: "Complemento energético para dietas de engorde y crecimiento.",
    zones: ZONES_REYLEON,
  },
  {
    id: 14,
    name: "Cascarilla Prensada",
    subtitle: "Fibra de sílice · Agroindustria y biocombustible",
    line: "derivados",
    img: "🌿",
    desc: "Cascarilla de arroz obtenida del proceso de trilla. Material inerte seco, fibra pura de lenta descomposición, rico en sílice. Amarillento, muy ligero y poroso. Compactado en pacas de alta densidad para optimizar transporte y almacenamiento.",
    quality: "100% biodegradable y libre de químicos",
    variety: "Valor y Ferón",
    tags: ["Agricultura y viveros", "Biocombustible", "Crianza de animales", "Conservación de pescado"],
    presentations: [
      { label: "Paca grande 50 kg", price: 18.00, unit: "paca" },
      { label: "Paca pequeña 30 kg", price: 13.00, unit: "paca" },
    ],
    saving: 0,
    cooking: "Uso agroindustrial — no comestible",
    tip: "Excelente como mulch para arándanos, membrillos y flores.",
    zones: ZONES_REYLEON,
  },
  // ── ASWA - LA RICA CHICHA ─────────────────────────────────────────────────
  {
    id: 15,
    name: "Chicha ASWA",
    subtitle: "La Rica Chicha · Hecha con maíz San Martinense",
    line: "chicha",
    supplier: "ASWA La Rica Chicha",
    img: "🌽",
    desc: "Chicha artesanal hecha con maíz San Martinense de la selva peruana. 100% natural, sin conservantes ni colorantes artificiales. Sabor único, tradición que perdura. Producida por Sangama Inversiones S.A.C. en Morales, San Martín.",
    quality: "Artesanal · 100% natural",
    variety: "Maíz San Martinense",
    tags: ["100% natural", "Sin conservantes", "Sin colorantes", "Maíz San Martinense"],
    minOrder: 15,
    minOrderNote: "Precio escolar válido desde 15 unidades por presentación",
    schoolOnly: true,
    presentations: [
      { label: "Botella 400 ml", price: 2.00, unit: "botella" },
      { label: "Botella 2 L", price: 9.00, unit: "botella" },
      { label: "Botella 3 L", price: 13.00, unit: "botella" },
      { label: "Galón 4 L", price: 15.00, unit: "galón" },
    ],
    saving: 40,
    cooking: "Consumir fría · Refrigerar antes del consumo · Dura 5 días refrigerada",
    tip: "Una vez abierta, consúmela en 2–3 días para mejor sabor.",
    zones: ZONES_ASWA_ESCOLAR,
  },
  {
    id: 16,
    name: "🎉 Bidón Sanjuanero ASWA 20L",
    subtitle: "Promoción San Juan 2026 · Desde 1 unidad",
    line: "chicha",
    supplier: "ASWA La Rica Chicha",
    img: "🪣",
    desc: "Bidón sanjuanero de 20 litros de chicha artesanal. Edición especial Fiestas de San Juan 2026. Ideal para obras, cuadrillas, familias y reuniones grandes. Hecha con maíz San Martinense, 100% natural. Disponible desde 1 unidad.",
    quality: "Artesanal · Edición Sanjuanera 2026",
    variety: "Maíz San Martinense",
    tags: ["20 litros", "San Juan 2026", "Desde 1 unidad", "Sin mínimo"],
    minOrder: 1,
    minOrderNote: "Sin pedido mínimo — desde 1 bidón",
    schoolOnly: false,
    presentations: [
      { label: "Recarga (ya tengo bidón)", price: 50.00, unit: "bidón" },
      { label: "Con bidón nuevo", price: 70.00, unit: "bidón" },
    ],
    saving: 0,
    cooking: "Consumir fría · Gran capacidad para fiestas y eventos",
    tip: "Si ya tienes tu bidón vacío, entrégalo al recibir y paga solo S/ 50.00.",
    zones: ZONES_ASWA,
  },
  {
    id: 17,
    name: "🎉 Combo Escolar Sanjuanero",
    subtitle: "Juane + Chicha 400ml · Mín. 15 combos",
    line: "chicha",
    supplier: "ASWA La Rica Chicha",
    img: "🌿",
    desc: "Combo especial de Fiestas de San Juan: un delicioso Juane Escolar más una chicha ASWA de 400ml. Exclusivo para instituciones educativas. Precio promocional por San Juan 2026.",
    quality: "Artesanal · Promoción San Juan 2026",
    variety: "Maíz San Martinense",
    tags: ["Juane + Chicha", "Solo instituciones", "Mín. 15 combos", "Delivery gratis"],
    minOrder: 15,
    minOrderNote: "Precio válido desde 15 combos",
    schoolOnly: true,
    presentations: [
      { label: "Combo (Juane + 400ml)", price: 3.50, unit: "combo" },
    ],
    saving: 30,
    cooking: "Chicha fría + Juane a temperatura ambiente · ¡Listo para disfrutar!",
    tip: "El combo perfecto para las fiestas de San Juan. ¡Tradición amazónica en un solo pedido!",
    zones: ZONES_ASWA_ESCOLAR,
  },
  {
    id: 18,
    name: "🎉 Juane Escolar ASWA",
    subtitle: "Promo San Juan 2026 · Mín. 15 unidades",
    line: "chicha",
    supplier: "ASWA La Rica Chicha",
    img: "🌿",
    desc: "El delicioso Juane escolar, el plato emblemático de las Fiestas de San Juan en la Amazonía peruana. Exclusivo para colegios, escuelas y jardines. Precio especial de temporada San Juan 2026.",
    quality: "Artesanal · Plato típico amazónico",
    variety: "Receta tradicional San Martinense",
    tags: ["San Juan 2026", "Solo instituciones", "Mín. 15 unidades", "Delivery gratis"],
    minOrder: 15,
    minOrderNote: "Precio válido desde 15 juanes",
    schoolOnly: true,
    presentations: [
      { label: "Juane unitario", price: 2.00, unit: "juane" },
    ],
    saving: 0,
    cooking: "Servir a temperatura ambiente · Acompañar con chicha ASWA fría",
    tip: "¡Combínalo con una chicha ASWA para la experiencia sanjuanera completa!",
    zones: ZONES_ASWA_ESCOLAR,
  },
];

const LINE_LABELS = {
  all: "Todos",
  premium: "Premium",
  superior: "Superior",
  economico: "Económico",
  derivados: "Derivados",
  chicha: "Chicha ASWA",
};

const SUPPLIERS = {
  reyleon: {
    key: "reyleon",
    name: "Piladora Rey León",
    shortName: "Rey León",
    phone: "51952232028",
    displayPhone: "952 232 028",
    email: "ventas@reyleon.pe",
    site: "arrozpacifico.com",
  },
  aswa: {
    key: "aswa",
    name: "ASWA La Rica Chicha",
    shortName: "ASWA",
    phone: "51986445531",
    displayPhone: "986 445 531",
    instagram: "@aswa.laricachicha",
  },
};

const ORDER_PHONE = "51955273229";
const ORDER_PHONE_DISPLAY = "955 273 229";
const ASWA_PROMO_LIBRARY = [
  {
    id: "main-flyer",
    src: ASSETS.promoMain,
    title: "Promociones sanjuaneras 2026",
    subtitle: "Flyer principal listo para compartir",
    note: "DESTACADO",
    accent: theme.goldLight,
    featured: true,
    message: "Promociones Sanjuaneras 2026: bidon 20L, combo escolar, chicha ASWA y juanes escolares. Pedidos al 955 273 229.",
  },
  {
    id: "san-juanero-special",
    src: ASSETS.promoSanJuaneroSpecial,
    title: "Promocion San Juanero",
    subtitle: "Arte principal alterno",
    note: "ARTE",
    accent: theme.greenLight,
    featured: true,
    message: "Promocion San Juanero 2026: material listo para vender en temporada. Pedidos al 955 273 229.",
  },
  {
    id: "san-juanera-special",
    src: ASSETS.promoSanJuaneraSpecial,
    title: "Promocion San Juanera",
    subtitle: "Version con enfoque de temporada",
    note: "NUEVO",
    accent: "#F59E0B",
    featured: true,
    message: "Promocion San Juanera 2026: comparte este arte y recibe pedidos por WhatsApp al 955 273 229.",
  },
  {
    id: "bidon-20l",
    src: ASSETS.bidon20l,
    title: "Bidon sanjuanero 20L",
    subtitle: "S/ 50 recarga o S/ 70 con bidon nuevo",
    note: "SAN JUAN",
    accent: "#F0C040",
    featured: true,
    message: "Bidon sanjuanero ASWA de 20 litros desde S/ 50.00 con recarga y S/ 70.00 con bidon nuevo. Pedidos al 955 273 229.",
  },
  {
    id: "combo-escolar",
    src: ASSETS.comboEscolar,
    title: "Combo escolar sanjuanero",
    subtitle: "Juane + chicha 400 ml",
    note: "ESCOLAR",
    accent: "#22C55E",
    featured: true,
    message: "Combo escolar sanjuanero: juane + chicha de 400 ml por S/ 3.50. Ideal para instituciones educativas. Pedidos al 955 273 229.",
  },
  {
    id: "chicha-400ml",
    src: ASSETS.chicha400ml,
    title: "Chicha ASWA 400 ml",
    subtitle: "Desde S/ 2.00",
    note: "ASWA",
    accent: "#4ADE80",
    featured: true,
    message: "Chicha ASWA 400 ml desde S/ 2.00. 100% natural y lista para vender. Pedidos al 955 273 229.",
  },
  {
    id: "juane-escolar",
    src: ASSETS.juaneEscolar,
    title: "Juane escolar",
    subtitle: "Desde S/ 2.00",
    note: "MENU",
    accent: "#F97316",
    featured: false,
    message: "Juane escolar ASWA desde S/ 2.00. Tradicion amazonica lista para colegios y pedidos grandes. Pedidos al 955 273 229.",
  },
  {
    id: "combo-alt",
    src: ASSETS.comboEscolarAlt,
    title: "Combo escolar alterno",
    subtitle: "Version visual para redes",
    note: "REDES",
    accent: "#84CC16",
    featured: false,
    message: "Combo escolar sanjuanero: juane + chicha de 400 ml. Comparte este arte en redes y cierra pedidos al 955 273 229.",
  },
  {
    id: "juane-alt",
    src: ASSETS.juaneEscolarAlt,
    title: "Juane escolar 1.5",
    subtitle: "Arte alterno para temporada",
    note: "PROMO",
    accent: "#A3E635",
    featured: false,
    message: "Juane escolar ASWA listo para temporadas y pedidos grandes. Pedidos al 955 273 229.",
  },
  {
    id: "bidon-alt",
    src: ASSETS.bidon20lAlt,
    title: "Bidon 20L alterno",
    subtitle: "Otra version del bidon sanjuanero",
    note: "2026",
    accent: "#FDBA74",
    featured: false,
    message: "Bidon sanjuanero 20L ASWA edicion 2026. Pide por WhatsApp al 955 273 229.",
  },
  {
    id: "yape-number",
    src: ASSETS.yapeQrNumber,
    title: "Yape con numero",
    subtitle: "918 429 034 - Noyolith Quine Rojas",
    note: "PAGO",
    accent: "#8B5CF6",
    featured: true,
    message: "Paga con Yape al 918 429 034. Nombre: Noyolith Quine Rojas. Confirma tu pago y haz tu pedido al 955 273 229.",
  },
  {
    id: "price-sheet",
    src: ASSETS.priceSheet,
    title: "Precios del arroz",
    subtitle: "Consulta rapida de la lista comercial",
    note: "LISTA",
    accent: "#D97706",
    featured: false,
    message: "Consulta la lista de precios del arroz y pide directo al molino. Pedidos al 955 273 229.",
  },
];
const STORAGE_KEYS = {
  profile: "vndrx-profile-v2",
  orders: "vndrx-orders-v2",
  reviews: "vndrx-reviews-v2",
};

const DEFAULT_PROFILE = {
  name: "",
  phone: "",
  district: "",
  address: "",
  reference: "",
  notes: "",
  referralCode: "",
  referredBy: "",
  shareCount: 0,
};

function loadStoredState(key, fallback) {
  if (typeof window === "undefined") return typeof fallback === "function" ? fallback() : fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return typeof fallback === "function" ? fallback() : fallback;
    return JSON.parse(raw);
  } catch {
    return typeof fallback === "function" ? fallback() : fallback;
  }
}

function usePersistentState(key, fallback) {
  const [value, setValue] = useState(() => loadStoredState(key, fallback));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be unavailable in private contexts.
    }
  }, [key, value]);

  return [value, setValue];
}

function makeReferralCode() {
  return `ASWA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function getShareUrl(code) {
  if (typeof window === "undefined") return "";
  const current = window.location?.href?.split("#")[0]?.split("?")[0] || "";
  if (!current) return "";
  return `${current}?ref=${encodeURIComponent(code)}`;
}

function formatDateTime(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString("es-PE", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return String(value);
  }
}

function calcBonusPoints(total) {
  return Math.max(1, Math.round(total / 12));
}

function getBonusTier(points) {
  if (points >= 70) return { name: "Diamante", color: "#A78BFA", next: 0 };
  if (points >= 40) return { name: "Oro", color: "#F0C040", next: 70 - points };
  if (points >= 20) return { name: "Plata", color: "#93C5FD", next: 40 - points };
  return { name: "Bronce", color: "#F59E0B", next: 20 - points };
}

function formatMoney(amount) {
  return `S/ ${amount.toFixed(2)}`;
}

function getSupplierKey(product) {
  if (product.supplier?.toLowerCase().includes("aswa")) return "aswa";
  return product.line === "chicha" ? "aswa" : "reyleon";
}

function getSupplier(product) {
  return SUPPLIERS[getSupplierKey(product)];
}

const PRODUCT_MEDIA = {
  15: ASSETS.chicha400ml,
  16: ASSETS.bidon20l,
  17: ASSETS.comboEscolar,
  18: ASSETS.juaneEscolar,
};

function getProductMedia(product) {
  return PRODUCT_MEDIA[product.id] || null;
}

function groupCartBySupplier(cart) {
  return Object.values(
    cart.reduce((acc, item) => {
      const key = getSupplierKey(item.product);
      if (!acc[key]) {
        acc[key] = {
          supplier: SUPPLIERS[key],
          items: [],
        };
      }
      acc[key].items.push(item);
      return acc;
    }, {}),
  );
}

function buildOrderMessage({ supplier, items, customer, payment, extras = {} }) {
  const subtotal = items.reduce((a, i) => a + i.pres.price * i.qty, 0);
  const delivery = items.reduce((a, i) => a + (i.zone?.cost || 0), 0);
  const total = subtotal + delivery;
  const lines = [
    `Hola, quiero hacer un pedido en ${supplier.name}.`,
    "",
    `Nombre: ${customer.name}`,
    `Teléfono: ${customer.phone}`,
    customer.district ? `Zona / distrito: ${customer.district}` : null,
    customer.address ? `Dirección: ${customer.address}` : null,
    customer.reference ? `Referencia: ${customer.reference}` : null,
    customer.notes ? `Notas: ${customer.notes}` : null,
    customer.referralCode ? `Mi código: ${customer.referralCode}` : null,
    customer.referredBy ? `Referido por: ${customer.referredBy}` : null,
    extras.gps?.label ? `Ubicación GPS: ${extras.gps.label}` : null,
    extras.gps?.url ? `Mapa: ${extras.gps.url}` : null,
    extras.gift?.enabled ? "Pedido como regalo" : null,
    extras.gift?.relation ? `Relación: ${extras.gift.relation}` : null,
    extras.gift?.recipient ? `Recibe: ${extras.gift.recipient}` : null,
    extras.gift?.phone ? `Telefono del regalo: ${extras.gift.phone}` : null,
    extras.gift?.message ? `Tarjeta: ${extras.gift.message}` : null,
    extras.fulfillmentMode ? `Modalidad: ${extras.fulfillmentMode}` : null,
    extras.reservation?.enabled ? `Reserva: ${extras.reservation.date} ${extras.reservation.time}` : null,
    extras.reservation?.mode ? `Entrega: ${extras.reservation.mode}` : null,
    extras.reservation?.note ? `Nota de reserva: ${extras.reservation.note}` : null,
    "",
    `Pago: ${payment}`,
    "",
    "Pedido:",
    ...items.map((item) => {
      const itemTotal = item.pres.price * item.qty + (item.zone?.cost || 0);
      return `- ${item.qty} x ${item.product.name} (${item.pres.label}) | ${item.zone?.name || "Sin zona"} | ${formatMoney(itemTotal)}`;
    }),
    "",
    `Subtotal: ${formatMoney(subtotal)}`,
    `Delivery: ${formatMoney(delivery)}`,
    `Total: ${formatMoney(total)}`,
    "",
    "Quedo atento para confirmar el pedido.",
  ];

  return lines.filter(Boolean).join("\n");
}

function paymentLabel(value) {
  if (value === "yape") return "Yape";
  if (value === "plin") return "Plin";
  if (value === "bim") return "BIM";
  if (value === "agora") return "Agora";
  if (value === "bbva") return "Transferencia BBVA";
  if (value === "bcp") return "Transferencia BCP";
  if (value === "card") return "Tarjeta / online";
  return "Pago contra entrega";
}

function createOrderRecord({ supplier, items, customer, payment, extras }) {
  const subtotal = items.reduce((a, i) => a + i.pres.price * i.qty, 0);
  const delivery = items.reduce((a, i) => a + (i.zone?.cost || 0), 0);
  const total = subtotal + delivery;
  return {
    id: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    supplierKey: supplier.key,
    supplierName: supplier.name,
    items,
    customer,
    payment,
    paymentLabel: paymentLabel(payment),
    extras,
    subtotal,
    delivery,
    total,
    bonusEarned: calcBonusPoints(total),
    status: "pendiente",
    channel: "whatsapp",
  };
}

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function Badge({ text, color }) {
  return (
    <span style={{
      background: color + "22", color, border: `1px solid ${color}55`,
      borderRadius: 4, fontSize: 10, fontWeight: 800, padding: "2px 8px",
      letterSpacing: 1.5, fontFamily: "monospace", whiteSpace: "nowrap",
    }}>{text}</span>
  );
}

function CertBadge({ cert }) {
  return (
    <span style={{
      background: "#0A2010", border: `1px solid ${theme.green}55`,
      color: theme.greenLight, borderRadius: 4, fontSize: 10,
      fontWeight: 700, padding: "2px 7px", letterSpacing: 1,
    }}>{cert}</span>
  );
}

function ProductAvatar({ product, size = 52, radius = 14 }) {
  const media = getProductMedia(product);
  const boxStyle = {
    width: size,
    height: size,
    borderRadius: radius,
    overflow: "hidden",
    flexShrink: 0,
    background: theme.bg,
    border: `1px solid ${theme.border}`,
    boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
  };

  if (media) {
    return (
      <div style={boxStyle}>
        <img
          src={media}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div style={{ ...boxStyle, display: "flex", alignItems: "center", justifyContent: "center", fontSize: Math.round(size * 0.54), lineHeight: 1 }}>
      {product.img}
    </div>
  );
}

function PromoTile({ image, title, subtitle, note, accent, fit = "cover", aspectRatio = "4 / 5", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        padding: 0,
        border: `1px solid ${theme.border}`,
        borderRadius: 18,
        overflow: "hidden",
        background: theme.bgCard,
        color: theme.cream,
        cursor: "pointer",
        textAlign: "left",
        boxShadow: "0 18px 30px rgba(0,0,0,0.22)",
      }}
    >
      <div style={{ position: "relative", aspectRatio, background: `linear-gradient(135deg, ${accent}22, ${theme.bg})`, overflow: "hidden" }}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: fit,
            display: "block",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.58) 100%)" }} />
        {note && (
          <span style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: accent,
            color: "#0F1A0E",
            borderRadius: 999,
            padding: "4px 10px",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 0.8,
          }}>
            {note}
          </span>
        )}
      </div>
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 800, lineHeight: 1.2, marginBottom: 4 }}>{title}</div>
        <div style={{ color: theme.creamDim, fontSize: 12, lineHeight: 1.45 }}>{subtitle}</div>
      </div>
    </button>
  );
}

function PromoBoard() {
  const openAsset = (src) => window.open(src, "_blank", "noopener,noreferrer");
  const openWhatsApp = () => window.open(`https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent("Hola, quiero hacer un pedido.")}`, "_blank", "noopener,noreferrer");

  return (
    <section style={{ maxWidth: 1200, margin: "18px auto 0", padding: "0 20px" }}>
      <div style={{
        background: `radial-gradient(circle at top left, #21331B 0%, #121D10 42%, ${theme.bgCard} 100%)`,
        border: `1px solid ${theme.border}`,
        borderRadius: 24,
        padding: 18,
        boxShadow: "0 28px 60px rgba(0,0,0,0.28)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", gap: 18, alignItems: "stretch" }}>
          <button
            type="button"
            onClick={() => openAsset(ASSETS.promoMain)}
            style={{
              padding: 0,
              border: `1px solid ${theme.border}`,
              borderRadius: 22,
              overflow: "hidden",
              cursor: "pointer",
              background: "#0D150C",
              position: "relative",
              boxShadow: "0 18px 28px rgba(0,0,0,0.24)",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "2 / 3", minHeight: 560 }}>
              <img
                src={ASSETS.promoMain}
                alt="Promoción San Juanero 2026"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,18,11,0.12) 0%, rgba(11,18,11,0.22) 28%, rgba(11,18,11,0.66) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <Badge text="TEMPORADA SAN JUAN 2026" color={theme.goldLight} />
                  <Badge text="LISTO PARA VENDER" color={theme.greenLight} />
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: -0.6, maxWidth: 420, textShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
                    Promociones reales para vender hoy
                  </div>
                  <div style={{ color: "#F7EED0", fontSize: 14, lineHeight: 1.7, marginTop: 10, maxWidth: 440 }}>
                    Chicha ASWA, juane escolar y bidón sanjuanero con precios claros, foto real y pago por Yape.
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                    {["100% natural", "Delivery a instituciones", "Pide por WhatsApp"].map((chip) => (
                      <span key={chip} style={{ background: "#0F1A0ECC", color: "#fff", border: "1px solid #FFFFFF22", borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 700 }}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </button>

          <div style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
              <PromoTile
                image={ASSETS.yapeQr}
                title="Paga con Yape"
                subtitle="918 429 034 · Noyolith Quine Rojas"
                note="ESCANEA"
                accent="#8B5CF6"
                fit="contain"
                aspectRatio="3 / 4"
                onClick={() => openAsset(ASSETS.yapeQr)}
              />
              <PromoTile
                image={ASSETS.priceSheet}
                title="Precios del arroz"
                subtitle="Tabla actualizada para consulta rápida"
                note="MAYORISTA"
                accent="#D97706"
                fit="cover"
                aspectRatio="3 / 4"
                onClick={() => openAsset(ASSETS.priceSheet)}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
              <PromoTile
                image={ASSETS.bidon20l}
                title="Bidón 20L"
                subtitle="S/ 50 con recarga"
                note="SAN JUAN"
                accent="#F0C040"
                fit="contain"
                aspectRatio="1 / 1.1"
                onClick={() => openAsset(ASSETS.bidon20l)}
              />
              <PromoTile
                image={ASSETS.chicha400ml}
                title="Chicha 400 ml"
                subtitle="Desde S/ 2.00"
                note="ASWA"
                accent="#22C55E"
                fit="contain"
                aspectRatio="1 / 1.1"
                onClick={() => openAsset(ASSETS.chicha400ml)}
              />
              <PromoTile
                image={ASSETS.juaneEscolar}
                title="Juane escolar"
                subtitle="Desde S/ 2.00"
                note="ESCOLAR"
                accent="#F59E0B"
                fit="contain"
                aspectRatio="1 / 1.1"
                onClick={() => openAsset(ASSETS.juaneEscolar)}
              />
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${theme.bgLight}, ${theme.bgCard})`,
              border: `1px solid ${theme.border}`,
              borderRadius: 18,
              padding: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
            }}>
              <div style={{ minWidth: 240 }}>
                <div style={{ color: theme.goldLight, fontSize: 13, fontWeight: 800, letterSpacing: 1, marginBottom: 5 }}>LISTA REAL PARA VENDER</div>
                <div style={{ color: theme.cream, fontSize: 15, fontWeight: 700, lineHeight: 1.45 }}>
                  Abre el QR de Yape, revisa precios y manda el pedido sin salir de la tienda.
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  style={{
                    background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`,
                    border: "none",
                    borderRadius: 12,
                    color: "#0F1A0E",
                    padding: "11px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  Pedir ASWA
                </button>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                  style={{
                    background: theme.bg,
                    border: `1px solid ${theme.border}`,
                    borderRadius: 12,
                    color: theme.cream,
                    padding: "11px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Ver catálogo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {[
            { src: ASSETS.promoMain, label: "Flyer principal" },
            { src: ASSETS.promoAlt, label: "Flyer alterno" },
            { src: ASSETS.promoFlayer, label: "Flyer ASWA" },
          ].map((asset) => (
            <button
              key={asset.label}
              type="button"
              onClick={() => openAsset(asset.src)}
              style={{
                padding: 0,
                border: `1px solid ${theme.border}`,
                borderRadius: 16,
                overflow: "hidden",
                background: theme.bg,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
                <img
                  src={asset.src}
                  alt={asset.label}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ padding: "10px 12px", color: theme.cream, fontSize: 12, fontWeight: 700 }}>
                {asset.label}
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 12 }}>
            <div>
              <div style={{ color: theme.goldLight, fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>Kit para compartir</div>
              <div style={{ color: theme.cream, fontSize: 15, fontWeight: 700, marginTop: 4 }}>Promociones y fotos listas para abrir o enviar</div>
            </div>
            <div style={{ color: theme.textDim, fontSize: 12 }}>Toca una tarjeta para verla completa.</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            {ASWA_PROMO_LIBRARY.filter((asset) => asset.featured).map((asset) => (
              <PromoTile
                key={asset.id}
                image={asset.src}
                title={asset.title}
                subtitle={asset.subtitle}
                note={asset.note}
                accent={asset.accent}
                fit="contain"
                aspectRatio="1 / 1.08"
                onClick={() => openAsset(asset.src)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HubMetric({ label, value, hint, color = theme.goldLight }) {
  return (
    <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 14, minHeight: 84 }}>
      <div style={{ color: theme.textDim, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
      <div style={{ color, fontSize: 20, fontWeight: 900, marginTop: 6, lineHeight: 1.1 }}>{value}</div>
      {hint && <div style={{ color: theme.creamDim, fontSize: 11, marginTop: 4, lineHeight: 1.45 }}>{hint}</div>}
    </div>
  );
}

function HubChip({ active, label, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: `1px solid ${active ? theme.goldLight : theme.border}`,
        background: active ? "rgba(240,192,64,0.12)" : theme.bg,
        color: active ? theme.goldLight : theme.creamDim,
        borderRadius: 999,
        padding: "8px 12px",
        fontSize: 11,
        fontWeight: 800,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 7,
        whiteSpace: "nowrap",
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function HubSection({ title, subtitle, children }) {
  return (
    <section style={{ background: theme.bgLight, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16 }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ color: theme.cream, fontSize: 15, fontWeight: 900 }}>{title}</div>
        {subtitle && <div style={{ color: theme.textDim, fontSize: 11, lineHeight: 1.45, marginTop: 4 }}>{subtitle}</div>}
      </div>
      {children}
    </section>
  );
}

function ASWAControlHub({
  open,
  tab,
  onClose,
  onTabChange,
  data,
  actions,
}) {
  const [tutorialStep, setTutorialStep] = useState(0);
  const [panelFilter, setPanelFilter] = useState("all");
  if (!open) return null;

  const tabs = [
    { id: "tutorial", label: "Tutorial", icon: "🎓" },
    { id: "referidos", label: "Referidos", icon: "🤝" },
    { id: "bonos", label: "Bonos", icon: "🏅" },
    { id: "gps", label: "GPS", icon: "📍" },
    { id: "historial", label: "Historial", icon: "🕘" },
    { id: "soporte", label: "Soporte", icon: "💬" },
    { id: "promos", label: "Promos", icon: "🎨" },
    { id: "panel", label: "Panel", icon: "🛠️" },
    { id: "install", label: "Instalar", icon: "⬇️" },
  ];

  const tutorialSteps = [
    {
      title: "Abre la tienda",
      text: "Empieza mirando los productos y usa el buscador para encontrar lo que necesitas.",
      action: "Ver catalogo",
    },
    {
      title: "Elige tu pedido",
      text: "Agrega al carrito, ajusta cantidades y selecciona delivery, regalo o reserva.",
      action: "Ir al carrito",
    },
    {
      title: "Completa tus datos",
      text: "Pon nombre, telefono, direccion y metodo de pago para que el pedido salga listo.",
      action: "Abrir checkout",
    },
    {
      title: "Envialo por WhatsApp",
      text: "La tienda arma el mensaje completo y lo envia al numero de pedidos centralizado.",
      action: "Pedir ahora",
    },
  ];

  const activeTutorial = tutorialSteps[tutorialStep] || tutorialSteps[0];
  const tutorialActions = [
    actions.goCatalog,
    actions.openCart,
    actions.openCart,
    actions.quickOrder,
  ];
  const bonusTierLabel = getBonusTier(data.bonusPoints);
  const nextMilestone = bonusTierLabel.next || 0;
  const avgRating = data.reviews.length
    ? (data.reviews.reduce((sum, item) => sum + item.stars, 0) / data.reviews.length).toFixed(1)
    : "0.0";
  const statusFlow = ["pendiente", "confirmado", "preparando", "en ruta", "entregado"];
  const panelFilters = [
    { id: "all", label: "Todos" },
    { id: "pendiente", label: "Pendientes" },
    { id: "confirmado", label: "Confirmados" },
    { id: "preparando", label: "Preparando" },
    { id: "en ruta", label: "En ruta" },
    { id: "entregado", label: "Entregados" },
    { id: "aswa", label: "ASWA" },
    { id: "reyleon", label: "Rey León" },
  ];
  const filteredPanelOrders = data.orders.filter((order) => {
    if (panelFilter === "all") return true;
    if (panelFilter === "aswa") return order.supplierKey === "aswa";
    if (panelFilter === "reyleon") return order.supplierKey === "reyleon";
    return (order.status || "pendiente") === panelFilter;
  });
  const topProduct = Object.values(
    data.orders.reduce((acc, order) => {
      order.items.forEach((item) => {
        const key = `${item.product.id}-${item.pres.label}`;
        if (!acc[key]) {
          acc[key] = {
            name: item.product.name,
            label: item.pres.label,
            qty: 0,
            total: 0,
          };
        }
        acc[key].qty += item.qty;
        acc[key].total += item.qty * item.pres.price;
      });
      return acc;
    }, {}),
  ).sort((a, b) => b.qty - a.qty)[0];

  const cycleOrderStatus = (order) => {
    const index = statusFlow.indexOf(order.status || "pendiente");
    const next = statusFlow[(index + 1) % statusFlow.length];
    actions.cycleOrderStatus(order.id, next);
  };

  const gridActions = {
    tutorial: (
      <HubSection title="Guia rapida" subtitle="Mira como usar la tienda sin perder tiempo.">
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ position: "relative", background: "linear-gradient(135deg, #10240d, #08110a)", border: `1px solid ${theme.border}`, borderRadius: 16, padding: 18, minHeight: 220, textAlign: "center" }}>
            <div style={{ position: "absolute", top: 12, left: 12, width: 24, height: 24, borderRadius: 999, background: theme.goldLight, color: "#0F1A0E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900 }}>{tutorialStep + 1}</div>
            <div style={{ fontSize: 52, marginTop: 8 }}>{["🛒", "📦", "🧾", "📲"][tutorialStep]}</div>
            <div style={{ color: theme.cream, fontSize: 18, fontWeight: 900, marginTop: 8 }}>{activeTutorial.title}</div>
            <div style={{ color: theme.creamDim, fontSize: 12, lineHeight: 1.55, marginTop: 8 }}>{activeTutorial.text}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
              <button type="button" onClick={() => setTutorialStep((s) => Math.max(0, s - 1))} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, color: theme.cream, borderRadius: 12, padding: "9px 12px", cursor: "pointer", fontWeight: 700 }}>Anterior</button>
              <button type="button" onClick={() => setTutorialStep((s) => Math.min(tutorialSteps.length - 1, s + 1))} style={{ background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`, border: "none", color: "#0F1A0E", borderRadius: 12, padding: "9px 12px", cursor: "pointer", fontWeight: 800 }}>{tutorialStep === tutorialSteps.length - 1 ? "Listo" : "Siguiente"}</button>
              <button type="button" onClick={() => tutorialActions[tutorialStep]?.()} style={{ background: theme.green, border: "none", color: "#fff", borderRadius: 12, padding: "9px 12px", cursor: "pointer", fontWeight: 800 }}>{activeTutorial.action}</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
            {tutorialSteps.map((stepItem, index) => (
              <button
                key={stepItem.title}
                type="button"
                onClick={() => setTutorialStep(index)}
                style={{
                  textAlign: "left",
                  background: index === tutorialStep ? "rgba(240,192,64,0.12)" : theme.bgCard,
                  border: `1px solid ${index === tutorialStep ? theme.goldLight : theme.border}`,
                  color: theme.cream,
                  borderRadius: 14,
                  padding: 12,
                  cursor: "pointer",
                }}
              >
                <div style={{ color: theme.goldLight, fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Paso {index + 1}</div>
                <div style={{ fontWeight: 900, marginTop: 5 }}>{stepItem.title}</div>
                <div style={{ color: theme.textDim, fontSize: 11, lineHeight: 1.45, marginTop: 5 }}>{stepItem.action}</div>
              </button>
            ))}
          </div>
        </div>
      </HubSection>
    ),
    referidos: (
      <HubSection title="Referidos y gana" subtitle="Comparte tu codigo y deja listo el seguimiento de ventas.">
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ background: "linear-gradient(135deg, #1a1404, #0e140c)", border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16 }}>
            <div style={{ color: theme.textDim, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>Tu codigo</div>
            <div style={{ color: theme.goldLight, fontSize: 24, fontWeight: 900, marginTop: 6, wordBreak: "break-word" }}>{data.profile.referralCode || "SIN-CODIGO"}</div>
            <div style={{ color: theme.creamDim, fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>
              Tus pedidos se guardan con este codigo. Si alguien entra con tu enlace, podemos verlo en la tienda.
            </div>
            {data.profile.referredBy && (
              <div style={{ marginTop: 10, background: "#07130b", border: `1px solid ${theme.border}`, borderRadius: 12, padding: 12, color: theme.greenLight, fontSize: 12 }}>
                Te refirio: <strong style={{ color: theme.cream }}>{data.profile.referredBy}</strong>
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <button type="button" onClick={actions.copyReferral} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.cream, padding: 12, cursor: "pointer", fontWeight: 800 }}>
              Copiar codigo
            </button>
            <button type="button" onClick={actions.shareReferral} style={{ background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`, border: "none", borderRadius: 12, color: "#0F1A0E", padding: 12, cursor: "pointer", fontWeight: 900 }}>
              Compartir enlace
            </button>
          </div>

          <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 14 }}>
            <div style={{ color: theme.cream, fontWeight: 900, marginBottom: 8 }}>Mensaje listo para WhatsApp</div>
            <div style={{ color: theme.creamDim, fontSize: 12, lineHeight: 1.6, background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 12 }}>
              Hola, quiero pedir en VNDRX. Mi codigo es {data.profile.referralCode || "SIN-CODIGO"}.
            </div>
          </div>
        </div>
      </HubSection>
    ),
    bonos: (
      <HubSection title="Bonos" subtitle="Acumula puntos por pedidos y mira tu nivel actual.">
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
            <HubMetric label="Puntos" value={data.bonusPoints} hint="1 punto por cada S/ 12" />
            <HubMetric label="Nivel" value={bonusTierLabel.name} hint={nextMilestone ? `Faltan ${nextMilestone} puntos para el siguiente nivel` : "Nivel maximo alcanzado"} color={bonusTierLabel.color} />
            <HubMetric label="Pedidos" value={data.orders.length} hint="Pedidos guardados en este dispositivo" />
            <HubMetric label="Compartidos" value={data.profile.shareCount || 0} hint="Veces que compartiste tu codigo" />
          </div>

          <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ color: theme.cream, fontWeight: 900 }}>Progreso de bono</div>
              <div style={{ color: theme.goldLight, fontWeight: 900 }}>{bonusTierLabel.name}</div>
            </div>
            <div style={{ height: 10, background: theme.bg, borderRadius: 999, overflow: "hidden", border: `1px solid ${theme.border}` }}>
              <div style={{ height: "100%", width: `${Math.min(100, (data.bonusPoints % 40) * 2.5)}%`, background: `linear-gradient(90deg, ${theme.gold}, ${theme.goldLight})` }} />
            </div>
            <div style={{ color: theme.textDim, fontSize: 11, marginTop: 8, lineHeight: 1.5 }}>
              Cada pedido suma bonos y el proximo nivel desbloquea mas facilidad para futuras compras.
            </div>
          </div>
        </div>
      </HubSection>
    ),
    gps: (
      <HubSection title="GPS y ubicacion" subtitle="Comparte donde estas para coordinar entrega o recojo.">
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 14 }}>
            <div style={{ color: theme.textDim, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>Ubicacion activa</div>
            <div style={{ color: theme.cream, fontSize: 16, fontWeight: 900, marginTop: 6 }}>
              {data.gpsState?.label || "Sin GPS guardado"}
            </div>
            <div style={{ color: theme.creamDim, fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>
              Cuando aceptes, podremos guardar tus coordenadas y enviarlas dentro del mensaje de pedido.
            </div>
            {data.gpsState?.url && (
              <a href={data.gpsState.url} target="_blank" rel="noreferrer" style={{ color: theme.goldLight, fontSize: 12, fontWeight: 800, display: "inline-block", marginTop: 10 }}>
                Abrir en Google Maps
              </a>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <button type="button" onClick={actions.requestGps} style={{ background: `linear-gradient(135deg, ${theme.green}, ${theme.greenLight})`, border: "none", borderRadius: 12, color: "#fff", padding: 12, cursor: "pointer", fontWeight: 900 }}>
              Obtener GPS
            </button>
            <button type="button" onClick={() => actions.shareSupport(`Hola, mi ubicacion es ${data.gpsState?.label || "pendiente de GPS"}`)} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.cream, padding: 12, cursor: "pointer", fontWeight: 800 }}>
              Compartir ubicacion
            </button>
          </div>
        </div>
      </HubSection>
    ),
    historial: (
      <HubSection title="Historial" subtitle="Repite pedidos, cambia estado o eliminalos cuando ya no los necesites.">
        {data.orders.length === 0 ? (
          <div style={{ color: theme.textDim, fontSize: 13, lineHeight: 1.6, padding: "10px 4px" }}>
            Aun no hay pedidos guardados. Cuando envias un pedido por WhatsApp, queda aqui para repetirlo.
          </div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {data.orders.map((order) => (
              <div key={order.id} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                  <div>
                    <div style={{ color: theme.cream, fontWeight: 900 }}>{order.supplierName}</div>
                    <div style={{ color: theme.textDim, fontSize: 11, marginTop: 3 }}>{formatDateTime(order.createdAt)}</div>
                  </div>
                  <span style={{ background: "rgba(240,192,64,0.14)", border: `1px solid ${theme.goldLight}55`, color: theme.goldLight, borderRadius: 999, padding: "4px 9px", fontSize: 10, fontWeight: 900, whiteSpace: "nowrap" }}>
                    {order.status || "pendiente"}
                  </span>
                </div>
                <div style={{ color: theme.creamDim, fontSize: 12, lineHeight: 1.6, marginTop: 10 }}>
                  {order.items.map((item) => `${item.qty} x ${item.product.name}`).join(" · ")}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, color: theme.creamDim, fontSize: 12 }}>
                  <span>{order.paymentLabel || paymentLabel(order.payment)}</span>
                  <strong style={{ color: theme.goldLight }}>{formatMoney(order.total || 0)}</strong>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8, marginTop: 12 }}>
                  <button type="button" onClick={() => actions.repeatOrder(order)} style={{ background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`, border: "none", borderRadius: 10, color: "#0F1A0E", padding: "10px 12px", cursor: "pointer", fontWeight: 900 }}>
                    Repetir
                  </button>
                  <button type="button" onClick={() => actions.openOrder(order)} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 10, color: theme.cream, padding: "10px 12px", cursor: "pointer", fontWeight: 800 }}>
                    WhatsApp
                  </button>
                  <button type="button" onClick={() => cycleOrderStatus(order)} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 10, color: theme.cream, padding: "10px 12px", cursor: "pointer", fontWeight: 800 }}>
                    Estado
                  </button>
                  <button type="button" onClick={() => actions.removeOrder(order.id)} style={{ background: "#3C1212", border: "1px solid #7F1D1D", borderRadius: 10, color: "#FCA5A5", padding: "10px 12px", cursor: "pointer", fontWeight: 800 }}>
                    Borrar
                  </button>
                </div>
                <div style={{ color: theme.textDim, fontSize: 11, marginTop: 10, lineHeight: 1.5 }}>
                  Bonus ganado: {order.bonusEarned || 0}
                </div>
              </div>
            ))}
          </div>
        )}
      </HubSection>
    ),
    soporte: (
      <HubSection title="Soporte y contacto" subtitle="Mensajes rapidos para vender, coordinar y resolver dudas.">
        <div style={{ display: "grid", gap: 10 }}>
          {[
            "Hola, necesito ayuda con mi pedido.",
            "Hola, quiero confirmar mi pago.",
            "Hola, quiero delivery para hoy.",
            "Hola, quiero pedir como regalo.",
            "Hola, necesito una cotizacion para grupo.",
          ].map((msg) => (
            <button
              key={msg}
              type="button"
              onClick={() => actions.shareSupport(msg)}
              style={{
                textAlign: "left",
                background: theme.bgCard,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                color: theme.cream,
                padding: 12,
                cursor: "pointer",
                lineHeight: 1.45,
              }}
            >
              {msg}
            </button>
          ))}
          <div style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 12, color: theme.creamDim, fontSize: 12, lineHeight: 1.6 }}>
            Pedidos centralizados en <strong style={{ color: theme.goldLight }}>{ORDER_PHONE_DISPLAY}</strong>.
          </div>
        </div>
      </HubSection>
    ),
    promos: (
      <HubSection title="Promos listas" subtitle="Abre, copia o comparte cada arte de temporada desde un solo lugar.">
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
            {data.promoAssets.map((asset) => (
              <div key={asset.id} style={{ display: "grid", gap: 8 }}>
                <PromoTile
                  image={asset.src}
                  title={asset.title}
                  subtitle={asset.subtitle}
                  note={asset.note}
                  accent={asset.accent}
                  fit="contain"
                  aspectRatio="1 / 1.08"
                  onClick={() => actions.openAsset(asset.src)}
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button type="button" onClick={() => actions.copyPromo(asset)} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 10, color: theme.cream, padding: "10px 12px", cursor: "pointer", fontWeight: 800 }}>
                    Copiar
                  </button>
                  <button type="button" onClick={() => actions.sharePromo(asset)} style={{ background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`, border: "none", borderRadius: 10, color: "#0F1A0E", padding: "10px 12px", cursor: "pointer", fontWeight: 900 }}>
                    Compartir
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 14, color: theme.creamDim, fontSize: 12, lineHeight: 1.6 }}>
            Tip rapido: abre el flyer principal, comparte el combo escolar y termina con el Yape para cerrar pedidos sin escribir todo de nuevo.
          </div>
        </div>
      </HubSection>
    ),
    panel: (
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
          <HubMetric label="Total pedidos" value={data.orders.length} hint={`Activos: ${data.activeOrders}`} />
          <HubMetric label="Venta total" value={formatMoney(data.totalHistory)} hint="Guardado localmente" />
          <HubMetric label="Promedio reseñas" value={avgRating} hint={`${data.reviews.length} calificaciones`} />
          <HubMetric label="Proveedor top" value={data.topSupplierName} hint="El mas repetido en este equipo" />
        </div>

        <HubSection title="Resumen diario" subtitle="Copialo o enviarlo por WhatsApp para cerrar el dia sin rehacer todo.">
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
              <HubMetric label="Pendientes" value={data.orders.filter((order) => order.status !== "entregado").length} hint="Pedidos por atender" />
              <HubMetric label="Entregados" value={data.orders.filter((order) => order.status === "entregado").length} hint="Pedidos cerrados" />
              <HubMetric label="Ticket prom." value={data.orders.length ? formatMoney(data.totalHistory / data.orders.length) : formatMoney(0)} hint="Promedio por pedido" />
              <HubMetric label="Top producto" value={topProduct ? topProduct.name : "Sin datos"} hint={topProduct ? `${topProduct.label} · ${topProduct.qty} unidades` : "Aun no hay ventas"} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
              <button type="button" onClick={actions.copyDailySummary} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.cream, padding: 12, cursor: "pointer", fontWeight: 800 }}>
                Copiar resumen
              </button>
              <button type="button" onClick={actions.shareDailySummary} style={{ background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`, border: "none", borderRadius: 12, color: "#0F1A0E", padding: 12, cursor: "pointer", fontWeight: 900 }}>
                Enviar resumen
              </button>
            </div>
            <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 14, color: theme.creamDim, fontSize: 12, lineHeight: 1.6 }}>
              <div style={{ color: theme.goldLight, fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Texto listo</div>
              <div style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>
                {`Pedidos: ${data.orders.length}\nPendientes: ${data.orders.filter((order) => order.status !== "entregado").length}\nEntregados: ${data.orders.filter((order) => order.status === "entregado").length}\nVenta total: ${formatMoney(data.totalHistory)}\nPedido centralizado: ${ORDER_PHONE_DISPLAY}`}
              </div>
            </div>
          </div>
        </HubSection>

        <HubSection title="Pedidos por estado" subtitle="Filtra lo mas reciente y cambia el estado sin salir del hub.">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {panelFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setPanelFilter(filter.id)}
                style={{
                  border: `1px solid ${panelFilter === filter.id ? theme.goldLight : theme.border}`,
                  background: panelFilter === filter.id ? "rgba(240,192,64,0.12)" : theme.bg,
                  color: panelFilter === filter.id ? theme.goldLight : theme.creamDim,
                  borderRadius: 999,
                  padding: "8px 12px",
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
          {filteredPanelOrders.length === 0 ? (
            <div style={{ color: theme.textDim, fontSize: 13, lineHeight: 1.6 }}>
              No hay pedidos en este filtro todavia.
            </div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {filteredPanelOrders.slice(0, 8).map((order) => (
                <div key={order.id} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                    <div>
                      <div style={{ color: theme.cream, fontWeight: 900 }}>{order.supplierName}</div>
                      <div style={{ color: theme.textDim, fontSize: 11, marginTop: 3 }}>{formatDateTime(order.createdAt)}</div>
                      <div style={{ color: theme.creamDim, fontSize: 12, lineHeight: 1.5, marginTop: 6 }}>
                        {order.customer?.name || "Cliente sin nombre"} · {order.customer?.phone || "Sin telefono"}
                      </div>
                    </div>
                    <span style={{ background: "rgba(240,192,64,0.14)", border: `1px solid ${theme.goldLight}55`, color: theme.goldLight, borderRadius: 999, padding: "4px 9px", fontSize: 10, fontWeight: 900, whiteSpace: "nowrap" }}>
                      {order.status || "pendiente"}
                    </span>
                  </div>
                  <div style={{ color: theme.creamDim, fontSize: 12, lineHeight: 1.6, marginTop: 10 }}>
                    {order.items.map((item) => `${item.qty} x ${item.product.name}`).join(" · ")}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, color: theme.creamDim, fontSize: 12 }}>
                    <span>{order.paymentLabel || paymentLabel(order.payment)}</span>
                    <strong style={{ color: theme.goldLight }}>{formatMoney(order.total || 0)}</strong>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 8, marginTop: 12 }}>
                    <button type="button" onClick={() => actions.repeatOrder(order)} style={{ background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`, border: "none", borderRadius: 10, color: "#0F1A0E", padding: "10px 12px", cursor: "pointer", fontWeight: 900 }}>
                      Repetir
                    </button>
                    <button type="button" onClick={() => actions.openOrder(order)} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 10, color: theme.cream, padding: "10px 12px", cursor: "pointer", fontWeight: 800 }}>
                      WhatsApp
                    </button>
                    <button type="button" onClick={() => cycleOrderStatus(order)} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 10, color: theme.cream, padding: "10px 12px", cursor: "pointer", fontWeight: 800 }}>
                      Estado
                    </button>
                    <button type="button" onClick={() => actions.removeOrder(order.id)} style={{ background: "#3C1212", border: "1px solid #7F1D1D", borderRadius: 10, color: "#FCA5A5", padding: "10px 12px", cursor: "pointer", fontWeight: 800 }}>
                      Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </HubSection>

        <HubSection title="Resenas" subtitle="Recoge opinion localmente para mejorar el servicio.">
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => actions.setReviewDraft((prev) => ({ ...prev, stars: star }))}
                  style={{
                    background: data.reviewDraft.stars >= star ? "rgba(240,192,64,0.16)" : theme.bgCard,
                    border: `1px solid ${data.reviewDraft.stars >= star ? theme.goldLight : theme.border}`,
                    borderRadius: 10,
                    color: data.reviewDraft.stars >= star ? theme.goldLight : theme.creamDim,
                    width: 42,
                    height: 42,
                    cursor: "pointer",
                    fontSize: 18,
                  }}
                >
                  ★
                </button>
              ))}
            </div>
            <input value={data.reviewDraft.tag} onChange={(e) => actions.setReviewDraft((prev) => ({ ...prev, tag: e.target.value }))} placeholder="Tag rapido: entrega, sabor, servicio..." style={{ width: "100%", background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 10, color: theme.cream, padding: "11px 12px", fontSize: 13 }} />
            <textarea value={data.reviewDraft.note} onChange={(e) => actions.setReviewDraft((prev) => ({ ...prev, note: e.target.value }))} placeholder="Escribe una opinion corta..." rows={3} style={{ width: "100%", background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 10, color: theme.cream, padding: "11px 12px", fontSize: 13, resize: "vertical", minHeight: 84 }} />
            <button type="button" onClick={actions.saveReview} style={{ background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`, border: "none", borderRadius: 12, color: "#0F1A0E", padding: 12, cursor: "pointer", fontWeight: 900 }}>
              Guardar reseña
            </button>
            {data.reviews.length > 0 && (
              <div style={{ display: "grid", gap: 8, marginTop: 2 }}>
                {data.reviews.slice(0, 3).map((review) => (
                  <div key={review.id} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ color: theme.goldLight, fontWeight: 900 }}>{"★".repeat(review.stars)}</div>
                      <div style={{ color: theme.textDim, fontSize: 10 }}>{formatDateTime(review.createdAt)}</div>
                    </div>
                    {review.tag && <div style={{ color: theme.greenLight, fontSize: 11, fontWeight: 800, marginTop: 4 }}>{review.tag}</div>}
                    {review.note && <div style={{ color: theme.creamDim, fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>{review.note}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </HubSection>
      </div>
    ),
    install: (
      <HubSection title="Instalar app" subtitle="Si tu navegador lo permite, instala la tienda como app.">
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 14, color: theme.creamDim, fontSize: 12, lineHeight: 1.7 }}>
            Tener la app instalada ayuda a volver a comprar mas rapido, igual que en ASWA.
            {data.canInstall ? " El navegador ya permitio la instalacion." : " Si tu navegador no muestra la tarjeta, usa el menu de compartir o las opciones del navegador."}
          </div>
          <button type="button" onClick={actions.installApp} style={{ background: `linear-gradient(135deg, ${theme.green}, ${theme.greenLight})`, border: "none", borderRadius: 12, color: "#fff", padding: 12, cursor: "pointer", fontWeight: 900 }}>
            Instalar / abrir
          </button>
          <div style={{ color: theme.textDim, fontSize: 11, lineHeight: 1.65 }}>
            Si el navegador no muestra la instalacion automatica, usa el menu del navegador y elige "Agregar a pantalla de inicio".
          </div>
        </div>
      </HubSection>
    ),
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 120, background: "rgba(0,0,0,0.78)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: 16, overflowY: "auto" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(1100px, 100%)", background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 24, boxShadow: "0 30px 70px rgba(0,0,0,0.4)", overflow: "hidden", marginTop: 20 }}>
        <div style={{ padding: 18, borderBottom: `1px solid ${theme.border}`, background: "linear-gradient(135deg, rgba(20,28,17,1), rgba(9,14,8,1))" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div>
              <div style={{ color: theme.goldLight, fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase" }}>Centro ASWA de funciones</div>
              <div style={{ color: theme.cream, fontSize: 22, fontWeight: 900, marginTop: 6 }}>Herramientas de venta, bonos y pedidos</div>
              <div style={{ color: theme.textDim, fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>Lo que trae ASWA para vender mejor, resumido dentro de tu tienda y conectado al pedido real por WhatsApp.</div>
            </div>
            <button type="button" onClick={onClose} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.cream, width: 38, height: 38, cursor: "pointer", fontSize: 18, fontWeight: 800 }}>×</button>
          </div>
        </div>

        <div style={{ padding: 18, display: "grid", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            <HubMetric label="Pedidos" value={data.orders.length} hint={`Activos: ${data.activeOrders}`} />
            <HubMetric label="Bonos" value={data.bonusPoints} hint={`Nivel ${bonusTierLabel.name}`} color={bonusTierLabel.color} />
            <HubMetric label="Reseñas" value={data.reviews.length} hint={`Promedio ${avgRating}/5`} />
            <HubMetric label="Compartidos" value={data.profile.shareCount || 0} hint="Codigo y enlace" />
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tabs.map((item) => (
              <HubChip
                key={item.id}
                active={tab === item.id}
                label={item.label}
                icon={item.icon}
                onClick={() => onTabChange(item.id)}
              />
            ))}
          </div>

          {gridActions[tab]}
        </div>
      </div>
    </div>
  );
}

function DeliveryZoneSelector({ selected, onSelect, zones }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ color: theme.creamDim, fontSize: 11, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>
        📦 ZONA DE ENTREGA
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {zones.map((zone) => (
          <div
            key={zone.id}
            onClick={() => onSelect(zone)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: selected?.id === zone.id ? theme.bgLight : theme.bg,
              border: `1px solid ${selected?.id === zone.id ? theme.greenLight + "77" : theme.border}`,
              borderRadius: 8, padding: "8px 12px", cursor: "pointer", transition: "all 0.15s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13 }}>{zone.emoji}</span>
              <div>
                <div style={{ color: theme.cream, fontSize: 12, fontWeight: 600 }}>{zone.name}</div>
                <div style={{ color: theme.textDim, fontSize: 10 }}>{zone.address}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {zone.cost === 0
                ? <span style={{ background: "#0A2010", color: theme.greenLight, borderRadius: 10, fontSize: 10, fontWeight: 700, padding: "2px 8px" }}>GRATIS</span>
                : <span style={{ fontFamily: "monospace", color: theme.gold, fontSize: 13, fontWeight: 700 }}>+S/ {zone.cost.toFixed(2)}</span>
              }
              {selected?.id === zone.id && <span style={{ color: theme.greenLight, fontSize: 13 }}>✓</span>}
            </div>
          </div>
        ))}
      </div>
      {selected && selected.cost > 0 && (
        <div style={{ marginTop: 7, background: "#0A1C0A", border: `1px solid ${theme.border}`, borderRadius: 6, padding: "6px 12px", fontSize: 11, color: theme.creamDim }}>
          💡 Delivery <strong style={{ color: theme.gold }}>S/ {selected.cost.toFixed(2)} fijo</strong> — sin importar cuántas unidades o sacos pidas.
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, onAdd, cartItem }) {
  const lc = LINE_COLORS[product.line];
  const [selPres, setSelPres] = useState(0);
  const minQty = product.minOrder || 1;
  const [qty, setQty] = useState(minQty);
  const [zone, setZone] = useState((product.zones || ZONES_REYLEON)[0]);
  const [expanded, setExpanded] = useState(false);

  const pres = product.presentations[selPres];
  const subtotal = pres.price * qty;
  const total = subtotal + (zone?.cost || 0);

  return (
    <div style={{
      background: theme.bgCard,
      border: `1px solid ${theme.border}`,
      borderRadius: 16, overflow: "hidden",
      display: "flex", flexDirection: "column",
      transition: "border-color 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = lc.badge + "66"}
      onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
    >
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${lc.bg} 0%, ${lc.accent}55 100%)`,
        padding: "18px 20px 14px",
        borderBottom: `1px solid ${theme.border}`,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <Badge text={lc.label} color={lc.badge} />
          {product.saving > 0 && (
            <span style={{ background: "#0A2010", color: theme.greenLight, borderRadius: 20, fontSize: 10, fontWeight: 700, padding: "2px 9px" }}>
              -{product.saving}% vs tienda
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <ProductAvatar product={product} size={58} radius={16} />
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 17, fontWeight: 700, color: theme.cream, lineHeight: 1.2 }}>
              {product.name}
            </div>
            <div style={{ color: theme.creamDim, fontSize: 12, marginTop: 3 }}>{product.subtitle}</div>
          </div>
        </div>
      </div>

      {/* Quality info */}
      <div style={{ padding: "10px 18px", background: theme.bg + "99", borderBottom: `1px solid ${theme.border}`, display: "flex", gap: 16 }}>
        <div>
          <div style={{ color: theme.textDim, fontSize: 10, fontWeight: 600, letterSpacing: 1 }}>CALIDAD</div>
          <div style={{ color: theme.gold, fontSize: 12, fontWeight: 700 }}>{product.quality}</div>
        </div>
        <div>
          <div style={{ color: theme.textDim, fontSize: 10, fontWeight: 600, letterSpacing: 1 }}>VARIEDAD</div>
          <div style={{ color: theme.creamDim, fontSize: 12 }}>{product.variety}</div>
        </div>
      </div>

      <div style={{ padding: "14px 18px", flex: 1 }}>
        {/* Description */}
        <p style={{ color: theme.creamDim, fontSize: 12, lineHeight: 1.65, margin: "0 0 12px" }}>
          {expanded ? product.desc : product.desc.slice(0, 110) + (product.desc.length > 110 ? "..." : "")}
          {product.desc.length > 110 && (
            <span onClick={() => setExpanded(!expanded)} style={{ color: theme.gold, cursor: "pointer", marginLeft: 4, fontSize: 11 }}>
              {expanded ? " ver menos" : " ver más"}
            </span>
          )}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
          {product.tags.map(t => (
            <span key={t} style={{ background: theme.bgLight, border: `1px solid ${theme.border}`, color: theme.greenLight, borderRadius: 20, fontSize: 10, padding: "2px 9px" }}>
              ✓ {t}
            </span>
          ))}
        </div>

        {/* Cooking tip */}
        <div style={{ background: theme.bg, borderRadius: 8, padding: "8px 12px", marginBottom: 14, borderLeft: `3px solid ${lc.badge}` }}>
          <div style={{ color: theme.textDim, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 3 }}>🍳 COCCIÓN</div>
          <div style={{ color: theme.creamDim, fontSize: 11, lineHeight: 1.5 }}>{product.cooking}</div>
        </div>

        {/* Presentation selector */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ color: theme.creamDim, fontSize: 11, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>📦 PRESENTACIÓN</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5 }}>
            {product.presentations.map((p, i) => (
              <div
                key={i}
                onClick={() => { setSelPres(i); setQty(1); }}
                style={{
                  background: selPres === i ? lc.accent : theme.bg,
                  border: `1px solid ${selPres === i ? lc.badge : theme.border}`,
                  borderRadius: 8, padding: "7px 6px", cursor: "pointer",
                  textAlign: "center", transition: "all 0.15s",
                }}
              >
                <div style={{ color: selPres === i ? theme.cream : theme.creamDim, fontSize: 11, fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontFamily: "monospace", color: theme.gold, fontSize: 12, fontWeight: 700 }}>S/ {p.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone selector — oculto en promo escolar (delivery gratis incluido) */}
        {!product.schoolOnly && (
          <DeliveryZoneSelector selected={zone} onSelect={setZone} zones={product.zones || ZONES_REYLEON} />
        )}

        {/* Qty & total */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: product.minOrderNote ? 8 : 12 }}>
          <div style={{ display: "flex", alignItems: "center", background: theme.bg, borderRadius: 8, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
            <button onClick={() => setQty(Math.max(minQty, qty - 1))} style={{ background: "none", border: "none", color: theme.cream, width: 32, height: 32, cursor: "pointer", fontSize: 16, fontWeight: 700 }}>−</button>
            <span style={{ fontFamily: "monospace", color: theme.cream, minWidth: 28, textAlign: "center", fontSize: 14, fontWeight: 700 }}>{qty}</span>
            <button onClick={() => setQty(qty + 1)} style={{ background: "none", border: "none", color: theme.cream, width: 32, height: 32, cursor: "pointer", fontSize: 16, fontWeight: 700 }}>+</button>
          </div>
          <span style={{ color: theme.textDim, fontSize: 11 }}>{pres.unit}{qty > 1 ? "s" : ""}</span>
        </div>
        {product.minOrderNote && (
          <div style={{
            background: "#1A1000", border: "1px solid #C47A1E55",
            borderRadius: 7, padding: "6px 11px", marginBottom: 12,
            fontSize: 11, color: "#C47A1E", display: "flex", gap: 6, alignItems: "center",
          }}>
            <span>⚠️</span> {product.minOrderNote}
          </div>
        )}

        {/* School-only notice + delivery gratis */}
        {product.schoolOnly && (
          <div style={{
            background: "#001A2E", border: "1px solid #3B82F655",
            borderRadius: 10, padding: "10px 13px", marginBottom: 12,
          }}>
            <div style={{ color: "#60A5FA", fontSize: 11, fontWeight: 800, letterSpacing: 0.5, marginBottom: 6 }}>
              🎒 EXCLUSIVO INSTITUCIONES EDUCATIVAS
            </div>
            <div style={{ color: "#93C5FD", fontSize: 11, lineHeight: 1.5, marginBottom: 8 }}>
              Solo disponible para <strong>colegios, escuelas y jardines</strong>. Indica el nombre de tu institución al hacer el pedido.
            </div>
            <div style={{ background: "#002A1A", border: "1px solid #16A34A55", borderRadius: 7, padding: "6px 10px", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>🚚</span>
              <span style={{ color: "#4ADE80", fontSize: 12, fontWeight: 700 }}>Delivery GRATIS a tu institución — beneficio de la promoción</span>
            </div>
          </div>
        )}

        {/* Price breakdown */}
        <div style={{ background: theme.bg, borderRadius: 10, padding: "10px 13px", marginBottom: 12, border: `1px solid ${theme.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ color: theme.textDim, fontSize: 11 }}>{qty} × {pres.label} — S/ {pres.price.toFixed(2)}</span>
            <span style={{ fontFamily: "monospace", color: theme.creamDim, fontSize: 12 }}>S/ {subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: theme.textDim, fontSize: 11 }}>Delivery — {zone?.name}</span>
            <span style={{ fontFamily: "monospace", color: zone?.cost === 0 ? theme.greenLight : theme.gold, fontSize: 12 }}>
              {zone?.cost === 0 ? "Gratis" : `+S/ ${zone?.cost.toFixed(2)}`}
            </span>
          </div>
          <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: theme.cream, fontWeight: 700, fontSize: 13 }}>Total</span>
            <span style={{ fontFamily: "monospace", color: theme.goldLight, fontWeight: 800, fontSize: 17 }}>S/ {total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => onAdd(product, pres, qty, zone)}
          style={{
            width: "100%",
            background: cartItem
              ? `linear-gradient(135deg, ${theme.green}, ${theme.greenLight})`
              : `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`,
            border: "none", borderRadius: 10,
            color: cartItem ? "#fff" : "#0F1A0E",
            fontSize: 13, fontWeight: 800, padding: "12px 0",
            cursor: "pointer", letterSpacing: 0.5,
          }}
        >
          {cartItem ? `✓ En carrito (${cartItem.qty} ${cartItem.pres.unit}s)` : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose, onRemove }) {
  const [step, setStep] = useState("cart");
  const [payment, setPayment] = useState("online");

  const subtotal = cart.reduce((a, i) => a + i.pres.price * i.qty, 0);
  const deliveryTotal = cart.reduce((a, i) => a + (i.zone?.cost || 0), 0);
  const commission = (subtotal + deliveryTotal) * 0.05;
  const grandTotal = subtotal + deliveryTotal + commission;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#000000BB", zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 460, maxWidth: "100vw", background: theme.bgCard, borderLeft: `1px solid ${theme.border}`, height: "100%", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{ padding: "16px 22px", borderBottom: `1px solid ${theme.border}`, background: theme.bgLight, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 19, color: theme.cream, fontWeight: 700 }}>
              {step === "cart" && "Tu Pedido Directo"}
              {step === "payment" && "Forma de Pago"}
              {step === "confirm" && "¡Pedido Confirmado!"}
            </div>
            <div style={{ color: theme.textDim, fontSize: 11 }}>Piladora Rey León · Sin intermediarios</div>
          </div>
          <button onClick={onClose} style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.cream, borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {step === "cart" && (
            cart.length === 0
              ? <div style={{ textAlign: "center", color: theme.textDim, marginTop: 60 }}><div style={{ fontSize: 44 }}>🛒</div><div style={{ marginTop: 12 }}>Tu carrito está vacío</div></div>
              : cart.map(item => (
                <div key={item.uid} style={{ background: theme.bgLight, borderRadius: 12, padding: 14, marginBottom: 12, border: `1px solid ${theme.border}` }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <ProductAvatar product={item.product} size={42} radius={10} />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: theme.cream, fontSize: 13, fontWeight: 700 }}>{item.product.name}</div>
                      <div style={{ color: theme.textDim, fontSize: 11 }}>{item.pres.label}</div>
                    </div>
                    <button onClick={() => onRemove(item.uid)} style={{ background: "none", border: "none", color: theme.textDim, cursor: "pointer", fontSize: 16 }}>×</button>
                  </div>
                  <div style={{ marginTop: 10, background: theme.bg, borderRadius: 8, padding: "9px 11px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ color: theme.textDim, fontSize: 11 }}>{item.qty} × S/ {item.pres.price.toFixed(2)}</span>
                      <span style={{ fontFamily: "monospace", color: theme.creamDim, fontSize: 12 }}>S/ {(item.qty * item.pres.price).toFixed(2)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ color: theme.textDim, fontSize: 11 }}>🚚 {item.zone?.name}</span>
                      <span style={{ fontFamily: "monospace", color: item.zone?.cost === 0 ? theme.greenLight : theme.gold, fontSize: 12 }}>
                        {item.zone?.cost === 0 ? "Gratis" : `+S/ ${item.zone?.cost.toFixed(2)}`}
                      </span>
                    </div>
                    <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 6, display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: theme.creamDim, fontSize: 12, fontWeight: 600 }}>Subtotal</span>
                      <span style={{ fontFamily: "monospace", color: theme.goldLight, fontSize: 13, fontWeight: 700 }}>S/ {(item.qty * item.pres.price + (item.zone?.cost || 0)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
          )}

          {step === "payment" && (
            <div>
              {/* Payment options */}
              {[
                { val: "yape", icon: "💜", label: "Yape", desc: "918-429-034 · Noyolith Quine Rojas", color: "#6B2D8B" },
                { val: "bbva", icon: "🔵", label: "Transferencia BBVA", desc: "Net Cash BBVA Zurita", color: "#004A97" },
                { val: "bcp", icon: "🟠", label: "Transferencia BCP", desc: "Net Cash BCP Zurita", color: "#E05A00" },
                { val: "cod", icon: "💵", label: "Pago contra entrega", desc: "Pagas en efectivo al recibir", color: theme.green },
              ].map(opt => (
                <div key={opt.val} onClick={() => setPayment(opt.val)} style={{
                  background: payment === opt.val ? theme.bgLight : theme.bg,
                  border: `2px solid ${payment === opt.val ? opt.color : theme.border}`,
                  borderRadius: 12, padding: "12px 14px", marginBottom: 10, cursor: "pointer",
                  display: "flex", gap: 12, alignItems: "center", transition: "all 0.15s",
                }}>
                  <span style={{ fontSize: 22 }}>{opt.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: theme.cream, fontWeight: 700, fontSize: 14 }}>{opt.label}</div>
                    <div style={{ color: theme.textDim, fontSize: 12 }}>{opt.desc}</div>
                  </div>
                  {payment === opt.val && <span style={{ color: opt.color, fontSize: 16, fontWeight: 700 }}>✓</span>}
                </div>
              ))}

              {/* Payment detail box */}
              {payment === "yape" && (
                <div style={{ background: "#1A0A2E", border: "1px solid #6B2D8B55", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                  <div style={{ color: "#C084FC", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>💜 DATOS YAPE</div>
                  <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 12, alignItems: "center" }}>
                    <button
                      type="button"
                      onClick={() => window.open(ASSETS.yapeQr, "_blank", "noopener,noreferrer")}
                      style={{
                        border: `1px solid #6B2D8B55`,
                        borderRadius: 12,
                        padding: 8,
                        background: "#0D0520",
                        cursor: "pointer",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={ASSETS.yapeQr}
                        alt="QR de Yape"
                        loading="lazy"
                        style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", borderRadius: 8 }}
                      />
                    </button>
                    <div>
                      <div style={{ color: theme.cream, fontSize: 20, fontWeight: 800, fontFamily: "monospace", marginBottom: 4 }}>918-429-034</div>
                      <div style={{ color: theme.creamDim, fontSize: 13, marginBottom: 12 }}>Titular: Noyolith Quine Rojas</div>
                      <div style={{ background: "#0D0520", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#C084FC", lineHeight: 1.5 }}>
                        💡 Yapea al número y envía captura por WhatsApp al <strong style={{ color: theme.cream }}>{ORDER_PHONE_DISPLAY}</strong> para confirmar tu pedido.
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {payment === "bbva" && (
                <div style={{ background: "#001A3A", border: "1px solid #004A9755", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                  <div style={{ color: "#60A5FA", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>🔵 DATOS BBVA · NET CASH ZURITA</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ background: "#001229", borderRadius: 8, padding: "8px 12px" }}>
                      <div style={{ color: "#60A5FA", fontSize: 10, fontWeight: 700 }}>N° CUENTA</div>
                      <div style={{ color: theme.cream, fontFamily: "monospace", fontSize: 15, fontWeight: 700 }}>0011-0310-01-00167706</div>
                    </div>
                    <div style={{ background: "#001229", borderRadius: 8, padding: "8px 12px" }}>
                      <div style={{ color: "#60A5FA", fontSize: 10, fontWeight: 700 }}>CCI</div>
                      <div style={{ color: theme.cream, fontFamily: "monospace", fontSize: 15, fontWeight: 700 }}>011-310-000100167706-09</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 10, background: "#001229", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#60A5FA" }}>
                    💡 Transfiere y envía captura por WhatsApp al <strong style={{ color: theme.cream }}>{ORDER_PHONE_DISPLAY}</strong>.
                  </div>
                </div>
              )}
              {payment === "bcp" && (
                <div style={{ background: "#2D1200", border: "1px solid #E05A0055", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                  <div style={{ color: "#FB923C", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>🟠 DATOS BCP · NET CASH ZURITA</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ background: "#1A0A00", borderRadius: 8, padding: "8px 12px" }}>
                      <div style={{ color: "#FB923C", fontSize: 10, fontWeight: 700 }}>N° CUENTA</div>
                      <div style={{ color: theme.cream, fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>550-146-407-751-071</div>
                    </div>
                    <div style={{ background: "#1A0A00", borderRadius: 8, padding: "8px 12px" }}>
                      <div style={{ color: "#FB923C", fontSize: 10, fontWeight: 700 }}>CCI</div>
                      <div style={{ color: theme.cream, fontFamily: "monospace", fontSize: 13, fontWeight: 700 }}>002-550-114-640-751-071-28</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 10, background: "#1A0A00", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#FB923C" }}>
                    💡 Transfiere y envía captura por WhatsApp al <strong style={{ color: theme.cream }}>{ORDER_PHONE_DISPLAY}</strong>.
                  </div>
                </div>
              )}
              {payment === "cod" && (
                <div style={{ background: "#0A1C0A", border: `1px solid ${theme.green}55`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
                  <div style={{ color: theme.greenLight, fontSize: 12 }}>
                    💵 Prepara el monto exacto al momento de recibir tu pedido.<br />
                    <strong style={{ color: theme.cream }}>Total a pagar: S/ {grandTotal.toFixed(2)}</strong>
                  </div>
                </div>
              )}

              {/* Order summary */}
              <div style={{ background: theme.bg, borderRadius: 12, padding: 14, border: `1px solid ${theme.border}` }}>
                <div style={{ color: theme.textDim, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>RESUMEN</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ color: theme.textDim, fontSize: 12 }}>Productos</span>
                  <span style={{ color: theme.creamDim, fontSize: 12, fontFamily: "monospace" }}>S/ {subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ color: theme.textDim, fontSize: 12 }}>Delivery</span>
                  <span style={{ color: theme.creamDim, fontSize: 12, fontFamily: "monospace" }}>S/ {deliveryTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: theme.textDim, fontSize: 12 }}>Comisión plataforma (5%)</span>
                  <span style={{ color: theme.creamDim, fontSize: 12, fontFamily: "monospace" }}>S/ {commission.toFixed(2)}</span>
                </div>
                <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: theme.cream, fontWeight: 700 }}>TOTAL</span>
                  <span style={{ fontFamily: "monospace", color: theme.goldLight, fontWeight: 800, fontSize: 18 }}>S/ {grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div style={{ textAlign: "center", paddingTop: 36 }}>
              <div style={{ fontSize: 60 }}>✅</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: theme.cream, marginTop: 14, fontWeight: 700 }}>¡Pedido Confirmado!</div>
              <div style={{ color: theme.creamDim, fontSize: 13, marginTop: 8, lineHeight: 1.7 }}>
                Tu pedido fue enviado directamente a la Piladora Rey León.<br />Recibirás confirmación al correo.
              </div>
              <div style={{ background: theme.bgLight, borderRadius: 12, padding: 16, marginTop: 20, border: `1px solid ${theme.border}`, textAlign: "left" }}>
                <div style={{ color: theme.greenLight, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>📦 CADENA DIRECTA:</div>
                {cart.map(item => (
                  <div key={item.uid} style={{ color: theme.creamDim, fontSize: 12, marginBottom: 5 }}>
                    <ProductAvatar product={item.product} size={30} radius={8} /> <strong style={{ color: theme.cream }}>Piladora Rey León</strong>
                    <span style={{ color: theme.textDim }}> → 🚚 {item.zone?.name} → 🏠 Tu hogar</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, background: theme.bg, borderRadius: 10, padding: 14, border: `1px solid ${theme.border}` }}>
                <div style={{ color: theme.textDim, fontSize: 11 }}>Pedidos por WhatsApp</div>
                <div style={{ color: theme.gold, fontSize: 15, fontWeight: 700 }}>📞 {ORDER_PHONE_DISPLAY}</div>
                <div style={{ color: theme.creamDim, fontSize: 12 }}>ventas@reyleon.pe</div>
              </div>
            </div>
          )}
        </div>

        {step !== "confirm" && cart.length > 0 && (
          <div style={{ padding: 16, borderTop: `1px solid ${theme.border}`, background: theme.bgLight }}>
            {step === "cart" && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ color: theme.textDim, fontSize: 12 }}>Total (incl. delivery)</span>
                <span style={{ fontFamily: "monospace", color: theme.goldLight, fontSize: 17, fontWeight: 700 }}>S/ {(subtotal + deliveryTotal).toFixed(2)}</span>
              </div>
            )}
            <button
              onClick={() => { if (step === "cart") setStep("payment"); else if (step === "payment") setStep("confirm"); }}
              style={{ width: "100%", background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`, border: "none", borderRadius: 10, color: "#0F1A0E", fontSize: 14, fontWeight: 800, padding: "13px 0", cursor: "pointer" }}
            >
              {step === "cart" && "Continuar al pago →"}
              {step === "payment" && `Confirmar pedido · S/ ${grandTotal.toFixed(2)}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── APP ──────────────────────────────────────────────────────────────────────

function CartDrawerReal({ cart, onClose, onRemove, onOrderSent, initialCustomer = {}, referralCode = "", referredBy = "", gpsState = {} }) {
  const [step, setStep] = useState("cart");
  const [payment, setPayment] = useState("cod");
  const [status, setStatus] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
    reference: "",
    notes: "",
    referralCode,
    referredBy,
  });
  const [giftEnabled, setGiftEnabled] = useState(false);
  const [giftRelation, setGiftRelation] = useState("Familiar");
  const [giftName, setGiftName] = useState("");
  const [giftPhone, setGiftPhone] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [reservationEnabled, setReservationEnabled] = useState(false);
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationNote, setReservationNote] = useState("");
  const [fulfillmentMode, setFulfillmentMode] = useState("delivery");

  const subtotal = cart.reduce((a, i) => a + i.pres.price * i.qty, 0);
  const deliveryTotal = cart.reduce((a, i) => a + (i.zone?.cost || 0), 0);
  const grandTotal = subtotal + deliveryTotal;
  const groups = groupCartBySupplier(cart);
  const mixedSuppliers = groups.length > 1;
  const canSend = Boolean(customer.name.trim() && customer.phone.trim() && (fulfillmentMode === "recojo" || customer.address.trim()));
  const activeGps = gpsState?.label && gpsState?.url ? gpsState : null;

  const inputStyle = {
    width: "100%",
    background: theme.bg,
    border: `1px solid ${theme.border}`,
    borderRadius: 10,
    color: theme.cream,
    padding: "11px 12px",
    fontSize: 13,
  };

  useEffect(() => {
    setCustomer((prev) => ({
      ...prev,
      ...initialCustomer,
      referralCode: initialCustomer.referralCode || referralCode || prev.referralCode,
      referredBy: initialCustomer.referredBy || referredBy || prev.referredBy,
    }));
  }, [initialCustomer, referralCode, referredBy]);

  const setField = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const makeMessage = (group) =>
    buildOrderMessage({
      supplier: group.supplier,
      items: group.items,
      customer,
      payment: paymentLabel(payment),
      extras: {
        gps: activeGps,
        fulfillmentMode,
        gift: giftEnabled ? { enabled: true, relation: giftRelation, recipient: giftName, phone: giftPhone, message: giftMessage } : null,
        reservation: reservationEnabled ? { enabled: true, date: reservationDate, time: reservationTime, note: reservationNote, mode: fulfillmentMode } : null,
      },
    });

  const copyOrder = async (group) => {
    const message = makeMessage(group);
    try {
      await navigator.clipboard.writeText(message);
      setStatus(`Pedido copiado. Se enviará al ${ORDER_PHONE_DISPLAY}`);
    } catch {
      setStatus("No se pudo copiar el pedido");
    }
  };

  const openWhatsApp = async (group) => {
    const message = makeMessage(group);
    const url = `https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus(`Pedido listo para enviar a ${ORDER_PHONE_DISPLAY}`);
    const orderRecord = createOrderRecord({
      supplier: group.supplier,
      items: group.items,
      customer: {
        ...customer,
        extras: {
          gps: activeGps,
          gift: giftEnabled ? { enabled: true, relation: giftRelation, recipient: giftName, phone: giftPhone, message: giftMessage } : null,
          reservation: reservationEnabled ? { enabled: true, date: reservationDate, time: reservationTime, note: reservationNote, mode: fulfillmentMode } : null,
        },
      },
      payment,
      extras: {
        gps: activeGps,
        fulfillmentMode,
        gift: giftEnabled ? { enabled: true, relation: giftRelation, recipient: giftName, phone: giftPhone, message: giftMessage } : null,
        reservation: reservationEnabled ? { enabled: true, date: reservationDate, time: reservationTime, note: reservationNote, mode: fulfillmentMode } : null,
      },
    });
    onOrderSent?.(orderRecord);
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // Clipboard is optional.
    }
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#000000BB", zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 520, maxWidth: "100vw", background: theme.bgCard, borderLeft: `1px solid ${theme.border}`, height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px 22px", borderBottom: `1px solid ${theme.border}`, background: theme.bgLight, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 19, color: theme.cream, fontWeight: 700 }}>
              {step === "cart" ? "Tu pedido real" : "Checkout real"}
            </div>
            <div style={{ color: theme.textDim, fontSize: 11 }}>
              {mixedSuppliers ? "Pedidos centralizados en un solo WhatsApp" : "Un pedido listo para enviar por WhatsApp"}
            </div>
          </div>
          <button onClick={onClose} style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.cream, borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {step === "cart" && (
            cart.length === 0 ? (
              <div style={{ textAlign: "center", color: theme.textDim, marginTop: 60 }}>
                <div style={{ fontSize: 44 }}>🛒</div>
                <div style={{ marginTop: 12 }}>Tu carrito está vacío</div>
              </div>
            ) : (
              <>
                <div style={{ background: "#0A1C0A", border: `1px solid ${theme.border}`, borderRadius: 12, padding: "10px 12px", marginBottom: 14, color: theme.creamDim, fontSize: 12, lineHeight: 1.5 }}>
                  <strong style={{ color: theme.goldLight }}>Venta real:</strong> completa tus datos y envía el pedido por WhatsApp al proveedor correcto.
                </div>

                {cart.map((item) => {
                  const supplier = getSupplier(item.product);
                  return (
                    <div key={item.uid} style={{ background: theme.bgLight, borderRadius: 12, padding: 14, marginBottom: 12, border: `1px solid ${theme.border}` }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <ProductAvatar product={item.product} size={36} radius={10} />
                        <div style={{ flex: 1 }}>
                          <div style={{ color: theme.cream, fontSize: 13, fontWeight: 700 }}>{item.product.name}</div>
                          <div style={{ color: theme.textDim, fontSize: 11 }}>{item.pres.label} · {supplier.shortName}</div>
                        </div>
                        <button onClick={() => onRemove(item.uid)} style={{ background: "none", border: "none", color: theme.textDim, cursor: "pointer", fontSize: 16 }}>×</button>
                      </div>
                      <div style={{ marginTop: 10, background: theme.bg, borderRadius: 8, padding: "9px 11px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                          <span style={{ color: theme.textDim, fontSize: 11 }}>{item.qty} × {formatMoney(item.pres.price)}</span>
                          <span style={{ fontFamily: "monospace", color: theme.creamDim, fontSize: 12 }}>{formatMoney(item.qty * item.pres.price)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ color: theme.textDim, fontSize: 11 }}>🚚 {item.zone?.name}</span>
                          <span style={{ fontFamily: "monospace", color: item.zone?.cost === 0 ? theme.greenLight : theme.gold, fontSize: 12 }}>
                            {item.zone?.cost === 0 ? "Gratis" : `+${formatMoney(item.zone?.cost || 0)}`}
                          </span>
                        </div>
                        <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 6, display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: theme.creamDim, fontSize: 12, fontWeight: 600 }}>Subtotal</span>
                          <span style={{ fontFamily: "monospace", color: theme.goldLight, fontSize: 13, fontWeight: 700 }}>{formatMoney(item.qty * item.pres.price + (item.zone?.cost || 0))}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {mixedSuppliers && (
                  <div style={{ background: "#1A1000", border: "1px solid #C47A1E55", borderRadius: 12, padding: 12, marginTop: 6, color: "#F7C56A", fontSize: 12, lineHeight: 1.5 }}>
                    Tu carrito mezcla productos de Rey León y ASWA. En el checkout te dejamos los botones separados por marca.
                  </div>
                )}
              </>
            )
          )}

          {step === "checkout" && (
            <>
              {status && (
                <div style={{ background: "#0A1C0A", border: `1px solid ${theme.border}`, borderRadius: 12, padding: "10px 12px", marginBottom: 14, color: theme.greenLight, fontSize: 12 }}>
                  {status}
                </div>
              )}

              <div style={{ background: theme.bgLight, borderRadius: 14, padding: 14, border: `1px solid ${theme.border}`, marginBottom: 14 }}>
                <div style={{ color: theme.cream, fontSize: 14, fontWeight: 800, marginBottom: 10 }}>Datos del cliente</div>
                <div style={{ display: "grid", gap: 10 }}>
                  <input value={customer.name} onChange={(e) => setField("name", e.target.value)} placeholder="Nombre y apellido" style={inputStyle} />
                  <input value={customer.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="Teléfono o WhatsApp" style={inputStyle} />
                  <input value={customer.district} onChange={(e) => setField("district", e.target.value)} placeholder="Distrito" style={inputStyle} />
                  <input value={customer.address} onChange={(e) => setField("address", e.target.value)} placeholder="Dirección de entrega" style={inputStyle} />
                  <input value={customer.reference} onChange={(e) => setField("reference", e.target.value)} placeholder="Referencia (opcional)" style={inputStyle} />
                  <textarea value={customer.notes} onChange={(e) => setField("notes", e.target.value)} placeholder="Notas para tu pedido (opcional)" rows={3} style={{ ...inputStyle, resize: "vertical", minHeight: 88, fontFamily: "inherit" }} />
                </div>
              </div>

              <div style={{ background: theme.bgLight, borderRadius: 14, padding: 14, border: `1px solid ${theme.border}`, marginBottom: 14 }}>
                <div style={{ color: theme.cream, fontSize: 14, fontWeight: 800, marginBottom: 10 }}>Método de pago preferido</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {[
                    { val: "cod", label: "Pago contra entrega", desc: "Pagas cuando recibes tu pedido", color: theme.greenLight },
                    { val: "yape", label: "Yape", desc: "Te compartimos los datos por WhatsApp", color: "#C084FC" },
                    { val: "plin", label: "Plin", desc: "Te compartimos el numero por WhatsApp", color: "#22C55E" },
                    { val: "bim", label: "BIM", desc: "Te compartimos el numero por WhatsApp", color: "#F59E0B" },
                    { val: "agora", label: "Agora", desc: "Te compartimos el enlace por WhatsApp", color: "#FB7185" },
                    { val: "bbva", label: "Transferencia BBVA", desc: "Te compartimos la cuenta por WhatsApp", color: "#60A5FA" },
                    { val: "bcp", label: "Transferencia BCP", desc: "Te compartimos la cuenta por WhatsApp", color: "#FB923C" },
                    { val: "card", label: "Tarjeta / online", desc: "Te compartimos el enlace por WhatsApp", color: "#A78BFA" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setPayment(opt.val)}
                      style={{
                        background: payment === opt.val ? theme.bg : theme.bgCard,
                        border: `1px solid ${payment === opt.val ? opt.color : theme.border}`,
                        borderRadius: 12,
                        padding: "12px 14px",
                        cursor: "pointer",
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ width: 12, height: 12, borderRadius: 999, background: opt.color, boxShadow: payment === opt.val ? `0 0 0 4px ${opt.color}22` : "none" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: theme.cream, fontWeight: 700, fontSize: 14 }}>{opt.label}</div>
                        <div style={{ color: theme.textDim, fontSize: 12 }}>{opt.desc}</div>
                      </div>
                      {payment === opt.val && <span style={{ color: opt.color, fontSize: 16, fontWeight: 700 }}>✓</span>}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 10, background: theme.bg, borderRadius: 10, padding: 12, border: `1px solid ${theme.border}`, color: theme.creamDim, fontSize: 12, lineHeight: 1.5 }}>
                  {payment === "cod"
                    ? "Recomendado para empezar: el cliente paga al recibir. Si prefieres Yape o transferencia, abre el pedido por WhatsApp y confirma los datos de pago con el proveedor."
                    : "Al abrir el pedido por WhatsApp, el proveedor te compartirá los datos de pago para confirmar tu compra."}
                </div>
              </div>

              <div style={{ background: theme.bgLight, borderRadius: 14, padding: 14, border: `1px solid ${theme.border}`, marginBottom: 14 }}>
                <div style={{ color: theme.cream, fontSize: 14, fontWeight: 800, marginBottom: 10 }}>Extras del pedido</div>

                <div style={{ display: "grid", gap: 10, marginBottom: 12 }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, color: theme.cream, fontSize: 12, lineHeight: 1.4, cursor: "pointer" }}>
                    <input type="checkbox" checked={giftEnabled} onChange={(e) => setGiftEnabled(e.target.checked)} />
                    <span>Enviar como regalo</span>
                  </label>
                  {giftEnabled && (
                    <div style={{ display: "grid", gap: 8, marginTop: 4 }}>
                      <select value={giftRelation} onChange={(e) => setGiftRelation(e.target.value)} style={inputStyle}>
                        <option>Amigo(a)</option>
                        <option>Familiar</option>
                        <option>Pareja</option>
                        <option>Esposo(a)</option>
                        <option>Enamorado(a)</option>
                      </select>
                      <input value={giftName} onChange={(e) => setGiftName(e.target.value)} placeholder="Nombre de quien recibe" style={inputStyle} />
                      <input value={giftPhone} onChange={(e) => setGiftPhone(e.target.value)} placeholder="Telefono de quien recibe" style={inputStyle} />
                      <textarea value={giftMessage} onChange={(e) => setGiftMessage(e.target.value)} placeholder="Mensaje corto para la tarjeta" rows={3} style={{ ...inputStyle, resize: "vertical", minHeight: 84 }} />
                    </div>
                  )}
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, color: theme.cream, fontSize: 12, lineHeight: 1.4, cursor: "pointer" }}>
                    <input type="checkbox" checked={reservationEnabled} onChange={(e) => setReservationEnabled(e.target.checked)} />
                    <span>Programar como reserva</span>
                  </label>
                  {reservationEnabled && (
                    <div style={{ display: "grid", gap: 8, marginTop: 4 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} style={inputStyle} />
                        <input type="time" value={reservationTime} onChange={(e) => setReservationTime(e.target.value)} style={inputStyle} />
                      </div>
                      <select value={fulfillmentMode} onChange={(e) => setFulfillmentMode(e.target.value)} style={inputStyle}>
                        <option value="delivery">Entrega a domicilio</option>
                        <option value="recojo">Recojo en local</option>
                      </select>
                      <textarea value={reservationNote} onChange={(e) => setReservationNote(e.target.value)} placeholder="Nota de reserva (opcional)" rows={3} style={{ ...inputStyle, resize: "vertical", minHeight: 84 }} />
                    </div>
                  )}
                </div>
              </div>

              {activeGps && (
                <div style={{ background: "#0A1C0A", border: `1px solid ${theme.border}`, borderRadius: 14, padding: 14, marginBottom: 14, color: theme.creamDim, fontSize: 12, lineHeight: 1.5 }}>
                  <strong style={{ color: theme.greenLight }}>Ubicacion guardada:</strong> {activeGps.label}
                </div>
              )}

              <div style={{ background: theme.bgLight, borderRadius: 14, padding: 14, border: `1px solid ${theme.border}` }}>
                <div style={{ color: theme.cream, fontSize: 14, fontWeight: 800, marginBottom: 10 }}>Pedido centralizado</div>
                <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.5, marginBottom: 12 }}>
                  Completa tus datos y envía todo al mismo WhatsApp. Si mezclaste productos de dos marcas, el mensaje igual se centraliza en un solo número.
                </div>

                {groups.map((group) => {
                  const groupSubtotal = group.items.reduce((a, i) => a + i.pres.price * i.qty, 0);
                  const groupDelivery = group.items.reduce((a, i) => a + (i.zone?.cost || 0), 0);
                  const groupTotal = groupSubtotal + groupDelivery;

                  return (
                    <div key={group.supplier.key} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 12, marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                        <div>
                          <div style={{ color: theme.cream, fontWeight: 800 }}>{group.supplier.name}</div>
                          <div style={{ color: theme.textDim, fontSize: 11, marginTop: 2 }}>
                            WhatsApp: {ORDER_PHONE_DISPLAY}
                          </div>
                        </div>
                        <Badge text={group.items.length > 1 ? `${group.items.length} items` : "1 item"} color={group.supplier.key === "aswa" ? "#C47A1E" : theme.goldLight} />
                      </div>

                      <div style={{ display: "grid", gap: 8, marginBottom: 10 }}>
                        {group.items.map((item) => (
                          <div key={item.uid} style={{ display: "flex", justifyContent: "space-between", gap: 10, color: theme.creamDim, fontSize: 12 }}>
                            <span>{item.qty} x {item.product.name} ({item.pres.label})</span>
                            <span style={{ fontFamily: "monospace" }}>{formatMoney(item.qty * item.pres.price + (item.zone?.cost || 0))}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 10, marginBottom: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ color: theme.textDim, fontSize: 11 }}>Subtotal</span>
                          <span style={{ color: theme.creamDim, fontSize: 12, fontFamily: "monospace" }}>{formatMoney(groupSubtotal)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ color: theme.textDim, fontSize: 11 }}>Delivery</span>
                          <span style={{ color: theme.creamDim, fontSize: 12, fontFamily: "monospace" }}>{formatMoney(groupDelivery)}</span>
                        </div>
                        <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 6, display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: theme.cream, fontSize: 13, fontWeight: 700 }}>Total</span>
                          <span style={{ color: theme.goldLight, fontSize: 16, fontWeight: 800, fontFamily: "monospace" }}>{formatMoney(groupTotal)}</span>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <button
                          onClick={() => copyOrder(group)}
                          disabled={!canSend}
                          style={{
                            width: "100%",
                            background: theme.bgCard,
                            border: `1px solid ${theme.border}`,
                            borderRadius: 10,
                            color: theme.cream,
                            fontSize: 13,
                            fontWeight: 700,
                            padding: "12px 0",
                            cursor: canSend ? "pointer" : "not-allowed",
                            opacity: canSend ? 1 : 0.55,
                          }}
                        >
                          Copiar pedido
                        </button>
                        <button
                          onClick={() => openWhatsApp(group)}
                          disabled={!canSend}
                          style={{
                            width: "100%",
                            background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`,
                            border: "none",
                            borderRadius: 10,
                            color: "#0F1A0E",
                            fontSize: 13,
                            fontWeight: 800,
                            padding: "12px 0",
                            cursor: canSend ? "pointer" : "not-allowed",
                            opacity: canSend ? 1 : 0.7,
                          }}
                        >
                          Enviar por WhatsApp
                        </button>
                      </div>

                      {!canSend && (
                        <div style={{ marginTop: 8, color: theme.textDim, fontSize: 11 }}>
                          Completa nombre, teléfono y dirección para habilitar el envío.
                        </div>
                      )}
                    </div>
                  );
                })}

                <div style={{ marginTop: 6, background: "#0A1C0A", border: `1px solid ${theme.border}`, borderRadius: 12, padding: 12, color: theme.creamDim, fontSize: 12, lineHeight: 1.5 }}>
                  <strong style={{ color: theme.goldLight }}>Total general:</strong> {formatMoney(grandTotal)}. Este total incluye el delivery de los productos que ya llevas al carrito.
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && step === "cart" && (
          <div style={{ padding: 16, borderTop: `1px solid ${theme.border}`, background: theme.bgLight }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: theme.textDim, fontSize: 12 }}>Total (productos + delivery)</span>
              <span style={{ fontFamily: "monospace", color: theme.goldLight, fontSize: 17, fontWeight: 700 }}>{formatMoney(grandTotal)}</span>
            </div>
            <button
              onClick={() => setStep("checkout")}
              style={{ width: "100%", background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`, border: "none", borderRadius: 10, color: "#0F1A0E", fontSize: 14, fontWeight: 800, padding: "13px 0", cursor: "pointer" }}
            >
              Continuar al checkout real →
            </button>
          </div>
        )}

        {step === "checkout" && (
          <div style={{ padding: 16, borderTop: `1px solid ${theme.border}`, background: theme.bgLight, display: "flex", gap: 10 }}>
            <button
              onClick={() => setStep("cart")}
              style={{ flex: 1, background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 10, color: theme.cream, fontSize: 14, fontWeight: 700, padding: "13px 0", cursor: "pointer" }}
            >
              Volver al carrito
            </button>
            <button
              onClick={onClose}
              style={{ flex: 1, background: `linear-gradient(135deg, ${theme.green}, ${theme.greenLight})`, border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 800, padding: "13px 0", cursor: "pointer" }}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VNDRX() {
  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem("vndrx-cart-v1");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [profile, setProfile] = usePersistentState(STORAGE_KEYS.profile, () => ({
    ...DEFAULT_PROFILE,
    referralCode: makeReferralCode(),
  }));
  const [orders, setOrders] = usePersistentState(STORAGE_KEYS.orders, []);
  const [reviews, setReviews] = usePersistentState(STORAGE_KEYS.reviews, []);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeLine, setActiveLine] = useState("all");
  const [search, setSearch] = useState("");
  const [hubOpen, setHubOpen] = useState(false);
  const [hubTab, setHubTab] = useState("tutorial");
  const [toast, setToast] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [gpsState, setGpsState] = useState(null);
  const [reviewDraft, setReviewDraft] = useState({ stars: 0, note: "", tag: "" });
  const installPromptRef = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem("vndrx-cart-v1", JSON.stringify(cart));
    } catch {
      // Ignored if storage is unavailable.
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!profile.referralCode) {
      setProfile((prev) => ({ ...prev, referralCode: makeReferralCode() }));
    }
    const refFromUrl = new URLSearchParams(window.location.search).get("ref");
    if (refFromUrl && refFromUrl !== profile.referralCode && refFromUrl !== profile.referredBy) {
      setProfile((prev) => ({ ...prev, referredBy: refFromUrl.toUpperCase() }));
      showToast(`Referido detectado: ${refFromUrl.toUpperCase()}`);
    }
  }, [profile.referralCode, profile.referredBy, setProfile]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onBeforeInstall = (event) => {
      event.preventDefault();
      installPromptRef.current = event;
      setCanInstall(true);
    };
    const onInstalled = () => {
      installPromptRef.current = null;
      setCanInstall(false);
      showToast("La app ya quedo instalada", "success");
    };

    if ("serviceWorker" in navigator && window.location?.protocol?.startsWith("http")) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2800);
  };

  const addToCart = (product, pres, qty, zone) => {
    const uid = `${getSupplierKey(product)}-${product.id}-${pres.label}`;
    setCart(prev => {
      const ex = prev.find(i => i.uid === uid);
      if (ex) return prev.map(i => i.uid === uid ? { ...i, qty: i.qty + qty, zone } : i);
      return [...prev, { uid, product, pres, qty, zone }];
    });
  };

  const removeFromCart = uid => setCart(prev => prev.filter(i => i.uid !== uid));
  const cartCount = cart.reduce((a, i) => a + i.qty, 0);
  const totalHistory = orders.reduce((a, order) => a + (order.total || 0), 0);
  const bonusPoints = orders.reduce((a, order) => a + (order.bonusEarned || 0), 0);
  const bonusTier = getBonusTier(bonusPoints);
  const activeOrders = orders.filter((order) => order.status !== "entregado").length;

  const orderTotalsBySupplier = orders.reduce((acc, order) => {
    const key = order.supplierKey || "reyleon";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const topSupplierKey = Object.entries(orderTotalsBySupplier).sort((a, b) => b[1] - a[1])[0]?.[0] || "reyleon";
  const topSupplierName = topSupplierKey === "aswa" ? "ASWA" : "Rey Leon";

  const handleOrderSent = (order) => {
    setOrders((prev) => [order, ...prev].slice(0, 40));
    setProfile((prev) => ({
      ...prev,
      name: order.customer?.name || prev.name,
      phone: order.customer?.phone || prev.phone,
      district: order.customer?.district || prev.district,
      address: order.customer?.address || prev.address,
      reference: order.customer?.reference || prev.reference,
      notes: order.customer?.notes || prev.notes,
      referralCode: prev.referralCode || makeReferralCode(),
      referredBy: order.customer?.referredBy || prev.referredBy,
    }));
    showToast(`Pedido guardado. +${order.bonusEarned} bonos`, "success");
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)));
    showToast(`Estado actualizado: ${status}`);
  };

  const cycleOrderStatus = (orderId, status) => updateOrderStatus(orderId, status);

  const removeOrder = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    showToast("Pedido eliminado");
  };

  const repeatOrder = (order) => {
    const recreated = order.items.map((item, index) => ({
      ...item,
      uid: `${item.product.id}-${item.pres.label}-${Date.now()}-${index}`,
    }));
    setCart(recreated);
    setCartOpen(true);
    setHubOpen(false);
    showToast("Pedido repetido en el carrito", "success");
  };

  const openOrder = async (order) => {
    const message = buildOrderMessage({
      supplier: { key: order.supplierKey, name: order.supplierName },
      items: order.items,
      customer: order.customer,
      payment: order.paymentLabel || paymentLabel(order.payment),
      extras: order.extras || {},
    });
    const url = `https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // Clipboard optional.
    }
    showToast(`Mensaje abierto para ${ORDER_PHONE_DISPLAY}`);
  };

  const saveReview = () => {
    if (!reviewDraft.stars) {
      showToast("Elige una calificacion primero");
      return;
    }
    const entry = {
      id: `REV-${Date.now()}`,
      createdAt: new Date().toISOString(),
      stars: reviewDraft.stars,
      note: reviewDraft.note.trim(),
      tag: reviewDraft.tag.trim(),
    };
    setReviews((prev) => [entry, ...prev].slice(0, 20));
    setReviewDraft({ stars: 0, note: "", tag: "" });
    showToast("Gracias por tu calificacion", "success");
  };

  const requestGps = () => {
    if (!navigator.geolocation) {
      showToast("Tu navegador no permite GPS");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude.toFixed(6),
          lng: pos.coords.longitude.toFixed(6),
          accuracy: Math.round(pos.coords.accuracy),
        };
        const url = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
        const label = `${coords.lat}, ${coords.lng}`;
        const next = {
          ...coords,
          url,
          label,
          updatedAt: new Date().toISOString(),
        };
        setGpsState(next);
        showToast("Ubicacion lista para compartir", "success");
      },
      () => showToast("No se pudo obtener la ubicacion"),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const installApp = async () => {
    if (installPromptRef.current) {
      installPromptRef.current.prompt();
      try {
        await installPromptRef.current.userChoice;
      } catch {
        // ignore
      }
      installPromptRef.current = null;
      setCanInstall(false);
      return;
    }
    setHubOpen(true);
    setHubTab("install");
  };

  const shareReferral = async () => {
    const link = getShareUrl(profile.referralCode || "");
    const text = `Mira la tienda VNDRX y pide por WhatsApp. Codigo: ${profile.referralCode || ""}\n${link}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "VNDRX", text, url: link || undefined });
      } else {
        await navigator.clipboard.writeText(text);
      }
      setProfile((prev) => ({ ...prev, shareCount: (prev.shareCount || 0) + 1 }));
      showToast("Codigo compartido");
    } catch {
      showToast("No se pudo compartir");
    }
  };

  const copyReferral = async () => {
    const link = getShareUrl(profile.referralCode || "");
    const text = `Codigo VNDRX: ${profile.referralCode || ""}\n${link}`;
    try {
      await navigator.clipboard.writeText(text);
      setProfile((prev) => ({ ...prev, shareCount: (prev.shareCount || 0) + 1 }));
      showToast("Codigo copiado");
    } catch {
      showToast("No se pudo copiar el codigo");
    }
  };

  const supportWhatsApp = async (message) => {
    const url = `https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // Clipboard is optional.
    }
  };

  const openPromoAsset = (src) => {
    window.open(src, "_blank", "noopener,noreferrer");
  };

  const copyPromoAsset = async (asset) => {
    try {
      await navigator.clipboard.writeText(asset.message);
      showToast(`Texto copiado: ${asset.title}`);
    } catch {
      showToast("No se pudo copiar la promo");
    }
  };

  const sharePromoAsset = async (asset) => {
    const shareText = `${asset.title}\n${asset.message}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: asset.title,
          text: shareText,
          url: window.location.href,
        });
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank", "noopener,noreferrer");
      }
      showToast(`Promo compartida: ${asset.title}`);
    } catch {
      showToast("No se pudo compartir la promo");
    }
  };

  const buildDailySummary = () => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((order) => order.status !== "entregado").length;
    const deliveredOrders = orders.filter((order) => order.status === "entregado").length;
    const aswaOrders = orders.filter((order) => order.supplierKey === "aswa").length;
    const reyleonOrders = totalOrders - aswaOrders;
    const avgTicket = totalOrders ? totalHistory / totalOrders : 0;
    const topProductEntry = orders.reduce((acc, order) => {
      order.items.forEach((item) => {
        const key = `${item.product.id}-${item.pres.label}`;
        if (!acc[key]) {
          acc[key] = {
            name: item.product.name,
            label: item.pres.label,
            qty: 0,
          };
        }
        acc[key].qty += item.qty;
      });
      return acc;
    }, {});
    const topProduct = Object.values(topProductEntry).sort((a, b) => b.qty - a.qty)[0];

    return [
      "Resumen diario VNDRX",
      `Pedidos totales: ${totalOrders}`,
      `Pendientes: ${pendingOrders}`,
      `Entregados: ${deliveredOrders}`,
      `Rey Leon: ${reyleonOrders}`,
      `ASWA: ${aswaOrders}`,
      `Venta total: ${formatMoney(totalHistory)}`,
      `Ticket promedio: ${formatMoney(avgTicket)}`,
      topProduct ? `Mas vendido: ${topProduct.name} ${topProduct.label} (${topProduct.qty})` : null,
      `Pedidos centralizados en ${ORDER_PHONE_DISPLAY}`,
    ].filter(Boolean).join("\n");
  };

  const copyDailySummary = async () => {
    const text = buildDailySummary();
    try {
      await navigator.clipboard.writeText(text);
      showToast("Resumen copiado");
    } catch {
      showToast("No se pudo copiar el resumen");
    }
  };

  const shareDailySummary = async () => {
    const text = buildDailySummary();
    const url = `https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard optional.
    }
    showToast("Resumen listo para WhatsApp");
  };

  const openCartFromHub = () => {
    setHubOpen(false);
    if (cartCount === 0) {
      showToast("Primero agrega un producto al carrito");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setCartOpen(true);
    showToast("Carrito abierto");
  };

  const goCatalog = () => {
    setHubOpen(false);
    setActiveLine("all");
    setSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Catalogo listo");
  };

  const quickOrderFromHub = async () => {
    setHubOpen(false);
    await supportWhatsApp("Hola, quiero hacer un pedido en VNDRX.");
  };

  const filtered = products.filter(p => {
    const matchLine = activeLine === "all" || p.line === activeLine;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchLine && matchSearch;
  });

  const hubData = {
    profile,
    orders,
    reviews,
    reviewDraft,
    bonusPoints,
    totalHistory,
    activeOrders,
    topSupplierName,
    gpsState,
    canInstall,
    promoAssets: ASWA_PROMO_LIBRARY,
  };

  const hubActions = {
    copyReferral,
    shareReferral,
    requestGps,
    installApp,
    shareSupport: supportWhatsApp,
    openAsset: openPromoAsset,
    copyPromo: copyPromoAsset,
    sharePromo: sharePromoAsset,
    copyDailySummary,
    shareDailySummary,
    openCart: openCartFromHub,
    goCatalog,
    quickOrder: quickOrderFromHub,
    repeatOrder,
    openOrder,
    cycleOrderStatus,
    removeOrder,
    setReviewDraft,
    saveReview,
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, fontFamily: "'Segoe UI', system-ui, sans-serif", color: theme.text }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: ${theme.bg}; } ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 3px; } input { outline: none; } input::placeholder { color: ${theme.textDim}; } input:focus { border-color: ${theme.gold} !important; }`}</style>

      {/* NAV */}
      <nav style={{ background: theme.bgCard, borderBottom: `1px solid ${theme.border}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: `linear-gradient(135deg, ${theme.gold}, ${theme.greenLight})`, borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌾</div>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 800, background: `linear-gradient(90deg, ${theme.goldLight}, ${theme.greenLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>VNDRX</div>
            <div style={{ fontSize: 9, color: theme.textDim, letterSpacing: 2, fontFamily: "monospace" }}>DIRECTO DEL ORIGEN A TI</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar producto..." style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 8, color: theme.cream, padding: "7px 13px", fontSize: 13, width: 220 }} />
          <button onClick={() => setCartOpen(true)} style={{ background: cartCount > 0 ? `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})` : theme.bgLight, border: `1px solid ${cartCount > 0 ? theme.gold : theme.border}`, borderRadius: 10, color: cartCount > 0 ? "#0F1A0E" : theme.cream, padding: "7px 15px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
            🛒 {cartCount > 0 ? `${cartCount} items` : "Carrito"}
          </button>
        </div>
      </nav>

      {/* HERO / SUPPLIER CARD */}
      <div style={{ background: `linear-gradient(135deg, ${theme.bgCard}, ${theme.bgLight})`, borderBottom: `1px solid ${theme.border}`, padding: "32px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: theme.bg, border: `1px solid ${theme.gold}44`, borderRadius: 20, padding: "5px 14px", marginBottom: 14, fontSize: 11, color: theme.gold, fontFamily: "monospace", letterSpacing: 1 }}>
                🔗 CONEXIÓN DIRECTA · CERO INTERMEDIARIOS
              </div>
              <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 10px", color: theme.cream }}>
                Piladora Rey León<br />
                <span style={{ background: `linear-gradient(90deg, ${theme.gold}, ${theme.greenLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>directo a tu hogar</span>
              </h1>
              <p style={{ color: theme.creamDim, fontSize: 14, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 480 }}>
                Más de 25 años produciendo arroz de calidad en San Martín. Compra directo del molino — sin bodega, sin minimarket, sin sobreprecio.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["ISO 9001", "HACCP", "BPM"].map(c => <CertBadge key={c} cert={c} />)}
              </div>
            </div>
            <div style={{ background: theme.bg, borderRadius: 14, padding: "16px 20px", border: `1px solid ${theme.border}`, minWidth: 220 }}>
              <div style={{ color: theme.textDim, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>📞 PEDIDOS WHATSAPP</div>
              <div style={{ color: theme.gold, fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{ORDER_PHONE_DISPLAY}</div>
              <div style={{ color: theme.creamDim, fontSize: 12, marginBottom: 4 }}>ventas@reyleon.pe</div>
              <div style={{ color: theme.creamDim, fontSize: 12, marginBottom: 12 }}>arrozpacifico.com</div>
              <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 10, display: "flex", gap: 20 }}>
                {[{ n: "25+", l: "años" }, { n: "45", l: "trabajadores" }, { n: "14", l: "productos" }].map(s => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "monospace", color: theme.goldLight, fontSize: 16, fontWeight: 700 }}>{s.n}</div>
                    <div style={{ color: theme.textDim, fontSize: 10 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* ASWA card */}
            <div style={{ background: "#1A0D00", borderRadius: 14, padding: "16px 20px", border: `1px solid #C47A1E44`, minWidth: 220 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 20 }}>🌽</span>
                <div>
                  <div style={{ color: "#F0C040", fontSize: 14, fontWeight: 800, lineHeight: 1 }}>ASWA</div>
                  <div style={{ color: "#C8BC9A", fontSize: 10 }}>La Rica Chicha · Morales</div>
                </div>
              </div>
              <div style={{ color: "#7A9474", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>📞 CONTACTO DIRECTO</div>
              <div style={{ color: "#C47A1E", fontSize: 16, fontWeight: 800, marginBottom: 3 }}>986 445 531</div>
              <div style={{ color: "#C8BC9A", fontSize: 12, marginBottom: 3 }}>Pedidos: {ORDER_PHONE_DISPLAY}</div>
              <div style={{ color: "#C8BC9A", fontSize: 12, marginBottom: 10 }}>@aswa.laricachicha</div>
              <div style={{ borderTop: `1px solid #253823`, paddingTop: 10, display: "flex", gap: 14 }}>
                {[{ n: "3", l: "zonas" }, { n: "4", l: "productos" }, { n: "30–60", l: "min" }].map(s => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "monospace", color: "#F0C040", fontSize: 15, fontWeight: 700 }}>{s.n}</div>
                    <div style={{ color: "#7A9474", fontSize: 10 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PromoBoard />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 10px" }}>
        <div style={{
          background: `linear-gradient(135deg, ${theme.bgLight}, ${theme.bgCard})`,
          border: `1px solid ${theme.border}`,
          borderRadius: 18,
          padding: 16,
          boxShadow: "0 18px 30px rgba(0,0,0,0.15)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div>
              <div style={{ color: theme.goldLight, fontSize: 12, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Centro ASWA</div>
              <div style={{ color: theme.cream, fontSize: 16, fontWeight: 900, marginTop: 4 }}>Tutorial, referidos, bonos, GPS, historial y soporte en un solo lugar</div>
              <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>Lo mejor de ASWA sumado a tu tienda actual para vender mas rapido.</div>
            </div>
            <button type="button" onClick={() => { setHubTab("tutorial"); setHubOpen(true); }} style={{ background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`, border: "none", color: "#0F1A0E", borderRadius: 12, padding: "11px 14px", cursor: "pointer", fontWeight: 900 }}>
              Abrir hub
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8, marginTop: 14 }}>
            {[
              { id: "tutorial", label: "Tutorial", icon: "🎓" },
              { id: "referidos", label: "Referidos", icon: "🤝" },
              { id: "bonos", label: "Bonos", icon: "🏅" },
              { id: "gps", label: "GPS", icon: "📍" },
              { id: "historial", label: "Historial", icon: "🕘" },
              { id: "soporte", label: "Soporte", icon: "💬" },
              { id: "panel", label: "Panel", icon: "🛠️" },
              { id: "install", label: "Instalar", icon: "⬇️" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { setHubTab(item.id); setHubOpen(true); }}
                style={{
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 12,
                  padding: "11px 10px",
                  color: theme.cream,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ fontSize: 15 }}>{item.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 800, marginTop: 4 }}>{item.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LINE FILTERS */}
      <div style={{ background: theme.bgCard, borderBottom: `1px solid ${theme.border}`, padding: "12px 24px", display: "flex", gap: 8, overflowX: "auto" }}>
        {Object.entries(LINE_LABELS).map(([key, label]) => {
          const lc = key !== "all" ? LINE_COLORS[key] : null;
          const active = activeLine === key;
          return (
            <button key={key} onClick={() => setActiveLine(key)} style={{
              background: active ? (lc ? lc.badge : theme.gold) : "transparent",
              border: `1px solid ${active ? (lc ? lc.badge : theme.gold) : theme.border}`,
              borderRadius: 20, color: active ? "#0F1A0E" : theme.creamDim,
              padding: "6px 18px", cursor: "pointer", fontSize: 12,
              fontWeight: active ? 800 : 400, whiteSpace: "nowrap", transition: "all 0.2s",
            }}>
              {label}
            </button>
          );
        })}
        <span style={{ marginLeft: "auto", color: theme.textDim, fontSize: 12, alignSelf: "center", whiteSpace: "nowrap" }}>
          {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* PRODUCTS GRID */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>
        {/* San Juan promo banner */}
        {activeLine === "chicha" && (
          <div style={{
            background: "linear-gradient(135deg, #1A3A00 0%, #2D5A00 50%, #1A3A00 100%)",
            border: "2px solid #C47A1E88",
            borderRadius: 14, padding: "16px 22px", marginBottom: 28,
            display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
          }}>
            <div style={{ fontSize: 36 }}>🎉</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#F0C040", fontSize: 16, fontWeight: 800, fontFamily: "Georgia, serif" }}>
                Promociones Sanjuaneras 2026 · ASWA La Rica Chicha
              </div>
              <div style={{ color: "#C8BC9A", fontSize: 13, marginTop: 4 }}>
                ¡Vive la Fiesta de San Juan! · Hecha con maíz San Martinense · 100% natural
              </div>
            </div>
            <div style={{ background: "#C47A1E", borderRadius: 20, padding: "6px 16px", color: "#fff", fontSize: 12, fontWeight: 800 }}>
              OFERTA ESPECIAL
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", color: theme.textDim, padding: 60 }}>
            <div style={{ fontSize: 44 }}>🔍</div>
            <div style={{ marginTop: 12 }}>No encontramos productos que coincidan</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 22 }}>
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={addToCart}
                cartItem={cart.find(i => i.product.id === p.id)}
              />
            ))}
          </div>
        )}

        {/* VALUE PROPS */}
        <div style={{ marginTop: 52, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { icon: "🏭", title: "Del Molino a Ti", desc: "Compras directamente a la Piladora Rey León. Sin bodega, sin minimarket." },
            { icon: "✅", title: "ISO 9001 · HACCP · BPM", desc: "Certificaciones internacionales que garantizan calidad en cada grano." },
            { icon: "🚚", title: "Delivery por Zona", desc: "Costo fijo por zona, no por cantidad. Pides 1 o 10 sacos — mismo delivery." },
            { icon: "💰", title: "Precio de Origen", desc: "Ahorras hasta 38% vs precio de tienda al comprar directo del productor." },
          ].map(vp => (
            <div key={vp.title} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "16px 18px", textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>{vp.icon}</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 14, fontWeight: 700, color: theme.cream, margin: "8px 0 5px" }}>{vp.title}</div>
              <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.5 }}>{vp.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <div style={{
          position: "fixed",
          left: 18,
          bottom: 18,
          zIndex: 80,
          background: toast.type === "success" ? "linear-gradient(135deg, #16361b, #0d1a0e)" : "linear-gradient(135deg, #1c2318, #0d120c)",
          border: `1px solid ${toast.type === "success" ? theme.greenLight : theme.border}`,
          borderRadius: 14,
          padding: "12px 14px",
          color: theme.cream,
          boxShadow: "0 18px 30px rgba(0,0,0,0.28)",
          maxWidth: 280,
        }}>
          <div style={{ color: toast.type === "success" ? theme.greenLight : theme.goldLight, fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>{toast.type || "info"}</div>
          <div style={{ marginTop: 4, fontSize: 12, lineHeight: 1.45 }}>{toast.message}</div>
        </div>
      )}

      <ASWAControlHub
        open={hubOpen}
        tab={hubTab}
        onClose={() => setHubOpen(false)}
        onTabChange={setHubTab}
        data={hubData}
        actions={hubActions}
      />

      <button
        onClick={() => window.open(`https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent("Hola, quiero hacer un pedido en VNDRX.")}`, "_blank", "noopener,noreferrer")}
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          zIndex: 60,
          background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`,
          border: "none",
          borderRadius: 999,
          color: "#0F1A0E",
          padding: "13px 18px",
          boxShadow: "0 18px 30px rgba(0,0,0,0.35)",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span>💬</span>
        <span>Pedir por WhatsApp</span>
      </button>

      {cartOpen && (
        <CartDrawerReal
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onOrderSent={handleOrderSent}
          initialCustomer={profile}
          referralCode={profile.referralCode}
          referredBy={profile.referredBy}
          gpsState={gpsState}
        />
      )}
    </div>
  );
}
