import z from "zod";

export class ProductIsOutOfStockError extends Error {
  constructor() {
    super("Product out of stock");
  }
}

export const createSaleSchema = z.object({
  product: z.array(
    z.object({
      id: z.uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;
