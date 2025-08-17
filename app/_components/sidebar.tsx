import { LayoutGrid, Package, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">STOCKLY</h1>
      </div>

      {/* BOTOES */}
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/">
          <LayoutGrid size={20} />
          Dashboard
        </SidebarButton>

        <SidebarButton href="/products">
          <Package size={20} />
          Produtos
        </SidebarButton>

        <SidebarButton href="/sales">
          <ShoppingBasketIcon size={20} />
          Vendas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
