"use server";

import { db } from "@/app/_lib/prisma";
import { createSaleSchema, CreateSaleSchema } from "./schems";
import { revalidatePath } from "next/cache";

export const createSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);

  const sale = await db.sale.create({
    data: {
      date: new Date(),
    },
  });

  for (const product of data.product) {
    const productFromDb = await db.products.findUnique({
      where: { id: product.id },
    });

    if (!productFromDb) {
      throw new Error("Product not found");
    }

    const productIsOutOfStock = product.quantity > productFromDb.stock;
    if (productIsOutOfStock) {
      throw new Error("Product out of stock");
    }

    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productFromDb.price,
      },
    });

    // Atualiza o estoque
    await db.products.update({
      where: { id: product.id },
      data: {
        stock: productFromDb.stock - product.quantity,
      },
    });

    await db.products.update({
      where: {
        id: product.id,
      },

      data: {
        stock: {
          decrement: product.quantity,
        },
      },
    });

    revalidatePath("/products");
  }

  return sale;
};
