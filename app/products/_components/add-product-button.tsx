"use client";

//quando queremos colocar um client component em um server component, criamos ele separados
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import UpsertProductsDialogContent from "./upsert-product-dialog-content";
import { useState } from "react";

const AddProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer gap-2">
          <PlusIcon size={20} />
          Novo Produto
        </Button>
      </DialogTrigger>
      <UpsertProductsDialogContent onSucess={() => setDialogIsOpen(false)} />
    </Dialog>
  );
};

export default AddProductButton;
