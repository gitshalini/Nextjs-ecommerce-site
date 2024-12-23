import Link from "next/link";

export default function NavBar () {
  return(
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link className="text-gray-700 hover:text-black-50" href="/products">Products</Link>
          </li>
          <li>
            <Link className="text-gray-700 hover:text-black-50" href="/cart">Cart</Link>
          </li>
          <li>
            <Link className="text-gray-700 hover:text-black-50" href="/checkout">Check Out</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}