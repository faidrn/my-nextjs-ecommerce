import Link from "next/link";
import { ShoppingCart, Moon, Sun, Globe } from "lucide-react";


const Navbar = () => {
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
        <li>
          <Link href="/products">
            <Globe 
              className="h-5 w-5"
            />
            <div
              className="bg-blue-600 text-white font-bold rounded-2xl px-1 text-[11px] items-center justify-center flex absolute left-2 top-3"
            >
              <span
              >
                EN
              </span>
              {/*<span>ES</span>*/}
            </div>
          </Link>
        </li>
        <li>
          <Link href="/products">
            <Sun 
              className="h-5 w-5"
            />
          </Link>
        </li>
        <li>
          <Link href="/products">
            <Moon 
              className="h-5 w-5"
            />
          </Link>
        </li>
        <li>
          <Link href="/products">
            <ShoppingCart 
              className="h-5 w-5"
            />
          </Link>
        </li>
      </ul>
    </nav>
    );
};

export default Navbar;