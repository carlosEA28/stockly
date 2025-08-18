"use client";

import { Button } from "@/app/_components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/app/_components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Loader2Icon } from "lucide-react";
import { Form } from "@/app/_components/ui/form";
import { NumericFormat } from "react-number-format";
import { useForm } from "react-hook-form";
import {
  upsertProductSchema,
  UpsertProductSchema,
} from "@/app/_actions/products/create-product/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpsertProduct } from "@/app/_actions/products/create-product";

interface UpsertProductDialogProps {
  defaltValues?: UpsertProductSchema;
  onSucess?: () => void;
}

const UpsertProductsDialogContent = ({
  defaltValues,
  onSucess,
}: UpsertProductDialogProps) => {
  const form = useForm<UpsertProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema),
    defaultValues: defaltValues ?? {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = async (data: UpsertProductSchema) => {
    try {
      await UpsertProduct({ ...data, id: defaltValues?.id });
      onSucess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const isEditing = !!defaltValues;

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Produto" : "Criar Produto"}
            </DialogTitle>
            <DialogDescription>Insira as informações abaixo</DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale
                    decimalScale={2}
                    prefix="R$"
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue)
                    }
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade no estoque do produto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"} type="reset">
                Cancelar
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="gap-0.5"
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" size={16} />
              )}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertProductsDialogContent;
