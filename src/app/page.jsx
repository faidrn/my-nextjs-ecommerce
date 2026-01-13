"use client";
import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import { CartProvider } from "@/context/CartContext";
import ProductDetail from "@/components/product/ProductDetail";
import ProductFilters from "@/components/product/ProductFilters";
import { toast } from "sonner";
import { Loader, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";


function AppContent () {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState({
    title: "",
    categoryId: null,
    minPricce: 0,
    maxPrice: 1000,
    priceRangeMin: 0,
    priceRangeMax: 1000,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // API
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("https://api.escuelajs.co/api/v1/products?limit=100"),
          fetch("https://api.escuelajs.co/api/v1/categories"),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Fetch error");
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        const validProducts = productsData.filter(
          (p) => p.images?.length > 0 && p.price > 0
        );

        setProducts(validProducts);
        setCategories(categoriesData.slice(0, 15));

        const maxProductPrice = Math.max(
          ...validProducts.map((p) => p.price)
        );

        setFilters((prev) => ({
          ...prev,
          maxPrice: maxProductPrice,
          priceRangeMax: maxProductPrice,
        }));
      } catch {
        setError("error");
        toast.error("error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.title && !product.title.toLowerCase().includes(filters.title.toLocaleLowerCase())) {
        return false;
      }

      if (filters.categoryId && product.category.id !== filters.categoryId) {
        return false;
      }

      if (product.price < price.priceRangeMin 
        || product.price > filters.priceRangeMax){
          return false;
      }

      if (filters.minPricce > 0 && product.price < filters.minPricce) {
        return false;
      }

      if (filters.maxPrice > 0 && product.price > filters.maxPrice) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  const maxPrice = useMemo(() => {
    if (!products.length) return 1000;

    return Math.max(...products.map((p) => p.price));
  }, [products]);

  const handleAddToCart = (product) => {
    handleAddToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
    });
    toast.success("addedToCart");
  };

  return (
    <div
     className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950"
    >
      <header
        className="sticky top-0 z-50 w-full border-b border-b-gray-300 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:bg-gray-950/95 dark:supports-backdrop-filter:bg-gray-950/60"
      >
        <Navbar 
          onHomeClick={() => setSelectedProduct(null)}
        />
      </header>
      <main
        className="flex-1"
      >
        {loading ? (
          <div
            className="flex h-96 items-center justify-center"
          >
            <Loader className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        ): error ? (
          <div
            className="flex h-96 items-center justify-center"
          >
            <p
              className="text-red-600"
            >
              {error}
            </p>
          </div>
        ): selectedProduct ? (
          <ProductDetail 
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={() => handleAddToCart(selectedProduct)}
          />
        )}
      </main>
    </div>
  );
}


export default function HomePage() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
