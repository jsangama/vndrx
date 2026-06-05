import { SUPABASE_ENABLED, SUPABASE_TABLES, supabase } from "./supabase";

const nowIso = () => new Date().toISOString();

const cloneSafe = (value, fallback) => {
  try {
    return value == null ? fallback : JSON.parse(JSON.stringify(value));
  } catch {
    return fallback;
  }
};

const settled = async (promise) => {
  try {
    const result = await promise;
    if (result?.error) return { ok: false, error: result.error };
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
};

const orderRow = (order) => ({
  id: order.id,
  supplier_key: order.supplierKey || "reyleon",
  supplier_name: order.supplierName || "",
  status: order.status || "pendiente",
  payment: order.payment || "cod",
  payment_label: order.paymentLabel || "",
  subtotal: Number(order.subtotal || 0),
  delivery: Number(order.delivery || 0),
  total: Number(order.total || 0),
  bonus_earned: Number(order.bonusEarned || 0),
  channel: order.channel || "whatsapp",
  created_at: order.createdAt || nowIso(),
  updated_at: nowIso(),
  items: cloneSafe(order.items, []),
  customer: cloneSafe(order.customer, {}),
  extras: cloneSafe(order.extras, {}),
});

const profileRow = (profile) => ({
  profile_code: profile?.referralCode || "anonymous",
  data: cloneSafe(profile, {}),
  updated_at: nowIso(),
});

const reviewRow = (review) => ({
  id: review.id,
  created_at: review.createdAt || nowIso(),
  updated_at: nowIso(),
  data: cloneSafe(review, {}),
});

const toIso = (value) => {
  if (!value) return nowIso();
  try {
    return new Date(value).toISOString();
  } catch {
    return nowIso();
  }
};

const orderFromRow = (row) => ({
  id: row.id,
  supplierKey: row.supplier_key || "reyleon",
  supplierName: row.supplier_name || "",
  status: row.status || "pendiente",
  payment: row.payment || "cod",
  paymentLabel: row.payment_label || "",
  subtotal: Number(row.subtotal || 0),
  delivery: Number(row.delivery || 0),
  total: Number(row.total || 0),
  bonusEarned: Number(row.bonus_earned || 0),
  channel: row.channel || "whatsapp",
  createdAt: toIso(row.created_at),
  updatedAt: toIso(row.updated_at || row.created_at),
  items: cloneSafe(row.items, []),
  customer: cloneSafe(row.customer, {}),
  extras: cloneSafe(row.extras, {}),
});

const profileFromRow = (row) => ({
  ...cloneSafe(row?.data, {}),
  referralCode: row?.profile_code || row?.data?.referralCode || "",
});

const reviewFromRow = (row) => ({
  id: row.id,
  createdAt: toIso(row.created_at),
  updatedAt: toIso(row.updated_at || row.created_at),
  ...cloneSafe(row?.data, {}),
});

export async function syncOrdersToSupabase(orders = []) {
  if (!SUPABASE_ENABLED || !supabase) return { skipped: true };
  const tasks = orders.map((order) => settled(
    supabase.from(SUPABASE_TABLES.orders).upsert(orderRow(order), { onConflict: "id" })
  ));
  return Promise.all(tasks);
}

export async function fetchOrdersFromSupabase() {
  if (!SUPABASE_ENABLED || !supabase) return [];
  const result = await supabase
    .from(SUPABASE_TABLES.orders)
    .select("*")
    .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false });
  if (result.error) throw result.error;
  return (result.data || []).map(orderFromRow);
}

export async function deleteOrderFromSupabase(orderId) {
  if (!SUPABASE_ENABLED || !supabase || !orderId) return { skipped: true };
  return settled(supabase.from(SUPABASE_TABLES.orders).delete().eq("id", orderId));
}

export async function syncProfileToSupabase(profile) {
  if (!SUPABASE_ENABLED || !supabase || !profile) return { skipped: true };
  return settled(
    supabase.from(SUPABASE_TABLES.profiles).upsert(profileRow(profile), { onConflict: "profile_code" })
  );
}

export async function fetchProfileFromSupabase(profileCode) {
  if (!SUPABASE_ENABLED || !supabase || !profileCode) return null;
  const result = await supabase
    .from(SUPABASE_TABLES.profiles)
    .select("*")
    .eq("profile_code", profileCode)
    .maybeSingle();
  if (result.error) throw result.error;
  return result.data ? profileFromRow(result.data) : null;
}

export async function syncReviewsToSupabase(reviews = []) {
  if (!SUPABASE_ENABLED || !supabase) return { skipped: true };
  const tasks = reviews.map((review) => settled(
    supabase.from(SUPABASE_TABLES.reviews).upsert(reviewRow(review), { onConflict: "id" })
  ));
  return Promise.all(tasks);
}

export async function fetchReviewsFromSupabase() {
  if (!SUPABASE_ENABLED || !supabase) return [];
  const result = await supabase
    .from(SUPABASE_TABLES.reviews)
    .select("*")
    .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false });
  if (result.error) throw result.error;
  return (result.data || []).map(reviewFromRow);
}

const roleFromRow = (row) => ({
  userId: row.user_id,
  role: row.role || "cliente",
  displayName: row.display_name || "",
  notes: row.notes || "",
  createdAt: toIso(row.created_at),
  updatedAt: toIso(row.updated_at || row.created_at),
});

export async function fetchUserRoleFromSupabase(userId) {
  if (!SUPABASE_ENABLED || !supabase || !userId) return null;
  const result = await supabase
    .from(SUPABASE_TABLES.userRoles)
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (result.error) throw result.error;
  return result.data ? roleFromRow(result.data) : null;
}

export async function probeSupabaseConnection() {
  if (!SUPABASE_ENABLED || !supabase) {
    return {
      ok: false,
      ready: false,
      message: "Configura la URL y la anon key primero.",
    };
  }

  const startedAt = Date.now();
  const result = await supabase
    .from(SUPABASE_TABLES.orders)
    .select("id", { count: "exact", head: true })
    .limit(1);

  if (result.error) {
    return {
      ok: false,
      ready: true,
      message: result.error.message || "No se pudo verificar la conexión.",
      elapsedMs: Date.now() - startedAt,
    };
  }

  return {
    ok: true,
    ready: true,
    message: "Conexión lista. La base responde correctamente.",
    elapsedMs: Date.now() - startedAt,
  };
}
