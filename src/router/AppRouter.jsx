
import Home from "../pages/Home";
import Search from "../pages/Search";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";
import Auth from "../pages/Auth";

export default function AppRouter() {
  const pathname = window.location.pathname;

  // Home
  if (pathname === "/" || pathname === "") {
    return <Home />;
  }

  // Auth
  if (pathname === "/auth") {
    return <Auth />;
  }

  // Search
  if (pathname === "/search") {
    return <Search />;
  }

  // Cart
  if (pathname === "/cart") {
    return <Cart />;
  }

  // Product details
  if (pathname.startsWith("/product/")) {
    return <ProductDetail />;
  }

  // Unknown URL → Home
  return <Home />;
}
