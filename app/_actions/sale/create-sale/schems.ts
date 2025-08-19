import z from "zod";

export const createSaleSchema = z.object({
  product: z.array(
    z.object({
      id: z.uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;
