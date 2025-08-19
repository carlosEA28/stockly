"use client";

import { Button } from "@/app/_components/ui/button";
import { SheetTrigger, Sheet } from "@/app/_components/ui/sheet";
import {} from "lucide-react";
import UpsertSheetContent from "./upsert-sheet-content";
import { ComboboxOption } from "@/app/_components/ui/Combobox";
import { Products } from "@/app/generated/prisma";
import { useState } from "react";

interface CreateSaleButtonProps {
  products: Products[];
  productsOptions: ComboboxOption[];
}

const CreateSaleButton = (props: CreateSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>Nova Venda</Button>
      </SheetTrigger>
      <UpsertSheetContent {...props} onSucess={() => setSheetIsOpen(false)} />
    </Sheet>
  );
};

export default CreateSaleButton;
