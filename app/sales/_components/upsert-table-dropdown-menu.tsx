import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Products } from "@/app/generated/prisma";

import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  Trash2Icon,
} from "lucide-react";

interface TableDropdownMenuProps {
  product: Pick<Products, "id">;
  onDelete: (productId: string) => void;
}

const UpsertSalesTableDropdownMenu = ({
  product,
  onDelete,
}: TableDropdownMenuProps) => {
  return (
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
            navigator.clipboard.writeText(product.id);
          }}
        >
          <ClipboardCopyIcon size={16} />
          copiar ID
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-1.5"
          onClick={() => onDelete(product.id)}
        >
          <Trash2Icon size={16} />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UpsertSalesTableDropdownMenu;
