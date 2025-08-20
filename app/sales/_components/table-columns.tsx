"use client";

import { Button } from "@/app/_components/ui/button";
import { GetSalesDto } from "@/app/_data-access/sale/getSales";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const saleTableColumns: ColumnDef<GetSalesDto>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
  },
  {
    accessorKey: "productQuantity",
    header: "Quantidade de Produtos",
  },
  {
    header: "Valor total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => Intl.DateTimeFormat("pt-BR").format(new Date(date)),
  },
  {
    header: "Ações",
    cell: () => (
      <Button>
        <MoreHorizontalIcon size={16} />
      </Button>
    ),
  },
];
