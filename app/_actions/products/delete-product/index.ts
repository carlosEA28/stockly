"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteProductInput, deleteProductSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const DeleteProduct = async ({ id }: DeleteProductInput) => {
  deleteProductSchema.parse({ id });
  await db.products.delete({
    where: {
      id,
    },
  });

  revalidatePath("/products");
};
