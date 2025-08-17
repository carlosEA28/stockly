import { db } from "@/app/_lib/prisma";
import { Products } from "../../generated/prisma/index";

export const getProducts = async (): Promise<Products[]> => {
  return await db.products.findMany({});
};
