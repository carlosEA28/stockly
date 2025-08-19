import { Button } from "../_components/ui/button";
import { ComboboxOption } from "../_components/ui/Combobox";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { getProducts } from "../_data-access/product/getProducts";
import UpsertSheetContent from "./_components/upsert-sheet-content";

const SalesPage = async () => {
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
        <Sheet>
          <SheetTrigger asChild>
            <Button>Nova Venda</Button>
          </SheetTrigger>
          <UpsertSheetContent
            productsOptions={productsOptions}
            products={plainProducts}
          />
        </Sheet>
      </div>
    </div>
  );
};

export default SalesPage;
