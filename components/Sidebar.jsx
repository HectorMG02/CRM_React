import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-xl font-bold">CRM Clientes</p>
      </div>

      <nav className="mt-5 list-none">
        <li className="my-2">
          <Link href="/">
            <a className="text-white mb-2 block">Clientes</a>
          </Link>
        </li>
        <li className="my-2">
          <Link href="/pedidos">
            <a className="text-white mb-2 block">Pedidos</a>
          </Link>
        </li>
        <li className="my-2">
          <Link href="/productos">
            <a className="text-white mb-2 block">Productos</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
