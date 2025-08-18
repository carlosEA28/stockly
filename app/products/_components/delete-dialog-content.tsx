import { DeleteProduct } from "@/app/_actions/products/delete-product";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteProductsContentProps {
  productId: string;
}

const DeleteDialogContent = ({ productId }: DeleteProductsContentProps) => {
  const handleContinueDeleteProduct = async () => {
    try {
      await DeleteProduct({ id: productId });
      toast.success("Produto excluido com sucesso");
    } catch (error) {
      toast.success("Erro ao excluir o produto");
      console.log(error);
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza ? </AlertDialogTitle>
        <AlertDialogDescription>
          Você esta prestes a deletar um produto, essa ação não pode ser
          desfeita. Deseja continuar ?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleContinueDeleteProduct}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteDialogContent;
