import { ComboboxOption } from "../_components/ui/Combobox";
import { getProducts } from "../_data-access/product/getProducts";
import CreateSaleButton from "./_components/create-sale-button";
import { DataTable } from "../_components/ui/data-table";
import { saleTableColumns } from "./_components/table-columns";
import { getSales } from "../_data-access/sale/getSales";

const SalesPage = async () => {
  const sales = await getSales();
  const products = await getProducts();

  const plainProducts = JSON.parse(JSON.stringify(products));

  const productsOptions: ComboboxOption[] = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <div className="m-8 w-full space-y-8 rounded-2xl bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <p className="text-gray-500"> Gestão de Vendas</p>
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Vendas
          </span>
          <h2 className="text-xl font-semibold">Vendas</h2>
        </div>

        <CreateSaleButton
          products={plainProducts}
          productsOptions={productsOptions}
        />
      </div>
      <DataTable columns={saleTableColumns} data={sales} />
    </div>
  );
};

export default SalesPage;
