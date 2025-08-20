import { deleteSale } from "@/app/_actions/sale/delete-sale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sale } from "@/app/generated/prisma";

import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  EditIcon,
  Trash2Icon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface SalesTableDropdownMenu {
  sale: Pick<Sale, "id">;
}

const SalesTableDropdownMenu = ({ sale }: SalesTableDropdownMenu) => {
  const { execute } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda deletada com sucesso");
    },

    onError: () => {
      toast.error("Erro ao deleter uma venda");
    },
  });

  const handleCopyIdToClipboard = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID copiado para a área de transferencia");
  };

  const handleConfirmDeleteClick = async () => {
    execute({ id: sale.id });
  };
  return (
    <AlertDialog>
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
              handleCopyIdToClipboard();
            }}
          >
            <ClipboardCopyIcon size={16} />
            copiar ID
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-1.5">
            <EditIcon size={16} />
            Editar
          </DropdownMenuItem>

          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="gap-1.5">
              <Trash2Icon size={16} />
              Deletar
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza ? </AlertDialogTitle>
          <AlertDialogDescription>
            Você esta prestes a deletar esta venda, essa ação não pode ser
            desfeita. Deseja continuar ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleConfirmDeleteClick();
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SalesTableDropdownMenu;
