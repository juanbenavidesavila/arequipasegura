import { Input } from "@chakra-ui/react";
import { Column, Table } from "@tanstack/react-table";
import React, { FC } from "react";

interface FilterTableProps {
  column: Column<any, unknown>;
}

export const FilterTable: FC<FilterTableProps> = ({ column }) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <div>
      <Input value={(columnFilterValue ?? "") as string} onChange={(e) => column.setFilterValue(e.target.value)} />
    </div>
  );
};
