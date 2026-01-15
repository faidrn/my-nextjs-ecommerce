import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";


const ProductCard = ({
    product, 
    onAddToCart,
    onClick,
}) => {
    const handleAddToCart = (e) => {
        e.stopPropagation();
        onAddToCart();
    };

    return (
        <Card
            className="group border-gray-200 cursor-pointer overflow-hidden transition-all hover:shadow-lg dark:bg-gray-800"
            onClick={onClick}
        >
            <div
                className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700"
            >
                <img 
                    src={product.images[0] || 'https://via.placeholder.com/300'} 
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105" 
                    onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300?text=No+Image';
                    }}
                />
            </div>

            <CardContent
                className="p-4"
            >
                <div
                    className="mb-1 text-xs text-gray-500 dark:text-gray-400"
                >
                    {product.category.name}
                </div>
                <h3
                    className="mb-2 line-clamp-2 font-medium dark:text-white"
                >
                    {product.title}
                </h3>
                <p
                    className="text-xl font-semibold text-blue-600 dark:text-blue-400"
                >
                    ${product.price.toFixed(2)}
                </p>
            </CardContent>

            <CardFooter
                className="p-4 pt-0"
            >
                <Button
                    onClick={handleAddToCart}
                    className="w-full bg-black text-white"
                    size="sm"
                >
                    <ShoppingCart 
                        className="mr-2 h-4 w-4"
                    />
                    {'addToCart'}
                </Button>

            </CardFooter>
        </Card>
    );
};

export default ProductCard;