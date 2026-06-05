const CONFIG_ID = "catalog";

function getSupabaseConfig() {
  return {
    url: import.meta.env.VITE_SUPABASE_URL || "",
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
  };
}

function normalizeUrl(url) {
  return url.replace(/\/+$/, "");
}

function hasSupabaseConfig() {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey);
}

async function supabaseRequest(path, { method = "GET", token, body, prefer } = {}) {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) {
    throw new Error("Supabase no esta configurado.");
  }

  const headers = {
    apikey: anonKey,
    Authorization: `Bearer ${token || anonKey}`,
  };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (prefer) headers.Prefer = prefer;

  const response = await fetch(`${normalizeUrl(url)}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase error ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

async function signInOwner(email, password) {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) {
    throw new Error("Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.");
  }

  const response = await fetch(`${normalizeUrl(url)}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("No se pudo iniciar sesion en Supabase.");
  }

  return response.json();
}

async function loadCatalogConfig() {
  if (!hasSupabaseConfig()) return null;
  const rows = await supabaseRequest(`/rest/v1/store_config?id=eq.${CONFIG_ID}&select=data,updated_at`);
  return rows?.[0] || null;
}

async function saveCatalogConfig(data, token) {
  return supabaseRequest("/rest/v1/store_config", {
    method: "POST",
    token,
    prefer: "resolution=merge-duplicates,return=representation",
    body: {
      id: CONFIG_ID,
      data,
      updated_at: new Date().toISOString(),
    },
  });
}

export {
  CONFIG_ID,
  getSupabaseConfig,
  hasSupabaseConfig,
  loadCatalogConfig,
  saveCatalogConfig,
  signInOwner,
};
