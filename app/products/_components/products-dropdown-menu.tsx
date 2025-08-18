import { Button } from "@/app/_components/ui/button";

import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  EditIcon,
  Trash2Icon,
} from "lucide-react";
import DeleteDialogContent from "./delete-dialog-content";
import UpsertProductsDialogContent from "./upsert-product-dialog-content";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Products } from "@/app/generated/prisma";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

interface ProductDropdownMenuProps {
  row: Products;
}

const ProductDropdownMenu = ({ row }: ProductDropdownMenuProps) => {
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);

  return (
    <AlertDialog>
      <Dialog open={editDialogIsOpen} onOpenChange={setEditDialogIsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={4} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => {
                navigator.clipboard.writeText(row.id);
              }}
            >
              <ClipboardCopyIcon size={16} />
              copiar ID
            </DropdownMenuItem>

            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <Trash2Icon size={16} />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpsertProductsDialogContent
          defaltValues={{
            id: row.id,
            name: row.name,
            price: Number(row.price),
            stock: row.stock,
          }}
          onSucess={() => setEditDialogIsOpen(false)}
        />
        <DeleteDialogContent productId={row.id} />
      </Dialog>
    </AlertDialog>
  );
};

export default ProductDropdownMenu;
