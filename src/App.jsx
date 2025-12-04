import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* --- Pages (import components you created earlier) --- */
/* Buyer pages */
import CatalogPage from "./pages/Catalog/CatalogPage";
import ProductPage from "./pages/Catalog/ProductPage";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import QuickOrder from "./pages/Reorder/QuickOrder";
import Register from "./pages/Auth/Register";

/* Admin pages (shell + inner pages) */
import PageShell from "./components/layout/PageShell";
import Dashboard from "./pages/Admin/Dashboard";
import AccountsList from "./pages/Admin/AccountsList";
import PricingList from "./pages/Admin/PricingList";
import TierEditor from "./pages/Admin/TierEditor";

import NotFound from "./pages/NotFound";

/* Lightweight loading fallback */
const Loading = () => <div className="p-6">Loading...</div>;

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* public buyer routes */}
        <Route path="/" element={<Navigate to="/catalog" replace />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/quick-order" element={<QuickOrder />} />

        {/* auth */}
        <Route path="/auth/register" element={<Register />} />

        {/* admin routes under shell */}
        <Route path="/admin" element={<PageShell />}>
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<AccountsList />} />
          <Route path="pricing" element={<PricingList />} />
          <Route path="pricing/:productId/tiers/:tierId?" element={<TierEditor />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
