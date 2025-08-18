"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema, UpsertProductSchema } from "./schema";

export async function UpsertProduct(data: UpsertProductSchema) {
  upsertProductSchema.parse(data);
  await db.products.upsert({
    where: {
      id: data.id ?? "",
    },
    update: data,

    create: data,
  });

  revalidatePath("/products"); //revalidatePath, recarrega/revalida toda a pagina da rota, atualizando todos os valores das funções
  // revalidateTag("get-products"); //revalidateTag, reacarrega/revalida apenas as funções onde o parametro passado seja o nome da tag, revalida uma chamada especifica
}
