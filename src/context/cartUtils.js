export function findUnitPrice(product, qty) {
  // product.tiers: [{minQty, maxQty, price}] ascending minQty
  if (!product) return 0;
  const tiers = product.tiers || [];
  const q = Number(qty);
  // exact matching
  const exact = tiers.find(t => q >= t.minQty && (t.maxQty == null || q <= t.maxQty));
  if (exact) return Number(exact.price);
  // fallback highest min <= q
  const fallback = tiers.filter(t => q >= t.minQty).sort((a,b)=>b.minQty - a.minQty)[0];
  if (fallback) return Number(fallback.price);
  return Number(product.base_price ?? product.basePrice ?? 0);
}

export function cartReducer(state, action) {
  switch(action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      const existing = state.items.find(i => i.productId === product.id);
      if (existing) {
        const qty = existing.quantity + quantity;
        existing.quantity = qty;
        existing.unitPrice = findUnitPrice(product, qty);
        return { ...state, items: [...state.items] };
      }
      const unitPrice = findUnitPrice(product, quantity);
      return { ...state, items: [...state.items, { productId: product.id, product, quantity, unitPrice }] };
    }
    case "UPDATE_QTY": {
      const { productId, quantity } = action.payload;
      const items = state.items.map(i => {
        if (i.productId === productId) {
          const unitPrice = findUnitPrice(i.product, quantity);
          return { ...i, quantity, unitPrice };
        }
        return i;
      }).filter(i => i.quantity > 0);
      return { ...state, items };
    }
    case "REMOVE_ITEM": {
      return { ...state, items: state.items.filter(i => i.productId !== action.payload.productId) };
    }
    case "CLEAR": return { items: [] };
    default: return state;
  }
}
