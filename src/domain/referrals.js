export function makeReferralCode(prefix = "ASWA") {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function getShareUrl(code) {
  if (typeof window === "undefined") return "";
  const current = window.location?.href?.split("#")[0]?.split("?")[0] || "";
  if (!current) return "";
  return `${current}?ref=${encodeURIComponent(code)}`;
}
