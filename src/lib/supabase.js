import { createClient } from "@supabase/supabase-js";

export const SUPABASE_CONFIG_KEY = "vndrx-supabase-config-v1";
export const SUPABASE_TABLES = {
  orders: "vndrx_orders",
  profiles: "vndrx_profiles",
  reviews: "vndrx_reviews",
};

const normalizeConfig = (config = {}) => ({
  url: (config.url || "").trim(),
  key: (config.key || "").trim(),
});

const readStoredConfig = () => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
};

export function readSupabaseRuntimeConfig() {
  const envConfig = normalizeConfig({
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_ANON_KEY,
  });
  const storedConfig = normalizeConfig(readStoredConfig());
  return storedConfig.url && storedConfig.key ? storedConfig : envConfig;
}

export function saveSupabaseRuntimeConfig(config) {
  const next = normalizeConfig(config);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(next));
  }
  return next;
}

export function clearSupabaseRuntimeConfig() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(SUPABASE_CONFIG_KEY);
  }
}

const runtimeConfig = readSupabaseRuntimeConfig();

export const SUPABASE_ENABLED = Boolean(runtimeConfig.url && runtimeConfig.key);
export const SUPABASE_RUNTIME_CONFIG = runtimeConfig;
export const supabase = SUPABASE_ENABLED
  ? createClient(runtimeConfig.url, runtimeConfig.key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  : null;
