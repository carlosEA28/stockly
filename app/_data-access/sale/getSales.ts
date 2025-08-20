import { db } from "@/app/_lib/prisma";

export interface GetSalesDto {
  id: string;
  productNames: string;
  productQuantity: number;
  totalAmount: number;
  date: Date;
}

export const getSales = async (): Promise<GetSalesDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      SaleProduct: {
        include: { product: true },
      },
    },
  });

  return sales.map(
    (sale): GetSalesDto => ({
      id: sale.id,
      date: sale.date,
      productNames: sale.SaleProduct.map(
        (saleProduct) => saleProduct.product.name,
      ).join(" • "),
      totalAmount: sale.SaleProduct.reduce(
        (acc, saleProduct) =>
          acc + saleProduct.quantity * Number(saleProduct.unitPrice),
        0,
      ),
      productQuantity: 100,
    }),
  );
};
