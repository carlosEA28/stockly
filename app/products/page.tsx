import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { productTablesColumns } from "./_components/table-columns";
import { getProducts } from "../_data-access/product/getProducts";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="m-8 w-full space-y-8 rounded-2xl bg-white p-8">
      {/* ESQUERDA */}
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <p className="text-gray-500">Lista de produtos cadastrados</p>
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Produtos
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>
        <Button className="cursor-pointer gap-2">
          <PlusIcon size={20} />
          Novo Produto
        </Button>
      </div>

      <DataTable columns={productTablesColumns} data={products} />
    </div>
  );
};

export default ProductsPage;
