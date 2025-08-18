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

  revalidatePath("/products");
}
