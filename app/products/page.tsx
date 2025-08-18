import { DataTable } from "../_components/ui/data-table";
import { productTablesColumns } from "./_components/table-columns";
import { cachedGetProducts } from "../_data-access/product/getProducts";
import AddProductButton from "./_components/add-product-button";

const ProductsPage = async () => {
  const products = await cachedGetProducts();

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

        <AddProductButton />
      </div>

      <DataTable
        columns={productTablesColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default ProductsPage;
