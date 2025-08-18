import { db } from "@/app/_lib/prisma";
import { Products } from "../../generated/prisma/index";
import { unstable_cache } from "next/cache";

export const getProducts = async (): Promise<Products[]> => {
  return await db.products.findMany({});
};

export const cachedGetProducts = unstable_cache(getProducts, ["getProducts"], {
  tags: ["get-products"],
  revalidate: 60,
});
