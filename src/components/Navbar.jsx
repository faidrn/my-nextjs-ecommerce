import Link from "next/link";
import { ShoppingCart } from "lucide-react";


const Navbar = () => {
  return (
    <nav
      className=""
    >
      <Link href="/">
        <div>
          <ShoppingCart size={30} />
        </div>
        Shophub
      </Link>

      <ul>
        <li>
          <Link href="/products">Lenguajes</Link>
        </li>
        <li>
          <Link href="/products">Tema</Link>
        </li>
        <li>
          <Link href="/products">Carrito</Link>
        </li>
      </ul>
    </nav>
    );
};

export default Navbar;