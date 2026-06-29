import { useEffect, useState } from "react";

export const STORAGE_KEYS = {
  profile: "vndrx-profile-v2",
  orders: "vndrx-orders-v2",
  reviews: "vndrx-reviews-v2",
};

export const DEFAULT_PROFILE = {
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

export function loadStoredState(key, fallback) {
  if (typeof window === "undefined") return typeof fallback === "function" ? fallback() : fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return typeof fallback === "function" ? fallback() : fallback;
    return JSON.parse(raw);
  } catch {
    return typeof fallback === "function" ? fallback() : fallback;
  }
}

export function usePersistentState(key, fallback) {
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
