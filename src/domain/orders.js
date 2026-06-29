export function calcBonusPoints(total) {
  return Math.max(1, Math.round(total / 12));
}

export function formatMoney(amount) {
  return `S/ ${amount.toFixed(2)}`;
}

export function paymentLabel(value) {
  if (value === "yape") return "Yape";
  if (value === "plin") return "Plin";
  if (value === "bim") return "BIM";
  if (value === "agora") return "Agora";
  if (value === "bbva") return "Transferencia BBVA";
  if (value === "bcp") return "Transferencia BCP";
  if (value === "card") return "Tarjeta / online";
  return "Pago contra entrega";
}

function buildOrderContactLines(customer, extras = {}) {
  return [
    extras.ownerTest ? extras.ownerTestNote : null,
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

export function buildOrderMessage({ supplier, items, customer, payment, extras = {} }) {
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

export function buildCombinedOrderMessage({ groups, customer, payment, extras = {} }) {
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

export function createOrderRecord({ supplier, items, customer, payment, extras }) {
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
    ownerTest: Boolean(extras?.ownerTest),
    status: extras?.ownerTest ? "prueba" : (extras?.paymentStatus || "pendiente"),
    channel: "whatsapp",
  };
}
