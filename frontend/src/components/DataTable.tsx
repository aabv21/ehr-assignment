import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { ChevronUp, ChevronDown, EllipsisVertical } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loading from "@/components/Loading";

export type HeaderType = {
  label: string;
  value: string;
  icon: ReactNode;
  type: string;
};

interface ReactTableProps<T extends object> {
  data: T[];
  headers: T[];
  actions?: T[];
  loading?: boolean;
}

export function DataTable<T extends object>({
  headers,
  data,
  actions,
  loading,
}: ReactTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  let columns: ColumnDef<object>[] = [];
  if (headers?.length) {
    columns = headers.map((header: HeaderType) => {
      return {
        accessorKey: header.value,
        header: () => (
          <div className="flex flex-row space-x-2 items-center">
            {header.icon ?? null}
            <div className="text-center">{header.label}</div>
          </div>
        ),
        cell: (value) => {
          let cellValue = value.getValue();
          return <div className="text-center">{cellValue as string}</div>;
        },
      };
    });
  }

  if (actions?.length) {
    columns.push({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actions
                ?.map(({ onClick, label, hide }) => {
                  return hide?.length &&
                    row?.original?.[hide[0]] === hide?.[1] ? null : (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => onClick(row?.original)}
                    >
                      {label}
                    </DropdownMenuItem>
                  );
                })
                .filter((item) => !!item)}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="border-collapse rounded">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const SortIcon =
                    header.column.getIsSorted() === "asc"
                      ? ChevronUp
                      : ChevronDown;
                  return header.id === "actions" ? (
                    <TableHead
                      key={header.id}
                      className="text-center bg-gray-50"
                    />
                  ) : (
                    <TableHead
                      key={header.id}
                      className="text-center bg-gray-50"
                    >
                      <Button
                        variant="ghost"
                        onClick={() =>
                          header.column.toggleSorting(
                            header.column.getIsSorted() === "asc"
                          )
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        <SortIcon className="ml-2 w-4" />
                      </Button>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="">
                <TableCell
                  colSpan={columns.length}
                  className="h-28 text-center"
                >
                  <Loading />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="rounded-md"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
