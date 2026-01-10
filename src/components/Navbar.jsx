"use client";
import Link from "next/link";
import { ShoppingCart, Globe, Shield } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "./ui/Button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
 } from "@/components/ui/DropdownMenu";


const Navbar = ({ onCartClick, onHomeClick, onAdminClick }) => {
  
const isAuthenticated = false;
  return (
    <nav
      className="flex items-center justify-between gap-6 px-4 py-4 md:px-8"
    >
      <Link 
        href="/"
        className="flex items-center space-x-2 transition-opacity hover:opacity-80"
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-purple-600"
        >
          <ShoppingCart 
            className="h-5 w-5 text-white"
          />
        </div>
        <span 
          className="text-xl font-semibold dark:text-white"
        >
          ShopHub
        </span>
      </Link>

      <ul
        className="flex justify-center items-center gap-4"
      >
        <li
          className="p-1.5 rounded-md hover:bg-gray-200"
        >
          <Link href="/products">
            <Globe 
              className="h-5 w-5"
            />
            <div
              className="bg-blue-600 text-white font-bold rounded-2xl px-1 text-[11px] items-center justify-center flex absolute left-2 top-3"
            >
              {/*<span
              >
                EN
              </span>
              <span>ES</span>*/}
            </div>
          </Link>
        </li>
        <li
          className="p-1.5 rounded-md hover:bg-gray-200"
        >
          <Link href="/products">
            <ShoppingCart 
              className="h-5 w-5"
            />
          </Link>
        </li>
        <li
          className="p-1.5 rounded-md hover:bg-gray-200"
        >
          <Link href="/products">
            <Shield 
              className="h-5 w-5"
            />
            <span className="sr-only">Admin Panel</span>
          </Link>
        </li>
      </ul>
    </nav>
    );
};

export default Navbar;