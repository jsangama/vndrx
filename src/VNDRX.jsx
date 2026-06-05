import { useEffect, useRef, useState } from "react";

import {
  SUPABASE_ENABLED,
  SUPABASE_RUNTIME_CONFIG,
  clearSupabaseRuntimeConfig,
  readSupabaseRuntimeConfig,
  saveSupabaseRuntimeConfig,
  supabase,
} from "./lib/supabase";
import {
  SUPABASE_CHECKLIST_TEXT,
  SUPABASE_ENV_TEXT,
  SUPABASE_SCHEMA_TEXT,
} from "./lib/supabaseTemplates";
import {
  deleteOrderFromSupabase,
  fetchOrdersFromSupabase,
  fetchReviewsFromSupabase,
  probeSupabaseConnection,
  syncOrdersToSupabase,
  syncProfileToSupabase,
  syncReviewsToSupabase,
} from "./lib/supabaseSync";

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
import priceSheet from "./assets/rice/precios-arroz-1.png";
import joraHome from "./assets/jora/jora-home.svg";
import joraSazon from "./assets/jora/jora-sazon.svg";
import joraBebible from "./assets/jora/jora-bebible.svg";
import telaHome from "./assets/tela/tela-home.svg";
import telaBolsas from "./assets/tela/tela-bolsas.svg";
import telaModa from "./assets/tela/tela-moda.svg";
import telaHogar from "./assets/tela/tela-hogar.svg";
import bocaditosHome from "./assets/bocaditos/bocaditos-home.svg";
import bocaditosManiConPasas from "./assets/bocaditos/mani-con-pasas.jpg";
import bocaditosManiConfitadoRojo from "./assets/bocaditos/mani-confitado-rojo.jpg";
import bocaditosRoquitasRojas from "./assets/bocaditos/roquitas-rojas.jpg";
import bocaditosManiConfitado from "./assets/bocaditos/mani-confitado.jpg";
import bocaditosTurron from "./assets/bocaditos/turron.jpg";
import bocaditosManiTostadoSalado from "./assets/bocaditos/mani-tostado-salado.jpg";
import bocaditosTurca from "./assets/bocaditos/turca.jpg";
import bocaditosNuto from "./assets/bocaditos/nuto.jpg";
import bocaditosSuspiroColores from "./assets/bocaditos/suspiro-colores.jpg";
import bocaditosSuspiroBlanco from "./assets/bocaditos/suspiro-blanco.jpg";
import bocaditosRosquitaAlmidon from "./assets/bocaditos/rosquita-almidon.jpg";
import bocaditosCocada from "./assets/bocaditos/cocada.jpg";
import bocaditosChiflePlatano from "./assets/bocaditos/chifle-platano.jpg";
import bocaditosChifleMaduro from "./assets/bocaditos/chifle-maduro.jpg";
import bocaditosRoscaDulce from "./assets/bocaditos/rosca-dulce.svg";
import artesaniaHome from "./assets/artesania/artesania-home.svg";
import artesaniaTinaja from "./assets/artesania/artesania-tinaja.svg";
import artesaniaPlato from "./assets/artesania/artesania-plato.svg";
import artesaniaPate from "./assets/artesania/artesania-pate.svg";
import artesaniaOllaArrocera from "./assets/artesania/artesania-olla-arrocera.svg";
import artesaniaTiesto from "./assets/artesania/artesania-tiesto.svg";
import artesaniaFlorero from "./assets/artesania/artesania-florero.svg";
import riceExtraVerdeCatalogo from "./assets/rice/catalog/extra-verde-catalogo.jpeg";
import riceAnejoFeronCatalogo from "./assets/rice/catalog/anejo-feron-catalogo.jpeg";
import riceAnejoValorCatalogo from "./assets/rice/catalog/anejo-valor-catalogo.jpeg";
import riceSuperiorVerdeCatalogo from "./assets/rice/catalog/superior-verde-catalogo.jpeg";
import riceSuperiorAzulCatalogo from "./assets/rice/catalog/superior-azul-catalogo.jpeg";
import riceVallesDelGuayoCatalogo from "./assets/rice/catalog/valles-del-guayo-catalogo.jpeg";
import riceIntegradoRojoCatalogo from "./assets/rice/catalog/integrado-rojo-catalogo.jpeg";
import riceIntegradoLilaCatalogo from "./assets/rice/catalog/integrado-lila-catalogo.jpeg";
import riceArroz34Catalogo from "./assets/rice/catalog/arroz-3-4-catalogo.jpeg";
import riceArrocilloCatalogo from "./assets/rice/catalog/arrocillo-catalogo.jpeg";
import riceAfrechoCatalogo from "./assets/rice/catalog/afrecho-catalogo.jpeg";
import ricePolvilloFinoCatalogo from "./assets/rice/catalog/polvillo-fino-catalogo.jpeg";
import ricePolvilloGruesoCatalogo from "./assets/rice/catalog/polvillo-grueso-catalogo.jpeg";
import riceCascarillaPrensadaCatalogo from "./assets/rice/catalog/cascarilla-prensada-catalogo.jpeg";
import yapeQrCard from "./assets/aswa/yape-molino-card.png";

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

const HOME = {
  page: "#F4EBDD",
  surface: "#FFFDF8",
  soft: "#F9F1E5",
  soft2: "#FFF8EF",
  text: "#273128",
  muted: "#667166",
  border: "#E5D9C7",
  accent: "#A36D2C",
  accent2: "#D6A65C",
  leaf: "#47654B",
  leaf2: "#6A8A6E",
  shadow: "0 18px 36px rgba(76, 56, 23, 0.12)",
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
  joraHome,
  joraSazon,
  joraBebible,
  telaHome,
  telaBolsas,
  telaModa,
  telaHogar,
  bocaditosHome,
  bocaditosManiConPasas,
  bocaditosManiConfitadoRojo,
  bocaditosRoquitasRojas,
  bocaditosManiConfitado,
  bocaditosTurron,
  bocaditosManiTostadoSalado,
  bocaditosTurca,
  bocaditosNuto,
  bocaditosSuspiroColores,
  bocaditosSuspiroBlanco,
  bocaditosRosquitaAlmidon,
  bocaditosCocada,
  bocaditosChiflePlatano,
  bocaditosChifleMaduro,
  bocaditosRoscaDulce,
  artesaniaHome,
  artesaniaTinaja,
  artesaniaPlato,
  artesaniaPate,
  artesaniaOllaArrocera,
  artesaniaTiesto,
  artesaniaFlorero,
  yapeQr: yapeQrCard,
  yapeQrNumber: yapeQrCard,
};

const ZONES_ASWA_ESCOLAR = [
  { id: "colegio", name: "Delivery gratis a tu institución", address: "Colegios · Escuelas · Jardines · Secciones educativas", cost: 0, emoji: "🎒" },
];
const ZONES_REYLEON = [
  { id: "recojo", name: "Recojo en molino", address: "Ctra. Marginal Norte Km 9.8, Cacatachi", cost: 0, emoji: "🏭" },
  { id: "tarapoto", name: "Tarapoto", address: "Distrito de Tarapoto", cost: 0, emoji: "📍" },
  { id: "morales", name: "Morales", address: "Distrito de Morales", cost: 0, emoji: "📍" },
  { id: "banda", name: "La Banda de Shilcayo", address: "Distrito de la Banda de Shilcayo", cost: 0, emoji: "📍" },
  { id: "cacatachi", name: "Cacatachi", address: "Distrito de Cacatachi", cost: 0, emoji: "📍" },
];

const ZONES_ASWA = [
  { id: "morales", name: "Morales", address: "Aprox. 25 min", cost: 3, emoji: "📍" },
  { id: "tarapoto", name: "Tarapoto", address: "Centro y alrededores, aprox. 35 min", cost: 4, emoji: "📍" },
  { id: "banda", name: "La Banda de Shilcayo", address: "Ruta a La Banda, aprox. 45 min", cost: 5, emoji: "📍" },
  { id: "agencia", name: "Envío a agencia (nacional)", address: "Coordina recojo en agencia de transporte", cost: 10, emoji: "🚌" },
  { id: "recojo", name: "Recojo en local", address: "Morales, San Martín", cost: 0, emoji: "🏭" },
];

// COLOR por línea
const ZONES_ARTESANIA = [
  { id: "recojo", name: "Recojo en taller", address: "Morales, San Martin", cost: 0, emoji: "🏺" },
  { id: "morales", name: "Morales", address: "Aprox. 20 min", cost: 3, emoji: "📍" },
  { id: "tarapoto", name: "Tarapoto", address: "Centro y alrededores", cost: 4, emoji: "📍" },
  { id: "banda", name: "La Banda de Shilcayo", address: "Ruta a La Banda", cost: 5, emoji: "📍" },
  { id: "agencia", name: "Envio a agencia", address: "Coordina recojo en agencia de transporte", cost: 10, emoji: "🚚" },
];

const ZONES_JORA = [
  { id: "recojo", name: "Recojo en local", address: "Morales, San Martin", cost: 0, emoji: "🏠" },
  { id: "morales", name: "Morales", address: "Aprox. 25 min", cost: 3, emoji: "📍" },
  { id: "tarapoto", name: "Tarapoto", address: "Centro y alrededores", cost: 4, emoji: "📍" },
  { id: "banda", name: "La Banda de Shilcayo", address: "Ruta a La Banda", cost: 5, emoji: "📍" },
  { id: "agencia", name: "Envio a agencia", address: "Coordina recojo en agencia de transporte", cost: 10, emoji: "🛻" },
];

const ZONES_BOCADITOS = [
  { id: "recojo", name: "Recojo en local", address: "Morales, San Martin", cost: 0, emoji: "🏪" },
  { id: "morales", name: "Morales", address: "Aprox. 20 min", cost: 3, emoji: "📍" },
  { id: "tarapoto", name: "Tarapoto", address: "Centro y alrededores", cost: 4, emoji: "📍" },
  { id: "banda", name: "La Banda de Shilcayo", address: "Ruta a La Banda", cost: 5, emoji: "📍" },
  { id: "agencia", name: "Envio a agencia", address: "Coordina recojo en agencia de transporte", cost: 10, emoji: "🛵" },
];

const LINE_COLORS = {
  premium: { accent: "#1A4A14", badge: "#4A9E3F", label: "PREMIUM", bg: "#0F2D0A" },
  superior: { accent: "#1A2E4A", badge: "#3F7A9E", label: "SUPERIOR", bg: "#0A1D2D" },
  economico: { accent: "#4A1A14", badge: "#9E3F3F", label: "ECONÓMICO", bg: "#2D0A0A" },
  derivados: { accent: "#3A2A0A", badge: "#9E7A1A", label: "DERIVADOS", bg: "#2D1E00" },
  chicha: { accent: "#4A2800", badge: "#C47A1E", label: "CHICHA ASWA", bg: "#2D1500" },
  jora_culinaria: { accent: "#7A4A12", badge: "#D59B3D", label: "SAZONADOR", bg: "#3D2508" },
  jora_bebible: { accent: "#8A5A1C", badge: "#F0C040", label: "BEBIBLE", bg: "#4A2E0A" },
  jora_familiar: { accent: "#5C3A12", badge: "#C88E39", label: "FAMILIAR", bg: "#2E1B08" },
  tela_bolsas: { accent: "#29496B", badge: "#7EA6D8", label: "BOLSAS", bg: "#10213C" },
  tela_moda: { accent: "#6A3552", badge: "#D58AA7", label: "MODA REGIONAL", bg: "#3A1026" },
  tela_hogar: { accent: "#335E43", badge: "#A9CFB1", label: "HOGAR", bg: "#1F3326" },
  bocaditos_mani: { accent: "#6B3E17", badge: "#C88E39", label: "MANÍ", bg: "#2E1A08" },
  bocaditos_galleta: { accent: "#8A5A1C", badge: "#D9A34B", label: "GALLETAS", bg: "#40230A" },
  bocaditos_dulce: { accent: "#8C3F21", badge: "#D97A2E", label: "DULCES", bg: "#401C10" },
  bocaditos_chifle: { accent: "#335E43", badge: "#7DB16A", label: "CHIFLES", bg: "#1C3323" },
  artesania_barro: { accent: "#7A4A2A", badge: "#C98A5B", label: "BARRO", bg: "#2A1A11" },
  artesania_mesa: { accent: "#8C5B2A", badge: "#D6A56D", label: "MESA", bg: "#39230F" },
  artesania_decor: { accent: "#5C7A4E", badge: "#A8B78D", label: "DECOR", bg: "#1D281A" },
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
    defaultZoneId: "morales",
    presentations: [
      { label: "Recarga (ya tengo bidón)", price: 50.00, unit: "bidón" },
      { label: "Con bidón nuevo", price: 70.00, unit: "bidón" },
    ],
    saving: 0,
    cooking: "Consumir fría · Gran capacidad para fiestas y eventos",
    tip: "El delivery se cobra según tu zona. Si ya tienes tu bidón vacío, entrégalo al recibir y paga solo S/ 50.00.",
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
  // ── JORA TRADICIONAL ────────────────────────────────────────────────────────
  {
    id: 19,
    name: "Jora Sazonadora",
    subtitle: "Base natural para aderezar tus comidas",
    line: "jora_culinaria",
    supplier: "Chicha de Jora",
    img: "🍯",
    desc: "Chicha de jora pensada para cocina y aderezos. Usa esta base natural para dar mas sabor a guisos, carnes y marinados, con un perfil tradicional y aromatico.",
    quality: "Tradicional · Uso culinario",
    variety: "Maiz de jora",
    tags: ["Para aderezar", "Cocina tradicional", "Natural", "Sin conservantes"],
    defaultZoneId: "morales",
    presentations: [
      { label: "Botella 1 L", price: 7.00, unit: "botella" },
      { label: "Bidon 5 L", price: 28.00, unit: "bidon" },
    ],
    saving: 0,
    cooking: "Usa como base de aderezo en guisos, carnes y marinados.",
    tip: "Ideal para saborizar recetas tradicionales sin perder el toque natural.",
    zones: ZONES_JORA,
  },
  {
    id: 20,
    name: "Jora para Beber",
    subtitle: "Endulza al gusto para beber",
    line: "jora_bebible",
    supplier: "Chicha de Jora",
    img: "🥤",
    desc: "Si la quieres beber, endulzala al gusto con el dulce que prefieras. Recomendamos miel de abeja para un sabor mas suave y natural.",
    quality: "Bebida tradicional",
    variety: "Maiz de jora",
    tags: ["Bebible", "Endulza al gusto", "Recomendada con miel", "Natural"],
    defaultZoneId: "morales",
    presentations: [
      { label: "Botella 500 ml", price: 4.00, unit: "botella" },
      { label: "Botella 1 L", price: 7.50, unit: "botella" },
    ],
    saving: 0,
    cooking: "Servir fria o a temperatura ambiente. Endulzar al gusto.",
    tip: "Recomendamos miel de abeja para un sabor mas suave y tradicional.",
    zones: ZONES_JORA,
  },
  {
    id: 21,
    name: "Jora Familiar",
    subtitle: "Presentacion grande para compartir",
    line: "jora_familiar",
    supplier: "Chicha de Jora",
    img: "🍶",
    desc: "Presentacion familiar para la mesa del hogar o reuniones pequenas. Puedes usarla en cocina o servirla endulzada a tu gusto para compartir en casa.",
    quality: "Familiar · Para compartir",
    variety: "Maiz de jora",
    tags: ["Familiar", "Para compartir", "Cocina o bebida", "Natural"],
    defaultZoneId: "morales",
    presentations: [
      { label: "Botella 2 L", price: 13.00, unit: "botella" },
      { label: "Bidon 5 L", price: 30.00, unit: "bidon" },
    ],
    saving: 0,
    cooking: "Compartir en familia, en cocina o bebida endulzada.",
    tip: "Puedes endulzarla al gusto; la miel de abeja queda muy bien.",
    zones: ZONES_JORA,
  },
  // â”€â”€ TELA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 22,
    name: "Bolsas de Tela Reforzadas",
    subtitle: "Reusables para compras y uso diario",
    line: "tela_bolsas",
    supplier: "Tienda Tela",
    img: "👜",
    desc: "Bolsas de tela resistentes para compras, feria y uso diario. Practicas, ligeras y faciles de llevar, ideales para pedidos rapidos o para vender en detalle.",
    quality: "Resistentes y reutilizables",
    variety: "Tela reforzada",
    tags: ["Reutilizables", "Uso diario", "Ligera", "Reforzada"],
    presentations: [
      { label: "Unidad", price: 12.00, unit: "bolsa" },
      { label: "Docena", price: 120.00, unit: "paquete" },
    ],
    saving: 0,
    cooking: "Lavar a mano o en ciclo suave. Secado a la sombra.",
    tip: "Perfectas para compras, feria y regalos de marca.",
    zones: ZONES_REYLEON,
  },
  {
    id: 23,
    name: "Alforjas Artesanales",
    subtitle: "Estilo tradicional para carga ligera",
    line: "tela_bolsas",
    supplier: "Tienda Tela",
    img: "🧺",
    desc: "Alforjas artesanales con estilo tradicional, pensadas para llevar objetos personales, mercado o utiles de trabajo con un toque rustico y funcional.",
    quality: "Artesanal",
    variety: "Tela y acabados decorativos",
    tags: ["Artesanales", "Tradicionales", "Utiles", "Decorativas"],
    presentations: [
      { label: "Unidad", price: 28.00, unit: "alforja" },
      { label: "Par", price: 50.00, unit: "par" },
    ],
    saving: 0,
    cooking: "Limpiar con paño humedo y secar sin sol directo.",
    tip: "Buen producto para turismo, ferias y ventas regionales.",
    zones: ZONES_REYLEON,
  },
  {
    id: 24,
    name: "Panueloletas Regionales",
    subtitle: "Color y estilo para vestir",
    line: "tela_moda",
    supplier: "Tienda Tela",
    img: "🧣",
    desc: "Panueloletas regionales para complementar la vestimenta y resaltar la identidad local. Ligeras, coloridas y faciles de combinar.",
    quality: "Moda regional",
    variety: "Tela estampada",
    tags: ["Regional", "Coloridas", "Ligeras", "Accesorio"],
    presentations: [
      { label: "Unidad", price: 16.00, unit: "panueloleta" },
      { label: "Par", price: 30.00, unit: "par" },
    ],
    saving: 0,
    cooking: "Lavar en frio para conservar colores y textura.",
    tip: "Ideal para festividades, danzas y regalos.",
    zones: ZONES_REYLEON,
  },
  {
    id: 25,
    name: "Vestidos Regionales",
    subtitle: "Tradicion para lucir con orgullo",
    line: "tela_moda",
    supplier: "Tienda Tela",
    img: "👗",
    desc: "Vestidos regionales con corte tradicional y acabados decorativos. Pensados para presentaciones, danzas, festividades y venta por encargo.",
    quality: "Confeccion regional",
    variety: "Tela decorada",
    tags: ["Regional", "Festivo", "Por encargo", "Confeccion"],
    presentations: [
      { label: "Talla estandar", price: 120.00, unit: "vestido" },
      { label: "Confeccion especial", price: 160.00, unit: "vestido" },
    ],
    saving: 0,
    cooking: "Limpieza en seco o lavado delicado. Guardar colgado.",
    tip: "Ideal para actividades culturales, comparsas y presentaciones.",
    zones: ZONES_REYLEON,
  },
  {
    id: 26,
    name: "Mochilas Urbanas",
    subtitle: "Practicidad para estudio y trabajo",
    line: "tela_bolsas",
    supplier: "Tienda Tela",
    img: "🎒",
    desc: "Mochilas urbanas resistentes, pensadas para estudio, oficina o salidas. Buen espacio interior y estilo sencillo para el dia a dia.",
    quality: "Resistente",
    variety: "Tela reforzada",
    tags: ["Estudio", "Trabajo", "Resistente", "Comoda"],
    presentations: [
      { label: "Unidad", price: 45.00, unit: "mochila" },
      { label: "Premium", price: 65.00, unit: "mochila" },
    ],
    saving: 0,
    cooking: "Limpiar con paño humedo y dejar ventilar.",
    tip: "Ideal para escolares, oficinistas y ventas por detalle.",
    zones: ZONES_REYLEON,
  },
  {
    id: 27,
    name: "Sabanas de Algodon",
    subtitle: "Suavidad para un descanso comodo",
    line: "tela_hogar",
    supplier: "Tienda Tela",
    img: "🛏️",
    desc: "Sabanas suaves y practicas para vestir la cama con comodidad. Disponible en presentaciones para hogar, hospedaje o venta por conjunto.",
    quality: "Hogar",
    variety: "Algodon y mezcla suave",
    tags: ["Hogar", "Suaves", "Comodas", "Descanso"],
    presentations: [
      { label: "Juego sencillo", price: 55.00, unit: "juego" },
      { label: "Juego premium", price: 75.00, unit: "juego" },
    ],
    saving: 0,
    cooking: "Lavar con agua tibia y secar a la sombra.",
    tip: "Buena opcion para dormitorio y habitaciones de alquiler.",
    zones: ZONES_REYLEON,
  },
  {
    id: 28,
    name: "Edredones Acolchados",
    subtitle: "Abrigo y estilo para tu cama",
    line: "tela_hogar",
    supplier: "Tienda Tela",
    img: "🛌",
    desc: "Edredones acolchados con buena presencia y abrigo para noches frescas. Pensados para hogar, hospedaje o venta como regalo.",
    quality: "Acolchado",
    variety: "Tela suave",
    tags: ["Abrigador", "Decorativo", "Hogar", "Regalo"],
    presentations: [
      { label: "1 plaza", price: 110.00, unit: "edredon" },
      { label: "2 plazas", price: 150.00, unit: "edredon" },
    ],
    saving: 0,
    cooking: "Lavar en ciclo delicado o limpieza especializada.",
    tip: "Excelente para temporadas frías y habitaciones familiares.",
    zones: ZONES_REYLEON,
  },
  {
    id: 29,
    name: "Colchas Tejidas",
    subtitle: "Textura decorativa para el dormitorio",
    line: "tela_hogar",
    supplier: "Tienda Tela",
    img: "🧶",
    desc: "Colchas tejidas con acabado decorativo y textura agradable. Dan color y elegancia al dormitorio con una imagen mas artesanal.",
    quality: "Decorativa",
    variety: "Tejido artesanal",
    tags: ["Decorativa", "Artesanal", "Dormitorio", "Textura"],
    presentations: [
      { label: "1 plaza", price: 95.00, unit: "colcha" },
      { label: "2 plazas", price: 135.00, unit: "colcha" },
    ],
    saving: 0,
    cooking: "Lavado delicado para conservar el tejido.",
    tip: "Ideal para venta en casas, hoteles y hospedajes.",
    zones: ZONES_REYLEON,
  },
  {
    id: 30,
    name: "Cubrecamas Decorativos",
    subtitle: "Cubre y viste la cama con estilo",
    line: "tela_hogar",
    supplier: "Tienda Tela",
    img: "🪡",
    desc: "Cubrecamas decorativos para proteger y embellecer la cama. Una opcion practica para renovar habitaciones y destacar el ambiente.",
    quality: "Decorativo",
    variety: "Tela resistente",
    tags: ["Proteccion", "Decoracion", "Hogar", "Estilo"],
    presentations: [
      { label: "1 plaza", price: 120.00, unit: "cubrecama" },
      { label: "2 plazas", price: 170.00, unit: "cubrecama" },
    ],
    saving: 0,
    cooking: "Lavar en frio y evitar secadora fuerte.",
    tip: "Muy util para renovar habitaciones sin gastar demasiado.",
    zones: ZONES_REYLEON,
  },
  // â”€â”€ BOCADITOS REGIONALES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 31,
    name: "Ñuto",
    subtitle: "Bocadito artesanal tradicional",
    line: "bocaditos_galleta",
    supplier: "Bocaditos Regionales",
    img: "🍪",
    desc: "Bocadito regional de masa artesanal, ideal para la lonchera, la mesa familiar o para vender como detalle regional.",
    quality: "Artesanal",
    variety: "Tradicional",
    tags: ["Regional", "Artesanal", "Para compartir", "Dulce"],
    presentations: [
      { label: "Bolsa pequeña", price: 4.00, unit: "bolsa" },
      { label: "Bolsa familiar", price: 7.00, unit: "bolsa" },
    ],
    saving: 0,
    cooking: "Listo para comer.",
    tip: "Buen acompañante para cafe o refresco.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 32,
    name: "Rosquitas de Almidón",
    subtitle: "Rosquitas artesanales y suaves",
    line: "bocaditos_galleta",
    supplier: "Bocaditos Regionales",
    img: "🍩",
    desc: "Rosquitas artesanales de almidon con textura suave y sabor tradicional. Una opcion clásica para compartir.",
    quality: "Artesanal",
    variety: "Almidon",
    tags: ["Rosquitas", "Tradicional", "Compartir", "Casero"],
    presentations: [
      { label: "Bolsa", price: 3.50, unit: "bolsa" },
      { label: "Docena", price: 12.00, unit: "docena" },
    ],
    saving: 0,
    cooking: "Listas para comer.",
    tip: "Ideal para merienda o para vender en colegios y bodegas.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 33,
    name: "Turcas Galletas",
    subtitle: "Galletas regionales de sabor casero",
    line: "bocaditos_galleta",
    supplier: "Bocaditos Regionales",
    img: "🍪",
    desc: "Turcas galletas de corte artesanal, pensadas para acompañar el cafe o servir como bocadito de mesa.",
    quality: "Artesanal",
    variety: "Galleta regional",
    tags: ["Galletas", "Regional", "Casero", "Mesa"],
    presentations: [
      { label: "Bolsa", price: 4.00, unit: "bolsa" },
      { label: "Caja", price: 7.50, unit: "caja" },
    ],
    saving: 0,
    cooking: "Listas para comer.",
    tip: "Una presentacion simple y rica para compartir.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 34,
    name: "Maní Tostado Salado",
    subtitle: "Crujiente y clasico para picar",
    line: "bocaditos_mani",
    supplier: "Bocaditos Regionales",
    img: "🥜",
    desc: "Mani tostado salado de sabor clasico, crocante y listo para compartir en casa, ferias o para la venta por detalle.",
    quality: "Artesanal",
    variety: "Salado",
    tags: ["Mani", "Salado", "Crocante", "Clasico"],
    presentations: [
      { label: "Bolsa", price: 3.50, unit: "bolsa" },
      { label: "Paquete", price: 6.50, unit: "paquete" },
    ],
    saving: 0,
    cooking: "Listo para comer.",
    tip: "Buen detalle para kioscos y bodegas.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 35,
    name: "Maní Tostado Salado con Pasas",
    subtitle: "Mezcla crocante con un toque dulce",
    line: "bocaditos_mani",
    supplier: "Bocaditos Regionales",
    img: "🥜",
    desc: "Mezcla de mani tostado salado con pasas para un balance de sabor entre crocante, salado y dulce.",
    quality: "Artesanal",
    variety: "Con pasas",
    tags: ["Mani", "Pasas", "Mezcla", "Crocante"],
    presentations: [
      { label: "Bolsa", price: 4.00, unit: "bolsa" },
      { label: "Paquete", price: 7.00, unit: "paquete" },
    ],
    saving: 0,
    cooking: "Listo para comer.",
    tip: "Muy pedido para loncheras y reuniones.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 36,
    name: "Rosquitas Rojas",
    subtitle: "Rosquitas con brillo y color tradicional",
    line: "bocaditos_galleta",
    supplier: "Bocaditos Regionales",
    img: "🍩",
    desc: "Rosquitas rojas artesanales con acabado llamativo y sabor tradicional. Ideales para vitrina y mesa familiar.",
    quality: "Artesanal",
    variety: "Rojas",
    tags: ["Rosquitas", "Coloridas", "Tradicional", "Dulce"],
    presentations: [
      { label: "Bolsa", price: 3.50, unit: "bolsa" },
      { label: "Caja", price: 6.50, unit: "caja" },
    ],
    saving: 0,
    cooking: "Listas para comer.",
    tip: "Perfectas para vender por detalle.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 37,
    name: "Maní Confitado",
    subtitle: "Dulce crocante para compartir",
    line: "bocaditos_mani",
    supplier: "Bocaditos Regionales",
    img: "🥜",
    desc: "Mani confitado artesanal, con acabado brillante y sabor dulce para picar o vender como bocadito regional.",
    quality: "Artesanal",
    variety: "Confitado",
    tags: ["Mani", "Confitado", "Dulce", "Crocante"],
    presentations: [
      { label: "Bolsa", price: 4.50, unit: "bolsa" },
      { label: "Paquete", price: 8.00, unit: "paquete" },
    ],
    saving: 0,
    cooking: "Listo para comer.",
    tip: "Muy buena opcion para ferias y detalle de mesa.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 38,
    name: "Maní Confitado Rojo",
    subtitle: "Version roja con acabado artesanal",
    line: "bocaditos_mani",
    supplier: "Bocaditos Regionales",
    img: "🥜",
    desc: "Mani confitado rojo con color vibrante y sabor tradicional. Un bocadito llamativo para la vitrina y la mesa.",
    quality: "Artesanal",
    variety: "Confitado rojo",
    tags: ["Mani", "Rojo", "Confitado", "Dulce"],
    presentations: [
      { label: "Bolsa", price: 4.50, unit: "bolsa" },
      { label: "Paquete", price: 8.00, unit: "paquete" },
    ],
    saving: 0,
    cooking: "Listo para comer.",
    tip: "Luce muy bien como producto de detalle.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 39,
    name: "Turrón",
    subtitle: "Dulce clasico de mesa y lonche",
    line: "bocaditos_dulce",
    supplier: "Bocaditos Regionales",
    img: "🍯",
    desc: "Turron artesanal para disfrutar en familia, acompanar el cafe o vender como postre tradicional regional.",
    quality: "Artesanal",
    variety: "Tradicional",
    tags: ["Turron", "Dulce", "Regional", "Mesa"],
    presentations: [
      { label: "Porcion", price: 6.00, unit: "porcion" },
      { label: "Caja", price: 18.00, unit: "caja" },
    ],
    saving: 0,
    cooking: "Listo para comer.",
    tip: "Un clasico que siempre llama la atencion.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 40,
    name: "Chifle de Plátano",
    subtitle: "Crujiente y salado",
    line: "bocaditos_chifle",
    supplier: "Bocaditos Regionales",
    img: "🍌",
    desc: "Chifle de platano frito, crocante y sabroso para picar solo o acompanado de tus comidas.",
    quality: "Artesanal",
    variety: "Platano",
    tags: ["Chifle", "Platano", "Crujiente", "Salado"],
    presentations: [
      { label: "Bolsa", price: 4.00, unit: "bolsa" },
      { label: "Paquete", price: 7.50, unit: "paquete" },
    ],
    saving: 0,
    cooking: "Listo para comer.",
    tip: "Ideal para kiosco y venta por detalle.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 41,
    name: "Chifle de Maduro",
    subtitle: "Mas dulce y dorado",
    line: "bocaditos_chifle",
    supplier: "Bocaditos Regionales",
    img: "🍌",
    desc: "Chifle de maduro de sabor mas dulce, doradito y crujiente. Un bocadito regional muy pedido.",
    quality: "Artesanal",
    variety: "Maduro",
    tags: ["Chifle", "Maduro", "Dulce", "Crujiente"],
    presentations: [
      { label: "Bolsa", price: 4.00, unit: "bolsa" },
      { label: "Paquete", price: 7.50, unit: "paquete" },
    ],
    saving: 0,
    cooking: "Listo para comer.",
    tip: "Muy bueno para merienda o compartir.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 42,
    name: "Cocada",
    subtitle: "Dulce artesanal de coco",
    line: "bocaditos_dulce",
    supplier: "Bocaditos Regionales",
    img: "🥥",
    desc: "Cocada artesanal con sabor a coco y textura suave. Un dulce regional que gusta a grandes y chicos.",
    quality: "Artesanal",
    variety: "Coco",
    tags: ["Coco", "Dulce", "Artesanal", "Regional"],
    presentations: [
      { label: "Bolsa", price: 3.50, unit: "bolsa" },
      { label: "Caja", price: 8.00, unit: "caja" },
    ],
    saving: 0,
    cooking: "Listo para comer.",
    tip: "Buen complemento para lonche o mesa de invitados.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 43,
    name: "Suspiro Blanco",
    subtitle: "Suave, dulce y clasico",
    line: "bocaditos_dulce",
    supplier: "Bocaditos Regionales",
    img: "🍥",
    desc: "Suspiro blanco artesanal de sabor suave y apariencia delicada. Ideal para regalar o servir en reuniones familiares.",
    quality: "Artesanal",
    variety: "Blanco",
    tags: ["Suspiro", "Blanco", "Dulce", "Casero"],
    presentations: [
      { label: "Bolsa", price: 4.00, unit: "bolsa" },
      { label: "Caja", price: 9.00, unit: "caja" },
    ],
    saving: 0,
    cooking: "Listo para comer.",
    tip: "Perfecto para acompañar cafe o te.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 44,
    name: "Suspiro de Colores",
    subtitle: "Dulce colorido para vitrina",
    line: "bocaditos_dulce",
    supplier: "Bocaditos Regionales",
    img: "🍥",
    desc: "Suspiro de colores artesanal con presentacion llamativa y sabor dulce. Muy vistoso para la venta por detalle.",
    quality: "Artesanal",
    variety: "Colores",
    tags: ["Suspiro", "Colores", "Dulce", "Vistoso"],
    presentations: [
      { label: "Bolsa", price: 4.00, unit: "bolsa" },
      { label: "Caja", price: 9.00, unit: "caja" },
    ],
    saving: 0,
    cooking: "Listo para comer.",
    tip: "Luce hermoso en vitrinas y mesas de venta.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 45,
    name: "Rosca Bañada de Dulce",
    subtitle: "Rosca clasica con cobertura dulce",
    line: "bocaditos_dulce",
    supplier: "Bocaditos Regionales",
    img: "🍩",
    desc: "Rosca artesanal banada de dulce para compartir en casa o vender por encargo. Un clasico de mesa con sabor casero.",
    quality: "Artesanal",
    variety: "Banada de dulce",
    tags: ["Rosca", "Dulce", "Casero", "Compartir"],
    presentations: [
      { label: "Unidad", price: 5.00, unit: "rosca" },
      { label: "Combo 2", price: 9.00, unit: "combo" },
    ],
    saving: 0,
    cooking: "Lista para comer.",
    tip: "Ideal para cafecito y reuniones familiares.",
    zones: ZONES_BOCADITOS,
  },
  {
    id: 46,
    name: "Tinaja Lamista",
    subtitle: "Pieza de barro hecha a mano",
    line: "artesania_barro",
    supplier: "Artesania Lamista",
    img: "🏺",
    desc: "Tinaja lamista artesanal para decorar la casa o usar como pieza tradicional. Cada acabado mantiene el estilo de barro hecho a mano.",
    quality: "Hecha a mano",
    variety: "Lamista",
    tags: ["Barro", "Lamista", "Artesanal", "Decoracion"],
    presentations: [
      { label: "Pequeña", price: 48.00, unit: "pieza" },
      { label: "Grande", price: 72.00, unit: "pieza" },
    ],
    saving: 0,
    cooking: "Lavar con agua tibia, secar bien y evitar golpes bruscos.",
    tip: "Pieza fragil: cada tinaja puede variar ligeramente.",
    zones: ZONES_ARTESANIA,
  },
  {
    id: 47,
    name: "Plato Artesanal",
    subtitle: "Para mesa, regalo o decoracion",
    line: "artesania_mesa",
    supplier: "Artesania Lamista",
    img: "🍽️",
    desc: "Plato artesanal de barro con acabado tradicional para vestir la mesa, regalar o complementar una coleccion lamista.",
    quality: "Hecho a mano",
    variety: "Mesa",
    tags: ["Plato", "Artesanal", "Mesa", "Regalo"],
    presentations: [
      { label: "Unidad", price: 14.00, unit: "plato" },
      { label: "Juego x4", price: 48.00, unit: "juego" },
    ],
    saving: 0,
    cooking: "Lavar a mano y secar por completo antes de guardar.",
    tip: "Perfecto para servir o decorar con estilo regional.",
    zones: ZONES_ARTESANIA,
  },
  {
    id: 48,
    name: "Pate Artesanal",
    subtitle: "Pieza utilitaria de barro",
    line: "artesania_barro",
    supplier: "Artesania Lamista",
    img: "🥘",
    desc: "Pate de barro artesanal para cocina, presentacion o decoracion. Mantiene el acabado tradicional lamista y un estilo rustico elegante.",
    quality: "Hecho a mano",
    variety: "Utilitario",
    tags: ["Barro", "Utilitario", "Lamista", "Cocina"],
    presentations: [
      { label: "Unidad", price: 28.00, unit: "pieza" },
      { label: "Grande", price: 40.00, unit: "pieza" },
    ],
    saving: 0,
    cooking: "Evitar cambios bruscos de temperatura y secar bien.",
    tip: "Cada pieza artesanal tiene pequenas variaciones naturales.",
    zones: ZONES_ARTESANIA,
  },
  {
    id: 49,
    name: "Olla Arrocera de Barro",
    subtitle: "Para cocina lenta y sabor casero",
    line: "artesania_barro",
    supplier: "Artesania Lamista",
    img: "🍲",
    desc: "Olla arrocera de barro hecha a mano para quienes aman cocinar con un toque tradicional y casero.",
    quality: "Hecha a mano",
    variety: "Cocina",
    tags: ["Olla", "Barro", "Cocina", "Tradicional"],
    presentations: [
      { label: "Pequeña", price: 35.00, unit: "pieza" },
      { label: "Grande", price: 55.00, unit: "pieza" },
    ],
    saving: 0,
    cooking: "Curar antes del primer uso y lavar con agua tibia.",
    tip: "Ideal para cocina lenta y una mesa con identidad.",
    zones: ZONES_ARTESANIA,
  },
  {
    id: 50,
    name: "Tiesto de Barro",
    subtitle: "Decoracion utilitaria de barro",
    line: "artesania_decor",
    supplier: "Artesania Lamista",
    img: "🪴",
    desc: "Tiesto de barro lamista para plantas, decoracion o uso utilitario. Un detalle sencillo que da calidez al hogar.",
    quality: "Hecho a mano",
    variety: "Decorativo",
    tags: ["Tiesto", "Barro", "Decoracion", "Hogar"],
    presentations: [
      { label: "Unidad", price: 20.00, unit: "pieza" },
      { label: "Decorado", price: 32.00, unit: "pieza" },
    ],
    saving: 0,
    cooking: "Evitar caidas y secar bien luego de limpiarlo.",
    tip: "Perfecto para plantas pequenas o rincones del hogar.",
    zones: ZONES_ARTESANIA,
  },
  {
    id: 51,
    name: "Florero de Barro Lamista",
    subtitle: "Decoracion tradicional para el hogar",
    line: "artesania_decor",
    supplier: "Artesania Lamista",
    img: "💐",
    desc: "Florero de barro lamista para flores naturales o secas. Una pieza decorativa con identidad regional y acabado artesanal.",
    quality: "Hecho a mano",
    variety: "Decoracion",
    tags: ["Florero", "Barro", "Decoracion", "Lamista"],
    presentations: [
      { label: "Unidad", price: 25.00, unit: "pieza" },
      { label: "Decorado", price: 38.00, unit: "pieza" },
    ],
    saving: 0,
    cooking: "Limpieza suave y evitar golpes.",
    tip: "Muy bueno para adornar salas, vitrinas o regalos.",
    zones: ZONES_ARTESANIA,
  },
];

const LINE_LABELS = {
  all: "Todos",
  premium: "Premium",
  superior: "Superior",
  economico: "Económico",
  derivados: "Derivados",
  chicha: "Chicha ASWA",
  jora_culinaria: "Sazonador",
  jora_bebible: "Bebible",
  jora_familiar: "Familiar",
  tela_bolsas: "Bolsas y mochilas",
  tela_moda: "Moda regional",
  tela_hogar: "Hogar y descanso",
  bocaditos_mani: "Mani",
  bocaditos_galleta: "Galletas",
  bocaditos_dulce: "Dulces",
  bocaditos_chifle: "Chifles",
  artesania_barro: "Barro",
  artesania_mesa: "Mesa",
  artesania_decor: "Decor",
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
  jora: {
    key: "jora",
    name: "Chicha de Jora",
    shortName: "Jora",
    phone: "51955273229",
    displayPhone: "955 273 229",
    instagram: "@jora.tradicional",
  },
  tela: {
    key: "tela",
    name: "Tienda Tela",
    shortName: "Tela",
    phone: "51955273229",
    displayPhone: "955 273 229",
    instagram: "@tienda.tela",
  },
  bocaditos: {
    key: "bocaditos",
    name: "Bocaditos Regionales",
    shortName: "Bocaditos",
    phone: "51955273229",
    displayPhone: "955 273 229",
    instagram: "@bocaditos.artesanales",
  },
  artesania: {
    key: "artesania",
    name: "Artesania Lamista",
    shortName: "Artesania",
    phone: "51955273229",
    displayPhone: "955 273 229",
    instagram: "@artesania.lamista",
  },
};

const COMPANY_VIEWS = {
  reyleon: {
    key: "reyleon",
    name: "Piladora Rey León",
    shortName: "Rey León",
    tagline: "Arroz directo del molino",
    description: "Elige Rey León para ver todos sus arroces, derivados y precios de origen. Menos ruido al inicio, más claridad para comprar rápido.",
    heroTitle: "Pide tu arroz sin enredos",
    heroText: "Fotos reales, precios visibles y delivery por zona para que el cliente encuentre rápido lo que busca.",
    heroChips: ["Arroz premium", "Precios de origen", "Delivery por zona"],
    heroImage: priceSheet,
    heroNote: "MOLINO DIRECTO",
    infoTitle: "Piladora Rey León",
    infoBody: "Arroz para hogar, menús, restaurantes e industria. Revisa premium, superior, económico y derivados en un catálogo limpio.",
    companyPhone: SUPPLIERS.reyleon.displayPhone,
    companyContact: "Ventas directas del molino",
    primaryButton: "Ver arroces",
    secondaryButton: "Cambiar empresa",
    look: {
      page: "linear-gradient(180deg, #FBF7EF 0%, #F4EBDD 44%, #ECE3D5 100%)",
      heroTop: "#FFF9F2",
      heroBottom: "#F3E7D4",
      nav: "rgba(255, 253, 248, 0.92)",
      surface: "#FFFDF8",
      surface2: "#FFF8EE",
      accent: "#A36D2C",
      accent2: "#D6A65C",
      leaf: "#47654B",
      leaf2: "#6A8A6E",
      shadow: "0 20px 40px rgba(76, 56, 23, 0.14)",
      glow: "radial-gradient(circle at 0% 0%, rgba(163,109,44,0.20) 0, transparent 32%), radial-gradient(circle at 100% 0%, rgba(71,101,75,0.12) 0, transparent 30%)",
    },
  },
  aswa: {
    key: "aswa",
    name: "ASWA La Rica Chicha",
    shortName: "ASWA",
    tagline: "Chicha, bidón y escolares",
    description: "Elige ASWA para ver las promociones sanjuaneras, chicha, bidón 20L y escolares con delivery gratis para instituciones.",
    heroTitle: "ASWA para pedidos rápidos",
    heroText: "Chicha, bidón y combo escolar con fotos reales, pago por Yape y acceso directo a su app.",
    heroChips: ["Delivery gratis escolar", "Bidón 20L", "App ASWA"],
    heroImage: ASSETS.promoMain,
    heroNote: "SAN JUAN 2026",
    infoTitle: "ASWA La Rica Chicha",
    infoBody: "La Rica Chicha para colegios, eventos y pedidos de temporada. El bidón público cobra delivery por zona y los escolares mantienen delivery gratis.",
    companyPhone: SUPPLIERS.aswa.displayPhone,
    companyContact: "Pedidos sanjuaneros y escolares",
    primaryButton: "Ver productos ASWA",
    secondaryButton: "Abrir app ASWA",
    look: {
      page: "linear-gradient(180deg, #FBF3E4 0%, #F4ECDD 42%, #EAF0E2 100%)",
      heroTop: "#FFF8E9",
      heroBottom: "#EDF4E8",
      nav: "rgba(255, 252, 245, 0.92)",
      surface: "#FFFDF8",
      surface2: "#FFF7EB",
      accent: "#47654B",
      accent2: "#C47A1E",
      leaf: "#47654B",
      leaf2: "#6A8A6E",
      shadow: "0 22px 44px rgba(71, 101, 75, 0.14)",
      glow: "radial-gradient(circle at 10% 0%, rgba(71,101,75,0.20) 0, transparent 30%), radial-gradient(circle at 90% 0%, rgba(196,122,30,0.18) 0, transparent 32%)",
    },
  },
  jora: {
    key: "jora",
    name: "Chicha de Jora",
    shortName: "Jora",
    tagline: "Sazonador y bebida natural",
    description: "Elige Jora para ver solo chicha de jora: puedes usarla para aderezar tu comida o beberla endulzada a tu gusto, idealmente con miel de abeja.",
    heroTitle: "Chicha de jora para casa",
    heroText: "Una tienda separada para chicha de jora, pensada para sazonar tus comidas o tomarla endulzada con miel de abeja o tu endulzante favorito.",
    heroChips: ["Para sazonar", "Para beber", "Miel recomendada"],
    heroImage: ASSETS.joraHome,
    heroNote: "JORA TRADICIONAL",
    infoTitle: "Chicha de Jora",
    infoBody: "Tienda separada para chicha de jora: aderezo natural para cocina y bebida tradicional endulzada al gusto.",
    companyPhone: SUPPLIERS.jora.displayPhone,
    companyContact: "Pedidos y consejos de uso",
    primaryButton: "Ver Jora",
    secondaryButton: "Cambiar empresa",
    look: {
      page: "linear-gradient(180deg, #FCF4E7 0%, #F5E9D7 46%, #EFE0C9 100%)",
      heroTop: "#FFF7E9",
      heroBottom: "#F3E1C2",
      nav: "rgba(255, 250, 240, 0.92)",
      surface: "#FFFDF8",
      surface2: "#FFF7E8",
      accent: "#8A5A1C",
      accent2: "#D59B3D",
      leaf: "#6B4210",
      leaf2: "#D59B3D",
      shadow: "0 22px 44px rgba(107, 66, 16, 0.14)",
      glow: "radial-gradient(circle at 0% 0%, rgba(213,155,61,0.24) 0, transparent 30%), radial-gradient(circle at 100% 100%, rgba(138,90,28,0.16) 0, transparent 28%)",
    },
  },
  tela: {
    key: "tela",
    name: "Tienda Tela",
    shortName: "Tela",
    tagline: "Bolsas, moda regional y hogar",
    description: "Elige Tela para ver bolsas, alforjas, panueloletas, vestidos regionales, mochilas, sabanas, edredones, colchas y cubrecamas en una tienda separada.",
    heroTitle: "Tela para vestir y decorar",
    heroText: "Una tienda propia para textiles del hogar, accesorios y moda regional. Todo listo para elegir sin mezclarlo con otras categorias.",
    heroChips: ["Bolsas y mochilas", "Moda regional", "Hogar y descanso"],
    heroImage: ASSETS.telaHome,
    heroNote: "TEXTIL TIENDA",
    infoTitle: "Tienda Tela",
    infoBody: "Bolsas, alforjas, panueloletas, vestidos regionales, mochilas, sabanas, edredones, colchas y cubrecamas.",
    companyPhone: SUPPLIERS.tela.displayPhone,
    companyContact: "Pedidos textiles y hogar",
    primaryButton: "Ver productos Tela",
    secondaryButton: "Cotizar por WhatsApp",
    look: {
      page: "linear-gradient(180deg, #FBF4F7 0%, #F3E8EC 46%, #E9E1EA 100%)",
      heroTop: "#FFF8FB",
      heroBottom: "#F0E3EA",
      nav: "rgba(255, 252, 248, 0.92)",
      surface: "#FFFDF8",
      surface2: "#FFF6F9",
      accent: "#6A3552",
      accent2: "#D58AA7",
      leaf: "#335E43",
      leaf2: "#A9CFB1",
      shadow: "0 22px 44px rgba(106, 53, 82, 0.13)",
      glow: "radial-gradient(circle at 0% 0%, rgba(213,138,167,0.22) 0, transparent 30%), radial-gradient(circle at 100% 0%, rgba(106,53,82,0.16) 0, transparent 32%)",
    },
  },
  bocaditos: {
    key: "bocaditos",
    name: "Bocaditos Regionales",
    shortName: "Bocaditos",
    tagline: "Artesanales dulces y salados",
    description: "Elige Bocaditos para ver ñuto, rosquitas, turcas, maní tostado, maní confitado, turrón, chifles, cocada, suspiros y rosca bañada de dulce en una tienda separada.",
    heroTitle: "Bocaditos para compartir",
    heroText: "Una tienda propia para bocaditos regionales artesanales. Ideal para compartir, regalar o acompañar tu café y tus reuniones.",
    heroChips: ["Maní y galletas", "Dulces", "Chifles"],
    heroImage: ASSETS.bocaditosHome,
    heroNote: "BOCADITOS 100%",
    infoTitle: "Bocaditos Regionales",
    infoBody: "Una tienda separada para bocaditos artesanales: maní, galletas, chifles y dulces regionales.",
    companyPhone: SUPPLIERS.bocaditos.displayPhone,
    companyContact: "Pedidos artesanales y regionales",
    primaryButton: "Ver bocaditos",
    secondaryButton: "Pedir por WhatsApp",
    look: {
      page: "linear-gradient(180deg, #FBF1E5 0%, #F5E6D7 46%, #EFE0CF 100%)",
      heroTop: "#FFF8EE",
      heroBottom: "#F3E2D1",
      nav: "rgba(255, 252, 248, 0.92)",
      surface: "#FFFDF8",
      surface2: "#FFF7EE",
      accent: "#B66A2C",
      accent2: "#D97A2E",
      leaf: "#8C3F21",
      leaf2: "#D9A34B",
      shadow: "0 22px 44px rgba(182, 106, 44, 0.13)",
      glow: "radial-gradient(circle at 0% 0%, rgba(217,122,46,0.20) 0, transparent 30%), radial-gradient(circle at 100% 0%, rgba(140,63,33,0.16) 0, transparent 32%)",
    },
  },
  artesania: {
    key: "artesania",
    name: "Artesania Lamista",
    shortName: "Artesania",
    tagline: "Barro hecho a mano",
    description: "Elige Artesania para ver tinajas lamistas, platos artesanales, pate, olla arrocera de barro, tiestos y floreros en una tienda separada.",
    heroTitle: "Artesania que viste tu casa",
    heroText: "Piezas de barro y decoracion hechas a mano para cocina, mesa, regalo o adorno. Todo en una tienda separada y facil de pedir.",
    heroChips: ["Barro lamista", "Hecho a mano", "Decoracion"],
    heroImage: ASSETS.artesaniaHome,
    heroNote: "BARRO LAMISTA",
    infoTitle: "Artesania Lamista",
    infoBody: "Piezas de barro y utilitarios hechos a mano para tu casa, cocina o decoracion.",
    companyPhone: SUPPLIERS.artesania.displayPhone,
    companyContact: "Pedidos de barro y decoracion",
    primaryButton: "Ver artesania",
    secondaryButton: "Pedir por WhatsApp",
    look: {
      page: "linear-gradient(180deg, #F8F2E9 0%, #F2E8DB 46%, #E9DFD0 100%)",
      heroTop: "#FFF8F2",
      heroBottom: "#F0E4D6",
      nav: "rgba(255, 252, 248, 0.92)",
      surface: "#FFFDF8",
      surface2: "#FFF7EF",
      accent: "#7A4A2A",
      accent2: "#C98A5B",
      leaf: "#5C7A4E",
      leaf2: "#A8B78D",
      shadow: "0 22px 44px rgba(122, 74, 42, 0.13)",
      glow: "radial-gradient(circle at 0% 0%, rgba(201,138,91,0.20) 0, transparent 30%), radial-gradient(circle at 100% 0%, rgba(92,122,78,0.16) 0, transparent 32%)",
    },
  },
};

const COMPANY_FILTERS = {
  reyleon: [
    { id: "all", label: "Todos" },
    { id: "premium", label: "Premium" },
    { id: "superior", label: "Superior" },
    { id: "economico", label: "Económico" },
    { id: "derivados", label: "Derivados" },
  ],
  aswa: [
    { id: "all", label: "Todos" },
    { id: "chicha", label: "Chicha" },
    { id: "bidon", label: "Bidón" },
    { id: "escolar", label: "Escolar" },
  ],
  jora: [
    { id: "all", label: "Todos" },
    { id: "jora_culinaria", label: "Sazonador" },
    { id: "jora_bebible", label: "Bebible" },
    { id: "jora_familiar", label: "Familiar" },
  ],
  tela: [
    { id: "all", label: "Todos" },
    { id: "tela_bolsas", label: "Bolsas y mochilas" },
    { id: "tela_moda", label: "Moda regional" },
    { id: "tela_hogar", label: "Hogar y descanso" },
  ],
  bocaditos: [
    { id: "all", label: "Todos" },
    { id: "bocaditos_mani", label: "Maní" },
    { id: "bocaditos_galleta", label: "Galletas" },
    { id: "bocaditos_dulce", label: "Dulces" },
    { id: "bocaditos_chifle", label: "Chifles" },
  ],
  artesania: [
    { id: "all", label: "Todos" },
    { id: "artesania_barro", label: "Barro" },
    { id: "artesania_mesa", label: "Mesa" },
    { id: "artesania_decor", label: "Decoracion" },
  ],
};

const ORDER_PHONE = "51955273229";
const ORDER_PHONE_DISPLAY = "955 273 229";
const ASWA_APP_URL = "https://jsangama.github.io/aswa/?v=guide141";
const REYLEON_PAYMENT_METHODS = [
  {
    val: "cod",
    label: "Pago contra entrega",
    badge: "EF",
    detail: "Paga al recibir tu pedido",
    hint: "Efectivo exacto al motorizado o en el local.",
    color: theme.greenLight,
  },
  {
    val: "yape",
    label: "Yape",
    badge: "YP",
    detail: "918 429 034 · Noyolith Quine Rojas",
    hint: "Envía tu comprobante al WhatsApp del molino.",
    color: "#C084FC",
  },
  {
    val: "plin",
    label: "Plin",
    badge: "PL",
    detail: "Datos del molino por WhatsApp",
    hint: "Se comparte antes de confirmar el pago.",
    color: "#22C55E",
  },
  {
    val: "bim",
    label: "BIM",
    badge: "BM",
    detail: "Datos del molino por WhatsApp",
    hint: "Se comparte antes de confirmar el pago.",
    color: "#F59E0B",
  },
  {
    val: "agora",
    label: "Agora",
    badge: "AG",
    detail: "Enlace del molino por WhatsApp",
    hint: "Te compartimos el enlace de pago.",
    color: "#FB7185",
  },
  {
    val: "bbva",
    label: "Transferencia BBVA",
    badge: "BV",
    detail: "NET CASH BBVA ZURITA",
    account: "0011-0310-01-00167706",
    cci: "011-0310-01-00167706-28",
    hint: "Cuenta y CCI del molino para transferencias.",
    color: "#60A5FA",
  },
  {
    val: "bcp",
    label: "Transferencia BCP",
    badge: "BC",
    detail: "NET CASH BCP ZURITA",
    account: "550-146-407-751-071",
    cci: "002-550-114-640-751-071-28",
    hint: "Cuenta y CCI del molino para transferencias.",
    color: "#FB923C",
  },
  {
    val: "card",
    label: "Tarjeta / online",
    badge: "ON",
    detail: "Link del molino por WhatsApp",
    hint: "Compartimos el enlace de cobro.",
    color: "#A78BFA",
  },
];
const REYLEON_BANK_DETAILS = {
  bbva: {
    bank: "NET CASH BBVA ZURITA",
    account: "0011-0310-01-00167706",
    cci: "011-0310-01-00167706-28",
  },
  bcp: {
    bank: "NET CASH BCP ZURITA",
    account: "550-146-407-751-071",
    cci: "002-550-114-640-751-071-28",
  },
};
const ASWA_PAYMENT_REMOTE_QRS = {
  yape: "https://jsangama.github.io/aswa/assets/images/embedded/qr-1-13161f6f2f35.jpg",
  plin_bbva: "https://jsangama.github.io/aswa/assets/images/embedded/qr-2-5305f8bf2727.jpg",
  plin_ibk: "https://jsangama.github.io/aswa/assets/images/embedded/qr-3-c5ac10b27d47.jpg",
  bim: "https://jsangama.github.io/aswa/assets/images/embedded/qr-4-7074a3e7e686.jpg",
  agora: "https://jsangama.github.io/aswa/assets/images/embedded/qr-5-02a305862e47.jpg",
  binance: "https://jsangama.github.io/aswa/assets/images/embedded/qr-6-755481b36bc7.jpg",
};
const ASWA_PAYMENT_METHODS = [
  {
    val: "cod",
    label: "Pago contra entrega",
    badge: "EF",
    detail: "Paga al recibir tu pedido",
    hint: "Efectivo exacto al motorizado o en el local.",
    color: theme.greenLight,
  },
  {
    val: "yape",
    label: "Yape",
    badge: "YP",
    detail: "+51 947 999 736 · Telma Pezo Melendez",
    hint: "Escanea el QR oficial de ASWA o comparte la captura al WhatsApp de pedidos.",
    color: "#C084FC",
  },
  {
    val: "plin_bbva",
    label: "Plin BBVA",
    badge: "PB",
    detail: "+51 947 999 736",
    hint: "Metodo oficial de ASWA compartido por WhatsApp.",
    color: "#2563EB",
  },
  {
    val: "plin_ibk",
    label: "Plin Interbank",
    badge: "PI",
    detail: "+51 947 999 736",
    hint: "Metodo oficial de ASWA compartido por WhatsApp.",
    color: "#16A34A",
  },
  {
    val: "bim",
    label: "BIM",
    badge: "BM",
    detail: "947 999 736",
    hint: "Metodo oficial de ASWA compartido por WhatsApp.",
    color: "#F59E0B",
  },
  {
    val: "agora",
    label: "Agora",
    badge: "AG",
    detail: "Telma Pezo Melendez",
    hint: "Metodo oficial de ASWA compartido por WhatsApp.",
    color: "#FB7185",
  },
  {
    val: "binance",
    label: "Binance Pay",
    badge: "BN",
    detail: "User-be284 / UID: 1225926023",
    hint: "Metodo oficial de ASWA compartido por WhatsApp.",
    color: "#FCD34D",
  },
  {
    val: "interbank",
    label: "Transferencia Interbank",
    badge: "IB",
    detail: "Cuenta y CCI del negocio",
    hint: "Usa los datos del cuadro para transferir.",
    color: "#60A5FA",
  },
  {
    val: "bbva",
    label: "Transferencia BBVA",
    badge: "BV",
    detail: "Cuenta y CCI del negocio",
    hint: "Usa los datos del cuadro para transferir.",
    color: "#3B82F6",
  },
  {
    val: "banbif",
    label: "Transferencia Banbif",
    badge: "BF",
    detail: "Cuenta y CCI del negocio",
    hint: "Usa los datos del cuadro para transferir.",
    color: "#8B5CF6",
  },
  {
    val: "card",
    label: "Tarjeta / online",
    badge: "ON",
    detail: "Link de cobro por WhatsApp",
    hint: "Compartimos el enlace al confirmar.",
    color: "#A78BFA",
  },
];
const ASWA_BANK_DETAILS = {
  interbank: {
    bank: "Interbank",
    account: "8983297623941",
    cci: "00389801329762394149",
  },
  bbva: {
    bank: "BBVA",
    account: "0011-0310-0201637924",
    cci: "01131000020163792406",
    swift: "BCONPEPL",
  },
  banbif: {
    bank: "Banbif",
    account: "008033954299",
    cci: "03868010803395429956",
  },
};
const REYLEON_DIGITAL_PAYMENT_DETAILS = {
  yape: {
    title: "Yape del molino",
    number: "918 429 034",
    holder: "Noyolith Quine Rojas",
    qr: ASSETS.yapeQr,
    note: "Escanea el QR o comparte el numero para que el cliente pague directo al molino.",
  },
};
const ASWA_DIGITAL_PAYMENT_DETAILS = {
  yape: {
    title: "Yape ASWA",
    number: "+51 947 999 736",
    holder: "Telma Pezo Melendez",
    qr: ASWA_PAYMENT_REMOTE_QRS.yape,
    note: "Pago oficial publicado por ASWA.",
  },
  plin_bbva: {
    title: "Plin BBVA",
    number: "+51 947 999 736",
    holder: "Telma Pezo Melendez",
    qr: ASWA_PAYMENT_REMOTE_QRS.plin_bbva,
    note: "Pago oficial publicado por ASWA.",
  },
  plin_ibk: {
    title: "Plin Interbank",
    number: "+51 947 999 736",
    holder: "Telma Pezo Melendez",
    qr: ASWA_PAYMENT_REMOTE_QRS.plin_ibk,
    note: "Pago oficial publicado por ASWA.",
  },
  bim: {
    title: "BIM",
    number: "947 999 736",
    holder: "Telma Pezo Melendez",
    qr: ASWA_PAYMENT_REMOTE_QRS.bim,
    note: "Pago oficial publicado por ASWA.",
  },
  agora: {
    title: "Agora",
    number: "Telma Pezo Melendez",
    holder: "ASWA",
    qr: ASWA_PAYMENT_REMOTE_QRS.agora,
    note: "Pago oficial publicado por ASWA.",
  },
  binance: {
    title: "Binance Pay",
    number: "User-be284 / UID: 1225926023",
    holder: "ASWA",
    qr: ASWA_PAYMENT_REMOTE_QRS.binance,
    note: "Pago oficial publicado por ASWA.",
  },
};
const PAYMENT_PROFILES = {
  reyleon: {
    key: "reyleon",
    title: "Cuadro de pagos del molino",
    badge: "REY LEON",
    intro: "Elige tu medio de pago y revisa los datos del molino antes de cerrar el pedido.",
    methods: REYLEON_PAYMENT_METHODS,
    digitalDetails: REYLEON_DIGITAL_PAYMENT_DETAILS,
    bankDetails: REYLEON_BANK_DETAILS,
    contactNote: `Envia tu comprobante al WhatsApp del molino: ${ORDER_PHONE_DISPLAY}.`,
  },
  aswa: {
    key: "aswa",
    title: "Cuadro de pagos ASWA",
    badge: "ASWA",
    intro: "Metodos publicados por ASWA. Usa el Yape oficial o pide por WhatsApp los datos del metodo elegido.",
    methods: ASWA_PAYMENT_METHODS,
    digitalDetails: ASWA_DIGITAL_PAYMENT_DETAILS,
    bankDetails: ASWA_BANK_DETAILS,
    contactNote: "Envia tu comprobante al WhatsApp de ASWA: 955 273 229 / 986 445 531.",
  },
};
const ASWA_PAYMENT_STORE_KEYS = new Set(["aswa", "tela", "bocaditos", "artesania"]);
const paymentBadgeStyle = (opt, selected = false) => ({
  width: 38,
  height: 38,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: selected ? `linear-gradient(135deg, ${opt.color}, ${opt.color}66)` : theme.bgCard,
  border: `1px solid ${selected ? opt.color : theme.border}`,
  color: selected ? "#0F1A0E" : opt.color,
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: 0.6,
  boxShadow: selected ? `0 0 0 4px ${opt.color}22` : "none",
});
function getPaymentProfile(storeKey) {
  return PAYMENT_PROFILES[storeKey] || PAYMENT_PROFILES.reyleon;
}
const paymentDetailCardStyle = (tone = "#60A5FA") => ({
  marginTop: 12,
  background: `linear-gradient(135deg, ${tone}20, #11120f)`,
  border: `1px solid ${tone}66`,
  borderRadius: 14,
  padding: 12,
});
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
];

const JORA_PROMO_LIBRARY = [
  {
    id: "jora-sazonadora",
    src: ASSETS.joraSazon,
    title: "Jora Sazonadora",
    subtitle: "Base natural para aderezar tus comidas",
    note: "COCINA",
    accent: "#D59B3D",
    featured: true,
    message: "Chicha de jora para sazonar comidas y dar mas sabor a guisos, carnes y marinados. Pedidos al 955 273 229.",
  },
  {
    id: "jora-bebible",
    src: ASSETS.joraBebible,
    title: "Jora para beber",
    subtitle: "Endulza al gusto",
    note: "BEBIBLE",
    accent: "#F0C040",
    featured: true,
    message: "Chicha de jora para beber: endulzala al gusto; recomendamos miel de abeja para un sabor mas suave. Pedidos al 955 273 229.",
  },
  {
    id: "jora-familiar",
    src: ASSETS.joraHome,
    title: "Jora familiar",
    subtitle: "Presentacion para compartir",
    note: "FAMILIA",
    accent: "#8A5A1C",
    featured: true,
    message: "Chicha de jora en presentacion familiar para compartir en casa o en cocina. Pedidos al 955 273 229.",
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
  if (product.supplier?.toLowerCase().includes("jora")) return "jora";
  if (product.supplier?.toLowerCase().includes("tela")) return "tela";
  if (product.supplier?.toLowerCase().includes("bocaditos")) return "bocaditos";
  if (product.supplier?.toLowerCase().includes("artesan") || product.supplier?.toLowerCase().includes("lamista")) return "artesania";
  return product.line === "chicha" ? "aswa" : "reyleon";
}

function getSupplier(product) {
  return SUPPLIERS[getSupplierKey(product)];
}

function getProductCategory(product) {
  const supplierKey = getSupplierKey(product);
  if (supplierKey === "aswa") {
    if (product.id === 16) return "bidon";
    if (product.schoolOnly || product.id === 17 || product.id === 18) return "escolar";
    return "chicha";
  }
  return product.line;
}

const PRODUCT_MEDIA = {
  1: { src: riceExtraVerdeCatalogo, fit: "cover" },
  2: { src: riceAnejoFeronCatalogo, fit: "cover" },
  3: { src: riceAnejoValorCatalogo, fit: "contain" },
  4: { src: riceSuperiorVerdeCatalogo, fit: "contain" },
  5: { src: riceSuperiorAzulCatalogo, fit: "contain" },
  6: { src: riceVallesDelGuayoCatalogo, fit: "contain" },
  7: { src: riceIntegradoRojoCatalogo, fit: "contain" },
  8: { src: riceIntegradoLilaCatalogo, fit: "contain" },
  9: { src: riceArroz34Catalogo, fit: "contain" },
  10: { src: riceArrocilloCatalogo, fit: "contain" },
  11: { src: riceAfrechoCatalogo, fit: "contain" },
  12: { src: ricePolvilloFinoCatalogo, fit: "contain" },
  13: { src: ricePolvilloGruesoCatalogo, fit: "contain" },
  14: { src: riceCascarillaPrensadaCatalogo, fit: "contain" },
  15: { src: ASSETS.chicha400ml, fit: "contain" },
  16: { src: ASSETS.bidon20l, fit: "contain" },
  17: { src: ASSETS.comboEscolar, fit: "contain" },
  18: { src: ASSETS.juaneEscolar, fit: "contain" },
  19: { src: ASSETS.joraSazon, fit: "contain" },
  20: { src: ASSETS.joraBebible, fit: "contain" },
  21: { src: ASSETS.joraHome, fit: "contain" },
  22: { src: ASSETS.telaBolsas, fit: "contain" },
  23: { src: ASSETS.telaBolsas, fit: "contain" },
  24: { src: ASSETS.telaModa, fit: "contain" },
  25: { src: ASSETS.telaModa, fit: "contain" },
  26: { src: ASSETS.telaBolsas, fit: "contain" },
  27: { src: ASSETS.telaHogar, fit: "contain" },
  28: { src: ASSETS.telaHogar, fit: "contain" },
  29: { src: ASSETS.telaHogar, fit: "contain" },
  30: { src: ASSETS.telaHogar, fit: "contain" },
  31: { src: ASSETS.bocaditosNuto, fit: "contain" },
  32: { src: ASSETS.bocaditosRosquitaAlmidon, fit: "contain" },
  33: { src: ASSETS.bocaditosTurca, fit: "contain" },
  34: { src: ASSETS.bocaditosManiTostadoSalado, fit: "contain" },
  35: { src: ASSETS.bocaditosManiConPasas, fit: "contain" },
  36: { src: ASSETS.bocaditosRoquitasRojas, fit: "contain" },
  37: { src: ASSETS.bocaditosManiConfitado, fit: "contain" },
  38: { src: ASSETS.bocaditosManiConfitadoRojo, fit: "contain" },
  39: { src: ASSETS.bocaditosTurron, fit: "contain" },
  40: { src: ASSETS.bocaditosChiflePlatano, fit: "contain" },
  41: { src: ASSETS.bocaditosChifleMaduro, fit: "contain" },
  42: { src: ASSETS.bocaditosCocada, fit: "contain" },
  43: { src: ASSETS.bocaditosSuspiroBlanco, fit: "contain" },
  44: { src: ASSETS.bocaditosSuspiroColores, fit: "contain" },
  45: { src: ASSETS.bocaditosRoscaDulce, fit: "contain" },
  46: { src: ASSETS.artesaniaTinaja, fit: "contain" },
  47: { src: ASSETS.artesaniaPlato, fit: "contain" },
  48: { src: ASSETS.artesaniaPate, fit: "contain" },
  49: { src: ASSETS.artesaniaOllaArrocera, fit: "contain" },
  50: { src: ASSETS.artesaniaTiesto, fit: "contain" },
  51: { src: ASSETS.artesaniaFlorero, fit: "contain" },
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

function buildOrderContactLines(customer, extras = {}) {
  return [
    customer.name ? `Nombre: ${customer.name}` : null,
    customer.phone ? `Teléfono: ${customer.phone}` : null,
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
    extras.gift?.phone ? `Teléfono del regalo: ${extras.gift.phone}` : null,
    extras.gift?.message ? `Tarjeta: ${extras.gift.message}` : null,
    extras.fulfillmentMode ? `Modalidad: ${extras.fulfillmentMode}` : null,
    extras.reservation?.enabled ? `Reserva: ${extras.reservation.date} ${extras.reservation.time}` : null,
    extras.reservation?.mode ? `Entrega: ${extras.reservation.mode}` : null,
    extras.reservation?.note ? `Nota de reserva: ${extras.reservation.note}` : null,
  ];
}

function buildOrderMessage({ supplier, items, customer, payment, extras = {} }) {
  const subtotal = items.reduce((a, i) => a + i.pres.price * i.qty, 0);
  const delivery = items.reduce((a, i) => a + (i.zone?.cost || 0), 0);
  const total = subtotal + delivery;
  const lines = [
    `Hola, quiero hacer un pedido en ${supplier.name}.`,
    "",
    ...buildOrderContactLines(customer, extras),
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

function buildCombinedOrderMessage({ groups, customer, payment, extras = {} }) {
  const safeGroups = groups.filter((group) => group?.items?.length);
  if (safeGroups.length === 0) return "";
  if (safeGroups.length === 1) {
    return buildOrderMessage({
      supplier: safeGroups[0].supplier,
      items: safeGroups[0].items,
      customer,
      payment,
      extras,
    });
  }

  const subtotal = safeGroups.reduce(
    (sum, group) => sum + group.items.reduce((groupSum, item) => groupSum + item.pres.price * item.qty, 0),
    0,
  );
  const delivery = safeGroups.reduce(
    (sum, group) => sum + group.items.reduce((groupSum, item) => groupSum + (item.zone?.cost || 0), 0),
    0,
  );
  const total = subtotal + delivery;
  const sections = safeGroups.flatMap((group, index) => {
    const groupSubtotal = group.items.reduce((sum, item) => sum + item.pres.price * item.qty, 0);
    const groupDelivery = group.items.reduce((sum, item) => sum + (item.zone?.cost || 0), 0);
    const groupTotal = groupSubtotal + groupDelivery;

    return [
      `${index + 1}. ${group.supplier.name}`,
      ...group.items.map((item) => {
        const itemTotal = item.pres.price * item.qty + (item.zone?.cost || 0);
        return `- ${item.qty} x ${item.product.name} (${item.pres.label}) | ${item.zone?.name || "Sin zona"} | ${formatMoney(itemTotal)}`;
      }),
      `Subtotal grupo: ${formatMoney(groupSubtotal)}`,
      `Delivery grupo: ${formatMoney(groupDelivery)}`,
      `Total grupo: ${formatMoney(groupTotal)}`,
      "",
    ];
  });

  const lines = [
    "Hola, quiero hacer un pedido en VNDRX.",
    "",
    ...buildOrderContactLines(customer, extras),
    "",
    `Pago: ${payment}`,
    "",
    "Pedido completo:",
    ...sections,
    "",
    `Subtotal general: ${formatMoney(subtotal)}`,
    `Delivery general: ${formatMoney(delivery)}`,
    `Total general: ${formatMoney(total)}`,
    "",
    "Quedo atento para confirmar el pedido.",
  ];

  return lines.filter(Boolean).join("\n");
}

function paymentLabel(value) {
  if (value === "yape") return "Yape";
  if (value === "plin") return "Plin";
  if (value === "plin_bbva" || value === "plinbbva") return "Plin BBVA";
  if (value === "plin_ibk" || value === "plinibk") return "Plin Interbank";
  if (value === "bim") return "BIM";
  if (value === "agora") return "Agora";
  if (value === "binance") return "Binance Pay";
  if (value === "interbank" || value === "Interbank") return "Transferencia Interbank";
  if (value === "bbva") return "Transferencia BBVA";
  if (value === "banbif" || value === "Banbif") return "Transferencia Banbif";
  if (value === "bcp") return "Transferencia BCP";
  if (value === "card") return "Tarjeta / online";
  return "Pago contra entrega";
}

function createOrderRecord({ supplier, items, customer, payment, extras }) {
  const subtotal = items.reduce((a, i) => a + i.pres.price * i.qty, 0);
  const delivery = items.reduce((a, i) => a + (i.zone?.cost || 0), 0);
  const total = subtotal + delivery;
  const now = new Date().toISOString();
  return {
    id: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
    createdAt: now,
    updatedAt: now,
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
      background: `${color}18`, color, border: `1px solid ${color}33`,
      borderRadius: 999, fontSize: 10, fontWeight: 800, padding: "5px 10px",
      letterSpacing: 0.8, fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif", whiteSpace: "nowrap",
      boxShadow: "0 8px 18px rgba(0,0,0,0.05)",
    }}>{text}</span>
  );
}

function CertBadge({ cert }) {
  return (
    <span style={{
      background: HOME.soft2, border: `1px solid ${HOME.border}`,
      color: HOME.leaf, borderRadius: 999, fontSize: 10,
      fontWeight: 800, padding: "4px 8px", letterSpacing: 0.8,
      fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif",
    }}>{cert}</span>
  );
}

const getRecordTime = (record) => {
  const value = record?.updatedAt || record?.updated_at || record?.createdAt || record?.created_at || 0;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
};

const mergeRecordsById = (base = [], incoming = []) => {
  const merged = new Map();
  [...base, ...incoming].forEach((record) => {
    if (!record?.id) return;
    const current = merged.get(record.id);
    if (!current || getRecordTime(record) >= getRecordTime(current)) {
      merged.set(record.id, record);
    }
  });
  return Array.from(merged.values()).sort((a, b) => getRecordTime(b) - getRecordTime(a));
};

function ProductAvatar({ product, size = 52, radius = 14, onClick, title, ariaLabel }) {
  const media = getProductMedia(product);
  const mediaSrc = typeof media === "string" ? media : media?.src;
  const mediaFit = typeof media === "string" ? "contain" : (media?.fit || "contain");
  const interactive = typeof onClick === "function";
  const boxStyle = {
    width: size,
    height: size,
    borderRadius: radius,
    overflow: "hidden",
    flexShrink: 0,
    background: HOME.soft2,
    border: `1px solid ${HOME.border}`,
    boxShadow: HOME.shadow,
  };

  if (mediaSrc) {
    if (interactive) {
      return (
        <button
          type="button"
          onClick={onClick}
          title={title || `Ver imagen grande de ${product.name}`}
          aria-label={ariaLabel || `Ver imagen grande de ${product.name}`}
          style={{
            ...boxStyle,
            padding: 0,
            cursor: "zoom-in",
            border: `1px solid ${HOME.border}`,
            background: HOME.soft2,
            display: "block",
            appearance: "none",
          }}
        >
          <img
            src={mediaSrc}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: mediaFit, display: "block" }}
            loading="lazy"
          />
        </button>
      );
    }

    return (
      <div style={boxStyle}>
        <img
          src={mediaSrc}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: mediaFit, display: "block" }}
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

function ImageZoomModal({ open, src, alt, title, subtitle, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !src) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 220,
        background: "rgba(12, 18, 12, 0.86)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "min(920px, 100%)",
          maxHeight: "92vh",
          background: "#FBF7EF",
          borderRadius: 26,
          overflow: "hidden",
          border: `1px solid ${HOME.border}`,
          boxShadow: "0 32px 80px rgba(0,0,0,0.36)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "14px 16px",
            borderBottom: `1px solid ${HOME.border}`,
            background: "linear-gradient(135deg, #FFF8EC, #F2E5CB)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ color: HOME.accent, fontSize: 10, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase" }}>
              Imagen ampliada
            </div>
            <div style={{ color: HOME.text, fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 900, marginTop: 2 }}>
              {title || alt || "Producto"}
            </div>
            {subtitle && (
              <div style={{ color: HOME.muted, fontSize: 12, marginTop: 2 }}>
                {subtitle}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#FFF",
              border: `1px solid ${HOME.border}`,
              color: HOME.text,
              borderRadius: 999,
              padding: "10px 14px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 8px 16px rgba(76,56,23,0.08)",
            }}
          >
            Cerrar
          </button>
        </div>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 18,
            background: "radial-gradient(circle at top, #FFFFFF 0%, #F4EAD6 100%)",
          }}
        >
          <img
            src={src}
            alt={alt || title || "Imagen ampliada"}
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "calc(92vh - 120px)",
              objectFit: "contain",
              display: "block",
              borderRadius: 20,
              boxShadow: "0 14px 34px rgba(0,0,0,0.16)",
            }}
          />
        </div>
        <div style={{ padding: "0 16px 16px", color: HOME.muted, fontSize: 12, lineHeight: 1.5 }}>
          Toca fuera de la imagen o presiona <strong>Esc</strong> para cerrar.
        </div>
      </div>
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
        border: `1px solid ${HOME.border}`,
        borderRadius: 20,
        overflow: "hidden",
        background: HOME.surface,
        color: HOME.text,
        cursor: "pointer",
        textAlign: "left",
        boxShadow: HOME.shadow,
      }}
    >
      <div style={{ position: "relative", aspectRatio, background: `linear-gradient(135deg, ${accent}18, ${HOME.soft})`, overflow: "hidden" }}>
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
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(39,49,40,0.34) 100%)" }} />
        {note && (
          <span style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: accent,
            color: "#fff",
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
        <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 800, lineHeight: 1.2, marginBottom: 4, color: HOME.text }}>{title}</div>
        <div style={{ color: HOME.muted, fontSize: 12, lineHeight: 1.45 }}>{subtitle}</div>
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
        background: `radial-gradient(circle at top left, ${HOME.soft2} 0%, ${HOME.page} 44%, ${HOME.surface} 100%)`,
        border: `1px solid ${HOME.border}`,
        borderRadius: 24,
        padding: 18,
        boxShadow: HOME.shadow,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", gap: 18, alignItems: "stretch" }}>
          <button
            type="button"
            onClick={() => openAsset(ASSETS.promoMain)}
            style={{
              padding: 0,
              border: `1px solid ${HOME.border}`,
              borderRadius: 22,
              overflow: "hidden",
              cursor: "pointer",
              background: HOME.surface,
              position: "relative",
              boxShadow: HOME.shadow,
            }}
          >
            <div style={{ position: "relative", aspectRatio: "2 / 3", minHeight: 560 }}>
              <img
                src={ASSETS.promoMain}
                alt="Promoción San Juanero 2026"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,250,242,0.06) 0%, rgba(39,49,40,0.18) 28%, rgba(39,49,40,0.56) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <Badge text="TEMPORADA SAN JUAN 2026" color={HOME.accent2} />
                  <Badge text="LISTO PARA VENDER" color={HOME.leaf2} />
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: -0.6, maxWidth: 420, textShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
                    Promociones reales para vender hoy
                  </div>
                  <div style={{ color: "#F7EED0", fontSize: 14, lineHeight: 1.7, marginTop: 10, maxWidth: 440 }}>
                    Chicha ASWA, juane escolar y bidon sanjuanero con foto real y pedido por WhatsApp.
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
                image={ASSETS.promoAlt}
                title="Promo ASWA alterna"
                subtitle="Arte limpio para compartir"
                note="ASWA"
                accent="#22C55E"
                fit="contain"
                aspectRatio="3 / 4"
                onClick={() => openAsset(ASSETS.promoAlt)}
              />
              <PromoTile
                image={ASSETS.promoFlayer}
                title="Flyer ASWA"
                subtitle="Promocion lista para redes"
                note="TEMPORADA"
                accent="#F59E0B"
                fit="contain"
                aspectRatio="3 / 4"
                onClick={() => openAsset(ASSETS.promoFlayer)}
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
              background: `linear-gradient(135deg, ${HOME.surface}, ${HOME.soft})`,
              border: `1px solid ${HOME.border}`,
              borderRadius: 18,
              padding: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
              boxShadow: HOME.shadow,
            }}>
              <div style={{ minWidth: 240 }}>
                <div style={{ color: HOME.accent, fontSize: 13, fontWeight: 800, letterSpacing: 1, marginBottom: 5 }}>LISTA REAL PARA VENDER</div>
                <div style={{ color: HOME.text, fontSize: 15, fontWeight: 700, lineHeight: 1.45 }}>
                  Abre el QR de Yape, revisa precios y manda el pedido sin salir de la tienda.
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  style={{
                    background: `linear-gradient(135deg, ${HOME.leaf}, ${HOME.leaf2})`,
                    border: "none",
                    borderRadius: 12,
                    color: "#fff",
                    padding: "11px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 800,
                    boxShadow: "0 10px 20px rgba(71,101,75,0.18)",
                  }}
                >
                  Pedir ASWA
                </button>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                  style={{
                    background: HOME.surface,
                    border: `1px solid ${HOME.border}`,
                    borderRadius: 12,
                    color: HOME.text,
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
                border: `1px solid ${HOME.border}`,
                borderRadius: 16,
                overflow: "hidden",
                background: HOME.surface,
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 12px 22px rgba(76,56,23,0.06)",
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
              <div style={{ padding: "10px 12px", color: HOME.text, fontSize: 12, fontWeight: 700 }}>
                {asset.label}
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 12 }}>
            <div>
              <div style={{ color: HOME.accent, fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>Kit para compartir</div>
              <div style={{ color: HOME.text, fontSize: 15, fontWeight: 700, marginTop: 4 }}>Promociones y fotos listas para abrir o enviar</div>
            </div>
            <div style={{ color: HOME.muted, fontSize: 12 }}>Toca una tarjeta para verla completa.</div>
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

function JoraBoard() {
  const openAsset = (src) => window.open(src, "_blank", "noopener,noreferrer");
  const openWhatsApp = () => window.open(`https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent("Hola, quiero pedir chicha de jora.")}`, "_blank", "noopener,noreferrer");

  return (
    <section style={{ maxWidth: 1200, margin: "18px auto 0", padding: "0 20px" }}>
      <div style={{
        background: `radial-gradient(circle at top left, #FFF9EE 0%, #F8E4B8 42%, #ECD09A 100%)`,
        border: `1px solid ${HOME.border}`,
        borderRadius: 24,
        padding: 18,
        boxShadow: HOME.shadow,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", gap: 18, alignItems: "stretch" }}>
          <button
            type="button"
            onClick={() => openAsset(ASSETS.joraHome)}
            style={{
              padding: 0,
              border: `1px solid ${HOME.border}`,
              borderRadius: 22,
              overflow: "hidden",
              cursor: "pointer",
              background: HOME.surface,
              position: "relative",
              boxShadow: HOME.shadow,
            }}
          >
            <div style={{ position: "relative", aspectRatio: "2 / 3", minHeight: 560 }}>
              <img
                src={ASSETS.joraHome}
                alt="Chicha de Jora"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,250,242,0.08) 0%, rgba(39,49,40,0.16) 30%, rgba(39,49,40,0.5) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <Badge text="NUEVA TIENDA" color="#D59B3D" />
                  <Badge text="SAZONAR O BEBER" color="#8A5A1C" />
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: -0.6, maxWidth: 420, textShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
                    Chicha de jora para casa
                  </div>
                  <div style={{ color: "#F7EED0", fontSize: 14, lineHeight: 1.7, marginTop: 10, maxWidth: 440 }}>
                    Para aderezar tu comida como sazonador. Si la quieres beber, endulza al gusto; recomendamos miel de abeja.
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                    {["Sazonador natural", "Bebible", "Miel recomendada"].map((chip) => (
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
                image={ASSETS.joraSazon}
                title="Jora Sazonadora"
                subtitle="Base natural para cocina"
                note="COCINA"
                accent="#D59B3D"
                fit="contain"
                aspectRatio="3 / 4"
                onClick={() => openAsset(ASSETS.joraSazon)}
              />
              <PromoTile
                image={ASSETS.joraBebible}
                title="Jora para beber"
                subtitle="Endulza al gusto"
                note="BEBIBLE"
                accent="#F0C040"
                fit="contain"
                aspectRatio="3 / 4"
                onClick={() => openAsset(ASSETS.joraBebible)}
              />
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${HOME.surface}, ${HOME.soft})`,
              border: `1px solid ${HOME.border}`,
              borderRadius: 18,
              padding: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
              boxShadow: HOME.shadow,
            }}>
              <div style={{ minWidth: 240 }}>
                <div style={{ color: HOME.accent, fontSize: 13, fontWeight: 800, letterSpacing: 1, marginBottom: 5 }}>LISTA REAL PARA VENDER</div>
                <div style={{ color: HOME.text, fontSize: 15, fontWeight: 700, lineHeight: 1.45 }}>
                  Para beberla, endulza al gusto; recomendamos miel de abeja. Para comida, usala como aderezo natural.
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  style={{
                    background: `linear-gradient(135deg, #D59B3D, #F0C040)`,
                    border: "none",
                    borderRadius: 12,
                    color: "#0F1A0E",
                    padding: "11px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 800,
                    boxShadow: "0 10px 20px rgba(71,101,75,0.18)",
                  }}
                >
                  Pedir Jora
                </button>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                  style={{
                    background: HOME.surface,
                    border: `1px solid ${HOME.border}`,
                    borderRadius: 12,
                    color: HOME.text,
                    padding: "11px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Ver catalogo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {JORA_PROMO_LIBRARY.map((asset) => (
            <button
              key={asset.id}
              type="button"
              onClick={() => openAsset(asset.src)}
              style={{
                padding: 0,
                border: `1px solid ${HOME.border}`,
                borderRadius: 16,
                overflow: "hidden",
                background: HOME.surface,
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 12px 22px rgba(76,56,23,0.06)",
              }}
            >
              <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
                <img
                  src={asset.src}
                  alt={asset.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ padding: "10px 12px", color: HOME.text, fontSize: 12, fontWeight: 700 }}>
                {asset.title}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function TelaBoard() {
  const openAsset = (src) => window.open(src, "_blank", "noopener,noreferrer");
  const openWhatsApp = () => window.open(`https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent("Hola, quiero pedir productos de la tienda Tela.")}`, "_blank", "noopener,noreferrer");

  return (
    <section style={{ maxWidth: 1200, margin: "18px auto 0", padding: "0 20px" }}>
      <div style={{
        background: `radial-gradient(circle at top left, #FFF6F2 0%, #ECD6DE 42%, #D8B0C1 100%)`,
        border: `1px solid ${HOME.border}`,
        borderRadius: 24,
        padding: 18,
        boxShadow: HOME.shadow,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", gap: 18, alignItems: "stretch" }}>
          <button
            type="button"
            onClick={() => openAsset(ASSETS.telaHome)}
            style={{
              padding: 0,
              border: `1px solid ${HOME.border}`,
              borderRadius: 22,
              overflow: "hidden",
              cursor: "pointer",
              background: HOME.surface,
              position: "relative",
              boxShadow: HOME.shadow,
            }}
          >
            <div style={{ position: "relative", aspectRatio: "2 / 3", minHeight: 560 }}>
              <img
                src={ASSETS.telaHome}
                alt="Tienda Tela"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,250,242,0.08) 0%, rgba(39,49,40,0.16) 30%, rgba(39,49,40,0.5) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <Badge text="NUEVA TIENDA" color="#D58AA7" />
                  <Badge text="TEXIL Y HOGAR" color="#7EA6D8" />
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: -0.6, maxWidth: 420, textShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
                    Tela para vestir y decorar
                  </div>
                  <div style={{ color: "#F7EED0", fontSize: 14, lineHeight: 1.7, marginTop: 10, maxWidth: 440 }}>
                    Bolsas, alforjas, panueloletas, vestidos regionales, mochilas, sabanas, edredones, colchas y cubrecamas.
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                    {["Bolsas", "Moda regional", "Hogar y descanso"].map((chip) => (
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
                image={ASSETS.telaBolsas}
                title="Bolsas y mochilas"
                subtitle="Reutilizables y urbanas"
                note="BOLSAS"
                accent="#7EA6D8"
                fit="contain"
                aspectRatio="3 / 4"
                onClick={() => openAsset(ASSETS.telaBolsas)}
              />
              <PromoTile
                image={ASSETS.telaModa}
                title="Moda regional"
                subtitle="Panueloletas y vestidos"
                note="MODA"
                accent="#D58AA7"
                fit="contain"
                aspectRatio="3 / 4"
                onClick={() => openAsset(ASSETS.telaModa)}
              />
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${HOME.surface}, ${HOME.soft})`,
              border: `1px solid ${HOME.border}`,
              borderRadius: 18,
              padding: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
              boxShadow: HOME.shadow,
            }}>
              <div style={{ minWidth: 240 }}>
                <div style={{ color: HOME.accent, fontSize: 13, fontWeight: 800, letterSpacing: 1, marginBottom: 5 }}>LISTA REAL PARA VENDER</div>
                <div style={{ color: HOME.text, fontSize: 15, fontWeight: 700, lineHeight: 1.45 }}>
                  Bolsas, alforjas, panueloletas, vestimenta regional y articulos de hogar para elegir rapido.
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  style={{
                    background: "linear-gradient(135deg, #6A3552, #D58AA7)",
                    border: "none",
                    borderRadius: 12,
                    color: "#fff",
                    padding: "11px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 800,
                    boxShadow: "0 10px 20px rgba(71,101,75,0.18)",
                  }}
                >
                  Pedir Tela
                </button>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                  style={{
                    background: HOME.surface,
                    border: `1px solid ${HOME.border}`,
                    borderRadius: 12,
                    color: HOME.text,
                    padding: "11px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Ver catalogo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {[
            { src: ASSETS.telaBolsas, label: "Bolsas y mochilas" },
            { src: ASSETS.telaModa, label: "Moda regional" },
            { src: ASSETS.telaHogar, label: "Hogar y descanso" },
          ].map((asset) => (
            <button
              key={asset.label}
              type="button"
              onClick={() => openAsset(asset.src)}
              style={{
                padding: 0,
                border: `1px solid ${HOME.border}`,
                borderRadius: 16,
                overflow: "hidden",
                background: HOME.surface,
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 12px 22px rgba(76,56,23,0.06)",
              }}
            >
              <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
                <img
                  src={asset.src}
                  alt={asset.label}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              </div>
              <div style={{ padding: "10px 12px", color: HOME.text, fontSize: 12, fontWeight: 700 }}>
                {asset.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function HubMetric({ label, value, hint, color = theme.goldLight }) {
  return (
    <div style={{ background: HOME.surface, border: `1px solid ${HOME.border}`, borderRadius: 14, padding: 14, minHeight: 84, boxShadow: "0 10px 18px rgba(76,56,23,0.05)" }}>
      <div style={{ color: HOME.muted, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
      <div style={{ color, fontSize: 20, fontWeight: 900, marginTop: 6, lineHeight: 1.1 }}>{value}</div>
      {hint && <div style={{ color: HOME.muted, fontSize: 11, marginTop: 4, lineHeight: 1.45 }}>{hint}</div>}
    </div>
  );
}

function HubChip({ active, label, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: `1px solid ${active ? HOME.accent2 : HOME.border}`,
        background: active ? HOME.soft2 : HOME.surface,
        color: active ? HOME.accent : HOME.muted,
        borderRadius: 999,
        padding: "8px 12px",
        fontSize: 11,
        fontWeight: 800,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 7,
        whiteSpace: "nowrap",
        boxShadow: active ? "0 10px 18px rgba(163,109,44,0.08)" : "none",
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function HubSection({ title, subtitle, children }) {
  return (
    <section style={{ background: HOME.surface, border: `1px solid ${HOME.border}`, borderRadius: 16, padding: 16, boxShadow: HOME.shadow }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ color: HOME.text, fontSize: 15, fontWeight: 900 }}>{title}</div>
        {subtitle && <div style={{ color: HOME.muted, fontSize: 11, lineHeight: 1.45, marginTop: 4 }}>{subtitle}</div>}
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
    { id: "db", label: "Base de datos", icon: "☁️" },
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
    { id: "tela", label: "Tela" },
    { id: "bocaditos", label: "Bocaditos" },
    { id: "reyleon", label: "Rey León" },
  ];
  const filteredPanelOrders = data.orders.filter((order) => {
    if (panelFilter === "all") return true;
    if (panelFilter === "aswa") return order.supplierKey === "aswa";
    if (panelFilter === "tela") return order.supplierKey === "tela";
    if (panelFilter === "bocaditos") return order.supplierKey === "bocaditos";
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
    db: (
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10 }}>
          <HubMetric label="Estado" value={data.supabaseEnabled ? "Conectado" : "Local"} hint={data.supabaseEnabled ? "Pedidos en nube y local" : "Aun no pegaste credenciales"} color={data.supabaseEnabled ? theme.greenLight : theme.goldLight} />
          <HubMetric
            label="Prueba"
            value={
              data.supabaseProbe.state === "ok"
                ? "Verificada"
                : data.supabaseProbe.state === "checking"
                  ? "Probando"
                  : data.supabaseProbe.state === "error"
                    ? "Error"
                    : "Pendiente"
            }
            hint={data.supabaseProbe.message || "Sin verificar"}
            color={data.supabaseProbe.state === "ok" ? theme.greenLight : data.supabaseProbe.state === "error" ? "#FF9B9B" : theme.goldLight}
          />
          <HubMetric
            label="Migración"
            value={
              data.supabaseMigration.state === "ok"
                ? "Subida"
                : data.supabaseMigration.state === "checking"
                  ? "Subiendo"
                  : data.supabaseMigration.state === "error"
                    ? "Revisar"
                    : "Pendiente"
            }
            hint={data.supabaseMigration.message || "Aún no se subió el historial local"}
            color={data.supabaseMigration.state === "ok" ? theme.greenLight : data.supabaseMigration.state === "error" ? "#FFB5B5" : theme.goldLight}
          />
          <HubMetric label="Tablas" value="3" hint="orders, profiles, reviews" />
          <HubMetric label="URL" value={data.supabaseUrl ? "Lista" : "Vacía"} hint={data.supabaseUrl || "Sin configurar"} />
          <HubMetric label="Modo" value={data.supabaseEnabled ? "Realtime" : "Offline"} hint="Se actualiza al recargar" />
        </div>

        <HubSection title="Conectar Supabase" subtitle="Pega tu URL y anon key. Al guardar, la app recarga y empieza a sincronizar pedidos.">
          <div style={{ display: "grid", gap: 10 }}>
            <input
              value={data.supabaseDraft.url}
              onChange={(e) => actions.setSupabaseDraft((prev) => ({ ...prev, url: e.target.value }))}
              placeholder="https://tu-proyecto.supabase.co"
              style={{ width: "100%", background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 10, color: theme.cream, padding: "11px 12px", fontSize: 13 }}
            />
            <textarea
              value={data.supabaseDraft.key}
              onChange={(e) => actions.setSupabaseDraft((prev) => ({ ...prev, key: e.target.value }))}
              placeholder="anon public key"
              rows={4}
              style={{ width: "100%", background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 10, color: theme.cream, padding: "11px 12px", fontSize: 13, resize: "vertical", minHeight: 100, fontFamily: "monospace" }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
              <button type="button" onClick={actions.saveSupabaseConnection} style={{ background: `linear-gradient(135deg, ${theme.green}, ${theme.greenLight})`, border: "none", borderRadius: 12, color: "#fff", padding: 12, cursor: "pointer", fontWeight: 900 }}>
                Guardar y recargar
              </button>
              <button type="button" onClick={actions.testSupabaseConnection} style={{ background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`, border: "none", borderRadius: 12, color: "#0F1A0E", padding: 12, cursor: "pointer", fontWeight: 900 }}>
                Probar conexión
              </button>
              <button type="button" onClick={actions.migrateLocalDataToSupabase} style={{ background: `linear-gradient(135deg, ${theme.accent2}, ${theme.goldLight})`, border: "none", borderRadius: 12, color: "#0F1A0E", padding: 12, cursor: "pointer", fontWeight: 900 }}>
                Subir datos locales
              </button>
              <button type="button" onClick={actions.clearSupabaseConnection} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.cream, padding: 12, cursor: "pointer", fontWeight: 800 }}>
                Quitar conexión
              </button>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${theme.border}`, borderRadius: 14, padding: 12, color: theme.creamDim, fontSize: 12, lineHeight: 1.6 }}>
              <div style={{ color: theme.goldLight, fontWeight: 900, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>Resultado de la última prueba</div>
              <div style={{ marginTop: 6, color: data.supabaseProbe.state === "ok" ? theme.greenLight : data.supabaseProbe.state === "error" ? "#FFB5B5" : theme.creamDim }}>
                {data.supabaseProbe.message}
              </div>
              {typeof data.supabaseProbe.elapsedMs === "number" && (
                <div style={{ marginTop: 4, color: theme.textDim, fontSize: 11 }}>Tiempo estimado: {data.supabaseProbe.elapsedMs} ms</div>
              )}
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${theme.border}`, borderRadius: 14, padding: 12, color: theme.creamDim, fontSize: 12, lineHeight: 1.6 }}>
              <div style={{ color: theme.goldLight, fontWeight: 900, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>Subir historial local</div>
              <div style={{ marginTop: 6, color: data.supabaseMigration.state === "ok" ? theme.greenLight : data.supabaseMigration.state === "error" ? "#FFB5B5" : theme.creamDim }}>
                {data.supabaseMigration.message}
              </div>
              <div style={{ marginTop: 4, color: theme.textDim, fontSize: 11 }}>
                Ideal para copiar pedidos, perfil y reseñas al activar la nube por primera vez.
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
              <button type="button" onClick={actions.copySupabaseChecklist} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.cream, padding: 12, cursor: "pointer", fontWeight: 800 }}>
                Copiar checklist
              </button>
              <button type="button" onClick={actions.copySupabaseSql} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.cream, padding: 12, cursor: "pointer", fontWeight: 800 }}>
                Copiar SQL
              </button>
              <button type="button" onClick={actions.copySupabaseEnv} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.cream, padding: 12, cursor: "pointer", fontWeight: 800 }}>
                Copiar .env
              </button>
            </div>
          </div>
        </HubSection>

        <HubSection title="Pasos rápidos" subtitle="Conecta la base sin salir de la tienda.">
          <div style={{ display: "grid", gap: 8, color: theme.creamDim, fontSize: 12, lineHeight: 1.65 }}>
            <div>1. Crea tu proyecto en Supabase.</div>
            <div>2. Ejecuta el archivo <strong style={{ color: theme.goldLight }}>supabase/schema.sql</strong>.</div>
            <div>3. Pega la URL y la anon key en este panel.</div>
            <div>4. Guarda y deja que la app recargue sola.</div>
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
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(1100px, 100%)", background: HOME.surface, border: `1px solid ${HOME.border}`, borderRadius: 24, boxShadow: HOME.shadow, overflow: "hidden", marginTop: 20 }}>
        <div style={{ padding: 18, borderBottom: `1px solid ${HOME.border}`, background: `linear-gradient(135deg, ${HOME.soft2}, ${HOME.surface})` }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div>
              <div style={{ color: HOME.accent, fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase" }}>Centro ASWA de funciones</div>
              <div style={{ color: HOME.text, fontSize: 22, fontWeight: 900, marginTop: 6 }}>Herramientas de venta, bonos y pedidos</div>
              <div style={{ color: HOME.muted, fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>Lo que trae ASWA para vender mejor, resumido dentro de tu tienda y conectado al pedido real por WhatsApp.</div>
            </div>
            <button type="button" onClick={onClose} style={{ background: HOME.surface, border: `1px solid ${HOME.border}`, borderRadius: 12, color: HOME.text, width: 38, height: 38, cursor: "pointer", fontSize: 18, fontWeight: 800 }}>×</button>
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
      <div style={{ color: HOME.text, fontSize: 11, fontWeight: 800, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>
        Entrega y zona
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {zones.map((zone) => (
          <button
            type="button"
            key={zone.id}
            onClick={() => onSelect(zone)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              width: "100%",
              background: selected?.id === zone.id ? HOME.soft2 : HOME.surface,
              border: `1px solid ${selected?.id === zone.id ? HOME.accent2 : HOME.border}`,
              borderRadius: 14,
              padding: "10px 12px",
              cursor: "pointer",
              transition: "all 0.15s",
              boxShadow: selected?.id === zone.id ? "0 10px 18px rgba(163,109,44,0.08)" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13 }}>{zone.emoji}</span>
              <div>
                <div style={{ color: HOME.text, fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>{zone.name}</div>
                <div style={{ color: HOME.muted, fontSize: 10, lineHeight: 1.4 }}>{zone.address}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {zone.cost === 0
                ? <span style={{ background: "#E8F3E8", color: HOME.leaf, borderRadius: 999, fontSize: 10, fontWeight: 800, padding: "3px 8px" }}>Gratis</span>
                : <span style={{ fontFamily: "monospace", color: HOME.accent, fontSize: 13, fontWeight: 800 }}>+S/ {zone.cost.toFixed(2)}</span>
              }
              {selected?.id === zone.id && <span style={{ color: HOME.leaf, fontSize: 13, fontWeight: 900 }}>✓</span>}
            </div>
          </button>
        ))}
      </div>
      {selected && selected.cost > 0 && (
        <div style={{ marginTop: 8, background: HOME.soft, border: `1px solid ${HOME.border}`, borderRadius: 10, padding: "8px 12px", fontSize: 11, color: HOME.muted, lineHeight: 1.5 }}>
          💡 Delivery <strong style={{ color: HOME.accent }}>S/ {selected.cost.toFixed(2)} fijo</strong> sin importar cuántas unidades o sacos pidas.
        </div>
      )}
    </div>
  );
}

function getDefaultZone(product) {
  const zones = product.zones || ZONES_REYLEON;
  if (product.defaultZoneId) {
    return zones.find((zone) => zone.id === product.defaultZoneId) || zones[0];
  }
  return zones[0];
}

function CompanyChooserScreen({ onChooseCompany, toastBubble }) {
  const options = [
    {
      key: "reyleon",
      view: COMPANY_VIEWS.reyleon,
      image: ASSETS.priceSheet,
      accent: HOME.accent,
      chips: ["Arroz premium", "Superior", "Derivados"],
      note: "Molino directo",
      description: "Entra a la tienda de Rey Leon y mira solo sus arroces, derivados y precios de origen.",
      count: products.filter((product) => getSupplierKey(product) === "reyleon").length,
      extra: "Delivery por zona",
    },
    {
      key: "aswa",
      view: COMPANY_VIEWS.aswa,
      image: ASSETS.promoMain,
      accent: HOME.leaf,
      chips: ["Chicha", "Bidon", "Escolar"],
      note: "San Juan 2026",
      description: "Entra a ASWA para ver chicha, bidon 20L y promos escolares en una tienda separada.",
      count: products.filter((product) => getSupplierKey(product) === "aswa").length,
      extra: "Delivery gratis escolar",
    },
    {
      key: "jora",
      view: COMPANY_VIEWS.jora,
      image: ASSETS.joraHome,
      accent: "#D59B3D",
      chips: ["Sazonador", "Bebible", "Natural"],
      note: "Nueva tienda",
      description: "Entra a chicha de jora para aderezar comidas o beberla endulzada a tu gusto.",
      count: products.filter((product) => getSupplierKey(product) === "jora").length,
      extra: "Miel recomendada",
    },
    {
      key: "tela",
      view: COMPANY_VIEWS.tela,
      image: ASSETS.telaHome,
      accent: "#6A3552",
      chips: ["Bolsas", "Moda regional", "Hogar"],
      note: "Textiles",
      description: "Entra a tienda tela para bolsas, alforjas, panueloletas, vestidos regionales y hogar.",
      count: products.filter((product) => getSupplierKey(product) === "tela").length,
      extra: "Cuidados y descanso",
    },
    {
      key: "bocaditos",
      view: COMPANY_VIEWS.bocaditos,
      image: ASSETS.bocaditosHome,
      accent: "#B66A2C",
      chips: ["Maní", "Galletas", "Dulces"],
      note: "Artesanales",
      description: "Entra a Bocaditos para ver ñuto, rosquitas, turcas, maní, chifles y dulces regionales en una tienda separada.",
      count: products.filter((product) => getSupplierKey(product) === "bocaditos").length,
      extra: "Detalle regional",
    },
    {
      key: "artesania",
      view: COMPANY_VIEWS.artesania,
      image: ASSETS.artesaniaHome,
      accent: "#A95E2A",
      chips: ["Barro", "Decoracion", "Hecho a mano"],
      note: "Lamista",
      description: "Entra a artesania para tinajas, platos, olla arrocera, tiestos y floreros en una tienda separada.",
      count: products.filter((product) => getSupplierKey(product) === "artesania").length,
      extra: "Barro y tradicion",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: HOME.page, fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif", color: HOME.text }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: ${HOME.page}; } ::-webkit-scrollbar-thumb { background: ${HOME.border}; border-radius: 3px; }`}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "30px 20px 42px" }}>
        <div style={{
          background: `linear-gradient(135deg, ${HOME.surface} 0%, ${HOME.soft2} 100%)`,
          border: `1px solid ${HOME.border}`,
          borderRadius: 28,
          padding: 22,
          boxShadow: HOME.shadow,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ maxWidth: 720 }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: HOME.soft,
                border: `1px solid ${HOME.border}`,
                borderRadius: 999,
                padding: "6px 12px",
                color: HOME.accent,
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 14,
              }}>
                Elige tu empresa
              </div>
              <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(30px, 4.2vw, 52px)", fontWeight: 900, lineHeight: 1.03, margin: 0 }}>
                Primero selecciona la tienda que quieres visitar
              </h1>
              <p style={{ color: HOME.muted, fontSize: 15, lineHeight: 1.7, margin: "12px 0 0", maxWidth: 720 }}>
                La app se abre en modo limpio: eliges la marca que quieres visitar y enseguida ves solo su informacion, sus productos y su forma de pedir.
              </p>
            </div>
            <div style={{
              background: HOME.surface,
              border: `1px solid ${HOME.border}`,
              borderRadius: 18,
              padding: "14px 16px",
              minWidth: 220,
              boxShadow: "0 10px 22px rgba(76,56,23,0.06)",
            }}>
              <div style={{ color: HOME.muted, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>Modo tiendas separadas</div>
              <div style={{ color: HOME.text, fontSize: 13, fontWeight: 800, lineHeight: 1.5, marginTop: 6 }}>
                Cada cliente empieza por la marca correcta y compra mas rapido sin ver todo mezclado.
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 18, marginTop: 18 }}>
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => onChooseCompany(option.key)}
              style={{
                textAlign: "left",
                background: HOME.surface,
                border: `1px solid ${HOME.border}`,
                borderRadius: 26,
                padding: 14,
                cursor: "pointer",
                boxShadow: HOME.shadow,
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = option.accent + "66";
                e.currentTarget.style.boxShadow = "0 24px 40px rgba(76,56,23,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = HOME.border;
                e.currentTarget.style.boxShadow = HOME.shadow;
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "130px minmax(0, 1fr)", gap: 14, alignItems: "stretch" }}>
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", minHeight: 190, background: HOME.soft }}>
                  <img
                    src={option.image}
                    alt={option.view.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(39,49,40,0.34) 100%)" }} />
                  <span style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    background: option.accent,
                    color: "#fff",
                    borderRadius: 999,
                    padding: "5px 10px",
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: 0.8,
                  }}>
                    {option.note}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                  <div>
                    <div style={{ color: option.accent, fontSize: 11, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>
                      {option.view.tagline}
                    </div>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 900, lineHeight: 1.05, marginTop: 6 }}>
                      {option.view.shortName}
                    </div>
                    <div style={{ color: HOME.text, fontSize: 13, lineHeight: 1.65, marginTop: 8 }}>
                      {option.description}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                    {option.chips.map((chip) => (
                      <span
                        key={chip}
                        style={{
                          background: HOME.soft,
                          border: `1px solid ${HOME.border}`,
                          borderRadius: 999,
                          color: HOME.text,
                          fontSize: 10,
                          fontWeight: 800,
                          padding: "6px 9px",
                        }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                    <span style={{ background: "#EEF7EA", color: HOME.leaf, borderRadius: 999, fontSize: 10, fontWeight: 800, padding: "6px 9px" }}>
                      {option.count} productos
                    </span>
                    <span style={{ background: "#F9EEDB", color: HOME.accent, borderRadius: 999, fontSize: 10, fontWeight: 800, padding: "6px 9px" }}>
                      {option.extra}
                    </span>
                  </div>

                  <div style={{
                    marginTop: 16,
                    background: `linear-gradient(135deg, ${option.accent}, ${option.accent}cc)`,
                    borderRadius: 14,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 900,
                    padding: "12px 14px",
                    width: "fit-content",
                    boxShadow: "0 10px 18px rgba(0,0,0,0.08)",
                  }}>
                    Entrar a {option.view.shortName}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div style={{
          marginTop: 18,
          background: `linear-gradient(135deg, ${HOME.surface}, ${HOME.soft})`,
          border: `1px solid ${HOME.border}`,
          borderRadius: 18,
          padding: "14px 16px",
          color: HOME.muted,
          fontSize: 13,
          lineHeight: 1.7,
          boxShadow: HOME.shadow,
        }}>
          Solo eliges una vez y luego la tienda te muestra el catalogo correcto, con su informacion y sus productos separados.
        </div>
        {toastBubble}
      </div>
    </div>
  );
}

function BocaditosBoard() {
  const openAsset = (src) => window.open(src, "_blank", "noopener,noreferrer");
  const openWhatsApp = () => window.open(`https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent("Hola, quiero pedir bocaditos regionales artesanales.")}`, "_blank", "noopener,noreferrer");

  return (
    <section style={{ maxWidth: 1200, margin: "18px auto 0", padding: "0 20px" }}>
      <div style={{
        background: `radial-gradient(circle at top left, #FFF7ED 0%, #F7E3C1 42%, #E8BB83 100%)`,
        border: `1px solid ${HOME.border}`,
        borderRadius: 24,
        padding: 18,
        boxShadow: HOME.shadow,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", gap: 18, alignItems: "stretch" }}>
          <button
            type="button"
            onClick={() => openAsset(ASSETS.bocaditosHome)}
            style={{
              padding: 0,
              border: `1px solid ${HOME.border}`,
              borderRadius: 22,
              overflow: "hidden",
              cursor: "pointer",
              background: HOME.surface,
              position: "relative",
              boxShadow: HOME.shadow,
            }}
          >
            <div style={{ position: "relative", aspectRatio: "2 / 3", minHeight: 560 }}>
              <img
                src={ASSETS.bocaditosHome}
                alt="Bocaditos regionales"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,250,242,0.08) 0%, rgba(39,49,40,0.16) 30%, rgba(39,49,40,0.5) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <Badge text="NUEVA TIENDA" color="#B66A2C" />
                  <Badge text="ARTESANALES" color="#8C3F21" />
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: -0.6, maxWidth: 420, textShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
                    Bocaditos regionales para compartir
                  </div>
                  <div style={{ color: "#F7EED0", fontSize: 14, lineHeight: 1.7, marginTop: 10, maxWidth: 440 }}>
                    Ñuto, rosquitas, turcas, maní tostado, manís confitados, chifles y dulces clásicos para la casa o para vender.
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                    {["Maní", "Galletas", "Dulces"].map((chip) => (
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
                image={ASSETS.bocaditosManiTostadoSalado}
                title="Maní tostado"
                subtitle="Salado y con pasas"
                note="MANI"
                accent="#B66A2C"
                fit="contain"
                aspectRatio="3 / 4"
                onClick={() => openAsset(ASSETS.bocaditosManiTostadoSalado)}
              />
              <PromoTile
                image={ASSETS.bocaditosRosquitaAlmidon}
                title="Rosquitas y turcas"
                subtitle="Galletas artesanales"
                note="GALLETAS"
                accent="#8C3F21"
                fit="contain"
                aspectRatio="3 / 4"
                onClick={() => openAsset(ASSETS.bocaditosRosquitaAlmidon)}
              />
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${HOME.surface}, ${HOME.soft})`,
              border: `1px solid ${HOME.border}`,
              borderRadius: 18,
              padding: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
              boxShadow: HOME.shadow,
            }}>
              <div style={{ minWidth: 240 }}>
                <div style={{ color: HOME.accent, fontSize: 13, fontWeight: 800, letterSpacing: 1, marginBottom: 5 }}>LISTO PARA PEDIR</div>
                <div style={{ color: HOME.text, fontSize: 15, fontWeight: 700, lineHeight: 1.45 }}>
                  Bocaditos artesanales para lonche, cafecito y reuniones familiares. Todo entra al WhatsApp central.
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  style={{
                    background: `linear-gradient(135deg, #B66A2C, #D97A2E)`,
                    border: "none",
                    borderRadius: 12,
                    color: "#0F1A0E",
                    padding: "11px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 800,
                    boxShadow: "0 10px 20px rgba(71,101,75,0.18)",
                  }}
                >
                  Pedir Bocaditos
                </button>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                  style={{
                    background: HOME.surface,
                    border: `1px solid ${HOME.border}`,
                    borderRadius: 12,
                    color: HOME.text,
                    padding: "11px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Ver catalogo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {[
            { src: ASSETS.bocaditosManiConfitado, title: "Maní confitado" },
            { src: ASSETS.bocaditosTurron, title: "Turrón" },
            { src: ASSETS.bocaditosChiflePlatano, title: "Chifle de plátano" },
            { src: ASSETS.bocaditosSuspiroColores, title: "Suspiro de colores" },
            { src: ASSETS.bocaditosCocada, title: "Cocada" },
            { src: ASSETS.bocaditosRoscaDulce, title: "Rosca bañada de dulce" },
          ].map((asset) => (
            <button
              key={asset.title}
              type="button"
              onClick={() => openAsset(asset.src)}
              style={{
                padding: 0,
                border: `1px solid ${HOME.border}`,
                borderRadius: 16,
                overflow: "hidden",
                background: HOME.surface,
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 12px 22px rgba(76,56,23,0.06)",
              }}
            >
              <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
                <img
                  src={asset.src}
                  alt={asset.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              </div>
              <div style={{ padding: "10px 12px", color: HOME.text, fontSize: 12, fontWeight: 700 }}>
                {asset.title}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtesaniaBoard() {
  const openAsset = (src) => window.open(src, "_blank", "noopener,noreferrer");
  const openWhatsApp = () => window.open(`https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent("Hola, quiero pedir artesania lamista.")}`, "_blank", "noopener,noreferrer");

  return (
    <section style={{ maxWidth: 1200, margin: "18px auto 0", padding: "0 20px" }}>
      <div style={{
        background: `radial-gradient(circle at top left, #FFF8EC 0%, #F4DEC0 42%, #D6A16F 100%)`,
        border: `1px solid ${HOME.border}`,
        borderRadius: 24,
        padding: 18,
        boxShadow: HOME.shadow,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", gap: 18, alignItems: "stretch" }}>
          <button
            type="button"
            onClick={() => openAsset(ASSETS.artesaniaHome)}
            style={{
              padding: 0,
              border: `1px solid ${HOME.border}`,
              borderRadius: 22,
              overflow: "hidden",
              cursor: "pointer",
              background: HOME.surface,
              position: "relative",
              boxShadow: HOME.shadow,
            }}
          >
            <div style={{ position: "relative", aspectRatio: "2 / 3", minHeight: 560 }}>
              <img
                src={ASSETS.artesaniaHome}
                alt="Artesania lamista"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,250,242,0.06) 0%, rgba(39,49,40,0.14) 30%, rgba(39,49,40,0.42) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <Badge text="NUEVA TIENDA" color="#A95E2A" />
                  <Badge text="BARRO LAMISTA" color="#5C7A4E" />
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: -0.6, maxWidth: 420, textShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
                    Artesania lamista para tu casa
                  </div>
                  <div style={{ color: "#F7EED0", fontSize: 14, lineHeight: 1.7, marginTop: 10, maxWidth: 440 }}>
                    Tinajas, platos, pate, olla arrocera, tiestos y floreros hechos a mano para decorar, cocinar y regalar.
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                    {["Barro", "Mesa", "Decoracion"].map((chip) => (
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
                image={ASSETS.artesaniaTinaja}
                title="Tinaja lamista"
                subtitle="Pieza artesanal de barro"
                note="BARRO"
                accent="#A95E2A"
                fit="contain"
                aspectRatio="3 / 4"
                onClick={() => openAsset(ASSETS.artesaniaTinaja)}
              />
              <PromoTile
                image={ASSETS.artesaniaPlato}
                title="Platos artesanales"
                subtitle="Mesa, regalo y decoracion"
                note="MESA"
                accent="#8C5B2A"
                fit="contain"
                aspectRatio="3 / 4"
                onClick={() => openAsset(ASSETS.artesaniaPlato)}
              />
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${HOME.surface}, ${HOME.soft})`,
              border: `1px solid ${HOME.border}`,
              borderRadius: 18,
              padding: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
              boxShadow: HOME.shadow,
            }}>
              <div style={{ minWidth: 240 }}>
                <div style={{ color: HOME.accent, fontSize: 13, fontWeight: 800, letterSpacing: 1, marginBottom: 5 }}>LISTO PARA PEDIR</div>
                <div style={{ color: HOME.text, fontSize: 15, fontWeight: 700, lineHeight: 1.45 }}>
                  Artesania lamista para tu sala, cocina, mesa o regalo especial. Todo entra al WhatsApp central.
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  style={{
                    background: `linear-gradient(135deg, #A95E2A, #D18B57)`,
                    border: "none",
                    borderRadius: 12,
                    color: "#fff",
                    padding: "11px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 800,
                    boxShadow: "0 10px 20px rgba(71,101,75,0.18)",
                  }}
                >
                  Pedir Artesania
                </button>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                  style={{
                    background: HOME.surface,
                    border: `1px solid ${HOME.border}`,
                    borderRadius: 12,
                    color: HOME.text,
                    padding: "11px 14px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Ver catalogo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {[
            { src: ASSETS.artesaniaPate, title: "Pate artesanal" },
            { src: ASSETS.artesaniaOllaArrocera, title: "Olla arrocera" },
            { src: ASSETS.artesaniaTiesto, title: "Tiesto de barro" },
            { src: ASSETS.artesaniaFlorero, title: "Florero lamista" },
          ].map((asset) => (
            <button
              key={asset.title}
              type="button"
              onClick={() => openAsset(asset.src)}
              style={{
                padding: 0,
                border: `1px solid ${HOME.border}`,
                borderRadius: 16,
                overflow: "hidden",
                background: HOME.surface,
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 12px 22px rgba(76,56,23,0.06)",
              }}
            >
              <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
                <img
                  src={asset.src}
                  alt={asset.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              </div>
              <div style={{ padding: "10px 12px", color: HOME.text, fontSize: 12, fontWeight: 700 }}>
                {asset.title}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReyLeonBoard({ onOpenPriceSheet, onContact }) {
  const tiles = [
    {
      image: riceExtraVerdeCatalogo,
      title: "Arroz premium",
      subtitle: "Ideal para casa, menues y restaurantes",
      note: "MOLINO",
      accent: HOME.accent,
    },
    {
      image: riceSuperiorVerdeCatalogo,
      title: "Arroz superior",
      subtitle: "Uso diario, rendidor y claro para comprar",
      note: "USO DIARIO",
      accent: HOME.leaf,
    },
    {
      image: riceAfrechoCatalogo,
      title: "Derivados",
      subtitle: "Afrecho, polvillo y cascarilla",
      note: "INDUSTRIA",
      accent: HOME.gold,
    },
  ];

  return (
    <section style={{ maxWidth: 1200, margin: "18px auto 0", padding: "0 20px" }}>
      <div style={{
        background: `radial-gradient(circle at top left, ${HOME.soft2} 0%, ${HOME.page} 44%, ${HOME.surface} 100%)`,
        border: `1px solid ${HOME.border}`,
        borderRadius: 24,
        padding: 18,
        boxShadow: HOME.shadow,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)", gap: 18, alignItems: "stretch" }}>
          <PromoTile
            image={ASSETS.priceSheet}
            title="Catálogo de precios"
            subtitle="Consulta la lista comercial antes de pedir"
            note="REY LEON"
            accent={HOME.accent}
            fit="contain"
            aspectRatio="3 / 4"
            onClick={onOpenPriceSheet}
          />

          <div style={{ display: "grid", gap: 14 }}>
            <div style={{
              background: `linear-gradient(135deg, ${HOME.surface}, ${HOME.soft})`,
              border: `1px solid ${HOME.border}`,
              borderRadius: 18,
              padding: 16,
              boxShadow: HOME.shadow,
            }}>
              <div style={{ color: HOME.accent, fontSize: 12, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Piladora Rey Leon</div>
              <div style={{ color: HOME.text, fontSize: 18, fontWeight: 900, marginTop: 6 }}>Compra directo del molino y sin ruido visual</div>
              <div style={{ color: HOME.muted, fontSize: 13, lineHeight: 1.65, marginTop: 8 }}>
                Aqui el cliente ve solo los arroces y derivados de Rey Leon. Fotos reales, precios claros y delivery por zona para comprar rapido.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginTop: 14 }}>
                <div style={{ background: HOME.surface, border: `1px solid ${HOME.border}`, borderRadius: 14, padding: 12 }}>
                  <div style={{ color: HOME.muted, fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Linea fuerte</div>
                  <div style={{ color: HOME.text, fontSize: 13, fontWeight: 800, marginTop: 5 }}>Premium, superior y economico</div>
                </div>
                <div style={{ background: HOME.surface, border: `1px solid ${HOME.border}`, borderRadius: 14, padding: 12 }}>
                  <div style={{ color: HOME.muted, fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Apoyo</div>
                  <div style={{ color: HOME.text, fontSize: 13, fontWeight: 800, marginTop: 5 }}>Derivados, afrecho y cascarilla</div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
              {tiles.map((tile) => (
                <PromoTile
                  key={tile.title}
                  image={tile.image}
                  title={tile.title}
                  subtitle={tile.subtitle}
                  note={tile.note}
                  accent={tile.accent}
                  fit="contain"
                  aspectRatio="1 / 1.15"
                  onClick={onOpenPriceSheet}
                />
              ))}
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${HOME.surface}, ${HOME.soft2})`,
              border: `1px solid ${HOME.border}`,
              borderRadius: 18,
              padding: 16,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
              boxShadow: HOME.shadow,
            }}>
              <div style={{ minWidth: 240 }}>
                <div style={{ color: HOME.accent, fontSize: 12, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Atencion directa</div>
                <div style={{ color: HOME.text, fontSize: 15, fontWeight: 800, lineHeight: 1.45, marginTop: 5 }}>
                  Consulta precios o escribe al molino para cerrar tu compra.
                </div>
              </div>
              <button
                type="button"
                onClick={onContact}
                style={{
                  background: `linear-gradient(135deg, ${HOME.leaf}, ${HOME.leaf2})`,
                  border: "none",
                  borderRadius: 12,
                  color: "#fff",
                  padding: "11px 14px",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 900,
                  boxShadow: "0 10px 20px rgba(71,101,75,0.18)",
                }}
              >
                Contactar ventas del molino
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onAdd, onQuickBuy, cartItem }) {
  const lc = LINE_COLORS[product.line];
  const [selPres, setSelPres] = useState(0);
  const minQty = product.minOrder || 1;
  const [qty, setQty] = useState(minQty);
  const [zone, setZone] = useState(() => getDefaultZone(product));
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [imageZoomOpen, setImageZoomOpen] = useState(false);
  const media = getProductMedia(product);
  const mediaSrc = typeof media === "string" ? media : media?.src;
  const careLabel = product.careLabel || (getSupplierKey(product) === "tela" ? "Cuidados" : getSupplierKey(product) === "bocaditos" ? "Listo para comer" : getSupplierKey(product) === "artesania" ? "Hecho a mano" : "Cocina con calma");
  const schoolQuantityEditable = Boolean(product.schoolOnly || minQty > 1);

  const pres = product.presentations[selPres];
  const subtotal = pres.price * qty;
  const total = subtotal + (zone?.cost || 0);
  const clampQty = (value) => {
    const parsed = Number.parseInt(String(value), 10);
    if (Number.isNaN(parsed)) return minQty;
    return Math.max(minQty, parsed);
  };

  useEffect(() => {
    setQty((current) => Math.max(minQty, current || minQty));
  }, [minQty]);

  return (
    <article
      style={{
        background: HOME.surface,
        border: `1px solid ${HOME.border}`,
        borderRadius: 24,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: HOME.shadow,
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = lc.badge + "66";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 24px 42px rgba(76, 56, 23, 0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = HOME.border;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = HOME.shadow;
      }}
    >
      <div style={{ padding: 16, background: `linear-gradient(135deg, ${lc.bg} 0%, ${lc.accent}16 100%)`, borderBottom: `1px solid ${HOME.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap" }}>
          <Badge text={lc.label} color={lc.badge} />
          {product.saving > 0 && (
            <span style={{ background: "#EEF7EA", color: HOME.leaf, borderRadius: 999, fontSize: 10, fontWeight: 800, padding: "4px 9px" }}>
              Ahorra {product.saving}%
            </span>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "88px 1fr", gap: 14, alignItems: "center" }}>
          <ProductAvatar
            product={product}
            size={88}
            radius={22}
            onClick={mediaSrc ? () => setImageZoomOpen(true) : undefined}
            title={mediaSrc ? `Ver ${product.name} en grande` : undefined}
            ariaLabel={mediaSrc ? `Abrir imagen grande de ${product.name}` : undefined}
          />
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 800, color: HOME.text, lineHeight: 1.15 }}>{product.name}</div>
            <div style={{ color: HOME.muted, fontSize: 12, marginTop: 4, lineHeight: 1.45 }}>{product.subtitle}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
              <span style={{ background: "#EEF7EA", color: HOME.leaf, borderRadius: 999, padding: "4px 9px", fontSize: 10, fontWeight: 800 }}>Listo para casa</span>
              <span style={{ background: "#F6EADB", color: HOME.accent, borderRadius: 999, padding: "4px 9px", fontSize: 10, fontWeight: 800 }}>Desde S/ {pres.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <ImageZoomModal
        open={imageZoomOpen}
        src={mediaSrc}
        alt={product.name}
        title={product.name}
        subtitle={product.subtitle}
        onClose={() => setImageZoomOpen(false)}
      />

      <div style={{ padding: 16, flex: 1 }}>
        <div style={{ color: HOME.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
          {detailsOpen ? product.desc : (product.tip || product.desc).slice(0, 115) + ((product.tip || product.desc).length > 115 ? "..." : "")}
          {((product.tip || product.desc).length > 115 || product.desc.length > 115) && (
            <button
              type="button"
              onClick={() => setDetailsOpen((s) => !s)}
              style={{ border: "none", background: "none", color: HOME.accent, cursor: "pointer", fontWeight: 800, padding: 0, marginLeft: 6, fontSize: 12 }}
            >
              {detailsOpen ? "ver menos" : "ver más"}
            </button>
          )}
        </div>

        {detailsOpen && (
          <div style={{ display: "grid", gap: 10, marginBottom: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
              <div style={{ background: HOME.soft, border: `1px solid ${HOME.border}`, borderRadius: 14, padding: 10 }}>
                <div style={{ color: HOME.muted, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>Calidad</div>
                <div style={{ color: HOME.text, fontSize: 12, fontWeight: 700, marginTop: 4, lineHeight: 1.4 }}>{product.quality}</div>
              </div>
              <div style={{ background: HOME.soft, border: `1px solid ${HOME.border}`, borderRadius: 14, padding: 10 }}>
                <div style={{ color: HOME.muted, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>Variedad</div>
                <div style={{ color: HOME.text, fontSize: 12, fontWeight: 700, marginTop: 4, lineHeight: 1.4 }}>{product.variety}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {product.tags.map((t) => (
                <span key={t} style={{ background: "#EEF7EA", border: `1px solid #D7E6D5`, color: HOME.leaf, borderRadius: 999, fontSize: 10, fontWeight: 700, padding: "4px 9px" }}>
                  ✓ {t}
                </span>
              ))}
            </div>

            <div style={{ background: HOME.soft2, border: `1px solid ${HOME.border}`, borderRadius: 14, padding: 12 }}>
              <div style={{ color: HOME.muted, fontSize: 10, fontWeight: 800, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>{careLabel}</div>
              <div style={{ color: HOME.text, fontSize: 12, lineHeight: 1.6 }}>{product.cooking}</div>
            </div>

            {product.minOrderNote && (
              <div style={{ background: "#FFF4E8", border: `1px solid #E8C98D`, borderRadius: 14, padding: 12, color: "#A36216", fontSize: 11, lineHeight: 1.5, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span>⚠️</span>
                <span>{product.minOrderNote}</span>
              </div>
            )}
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <div style={{ color: HOME.muted, fontSize: 11, fontWeight: 800, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Presentación</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 6 }}>
            {product.presentations.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setSelPres(i); setQty(minQty); }}
                style={{
                  background: selPres === i ? HOME.soft : "#FFF",
                  border: `1px solid ${selPres === i ? HOME.accent2 : HOME.border}`,
                  borderRadius: 14,
                  padding: "9px 6px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ color: HOME.text, fontSize: 11, fontWeight: 700, lineHeight: 1.2 }}>{p.label}</div>
                <div style={{ fontFamily: "monospace", color: HOME.accent, fontSize: 12, fontWeight: 800, marginTop: 3 }}>S/ {p.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>

        {!product.schoolOnly && (
          <DeliveryZoneSelector selected={zone} onSelect={setZone} zones={product.zones || ZONES_REYLEON} />
        )}

        {product.schoolOnly && (
          <div style={{ background: "#EEF6FF", border: "1px solid #C5DAFF", borderRadius: 14, padding: 12, marginBottom: 14 }}>
            <div style={{ color: "#2E5BAA", fontSize: 11, fontWeight: 800, letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase" }}>
              Exclusivo para instituciones
            </div>
            <div style={{ color: "#335C8D", fontSize: 11, lineHeight: 1.55 }}>
              Solo para colegios, escuelas y jardines. Es un beneficio pensado para atender pedidos grandes con calma.
            </div>
          </div>
        )}

        <div style={{ background: HOME.soft2, border: `1px solid ${HOME.border}`, borderRadius: 16, padding: 12, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
            <span style={{ color: HOME.muted, fontSize: 11 }}>Cantidad</span>
            <span style={{ color: HOME.accent, fontSize: 11, fontWeight: 800 }}>{schoolQuantityEditable ? "Escribe la cantidad que necesitas" : "Tu pedido se siente como en casa"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
            {schoolQuantityEditable ? (
              <div style={{ display: "flex", alignItems: "center", background: "#FFF", borderRadius: 999, border: `1px solid ${HOME.border}`, overflow: "hidden" }}>
                <button onClick={() => setQty(Math.max(minQty, qty - 1))} type="button" style={{ background: "none", border: "none", color: HOME.text, width: 34, height: 34, cursor: "pointer", fontSize: 16, fontWeight: 700 }}>−</button>
                <input
                  type="number"
                  inputMode="numeric"
                  min={minQty}
                  value={qty}
                  onFocus={(e) => e.currentTarget.select()}
                  onChange={(e) => setQty(clampQty(e.target.value))}
                  style={{
                    appearance: "textfield",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                    border: "none",
                    background: "transparent",
                    color: HOME.text,
                    width: 72,
                    height: 34,
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: 900,
                    fontFamily: "monospace",
                    outline: "none",
                  }}
                />
                <button onClick={() => setQty(qty + 1)} type="button" style={{ background: "none", border: "none", color: HOME.text, width: 34, height: 34, cursor: "pointer", fontSize: 16, fontWeight: 700 }}>+</button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", background: "#FFF", borderRadius: 999, border: `1px solid ${HOME.border}`, overflow: "hidden" }}>
                <button onClick={() => setQty(Math.max(minQty, qty - 1))} type="button" style={{ background: "none", border: "none", color: HOME.text, width: 34, height: 34, cursor: "pointer", fontSize: 16, fontWeight: 700 }}>−</button>
                <span style={{ fontFamily: "monospace", color: HOME.text, minWidth: 30, textAlign: "center", fontSize: 14, fontWeight: 800, padding: "0 6px" }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} type="button" style={{ background: "none", border: "none", color: HOME.text, width: 34, height: 34, cursor: "pointer", fontSize: 16, fontWeight: 700 }}>+</button>
              </div>
            )}
            <div style={{ textAlign: "right" }}>
              <div style={{ color: HOME.muted, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>Total</div>
              <div style={{ color: HOME.text, fontFamily: "monospace", fontSize: 18, fontWeight: 900 }}>S/ {total.toFixed(2)}</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: HOME.muted, fontSize: 11, lineHeight: 1.4 }}>
            <span>{qty} × {pres.label}</span>
            <span>Delivery {zone?.cost === 0 ? "gratis" : `+S/ ${zone?.cost.toFixed(2)}`}</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <button
            onClick={() => onAdd(product, pres, qty, zone)}
            type="button"
            style={{
              width: "100%",
              background: cartItem ? HOME.leaf : `linear-gradient(135deg, ${HOME.accent}, ${HOME.accent2})`,
              border: "none",
              borderRadius: 14,
              color: "#fff",
              fontSize: 13,
              fontWeight: 900,
              padding: "13px 0",
              cursor: "pointer",
              boxShadow: "0 12px 22px rgba(163, 109, 44, 0.18)",
            }}
          >
            {cartItem ? `✓ En tu pedido (${cartItem.qty})` : "Agregar al pedido"}
          </button>
          <button
            onClick={() => onQuickBuy?.(product, pres, qty, zone)}
            type="button"
            style={{
              width: "100%",
              background: "#FFF",
              border: `1px solid ${HOME.border}`,
              borderRadius: 14,
              color: HOME.text,
              fontSize: 13,
              fontWeight: 900,
              padding: "13px 0",
              cursor: "pointer",
            }}
            >
            Pedir ahora
          </button>
        </div>
        {product.line === "chicha" && (
          <button
            type="button"
            onClick={() => window.open(ASWA_APP_URL, "_blank", "noopener,noreferrer")}
            style={{
              width: "100%",
              marginTop: 10,
              background: HOME.soft2,
              border: `1px solid ${HOME.accent2}`,
              borderRadius: 14,
              color: HOME.leaf,
              fontSize: 13,
              fontWeight: 900,
              padding: "12px 0",
              cursor: "pointer",
              boxShadow: "0 10px 18px rgba(163, 109, 44, 0.08)",
            }}
          >
            Abrir app ASWA La Rica Chicha
          </button>
        )}
      </div>
    </article>
  );
}

function EmbeddedAppModal({ open, title, subtitle, url, onClose }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 160,
        background: "rgba(14, 20, 12, 0.82)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(1240px, 100%)",
          height: "min(92vh, 980px)",
          background: "#F7F2E8",
          borderRadius: 24,
          overflow: "hidden",
          border: `1px solid ${theme.border}`,
          boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "14px 16px",
            borderBottom: `1px solid ${theme.border}`,
            background: "linear-gradient(135deg, #FFF8EC, #F3E6CE)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: 220 }}>
            <div style={{ color: theme.accent, fontSize: 10, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase" }}>Tienda hermana</div>
            <div style={{ color: theme.text, fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 900, marginTop: 2 }}>{title}</div>
            <div style={{ color: theme.muted, fontSize: 12, marginTop: 2 }}>{subtitle}</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
              style={{
                background: "#FFF",
                border: `1px solid ${theme.border}`,
                color: theme.text,
                borderRadius: 999,
                padding: "10px 14px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Abrir fuera
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`,
                border: "none",
                color: "#0F1A0E",
                borderRadius: 999,
                padding: "10px 14px",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
        <iframe
          src={url}
          title={title}
          loading="lazy"
          style={{
            width: "100%",
            flex: 1,
            border: 0,
            background: "#FFF",
          }}
          allow="clipboard-read; clipboard-write; fullscreen; geolocation"
        />
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
              <div style={{ background: theme.bgLight, borderRadius: 12, padding: 14, border: `1px solid ${theme.border}`, marginBottom: 12 }}>
                <div style={{ color: theme.cream, fontSize: 14, fontWeight: 800, marginBottom: 6 }}>Cuadro de pagos del molino</div>
                <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.5, marginBottom: 12 }}>
                  Aquí ves los métodos disponibles y los datos del molino que sí se muestran de forma directa.
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                  {REYLEON_PAYMENT_METHODS.map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setPayment(opt.val)}
                      style={{
                        background: payment === opt.val ? theme.bg : theme.bgCard,
                        border: `1px solid ${payment === opt.val ? opt.color : theme.border}`,
                        borderRadius: 12,
                        padding: "11px 12px",
                        cursor: "pointer",
                        display: "grid",
                        gridTemplateColumns: "12px 1fr auto",
                        gap: 12,
                        alignItems: "center",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ width: 12, height: 12, borderRadius: 999, background: opt.color, boxShadow: payment === opt.val ? `0 0 0 4px ${opt.color}22` : "none" }} />
                      <div>
                        <div style={{ color: theme.cream, fontWeight: 800, fontSize: 14 }}>{opt.label}</div>
                        <div style={{ color: theme.textDim, fontSize: 12, marginTop: 3, lineHeight: 1.4 }}>{opt.detail}</div>
                      </div>
                      {payment === opt.val && <span style={{ color: opt.color, fontSize: 16, fontWeight: 800 }}>✓</span>}
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: 10, background: theme.bg, borderRadius: 10, padding: 12, border: `1px solid ${theme.border}` }}>
                  <div style={{ color: theme.textDim, fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Detalle seleccionado</div>
                  <div style={{ color: theme.cream, fontSize: 16, fontWeight: 900, marginTop: 5 }}>{selectedPaymentMethod.label}</div>
                  <div style={{ color: theme.creamDim, fontSize: 13, lineHeight: 1.55, marginTop: 4 }}>{selectedPaymentMethod.detail}</div>
                  <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.5, marginTop: 8 }}>
                    {selectedPaymentMethod.val === "yape"
                      ? `Yape del molino: 918 429 034 · Noyolith Quine Rojas. Envía tu comprobante al WhatsApp ${ORDER_PHONE_DISPLAY}.`
                      : selectedPaymentMethod.val === "cod"
                        ? "Pagas al recibir tu pedido."
                        : `Este método se confirma por WhatsApp con el molino: ${ORDER_PHONE_DISPLAY}.`}
                  </div>
                </div>

                {selectedBankDetail && (
                  <div style={paymentDetailCardStyle(selectedPaymentMethod.color)}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                      <div style={{ minWidth: 190, flex: 1 }}>
                        <div style={{ color: selectedPaymentMethod.color, fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>{selectedBankDetail.bank}</div>
                        <div style={{ color: theme.cream, fontSize: 18, fontWeight: 900, marginTop: 6 }}>{selectedBankDetail.account}</div>
                        <div style={{ color: theme.creamDim, fontSize: 13, marginTop: 4 }}>CCI: {selectedBankDetail.cci}</div>
                        <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.55, marginTop: 8 }}>
                          Usa estos datos para transferir al molino. Copia la cuenta o el CCI y comparte el comprobante por WhatsApp al {ORDER_PHONE_DISPLAY}.
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                          <button
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(selectedBankDetail.account)}
                            style={{
                              background: "#fff",
                              border: "none",
                              borderRadius: 10,
                              color: "#201038",
                              padding: "9px 12px",
                              fontSize: 12,
                              fontWeight: 900,
                              cursor: "pointer",
                            }}
                          >
                            Copiar cuenta
                          </button>
                          <button
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(selectedBankDetail.cci)}
                            style={{
                              background: "transparent",
                              border: `1px solid ${selectedPaymentMethod.color}66`,
                              borderRadius: 10,
                              color: "#D8B4FE",
                              padding: "9px 12px",
                              fontSize: 12,
                              fontWeight: 900,
                              cursor: "pointer",
                            }}
                          >
                            Copiar CCI
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod.val === "yape" && (
                  <div style={{ marginTop: 12, background: "linear-gradient(135deg, #201038, #11120f)", border: "1px solid #7C3AED55", borderRadius: 14, padding: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                      <div style={{ minWidth: 190, flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={paymentBadgeStyle(selectedPaymentMethod, true)}>{selectedPaymentMethod.badge}</div>
                          <div>
                            <div style={{ color: "#D8B4FE", fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Yape del molino</div>
                            <div style={{ color: theme.textDim, fontSize: 11, marginTop: 2 }}>Pago directo con QR y numero visible</div>
                          </div>
                        </div>
                        <div style={{ color: theme.cream, fontSize: 18, fontWeight: 900, marginTop: 6 }}>918 429 034</div>
                        <div style={{ color: theme.creamDim, fontSize: 13, marginTop: 4 }}>Titular: Noyolith Quine Rojas</div>
                        <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.55, marginTop: 8 }}>
                          Escanea el QR o comparte este número para que el cliente pague directo al molino.
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                          <button
                            type="button"
                            onClick={() => navigator.clipboard?.writeText("918429034")}
                            style={{
                              background: "#fff",
                              border: "none",
                              borderRadius: 10,
                              color: "#201038",
                              padding: "9px 12px",
                              fontSize: 12,
                              fontWeight: 900,
                              cursor: "pointer",
                            }}
                          >
                            Copiar número
                          </button>
                          <button
                            type="button"
                            onClick={() => window.open(ASSETS.yapeQr, "_blank", "noopener,noreferrer")}
                            style={{
                              background: "transparent",
                              border: "1px solid #7C3AED66",
                              borderRadius: 10,
                              color: "#D8B4FE",
                              padding: "9px 12px",
                              fontSize: 12,
                              fontWeight: 900,
                              cursor: "pointer",
                            }}
                          >
                            Abrir QR
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => window.open(ASSETS.yapeQr, "_blank", "noopener,noreferrer")}
                        style={{
                          width: 126,
                          minWidth: 126,
                          border: "1px solid #7C3AED55",
                          borderRadius: 14,
                          padding: 8,
                          background: "#0D0520",
                          cursor: "pointer",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={ASSETS.yapeQr}
                          alt="QR de Yape del molino"
                          loading="lazy"
                          style={{ width: "100%", display: "block", objectFit: "contain", borderRadius: 8 }}
                        />
                      </button>
                    </div>
                    <div style={{ marginTop: 10, background: "#0D0520", borderRadius: 10, padding: "9px 12px", color: "#D8B4FE", fontSize: 12, lineHeight: 1.5 }}>
                      Después de pagar, envía la captura al WhatsApp del molino: <strong style={{ color: theme.cream }}>{ORDER_PHONE_DISPLAY}</strong>.
                    </div>
                  </div>
                )}

                {selectedBankDetail && (
                  <div style={paymentDetailCardStyle(selectedPaymentMethod.color)}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                      <div style={{ minWidth: 190, flex: 1 }}>
                        <div style={{ color: selectedPaymentMethod.color, fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>{selectedBankDetail.bank}</div>
                        <div style={{ color: theme.cream, fontSize: 18, fontWeight: 900, marginTop: 6 }}>{selectedBankDetail.account}</div>
                        <div style={{ color: theme.creamDim, fontSize: 13, marginTop: 4 }}>CCI: {selectedBankDetail.cci}</div>
                        {selectedBankDetail.swift && <div style={{ color: theme.creamDim, fontSize: 13, marginTop: 4 }}>SWIFT: {selectedBankDetail.swift}</div>}
                        <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.55, marginTop: 8 }}>
                          Usa estos datos para transferir al molino. Si quieres, copia la cuenta o el CCI y comparte el comprobante al WhatsApp {ORDER_PHONE_DISPLAY}.
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                          <button
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(selectedBankDetail.account || "")}
                            style={{
                              background: "#fff",
                              border: "none",
                              borderRadius: 10,
                              color: "#201038",
                              padding: "9px 12px",
                              fontSize: 12,
                              fontWeight: 900,
                              cursor: "pointer",
                            }}
                          >
                            Copiar cuenta
                          </button>
                          <button
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(selectedBankDetail.cci || "")}
                            style={{
                              background: "transparent",
                              border: `1px solid ${selectedPaymentMethod.color}66`,
                              borderRadius: 10,
                              color: "#D8B4FE",
                              padding: "9px 12px",
                              fontSize: 12,
                              fontWeight: 900,
                              cursor: "pointer",
                            }}
                          >
                            Copiar CCI
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod.account && (
                  <div style={paymentDetailCardStyle(selectedPaymentMethod.color)}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                      <div style={{ minWidth: 190, flex: 1 }}>
                        <div style={{ color: selectedPaymentMethod.color, fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>{selectedPaymentMethod.detail}</div>
                        <div style={{ color: theme.cream, fontSize: 18, fontWeight: 900, marginTop: 6 }}>{selectedPaymentMethod.account}</div>
                        <div style={{ color: theme.creamDim, fontSize: 13, marginTop: 4 }}>CCI: {selectedPaymentMethod.cci}</div>
                        <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.55, marginTop: 8 }}>
                          Usa estos datos para transferir al molino. Si quieres, copia la cuenta o el CCI y comparte el comprobante al WhatsApp {ORDER_PHONE_DISPLAY}.
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                          <button
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(selectedPaymentMethod.account || "")}
                            style={{
                              background: "#fff",
                              border: "none",
                              borderRadius: 10,
                              color: "#201038",
                              padding: "9px 12px",
                              fontSize: 12,
                              fontWeight: 900,
                              cursor: "pointer",
                            }}
                          >
                            Copiar cuenta
                          </button>
                          <button
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(selectedPaymentMethod.cci || "")}
                            style={{
                              background: "transparent",
                              border: `1px solid ${selectedPaymentMethod.color}66`,
                              borderRadius: 10,
                              color: "#D8B4FE",
                              padding: "9px 12px",
                              fontSize: 12,
                              fontWeight: 900,
                              cursor: "pointer",
                            }}
                          >
                            Copiar CCI
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

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

function CartDrawerReal({ cart, onClose, onRemove, onOrderSent, initialCustomer = {}, referralCode = "", referredBy = "", gpsState = {}, initialStep = "cart", storeKey = "reyleon" }) {
  const [step, setStep] = useState(initialStep);
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
  const paymentProfile = getPaymentProfile(storeKey === "aswa" ? "aswa" : "reyleon");
  const selectedPaymentMethod = paymentProfile.methods.find((opt) => opt.val === payment) || paymentProfile.methods[0];
  const selectedDigitalDetail = paymentProfile.digitalDetails?.[selectedPaymentMethod.val] || null;
  const selectedBankDetail = paymentProfile.bankDetails?.[selectedPaymentMethod.val] || null;

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

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  useEffect(() => {
    const available = paymentProfile.methods.some((opt) => opt.val === payment);
    if (!available) {
      setPayment(paymentProfile.methods[0]?.val || "cod");
    }
  }, [storeKey]);

  const setField = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const extras = {
    gps: activeGps,
    fulfillmentMode,
    gift: giftEnabled ? { enabled: true, relation: giftRelation, recipient: giftName, phone: giftPhone, message: giftMessage } : null,
    reservation: reservationEnabled ? { enabled: true, date: reservationDate, time: reservationTime, note: reservationNote, mode: fulfillmentMode } : null,
  };

  const makeGroupMessage = (group) =>
    buildOrderMessage({
      supplier: group.supplier,
      items: group.items,
      customer,
      payment: paymentLabel(payment),
      extras,
    });

  const makeCombinedMessage = () =>
    buildCombinedOrderMessage({
      groups,
      customer,
      payment: paymentLabel(payment),
      extras,
    });

  const copyGroupOrder = async (group) => {
    const message = makeGroupMessage(group);
    try {
      await navigator.clipboard.writeText(message);
      setStatus(`Pedido copiado. Se enviará al ${ORDER_PHONE_DISPLAY}`);
    } catch {
      setStatus("No se pudo copiar el pedido");
    }
  };

  const copyCombinedOrder = async () => {
    const message = makeCombinedMessage();
    try {
      await navigator.clipboard.writeText(message);
      setStatus(`Pedido completo copiado. Se enviará al ${ORDER_PHONE_DISPLAY}`);
    } catch {
      setStatus("No se pudo copiar el pedido completo");
    }
  };

  const openGroupWhatsApp = async (group) => {
    const message = makeGroupMessage(group);
    const url = `https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus(`Pedido listo para enviar a ${ORDER_PHONE_DISPLAY}`);
    const orderRecord = createOrderRecord({
      supplier: group.supplier,
      items: group.items,
      customer: {
        ...customer,
        extras,
      },
      payment,
      extras,
    });
    onOrderSent?.(orderRecord);
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // Clipboard is optional.
    }
  };

  const openCombinedWhatsApp = async () => {
    const message = makeCombinedMessage();
    const url = `https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus(`Pedido completo listo para enviar a ${ORDER_PHONE_DISPLAY}`);
    const orderRecord = createOrderRecord({
      supplier: mixedSuppliers ? { key: "mixto", name: "Pedido mixto" } : groups[0]?.supplier,
      items: cart,
      customer: {
        ...customer,
        extras,
      },
      payment,
      extras,
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
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <div style={{ color: theme.cream, fontSize: 14, fontWeight: 800 }}>{paymentProfile.title}</div>
                    <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.45, marginTop: 4 }}>
                      {paymentProfile.intro}
                    </div>
                  </div>
                  <Badge text={paymentProfile.badge} color={paymentProfile.key === "aswa" ? "#22C55E" : theme.goldLight} />
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  {paymentProfile.methods.map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setPayment(opt.val)}
                      style={{
                        background: payment === opt.val ? theme.bg : theme.bgCard,
                        border: `1px solid ${payment === opt.val ? opt.color : theme.border}`,
                        borderRadius: 14,
                        padding: "12px 14px",
                        cursor: "pointer",
                        display: "grid",
                        gridTemplateColumns: "42px 1fr auto",
                        gap: 12,
                        alignItems: "center",
                        textAlign: "left",
                      }}
                    >
                      <div style={paymentBadgeStyle(opt, payment === opt.val)}>{opt.badge}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: theme.cream, fontWeight: 800, fontSize: 14 }}>{opt.label}</div>
                        <div style={{ color: theme.textDim, fontSize: 12, marginTop: 3, lineHeight: 1.4 }}>{opt.detail}</div>
                        <div style={{ color: theme.creamDim, fontSize: 11, marginTop: 4, lineHeight: 1.4 }}>{opt.hint}</div>
                      </div>
                      {payment === opt.val && <span style={{ color: opt.color, fontSize: 16, fontWeight: 800 }}>✓</span>}
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: 10, background: theme.bg, borderRadius: 12, padding: 12, border: `1px solid ${theme.border}` }}>
                  <div style={{ color: theme.textDim, fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Datos visibles</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                    <div style={paymentBadgeStyle(selectedPaymentMethod, true)}>{selectedPaymentMethod.badge}</div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ color: theme.cream, fontSize: 16, fontWeight: 900 }}>{selectedPaymentMethod.label}</div>
                      <div style={{ color: theme.creamDim, fontSize: 13, lineHeight: 1.55, marginTop: 3 }}>
                        {selectedPaymentMethod.detail}
                      </div>
                    </div>
                  </div>
                  <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.5, marginTop: 8 }}>
                    {selectedPaymentMethod.hint}
                  </div>
                  <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.5, marginTop: 8 }}>
                    {paymentProfile.contactNote}
                  </div>
                </div>

                {selectedDigitalDetail && (selectedDigitalDetail.qr || selectedDigitalDetail.number) && (
                  <div style={{ marginTop: 12, background: "linear-gradient(135deg, #201038, #11120f)", border: "1px solid #7C3AED55", borderRadius: 14, padding: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                      <div style={{ minWidth: 190, flex: 1 }}>
                        <div style={{ color: "#D8B4FE", fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>{selectedDigitalDetail.title}</div>
                        {selectedDigitalDetail.number && <div style={{ color: theme.cream, fontSize: 18, fontWeight: 900, marginTop: 6 }}>{selectedDigitalDetail.number}</div>}
                        {selectedDigitalDetail.holder && <div style={{ color: theme.creamDim, fontSize: 13, marginTop: 4 }}>Titular: {selectedDigitalDetail.holder}</div>}
                        {selectedDigitalDetail.note && (
                          <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.55, marginTop: 8 }}>
                            {selectedDigitalDetail.note}
                          </div>
                        )}
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                          {selectedDigitalDetail.number && (
                            <button
                              type="button"
                              onClick={() => navigator.clipboard?.writeText(selectedDigitalDetail.number.replace(/\s+/g, ""))}
                              style={{
                                background: "#fff",
                                border: "none",
                                borderRadius: 10,
                                color: "#201038",
                                padding: "9px 12px",
                                fontSize: 12,
                                fontWeight: 900,
                                cursor: "pointer",
                              }}
                            >
                              Copiar numero
                            </button>
                          )}
                          {selectedDigitalDetail.qr && (
                            <button
                              type="button"
                              onClick={() => window.open(selectedDigitalDetail.qr, "_blank", "noopener,noreferrer")}
                              style={{
                                background: "transparent",
                                border: "1px solid #7C3AED66",
                                borderRadius: 10,
                                color: "#D8B4FE",
                                padding: "9px 12px",
                                fontSize: 12,
                                fontWeight: 900,
                                cursor: "pointer",
                              }}
                            >
                              Abrir QR
                            </button>
                          )}
                        </div>
                      </div>
                      {selectedDigitalDetail.qr && (
                        <button
                          type="button"
                          onClick={() => window.open(selectedDigitalDetail.qr, "_blank", "noopener,noreferrer")}
                          style={{
                            width: 126,
                            minWidth: 126,
                            border: "1px solid #7C3AED55",
                            borderRadius: 14,
                            padding: 8,
                            background: "#0D0520",
                            cursor: "pointer",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={selectedDigitalDetail.qr}
                            alt={`QR de ${selectedDigitalDetail.title}`}
                            loading="lazy"
                            style={{ width: "100%", display: "block", objectFit: "contain", borderRadius: 8 }}
                          />
                        </button>
                      )}
                    </div>
                    <div style={{ marginTop: 10, background: "#0D0520", borderRadius: 10, padding: "9px 12px", color: "#D8B4FE", fontSize: 12, lineHeight: 1.5 }}>
                      {paymentProfile.contactNote}
                    </div>
                  </div>
                )}

                {selectedBankDetail && (
                  <div style={paymentDetailCardStyle(selectedPaymentMethod.color)}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                      <div style={{ minWidth: 190, flex: 1 }}>
                        <div style={{ color: selectedPaymentMethod.color, fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>{selectedBankDetail.bank}</div>
                        <div style={{ color: theme.cream, fontSize: 18, fontWeight: 900, marginTop: 6 }}>{selectedBankDetail.account}</div>
                        <div style={{ color: theme.creamDim, fontSize: 13, marginTop: 4 }}>CCI: {selectedBankDetail.cci}</div>
                        {selectedBankDetail.swift && <div style={{ color: theme.creamDim, fontSize: 13, marginTop: 4 }}>SWIFT: {selectedBankDetail.swift}</div>}
                        <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.55, marginTop: 8 }}>
                          Usa estos datos para transferir. Copia la cuenta o el CCI y comparte el comprobante por WhatsApp.
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                          <button
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(selectedBankDetail.account)}
                            style={{
                              background: "#fff",
                              border: "none",
                              borderRadius: 10,
                              color: "#201038",
                              padding: "9px 12px",
                              fontSize: 12,
                              fontWeight: 900,
                              cursor: "pointer",
                            }}
                          >
                            Copiar cuenta
                          </button>
                          <button
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(selectedBankDetail.cci)}
                            style={{
                              background: "transparent",
                              border: `1px solid ${selectedPaymentMethod.color}66`,
                              borderRadius: 10,
                              color: "#D8B4FE",
                              padding: "9px 12px",
                              fontSize: 12,
                              fontWeight: 900,
                              cursor: "pointer",
                            }}
                          >
                            Copiar CCI
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                <div style={{ color: theme.cream, fontSize: 14, fontWeight: 800, marginBottom: 8 }}>Pedido fácil</div>
                <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.5, marginBottom: 12 }}>
                  Un solo botón envía todo junto. Si quieres separar por marca, tienes las opciones de abajo como apoyo.
                </div>

                <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
                  <button
                    type="button"
                    onClick={openCombinedWhatsApp}
                    disabled={!canSend}
                    style={{
                      width: "100%",
                      background: `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`,
                      border: "none",
                      borderRadius: 12,
                      color: "#0F1A0E",
                      fontSize: 14,
                      fontWeight: 900,
                      padding: "13px 0",
                      cursor: canSend ? "pointer" : "not-allowed",
                      opacity: canSend ? 1 : 0.7,
                    }}
                  >
                    Enviar pedido completo por WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={copyCombinedOrder}
                    disabled={!canSend}
                    style={{
                      width: "100%",
                      background: theme.bgCard,
                      border: `1px solid ${theme.border}`,
                      borderRadius: 12,
                      color: theme.cream,
                      fontSize: 13,
                      fontWeight: 800,
                      padding: "12px 0",
                      cursor: canSend ? "pointer" : "not-allowed",
                      opacity: canSend ? 1 : 0.55,
                    }}
                  >
                    Copiar pedido completo
                  </button>
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
                          onClick={() => copyGroupOrder(group)}
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
                          onClick={() => openGroupWhatsApp(group)}
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
  const [cartStartStep, setCartStartStep] = useState("cart");
  const [activeLine, setActiveLine] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [search, setSearch] = useState("");
  const [hubOpen, setHubOpen] = useState(false);
  const [hubTab, setHubTab] = useState("tutorial");
  const [embeddedStore, setEmbeddedStore] = useState(null);
  const [toast, setToast] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [gpsState, setGpsState] = useState(null);
  const [reviewDraft, setReviewDraft] = useState({ stars: 0, note: "", tag: "" });
  const [supabaseDraft, setSupabaseDraft] = useState(() => readSupabaseRuntimeConfig());
  const [supabaseProbe, setSupabaseProbe] = useState({ state: "idle", message: "Sin verificar todavía." });
  const [supabaseMigration, setSupabaseMigration] = useState({ state: "idle", message: "Aún no se subieron datos locales." });
  const installPromptRef = useRef(null);
  const toastTimerRef = useRef(null);
  const ordersRef = useRef(orders);
  const reviewsRef = useRef(reviews);

  useEffect(() => {
    try {
      window.localStorage.setItem("vndrx-cart-v1", JSON.stringify(cart));
    } catch {
      // Ignored if storage is unavailable.
    }
  }, [cart]);

  useEffect(() => {
    ordersRef.current = orders;
  }, [orders]);

  useEffect(() => {
    reviewsRef.current = reviews;
  }, [reviews]);

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

  useEffect(() => {
    if (!SUPABASE_ENABLED) return;
    let cancelled = false;

    const hydrateSupabaseState = async () => {
      try {
        const [remoteOrders, remoteReviews] = await Promise.all([
          fetchOrdersFromSupabase(),
          fetchReviewsFromSupabase(),
        ]);
        if (cancelled) return;

        const mergedOrders = mergeRecordsById(ordersRef.current, remoteOrders).slice(0, 80);
        const mergedReviews = mergeRecordsById(reviewsRef.current, remoteReviews).slice(0, 40);
        setOrders(mergedOrders);
        setReviews(mergedReviews);
        syncOrdersToSupabase(mergedOrders).catch((error) => {
          console.warn("Supabase order hydrate sync failed", error);
        });
        syncReviewsToSupabase(mergedReviews).catch((error) => {
          console.warn("Supabase review hydrate sync failed", error);
        });
      } catch (error) {
        console.warn("Supabase hydrate failed", error);
      }
    };

    hydrateSupabaseState();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!SUPABASE_ENABLED || !supabase) return;
    let cancelled = false;
    let refreshTimer = null;

    const refreshRemoteState = async () => {
      if (refreshTimer) {
        window.clearTimeout(refreshTimer);
      }
      refreshTimer = window.setTimeout(async () => {
        try {
          const [remoteOrders, remoteReviews] = await Promise.all([
            fetchOrdersFromSupabase(),
            fetchReviewsFromSupabase(),
          ]);
          if (cancelled) return;
          setOrders((current) => mergeRecordsById(current, remoteOrders).slice(0, 80));
          setReviews((current) => mergeRecordsById(current, remoteReviews).slice(0, 40));
        } catch (error) {
          console.warn("Supabase realtime refresh failed", error);
        }
      }, 180);
    };

    const channel = supabase
      .channel("vndrx-live-sync")
      .on("postgres_changes", { event: "*", schema: "public", table: "vndrx_orders" }, refreshRemoteState)
      .on("postgres_changes", { event: "*", schema: "public", table: "vndrx_reviews" }, refreshRemoteState)
      .on("postgres_changes", { event: "*", schema: "public", table: "vndrx_profiles" }, refreshRemoteState)
      .subscribe();

    return () => {
      cancelled = true;
      if (refreshTimer) {
        window.clearTimeout(refreshTimer);
      }
      supabase.removeChannel(channel).catch(() => {});
    };
  }, []);

  useEffect(() => {
    if (!SUPABASE_ENABLED || !profile.referralCode) return;
    syncProfileToSupabase(profile).catch((error) => {
      console.warn("Supabase profile sync failed", error);
    });
  }, [profile]);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2800);
  };

  const saveSupabaseConnection = () => {
    const next = {
      url: supabaseDraft.url.trim(),
      key: supabaseDraft.key.trim(),
    };
    if (!next.url || !next.key) {
      showToast("Pega la URL y la anon key de Supabase");
      return;
    }
    saveSupabaseRuntimeConfig(next);
    showToast("Conexion Supabase guardada. Recargando...", "success");
    window.setTimeout(() => window.location.reload(), 500);
  };

  const migrateLocalDataToSupabase = async () => {
    if (!SUPABASE_ENABLED || !supabase) {
      setSupabaseMigration({ state: "idle", message: "Primero conecta Supabase para poder subir datos." });
      showToast("Primero conecta Supabase");
      return;
    }

    setSupabaseMigration({ state: "checking", message: "Subiendo pedidos, perfil y reseñas locales..." });

    try {
      const [orderResults, reviewResults, profileResult] = await Promise.all([
        syncOrdersToSupabase(ordersRef.current || []),
        syncReviewsToSupabase(reviewsRef.current || []),
        profile?.referralCode ? syncProfileToSupabase(profile) : Promise.resolve({ skipped: true }),
      ]);

      const countFailures = (results = []) => results.filter((result) => result && result.ok === false).length;
      const orderFailures = countFailures(orderResults);
      const reviewFailures = countFailures(reviewResults);
      const profileFailed = profileResult && profileResult.ok === false;
      const totalOrders = ordersRef.current?.length || 0;
      const totalReviews = reviewsRef.current?.length || 0;
      const summary = `Subidos ${Math.max(0, totalOrders - orderFailures)} pedidos y ${Math.max(0, totalReviews - reviewFailures)} reseñas${profile?.referralCode ? "" : " (perfil sin código)"}.`;

      if (orderFailures || reviewFailures || profileFailed) {
        setSupabaseMigration({
          state: "error",
          message: `${summary} Revisa si alguna tabla o política falló.`,
        });
        showToast("La migración tuvo observaciones");
        return;
      }

      setSupabaseMigration({
        state: "ok",
        message: summary,
      });
      showToast("Datos locales subidos a Supabase", "success");
    } catch (error) {
      const message = error?.message || "No se pudo subir la data local a Supabase.";
      setSupabaseMigration({ state: "error", message });
      showToast(message);
    }
  };

  const testSupabaseConnection = async () => {
    const next = {
      url: supabaseDraft.url.trim(),
      key: supabaseDraft.key.trim(),
    };

    if (!next.url || !next.key) {
      setSupabaseProbe({ state: "empty", message: "Pega la URL y la anon key para poder probar." });
      showToast("Primero pega la URL y la anon key");
      return;
    }

    setSupabaseProbe({ state: "checking", message: "Probando conexión..." });
    const result = await probeSupabaseConnection();
    if (result.ok) {
      setSupabaseProbe({
        state: "ok",
        message: result.message,
        elapsedMs: result.elapsedMs,
      });
      showToast(`Supabase responde en ${result.elapsedMs || 0} ms`, "success");
      return;
    }

    setSupabaseProbe({
      state: "error",
      message: result.message,
      elapsedMs: result.elapsedMs,
    });
    showToast(result.message || "No se pudo verificar Supabase");
  };

  const clearSupabaseConnection = () => {
    clearSupabaseRuntimeConfig();
    setSupabaseDraft({ url: "", key: "" });
    setSupabaseProbe({ state: "idle", message: "Sin verificar todavía." });
    setSupabaseMigration({ state: "idle", message: "Aún no se subieron datos locales." });
    showToast("Conexion Supabase eliminada. Recargando...");
    window.setTimeout(() => window.location.reload(), 400);
  };

  const copySupabaseTemplate = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copiado`, "success");
    } catch {
      showToast(`No se pudo copiar ${label.toLowerCase()}`);
    }
  };

  const selectCompany = (companyKey) => {
    setSelectedCompany(companyKey);
    setActiveLine("all");
    setSearch("");
    setHubOpen(false);
    setEmbeddedStore(null);
    setCartOpen(false);
    setCartStartStep("cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast(`Entraste a ${COMPANY_VIEWS[companyKey].shortName}`, "success");
  };

  const changeCompany = () => {
    setHubOpen(false);
    setEmbeddedStore(null);
    setCartOpen(false);
    setSelectedCompany(null);
    setActiveLine("all");
    setSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Elige una empresa para empezar");
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
  const openCart = (step = "cart") => {
    setCartStartStep(step);
    setCartOpen(true);
  };
  const quickBuy = (product, pres, qty, zone) => {
    addToCart(product, pres, qty, zone);
    openCart("checkout");
    showToast("Pedido rápido listo. Completa tus datos y envíalo.", "success");
  };
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
  const topSupplierName = topSupplierKey === "mixto"
    ? "Pedido mixto"
    : SUPPLIERS[topSupplierKey]?.shortName || "Rey Leon";

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
    syncOrdersToSupabase([order]).catch((error) => {
      console.warn("Supabase order sync failed", error);
    });
    showToast(`Pedido guardado. +${order.bonusEarned} bonos`, "success");
  };

  const updateOrderStatus = (orderId, status) => {
    const updatedAt = new Date().toISOString();
    const changedOrder = orders.find((order) => order.id === orderId);
    setOrders((prev) => {
      const next = prev.map((order) => (
        order.id === orderId
          ? { ...order, status, updatedAt }
          : order
      ));
      return next;
    });
    if (changedOrder) {
      syncOrdersToSupabase([{ ...changedOrder, status, updatedAt }]).catch((error) => {
        console.warn("Supabase order status sync failed", error);
      });
    }
    showToast(`Estado actualizado: ${status}`);
  };

  const cycleOrderStatus = (orderId, status) => updateOrderStatus(orderId, status);

  const removeOrder = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    deleteOrderFromSupabase(orderId).catch((error) => {
      console.warn("Supabase order delete failed", error);
    });
    showToast("Pedido eliminado");
  };

  const repeatOrder = (order) => {
    const recreated = order.items.map((item, index) => ({
      ...item,
      uid: `${item.product.id}-${item.pres.label}-${Date.now()}-${index}`,
    }));
    setCart(recreated);
    openCart("cart");
    setHubOpen(false);
    showToast("Pedido repetido en el carrito", "success");
  };

  const openOrder = async (order) => {
    const orderGroups = groupCartBySupplier(order.items || []);
    const message = (order.supplierKey === "mixto" || orderGroups.length > 1)
      ? buildCombinedOrderMessage({
        groups: orderGroups,
        customer: order.customer,
        payment: order.paymentLabel || paymentLabel(order.payment),
        extras: order.extras || {},
      })
      : buildOrderMessage({
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
      updatedAt: new Date().toISOString(),
      stars: reviewDraft.stars,
      note: reviewDraft.note.trim(),
      tag: reviewDraft.tag.trim(),
    };
    setReviews((prev) => [entry, ...prev].slice(0, 20));
    syncReviewsToSupabase([entry]).catch((error) => {
      console.warn("Supabase review sync failed", error);
    });
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

  const openEmbeddedStore = (url, title, subtitle) => {
    setHubOpen(false);
    setEmbeddedStore({ url, title, subtitle });
    showToast("Tienda hermana abierta dentro de VNDRX", "success");
  };

  const closeEmbeddedStore = () => {
    setEmbeddedStore(null);
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
    const ordersBySupplier = orders.reduce((acc, order) => {
      const key = order.supplierKey || "reyleon";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
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
    const supplierLines = Object.entries(ordersBySupplier).map(([key, count]) => {
      const name = key === "mixto" ? "Pedido mixto" : SUPPLIERS[key]?.shortName || key;
      return `${name}: ${count}`;
    });

    return [
      "Resumen diario VNDRX",
      `Pedidos totales: ${totalOrders}`,
      `Pendientes: ${pendingOrders}`,
      `Entregados: ${deliveredOrders}`,
      ...supplierLines,
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
    openCart("cart");
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
    if (cartCount > 0) {
      openCart("checkout");
      showToast("Pedido rápido listo para enviar", "success");
      return;
    }
    await supportWhatsApp("Hola, quiero hacer un pedido en VNDRX.");
  };

  const selectedCompanyView = selectedCompany ? COMPANY_VIEWS[selectedCompany] : null;
  const scene = selectedCompanyView?.look || {
    page: HOME.page,
    heroTop: "#FFF9F2",
    heroBottom: HOME.page,
    nav: "rgba(255, 253, 248, 0.9)",
    surface: HOME.surface,
    surface2: HOME.soft2,
    accent: HOME.accent,
    accent2: HOME.accent2,
    leaf: HOME.leaf,
    leaf2: HOME.leaf2,
    shadow: HOME.shadow,
    glow: "none",
  };
  const companyFilters = selectedCompany ? COMPANY_FILTERS[selectedCompany] || [] : [];
  const isAswa = selectedCompany === "aswa";
  const isJora = selectedCompany === "jora";
  const isTela = selectedCompany === "tela";
  const isBocaditos = selectedCompany === "bocaditos";
  const isArtesania = selectedCompany === "artesania";
  const selectedCompanyProducts = selectedCompany
    ? products.filter((product) => getSupplierKey(product) === selectedCompany)
    : [];
  const filtered = selectedCompanyProducts.filter((product) => {
    const matchCategory = activeLine === "all" || getProductCategory(product) === activeLine;
    const searchText = search.trim().toLowerCase();
    const matchSearch = !searchText
      || product.name.toLowerCase().includes(searchText)
      || product.subtitle.toLowerCase().includes(searchText)
      || product.desc.toLowerCase().includes(searchText);
    return matchCategory && matchSearch;
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
    supabaseEnabled: SUPABASE_ENABLED,
    supabaseUrl: SUPABASE_RUNTIME_CONFIG.url || "",
    supabaseDraft,
    supabaseProbe,
    supabaseMigration,
    promoAssets: isAswa ? ASWA_PROMO_LIBRARY : isJora ? JORA_PROMO_LIBRARY : [],
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
    setSupabaseDraft,
    saveSupabaseConnection,
    migrateLocalDataToSupabase,
    testSupabaseConnection,
    clearSupabaseConnection,
    copySupabaseSql: () => copySupabaseTemplate(SUPABASE_SCHEMA_TEXT, "SQL de Supabase"),
    copySupabaseEnv: () => copySupabaseTemplate(SUPABASE_ENV_TEXT, "Plantilla .env"),
    copySupabaseChecklist: () => copySupabaseTemplate(SUPABASE_CHECKLIST_TEXT, "Checklist"),
  };

  const toastBubble = toast ? (
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
  ) : null;

  if (!selectedCompany) {
    return <CompanyChooserScreen onChooseCompany={selectCompany} toastBubble={toastBubble} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: scene.glow === "none" ? scene.page : `${scene.glow}, ${scene.page}`, fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif", color: scene.text, position: "relative", isolation: "isolate", overflow: "hidden" }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: ${scene.page}; } ::-webkit-scrollbar-thumb { background: ${scene.border}; border-radius: 3px; } input { outline: none; } input::placeholder { color: ${scene.muted}; } input:focus { border-color: ${scene.accent} !important; }`}</style>

      {/* NAV */}
      <nav style={{ background: scene.nav, backdropFilter: "blur(16px)", borderBottom: `1px solid ${scene.border}`, padding: "0 20px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 10px 26px rgba(76, 56, 23, 0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: `linear-gradient(135deg, ${scene.leaf}, ${scene.accent2})`, borderRadius: 16, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 10px 20px rgba(71,101,75,0.18)" }}>{isAswa ? "🌽" : isJora ? "🍯" : isTela ? "🧵" : isBocaditos ? "🍪" : isArtesania ? "🏺" : "🌾"}</div>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 900, color: scene.text, lineHeight: 1 }}>{selectedCompanyView?.shortName || "VNDRX"}</div>
            <div style={{ fontSize: 10, color: scene.muted, letterSpacing: 1.8, fontFamily: "monospace", textTransform: "uppercase" }}>{selectedCompanyView?.tagline || "pedido facil y cercano"}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 6, background: SUPABASE_ENABLED ? "#EAF7ED" : scene.surface2, border: `1px solid ${SUPABASE_ENABLED ? "#BFE7C6" : scene.border}`, color: SUPABASE_ENABLED ? scene.leaf : scene.muted, borderRadius: 999, padding: "4px 8px", fontSize: 9, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>
              {SUPABASE_ENABLED ? "Supabase activo" : "Modo local"}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Buscar en ${selectedCompanyView?.shortName || "la tienda"}...`} style={{ background: scene.surface, border: `1px solid ${scene.border}`, borderRadius: 999, color: scene.text, padding: "10px 14px", fontSize: 13, width: 240, boxShadow: "0 10px 20px rgba(76,56,23,0.06)" }} />
          {selectedCompanyView && (
            <button onClick={changeCompany} style={{ background: scene.surface, border: `1px solid ${scene.border}`, borderRadius: 999, color: scene.text, padding: "10px 14px", cursor: "pointer", fontSize: 13, fontWeight: 800, boxShadow: "0 10px 20px rgba(76,56,23,0.06)" }}>
              Cambiar empresa
            </button>
          )}
          <button onClick={() => openCart("cart")} style={{ background: cartCount > 0 ? `linear-gradient(135deg, ${scene.leaf}, ${scene.leaf2})` : scene.surface, border: `1px solid ${cartCount > 0 ? scene.leaf : scene.border}`, borderRadius: 999, color: cartCount > 0 ? "#fff" : scene.text, padding: "10px 15px", cursor: "pointer", fontSize: 13, fontWeight: 800, boxShadow: cartCount > 0 ? "0 12px 22px rgba(71,101,75,0.16)" : "0 10px 20px rgba(76,56,23,0.06)" }}>
            🛒 {cartCount > 0 ? `${cartCount} items` : "Carrito"}
          </button>
        </div>
      </nav>

      {/* HERO / WELCOME */}
      <div style={{ background: `linear-gradient(180deg, ${scene.heroTop} 0%, ${scene.heroBottom} 100%)`, borderBottom: `1px solid ${scene.border}`, padding: "34px 20px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)", gap: 18, alignItems: "stretch" }}>
            <div style={{ background: scene.surface, border: `1px solid ${scene.border}`, borderRadius: 28, padding: 24, boxShadow: scene.shadow }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: scene.surface2, border: `1px solid ${scene.border}`, borderRadius: 999, padding: "6px 14px", marginBottom: 14, fontSize: 11, color: scene.accent, fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase" }}>
                {selectedCompanyView?.heroNote || "Te atendemos como en casa"}
              </div>
              <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(30px,4vw,48px)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 10px", color: scene.text }}>
                {selectedCompanyView?.heroTitle || "Pide tranquilo, recibe en casa"}
              </h1>
              <p style={{ color: scene.muted, fontSize: 15, lineHeight: 1.75, margin: "0 0 18px", maxWidth: 600 }}>
                {selectedCompanyView?.heroText || "En VNDRX te ayudamos a elegir, pagar y pedir sin enredos. Todo esta pensado para que tu cliente se sienta acompañado, como cuando alguien de confianza le atiende en persona."}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                {(selectedCompanyView?.heroChips || ["pedido facil", "foto real", "whatsapp directo", "pago claro"]).map((item) => (
                  <span key={item} style={{ background: scene.surface2, border: `1px solid ${scene.border}`, borderRadius: 999, padding: "7px 11px", fontSize: 11, color: scene.text, fontWeight: 700 }}>
                    {item}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  style={{ background: `linear-gradient(135deg, ${scene.leaf}, ${scene.leaf2})`, border: "none", color: "#fff", borderRadius: 999, padding: "13px 18px", cursor: "pointer", fontWeight: 900, boxShadow: "0 12px 22px rgba(71,101,75,0.18)" }}
                >
                  Ver catálogo
                </button>
                {isAswa ? (
                  <>
                    <button
                      type="button"
                      onClick={() => openEmbeddedStore(
                        ASWA_APP_URL,
                        "ASWA La Rica Chicha",
                        "Mas productos dentro de VNDRX, sin salir de la app",
                      )}
                      style={{ background: "#FFF", border: `1px solid ${scene.border}`, color: scene.text, borderRadius: 999, padding: "13px 18px", cursor: "pointer", fontWeight: 800 }}
                    >
                      Mas productos ASWA
                    </button>
                    <button
                      type="button"
                      onClick={() => window.open(ASWA_APP_URL, "_blank", "noopener,noreferrer")}
                      style={{ background: "#FFF", border: `1px solid ${scene.border}`, color: scene.text, borderRadius: 999, padding: "13px 18px", cursor: "pointer", fontWeight: 800 }}
                    >
                      Abrir en pestaña
                    </button>
                  </>
                ) : isJora ? (
                  <>
                    <button
                      type="button"
                      onClick={() => supportWhatsApp("Hola, quiero pedir chicha de jora.")}
                      style={{ background: "#FFF", border: `1px solid ${scene.border}`, color: scene.text, borderRadius: 999, padding: "13px 18px", cursor: "pointer", fontWeight: 800 }}
                    >
                      Pedir Jora
                    </button>
                    <button
                      type="button"
                      onClick={() => supportWhatsApp("Hola, quiero saber como usar la chicha de jora para sazonar comida y beberla con miel de abeja.")}
                      style={{ background: "#FFF", border: `1px solid ${scene.border}`, color: scene.text, borderRadius: 999, padding: "13px 18px", cursor: "pointer", fontWeight: 800 }}
                    >
                      Consultar uso
                    </button>
                  </>
                ) : isTela ? (
                  <>
                    <button
                      type="button"
                      onClick={() => supportWhatsApp("Hola, quiero consultar productos de la tienda Tela.")}
                      style={{ background: "#FFF", border: `1px solid ${scene.border}`, color: scene.text, borderRadius: 999, padding: "13px 18px", cursor: "pointer", fontWeight: 800 }}
                    >
                      Pedir Tela
                    </button>
                    <button
                      type="button"
                      onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                      style={{ background: "#FFF", border: `1px solid ${scene.border}`, color: scene.text, borderRadius: 999, padding: "13px 18px", cursor: "pointer", fontWeight: 800 }}
                    >
                      Ver hogar
                    </button>
                  </>
                ) : isBocaditos ? (
                  <>
                    <button
                      type="button"
                      onClick={() => supportWhatsApp("Hola, quiero pedir bocaditos regionales artesanales.")}
                      style={{ background: "#FFF", border: `1px solid ${scene.border}`, color: scene.text, borderRadius: 999, padding: "13px 18px", cursor: "pointer", fontWeight: 800 }}
                    >
                      Pedir Bocaditos
                    </button>
                    <button
                      type="button"
                      onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                      style={{ background: "#FFF", border: `1px solid ${scene.border}`, color: scene.text, borderRadius: 999, padding: "13px 18px", cursor: "pointer", fontWeight: 800 }}
                    >
                      Ver bocaditos
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => supportWhatsApp(`Hola, quiero consultar precios de ${selectedCompanyView?.shortName || "la tienda"}.`)}
                    style={{ background: "#FFF", border: `1px solid ${scene.border}`, color: scene.text, borderRadius: 999, padding: "13px 18px", cursor: "pointer", fontWeight: 800 }}
                  >
                    Contactar ventas
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ background: scene.surface, border: `1px solid ${scene.border}`, borderRadius: 24, padding: 18, boxShadow: scene.shadow }}>
                <div style={{ color: scene.accent, fontSize: 11, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Cómo pedir</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {[
                    "1. Elige tu producto favorito",
                    "2. Toca Agregar o Pedir ahora",
                    "3. Confirma por WhatsApp",
                  ].map((step) => (
                    <div key={step} style={{ background: scene.surface2, border: `1px solid ${scene.border}`, borderRadius: 16, padding: "10px 12px", color: scene.text, fontSize: 13, fontWeight: 700, lineHeight: 1.45 }}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: `linear-gradient(135deg, #FFF8EF, #F6EEDD)`, border: `1px solid ${scene.border}`, borderRadius: 24, padding: 18, boxShadow: scene.shadow }}>
                <div style={{ color: scene.muted, fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Atencion directa</div>
                <div style={{ color: scene.text, fontSize: 18, fontWeight: 900, fontFamily: "Georgia, serif", marginBottom: 10 }}>{selectedCompanyView?.infoTitle || "Tu pedido entra al WhatsApp central"}</div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ color: scene.muted, fontSize: 11, textTransform: "uppercase", fontWeight: 800, letterSpacing: 1 }}>Número</div>
                    <div style={{ color: scene.leaf, fontSize: 18, fontWeight: 900 }}>{ORDER_PHONE_DISPLAY}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {isAswa ? (
                      <>
                        <span style={{ background: "#EAF5EA", color: scene.leaf, borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800 }}>ASWA</span>
                        <span style={{ background: "#F9EEDB", color: scene.accent, borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800 }}>Escolar gratis</span>
                      </>
                    ) : isJora ? (
                      <>
                        <span style={{ background: "#F9EEDB", color: scene.accent, borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800 }}>Jora</span>
                        <span style={{ background: "#EAF5EA", color: scene.leaf, borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800 }}>Sazonador y bebida</span>
                      </>
                    ) : isTela ? (
                      <>
                        <span style={{ background: "#F9EEDB", color: "#6A3552", borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800 }}>Tela</span>
                        <span style={{ background: "#EAF5EA", color: "#335E43", borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800 }}>Hogar y moda</span>
                      </>
                    ) : isBocaditos ? (
                      <>
                        <span style={{ background: "#F9EEDB", color: "#8C3F21", borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800 }}>Bocaditos</span>
                        <span style={{ background: "#EAF5EA", color: "#335E43", borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800 }}>Maní y dulces</span>
                      </>
                    ) : isArtesania ? (
                      <>
                        <span style={{ background: "#F9EEDB", color: "#7A4A2A", borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800 }}>Artesania</span>
                        <span style={{ background: "#EAF5EA", color: "#5C7A4E", borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800 }}>Hecho a mano</span>
                      </>
                    ) : (
                      <>
                        <span style={{ background: "#F9EEDB", color: scene.accent, borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800 }}>Rey Leon</span>
                        <span style={{ background: "#EAF5EA", color: scene.leaf, borderRadius: 999, padding: "6px 10px", fontSize: 11, fontWeight: 800 }}>Delivery por zona</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12, marginTop: 14 }}>
            <div style={{ background: scene.surface, border: `1px solid ${scene.border}`, borderRadius: 18, padding: 14, boxShadow: scene.shadow }}>
              <div style={{ color: scene.muted, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>Atención amable</div>
              <div style={{ color: scene.text, fontSize: 13, lineHeight: 1.55, marginTop: 6 }}>Te guiamos paso a paso para que comprar se sienta fácil y cercano.</div>
            </div>
            <div style={{ background: scene.surface, border: `1px solid ${scene.border}`, borderRadius: 18, padding: 14, boxShadow: scene.shadow }}>
              <div style={{ color: scene.muted, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>Pedido rápido</div>
              <div style={{ color: scene.text, fontSize: 13, lineHeight: 1.55, marginTop: 6 }}>Cada producto tiene un botón para agregarlo o abrir el pedido al instante.</div>
            </div>
            <div style={{ background: scene.surface, border: `1px solid ${scene.border}`, borderRadius: 18, padding: 14, boxShadow: scene.shadow }}>
              <div style={{ color: scene.muted, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>Confianza</div>
              <div style={{ color: scene.text, fontSize: 13, lineHeight: 1.55, marginTop: 6 }}>Fotos reales, precios visibles y mensaje listo para WhatsApp.</div>
            </div>
          </div>
        </div>
      </div>

      {isAswa ? (
        <PromoBoard />
      ) : isJora ? (
        <JoraBoard />
      ) : isTela ? (
        <TelaBoard />
      ) : isBocaditos ? (
        <BocaditosBoard />
      ) : isArtesania ? (
        <ArtesaniaBoard />
      ) : (
        <ReyLeonBoard
          onOpenPriceSheet={() => openPromoAsset(ASSETS.priceSheet)}
          onContact={() => supportWhatsApp("Hola, quiero consultar precios de Rey Leon.")}
        />
      )}

      <div id="catalog" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 10px" }}>
        <div style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(8px)",
          border: `1px solid ${scene.border}`,
          borderRadius: 22,
          padding: 16,
          boxShadow: scene.shadow,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div>
              <div style={{ color: scene.accent, fontSize: 12, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>
                {isAswa ? "Centro ASWA" : isJora ? "Chicha de Jora" : isTela ? "Tienda Tela" : isBocaditos ? "Bocaditos Regionales" : isArtesania ? "Artesania Lamista" : "Molino Rey Leon"}
              </div>
              <div style={{ color: scene.text, fontSize: 16, fontWeight: 900, marginTop: 4 }}>
                {isAswa
                  ? "Tutorial, referidos, bonos, GPS, historial y soporte en un solo lugar"
                  : isJora
                    ? "Chicha de jora para sazonar, beber y compartir en una sola tienda"
                    : isTela
                      ? "Bolsas, alforjas, moda regional, sabanas y descanso en una sola tienda"
                      : isBocaditos
                        ? "Ñuto, rosquitas, turcas, maní, chifles y dulces artesanales en una sola tienda"
                        : isArtesania
                          ? "Tinajas, platos, pate, olla arrocera, tiestos y floreros artesanales en una tienda separada"
                    : "Arroz, derivados y precios directos del molino"}
              </div>
              <div style={{ color: scene.muted, fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>
                {isAswa
                  ? "Lo mejor de ASWA sumado a tu tienda actual para vender mas rapido."
                  : isJora
                    ? "Para beberla, endulza al gusto; recomendamos miel de abeja. Para comida, usala como aderezo natural."
                    : isTela
                      ? "Escoge bolsas, mochilas, panueloletas, vestidos regionales y articulos para el hogar sin mezclarlo con otras marcas."
                      : isBocaditos
                        ? "El cliente encuentra rapido bocaditos regionales con fotos reales y compra sin ver otras marcas."
                        : isArtesania
                          ? "El cliente encuentra rapido artesania lamista con fotos reales y compra sin ver otras marcas."
                    : "El cliente ve solo los productos de Rey Leon con fotos reales y compra sin ver otras marcas."}
              </div>
            </div>
            {isAswa ? (
              <button type="button" onClick={() => { setHubTab("tutorial"); setHubOpen(true); }} style={{ background: `linear-gradient(135deg, ${scene.leaf}, ${scene.leaf2})`, border: "none", color: "#fff", borderRadius: 999, padding: "11px 16px", cursor: "pointer", fontWeight: 900, boxShadow: "0 12px 22px rgba(71,101,75,0.16)" }}>
                Abrir hub
              </button>
            ) : isJora ? (
              <button type="button" onClick={() => supportWhatsApp("Hola, quiero consultar la chicha de jora.")} style={{ background: scene.surface2, border: `1px solid ${scene.border}`, color: scene.text, borderRadius: 999, padding: "11px 16px", cursor: "pointer", fontWeight: 900, boxShadow: "0 12px 22px rgba(71,101,75,0.08)" }}>
                Consultar Jora
              </button>
            ) : isTela ? (
              <button type="button" onClick={() => supportWhatsApp("Hola, quiero pedir productos de la tienda Tela.")} style={{ background: scene.surface2, border: `1px solid ${scene.border}`, color: scene.text, borderRadius: 999, padding: "11px 16px", cursor: "pointer", fontWeight: 900, boxShadow: "0 12px 22px rgba(71,101,75,0.08)" }}>
                Pedir Tela
              </button>
            ) : isBocaditos ? (
              <button type="button" onClick={() => supportWhatsApp("Hola, quiero pedir bocaditos regionales artesanales.")} style={{ background: scene.surface2, border: `1px solid ${scene.border}`, color: scene.text, borderRadius: 999, padding: "11px 16px", cursor: "pointer", fontWeight: 900, boxShadow: "0 12px 22px rgba(71,101,75,0.08)" }}>
                Pedir Bocaditos
              </button>
            ) : isArtesania ? (
              <button type="button" onClick={() => supportWhatsApp("Hola, quiero pedir artesania lamista.")} style={{ background: scene.surface2, border: `1px solid ${scene.border}`, color: scene.text, borderRadius: 999, padding: "11px 16px", cursor: "pointer", fontWeight: 900, boxShadow: "0 12px 22px rgba(71,101,75,0.08)" }}>
                Pedir Artesania
              </button>
            ) : (
              <div style={{ background: scene.surface2, border: `1px solid ${scene.border}`, borderRadius: 999, padding: "10px 14px", color: scene.text, fontSize: 12, fontWeight: 800 }}>
                {selectedCompanyView?.companyPhone || ORDER_PHONE_DISPLAY}
              </div>
            )}
          </div>

          {isAswa && (
            <>
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
                    background: "#FFF",
                    border: `1px solid ${scene.border}`,
                    borderRadius: 14,
                    padding: "11px 10px",
                    color: scene.text,
                    cursor: "pointer",
                    textAlign: "left",
                    boxShadow: "0 8px 18px rgba(76,56,23,0.04)",
                  }}
                >
                  <div style={{ fontSize: 15 }}>{item.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, marginTop: 4 }}>{item.label}</div>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <button
                type="button"
                onClick={() => openEmbeddedStore(
                  ASWA_APP_URL,
                  "ASWA La Rica Chicha",
                  "Mas productos dentro de VNDRX, sin salir de la app",
                )}
                style={{
                  background: "linear-gradient(135deg, #F9EEDB, #FFF8EF)",
                  border: `1px solid ${scene.border}`,
                  color: scene.text,
                  borderRadius: 999,
                  padding: "11px 16px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 900,
                  boxShadow: "0 8px 16px rgba(76,56,23,0.05)",
                }}
              >
                Ver mas productos ASWA dentro de VNDRX
              </button>
            </div>
            </>
          )}
          {isJora && (
            <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginTop: 14 }}>
              {[
                { title: "Sazonador", desc: "Para guisos y aderezos", color: "#D59B3D" },
                { title: "Bebible", desc: "Endulza al gusto", color: "#F0C040" },
                { title: "Miel recomendada", desc: "Sabor mas suave y natural", color: "#8A5A1C" },
              ].map((item) => (
                <div key={item.title} style={{ background: scene.surface, border: `1px solid ${scene.border}`, borderRadius: 14, padding: 14, boxShadow: scene.shadow }}>
                  <div style={{ display: "inline-flex", background: `${item.color}20`, color: item.color, borderRadius: 999, padding: "5px 10px", fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>{item.title}</div>
                  <div style={{ color: scene.text, fontSize: 13, fontWeight: 700, lineHeight: 1.5, marginTop: 8 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <button
                type="button"
                onClick={() => supportWhatsApp("Hola, quiero pedir chicha de jora.")}
                style={{
                  background: "linear-gradient(135deg, #D59B3D, #F0C040)",
                  border: "none",
                  color: "#0F1A0E",
                  borderRadius: 999,
                  padding: "11px 16px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 900,
                  boxShadow: "0 8px 16px rgba(76,56,23,0.05)",
                }}
              >
                Pedir Jora
              </button>
            </div>
            </>
          )}
          {isTela && (
            <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginTop: 14 }}>
              {[
                { title: "Bolsas", desc: "Compras y uso diario", color: "#7EA6D8" },
                { title: "Moda regional", desc: "Panueloletas y vestidos", color: "#D58AA7" },
                { title: "Hogar", desc: "Sabanas y cubrecamas", color: "#A9CFB1" },
              ].map((item) => (
                <div key={item.title} style={{ background: scene.surface, border: `1px solid ${scene.border}`, borderRadius: 14, padding: 14, boxShadow: scene.shadow }} >
                  <div style={{ display: "inline-flex", background: `${item.color}20`, color: item.color, borderRadius: 999, padding: "5px 10px", fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>{item.title}</div>
                  <div style={{ color: scene.text, fontSize: 13, fontWeight: 700, lineHeight: 1.5, marginTop: 8 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <button
                type="button"
                onClick={() => supportWhatsApp("Hola, quiero pedir productos de la tienda Tela.")}
                style={{
                  background: "linear-gradient(135deg, #6A3552, #D58AA7)",
                  border: "none",
                  color: "#fff",
                  borderRadius: 999,
                  padding: "11px 16px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 900,
                  boxShadow: "0 8px 16px rgba(76,56,23,0.05)",
                }}
              >
                Pedir Tela
              </button>
            </div>
            </>
          )}
          {isBocaditos && (
            <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginTop: 14 }}>
              {[
                { title: "Maní", desc: "Tostado y confitado", color: "#B66A2C" },
                { title: "Galletas", desc: "Rosquitas y turcas", color: "#8C3F21" },
                { title: "Dulces", desc: "Turrón, cocada y suspiros", color: "#D97A2E" },
              ].map((item) => (
                <div key={item.title} style={{ background: scene.surface, border: `1px solid ${scene.border}`, borderRadius: 14, padding: 14, boxShadow: scene.shadow }} >
                  <div style={{ display: "inline-flex", background: `${item.color}20`, color: item.color, borderRadius: 999, padding: "5px 10px", fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>{item.title}</div>
                  <div style={{ color: scene.text, fontSize: 13, fontWeight: 700, lineHeight: 1.5, marginTop: 8 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <button
                type="button"
                onClick={() => supportWhatsApp("Hola, quiero pedir bocaditos regionales artesanales.")}
                style={{
                  background: "linear-gradient(135deg, #B66A2C, #D97A2E)",
                  border: "none",
                  color: "#0F1A0E",
                  borderRadius: 999,
                  padding: "11px 16px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 900,
                  boxShadow: "0 8px 16px rgba(76,56,23,0.05)",
                }}
              >
                Pedir Bocaditos
              </button>
            </div>
            </>
          )}
        </div>
      </div>

      {/* LINE FILTERS */}
      <div style={{ background: scene.nav, borderBottom: `1px solid ${scene.border}`, padding: "12px 20px", display: "flex", gap: 8, overflowX: "auto", backdropFilter: "blur(16px)", boxShadow: "0 8px 20px rgba(76,56,23,0.04)" }}>
        {companyFilters.map(({ id, label }) => {
          const lc = id === "all"
            ? null
            : ({
              premium: LINE_COLORS.premium,
              superior: LINE_COLORS.superior,
              economico: LINE_COLORS.economico,
              derivados: LINE_COLORS.derivados,
              chicha: LINE_COLORS.chicha,
              jora_culinaria: LINE_COLORS.jora_culinaria,
              jora_bebible: LINE_COLORS.jora_bebible,
              jora_familiar: LINE_COLORS.jora_familiar,
              tela_bolsas: LINE_COLORS.tela_bolsas,
              tela_moda: LINE_COLORS.tela_moda,
              tela_hogar: LINE_COLORS.tela_hogar,
              bocaditos_mani: LINE_COLORS.bocaditos_mani,
              bocaditos_galleta: LINE_COLORS.bocaditos_galleta,
              bocaditos_dulce: LINE_COLORS.bocaditos_dulce,
              bocaditos_chifle: LINE_COLORS.bocaditos_chifle,
              bidon: { badge: scene.accent2, bg: "#FDF0D8", label: "BIDON" },
              escolar: { badge: scene.leaf, bg: "#EAF5EA", label: "ESCOLAR" },
            }[id] || { badge: scene.accent2, bg: scene.surface2, label });
          const active = activeLine === id;
          return (
            <button key={id} onClick={() => setActiveLine(id)} style={{
              background: active ? (lc ? `${lc.badge}18` : scene.surface2) : "#FFF",
              border: `1px solid ${active ? (lc ? lc.badge : scene.accent2) : scene.border}`,
              borderRadius: 999, color: active ? scene.text : scene.muted,
              padding: "8px 16px", cursor: "pointer", fontSize: 12,
              fontWeight: active ? 800 : 700, whiteSpace: "nowrap", transition: "all 0.2s",
              boxShadow: active ? "0 8px 16px rgba(76,56,23,0.08)" : "none",
            }}>
              {label}
            </button>
          );
        })}
        <span style={{ marginLeft: "auto", color: scene.muted, fontSize: 12, alignSelf: "center", whiteSpace: "nowrap" }}>
          {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* PRODUCTS GRID */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>
        {/* San Juan promo banner */}
        {isAswa ? (
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
        ) : isJora ? (
          <div style={{
            background: "linear-gradient(135deg, #6B4210 0%, #D59B3D 50%, #8A5A1C 100%)",
            border: "2px solid #F0C04088",
            borderRadius: 14, padding: "16px 22px", marginBottom: 28,
            display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
          }}>
            <div style={{ fontSize: 36 }}>🍯</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#FFF7DC", fontSize: 16, fontWeight: 800, fontFamily: "Georgia, serif" }}>
                Chicha de Jora · Sazonador y bebida tradicional
              </div>
              <div style={{ color: "#FFF0C6", fontSize: 13, marginTop: 4 }}>
                Para aderezar tu comida o beberla endulzada al gusto. Recomendamos miel de abeja.
              </div>
            </div>
            <div style={{ background: "#F0C040", borderRadius: 20, padding: "6px 16px", color: "#0F1A0E", fontSize: 12, fontWeight: 800 }}>
              NUEVA TIENDA
            </div>
          </div>
        ) : isTela ? (
          <div style={{
            background: "linear-gradient(135deg, #402238 0%, #6A3552 50%, #8B5C6F 100%)",
            border: "2px solid #D58AA788",
            borderRadius: 14, padding: "16px 22px", marginBottom: 28,
            display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
          }}>
            <div style={{ fontSize: 36 }}>🧵</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#FFF7F2", fontSize: 16, fontWeight: 800, fontFamily: "Georgia, serif" }}>
                Tienda Tela · Bolsas, moda regional y hogar
              </div>
              <div style={{ color: "#F2DFE5", fontSize: 13, marginTop: 4 }}>
                Bolsas, alforjas, panueloletas, vestidos regionales, mochilas, sabanas, edredones, colchas y cubrecamas.
              </div>
            </div>
            <div style={{ background: "#F0C040", borderRadius: 20, padding: "6px 16px", color: "#0F1A0E", fontSize: 12, fontWeight: 800 }}>
              NUEVO CATALOGO
            </div>
          </div>
        ) : null}

        <div style={{
          background: "linear-gradient(135deg, #121D10 0%, #1D2B18 100%)",
          border: `1px solid ${theme.border}`,
          borderRadius: 14,
          padding: "12px 14px",
          marginBottom: 18,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          <div style={{ fontSize: 22 }}>⚡</div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ color: theme.cream, fontSize: 14, fontWeight: 800 }}>Pedido rápido</div>
            <div style={{ color: theme.creamDim, fontSize: 12, lineHeight: 1.5 }}>
              En cada producto toca <strong style={{ color: theme.goldLight }}>Pedir ahora</strong> y te llevamos directo al checkout.
            </div>
          </div>
        </div>

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
                onQuickBuy={quickBuy}
                cartItem={cart.find(i => i.product.id === p.id)}
              />
            ))}
          </div>
        )}

        {/* VALUE PROPS */}
        <div style={{ marginTop: 52, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {(
            isAswa
              ? [
                { icon: "🌽", title: "Pedidos claros", desc: "Chicha, bidon y escolar separados para que el cliente elija rapido." },
                { icon: "🎒", title: "Delivery escolar", desc: "Las secciones educativas mantienen delivery gratis en sus promociones." },
                { icon: "🟣", title: "Yape listo", desc: "Escanea, confirma y envia el pedido centralizado al numero correcto." },
                { icon: "📱", title: "App ASWA", desc: "Los productos sanjuaneros abren la app hermana cuando haga falta." },
              ]
              : isJora
                ? [
                  { icon: "🍯", title: "Sazonador natural", desc: "Usala para aderezar guisos, carnes y marinados con sabor de casa." },
                  { icon: "🥤", title: "Bebible", desc: "Si la quieres tomar, endulza al gusto; la miel de abeja queda excelente." },
                  { icon: "🌾", title: "Tradicion", desc: "Una tienda separada, clara y facil de entender para tu cliente." },
                  { icon: "💬", title: "Pedido directo", desc: "Un solo boton para preguntar, pedir y compartir por WhatsApp." },
                ]
              : [
                { icon: "🏭", title: "Del Molino a Ti", desc: "Compras directamente a la Piladora Rey Leon. Sin bodega, sin minimarket." },
                { icon: "✅", title: "ISO 9001 · HACCP · BPM", desc: "Certificaciones internacionales que garantizan calidad en cada grano." },
                { icon: "🚚", title: "Delivery por Zona", desc: "Costo fijo por zona, no por cantidad. Pides 1 o 10 sacos, mismo delivery." },
                { icon: "💰", title: "Precio de Origen", desc: "Ahorras comprando directo del productor con precios visibles." },
              ]
          ).map(vp => (
            <div key={vp.title} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "16px 18px", textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>{vp.icon}</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 14, fontWeight: 700, color: theme.cream, margin: "8px 0 5px" }}>{vp.title}</div>
              <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.5 }}>{vp.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {toastBubble}

      {isAswa && (
        <ASWAControlHub
          open={hubOpen}
          tab={hubTab}
          onClose={() => setHubOpen(false)}
          onTabChange={setHubTab}
          data={hubData}
          actions={hubActions}
        />
      )}

      {embeddedStore && (
        <EmbeddedAppModal
          open={Boolean(embeddedStore)}
          title={embeddedStore.title}
          subtitle={embeddedStore.subtitle}
          url={embeddedStore.url}
          onClose={closeEmbeddedStore}
        />
      )}

      <button
        onClick={() => {
          if (cartCount > 0) {
            openCart("checkout");
            return;
          }
          window.open(`https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent(`Hola, quiero hacer un pedido en ${selectedCompanyView?.shortName || "VNDRX"}.`)}`, "_blank", "noopener,noreferrer");
        }}
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
        <span>{cartCount > 0 ? "🛒" : "💬"}</span>
        <span>{cartCount > 0 ? `Ir al pedido (${cartCount})` : `Pedir ${selectedCompanyView?.shortName || "ahora"}`}</span>
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
          initialStep={cartStartStep}
          storeKey={ASWA_PAYMENT_STORE_KEYS.has(selectedCompany) ? "aswa" : "reyleon"}
        />
      )}
    </div>
  );
}
