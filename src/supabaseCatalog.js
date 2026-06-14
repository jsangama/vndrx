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

function safeStorageName(name = "comprobante.jpg") {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "comprobante.jpg";
}

async function uploadPaymentProof(file, orderId) {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) {
    throw new Error("Supabase no esta configurado.");
  }
  if (!file) {
    throw new Error("Selecciona una foto del comprobante.");
  }

  const folder = String(orderId || "pedido").replace(/[^a-zA-Z0-9._-]+/g, "-");
  const fileName = `${Date.now()}-${safeStorageName(file.name)}`;
  const objectPath = `payment-proofs/${folder}/${fileName}`;
  const response = await fetch(`${normalizeUrl(url)}/storage/v1/object/${objectPath}`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false",
    },
    body: file,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "No se pudo subir el comprobante.");
  }

  return {
    path: objectPath,
    url: `${normalizeUrl(url)}/storage/v1/object/public/${objectPath}`,
  };
}

export {
  CONFIG_ID,
  getSupabaseConfig,
  hasSupabaseConfig,
  loadCatalogConfig,
  saveCatalogConfig,
  signInOwner,
  uploadPaymentProof,
};
