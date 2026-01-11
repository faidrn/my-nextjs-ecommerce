"use client";
import React from "react";
import ProductCard from './ProductCard';
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";


const ProductGrid = ({ products, onProductClick }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            images: product.images,
        });

        toast.success('addedToCart');
    };

    if (!products || products.length === 0) {
        return (
            <div
                className="flex h-64 items-center justify-center text-gray-500 dark:text-gray-400"
            >
                No products found
            </div>
        );
    }


    return (
        <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            {products.map((product) => (
                <ProductCard 
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    onClick={() => onProductClick(product)}
                />
            ))}
        </div>    
    );
};

export default ProductGrid;