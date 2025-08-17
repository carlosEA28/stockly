"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Products } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

const getStatusLable = (status: string) => {
  if (status === "IN_STOCK") return "Em estoque";

  return "Fora de estoque";
};

export const productTablesColumns: ColumnDef<Products>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const lable = getStatusLable(product.status);
      return (
        <Badge
          variant={lable === "Em estoque" ? "default" : "outline"}
          className="gap-2"
        >
          <CircleIcon
            className={`${lable === "Em estoque" ? "fill-primary-foreground" : "fill-destructive"}`}
            size={14}
          />
          {lable}
        </Badge>
      );
    },
  },
];
