"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import {
  createProductSchema,
  CreateProductSchema,
} from "./create-product/schema";

export async function CreateProduct(data: CreateProductSchema) {
  createProductSchema.parse(data);
  await db.products.create({
    data,
  });

  revalidatePath("/products"); //revalidatePath, recarrega/revalida toda a pagina da rota, atualizando todos os valores das funções
  // revalidateTag("get-products"); //revalidateTag, reacarrega/revalida apenas as funções onde o parametro passado seja o nome da tag, revalida uma chamada especifica
}
