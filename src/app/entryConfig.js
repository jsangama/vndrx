export const DEFAULT_ENTRY_COMPANY = "aswa";
export const PUBLIC_COMPANY_KEYS = ["aswa", "reyleon"];

const COMPANY_ALIASES = {
  arroz: "reyleon",
  molino: "reyleon",
  reyleon: "reyleon",
  pacifico: "reyleon",
  "arroz-del-pacifico": "reyleon",
  arrozdelpacifico: "reyleon",
  aswa: "aswa",
  chicha: "aswa",
  jora: "jora",
  tela: "tela",
  bocaditos: "bocaditos",
  artesania: "artesania",
};

export function hasDeveloperAccess(locationSearch = "") {
  const params = new URLSearchParams(locationSearch);
  return params.get("dueno") === "1" || params.get("owner") === "1" || params.get("dev") === "1";
}

export function getVisibleCompanyKeys(allCompanyKeys, locationSearch = "") {
  if (hasDeveloperAccess(locationSearch)) return allCompanyKeys;
  const allowed = new Set(PUBLIC_COMPANY_KEYS);
  return allCompanyKeys.filter((key) => allowed.has(key));
}

export function resolveInitialCompany(availableCompanies, locationSearch = "") {
  const available = new Set(availableCompanies);
  if (!available.size) return null;

  const params = new URLSearchParams(locationSearch);
  const requested = params.get("empresa") || params.get("company") || params.get("store") || params.get("tienda");
  const normalized = requested?.trim().toLowerCase();
  const aliased = normalized ? COMPANY_ALIASES[normalized] || normalized : "";

  if (aliased && available.has(aliased)) return aliased;
  if (!requested) return null;
  if (available.has(DEFAULT_ENTRY_COMPANY)) return DEFAULT_ENTRY_COMPANY;
  return available.values().next().value;
}
