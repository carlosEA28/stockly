/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/app/_lib/prisma";
import { createSaleSchema } from "./schems";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safeAction";
import { returnValidationErrors } from "next-safe-action";

export const createSale = actionClient
  .inputSchema(createSaleSchema)
  .action(async ({ parsedInput: { product } }) => {
    await db.$transaction(async (trx) => {
      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      });

      for (const products of product) {
        const productFromDb = await trx.products.findUnique({
          where: { id: products.id },
        });

        if (!productFromDb) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Product not found"],
          });
        }

        const productIsOutOfStock = products.quantity > productFromDb.stock;
        if (productIsOutOfStock) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Product out of stock"],
          });
        }

        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: products.id,
            quantity: products.quantity,
            unitPrice: productFromDb.price,
          },
        });

        // ✅ Atualiza estoque apenas 1x, usando decrement
        await trx.products.update({
          where: { id: products.id },
          data: {
            stock: {
              decrement: products.quantity,
            },
          },
        });
      }

      revalidatePath("/products");
    });
  });
