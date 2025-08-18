"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Products } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";

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
  {
    accessorKey: "action",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={4} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => {
                navigator.clipboard.writeText(product.id);
              }}
            >
              <ClipboardCopyIcon size={16} />
              copiar ID
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-1.5">
              <EditIcon size={16} />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-1.5">
              <Trash2Icon size={16} />
              Editar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
