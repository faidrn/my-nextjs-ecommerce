import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import { CartProvider } from "@/context/CartContext";


export default function HomePage() {
  return (
    <div>
      <header
        className="sticky top-0 z-50 w-full border-b border-b-gray-300 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:bg-gray-950/95 dark:supports-backdrop-filter:bg-gray-950/60"
      >
        <Navbar />
      </header>
      <main>
        <CartProvider>
          <ProductGrid />
        </CartProvider>
      </main>
    </div>
  );
}
