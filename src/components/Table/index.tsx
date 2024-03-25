import React, { useEffect, useState } from "react";

import { Box, chakra, HStack, Table as _Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

import _ from "lodash";

import { useDidMountEffect } from "@/hooks";

import {
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { ChevronDown, ChevronUp } from "react-feather";
import { FilterTable } from "./Filter";
import { Pagination } from "../pagination";

interface TableRowType {
  isSelected?: boolean;
}
interface TableProps<T> {
  data: T & TableRowType[];
  enableRowSelection?: boolean;
  onChangeRowSelection?(values: T[]): void;
  columns: any;
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({ itemRank });

  return itemRank.passed;
};

export const Table = <T,>({ columns, enableRowSelection, data, onChangeRowSelection }: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: { sorting, rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: fuzzyFilter,
    enableRowSelection,
    enableMultiRowSelection: true,
    debugTable: true,
  });

  useDidMountEffect(() => {
    onChangeRowSelection?.(Object.keys(rowSelection).map((index) => _.get(data, index)));
  }, [rowSelection]);

  function getRowSelected() {}

  useEffect(() => {
    getRowSelected();
  }, [data]);

  return (
    <Box mb="2">
      <TableContainer py="3">
        <_Table mb="4" size="sm" variant="striped">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id}>
                      <Box cursor="pointer" onClick={header.column.getToggleSortingHandler()}>
                        <HStack spacing={1}>
                          <Text userSelect="none">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </Text>
                          <chakra.span>
                            {header.column.getIsSorted() ? (
                              header.column.getIsSorted() === "desc" ? (
                                <Box mb="1">
                                  <ChevronDown size="1.25rem" />
                                </Box>
                              ) : (
                                <Box mb="1">
                                  <ChevronUp size="1.25rem" />
                                </Box>
                              )
                            ) : null}
                          </chakra.span>
                        </HStack>
                      </Box>
                      {header.column.getCanFilter() && <FilterTable column={header.column} />}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr _hover={{ bgColor: "main.100" }} cursor="pointer" key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        border="none"
                        key={cell.id}
                        p="4"
                        onClick={() => {
                          table.getToggleAllRowsSelectedHandler();
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </_Table>
      </TableContainer>
      <Pagination table={table} />
    </Box>
  );
};
