"use client";
import { ShoppingCart, Shield } from "lucide-react";
import { Button } from "./ui/Button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";


const Navbar = ({ onCartClick, onHomeClick, onAdminClick }) => {
  const { totalItems } = useCart();
  const isAuthenticated = useAuth();
  
  return (
    <nav
      className="flex items-center justify-between gap-6 px-4 py-4 md:px-8"
    >
      <button
          onClick={onHomeClick}
          className="flex items-center space-x-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-purple-600">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold dark:text-white">ShopHub</span>
        </button>

      <ul
        className="flex justify-center items-center gap-4"
      >
        <li>
          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {totalItems}
              </span>
            )}
            <span className="sr-only">{'cart'}</span>
          </Button>
        </li>
        <li>
          {/* Admin Button */}
          <Button
            variant={isAuthenticated ? 'default' : 'ghost'}
            size="icon"
            onClick={onAdminClick}
            className="relative"
          >
            <Shield className="h-5 w-5" />
            {isAuthenticated && (
              <span className="absolute -right-1 -top-1 flex h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-950" />
            )}
            <span className="sr-only">Admin Panel</span>
          </Button>
        </li>
      </ul>
    </nav>
    );
};

export default Navbar;