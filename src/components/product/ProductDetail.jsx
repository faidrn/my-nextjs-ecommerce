"use client";
import React, { useState } from "react";
import { ArrowLeft, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";


const ProductDetail = ({ product, onBack, onAddToCart }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === product.images.length - 1
            ? 0
            : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 
            ? product.images.length - 1 
            : prev - 1
        );
    };

    return (
        <div
            className="container mx-auto px-4 py-8"
        >
            <Button
                variant="ghost"
                onClick={onBack}
                className="mb-6"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {'Back To Products'}
            </Button>

            <div
                className="grid gap-8 lg:grid-cols-2 items-start"
            >
                {/**Image Gallery */}
                <div
                    className="space-y-4"
                >
                    <Card
                        className="overflow-hidden dark:bg-gray-800"
                    >
                        <div
                            className="relative aspect-square rounded-xl bg-gray-100 dark:bg-gray-700"
                        >
                            <img 
                                src={
                                    product.images?.[currentImageIndex] || 'https://via.placeholder.com/600'
                                }
                                alt={product.title} 
                                className="h-full w-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/600?text=No+Image';
                                }}
                            />
                            
                            {product.images?.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                </>
                            )}
                        </div>
                    </Card>

                    {/* Thumbnail Gallery */}
                    {product.images?.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`aspect-square overflow-hidden w-45 rounded-lg border-2 transition-all ${
                                        currentImageIndex === index
                                        ? 'border-blue-600 dark:border-blue-400'
                                        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.title} ${index + 1}`}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                        e.currentTarget.src =
                                            'https://via.placeholder.com/100';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <div className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            {product.category?.name}
                        </div>

                        <h1 className="mb-4 text-3xl font-bold dark:text-white">
                            {product.title}
                        </h1>

                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                            ${Number(product.price).toFixed(2)}
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-3 text-xl font-semibold dark:text-white">
                            {'description'}
                        </h2>
                        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                            {product.description}
                        </p>
                    </div>

                    <Button
                        onClick={onAddToCart}
                        size="lg"
                        className="w-full"
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        {'Add To Cart'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;