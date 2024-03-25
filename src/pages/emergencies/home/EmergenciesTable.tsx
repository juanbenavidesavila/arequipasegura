import React from "react";

import { Tag } from "@chakra-ui/react";
import { useEmergencyContext } from "@/contexts";
import { EmergencyModal } from "./EmergencyModal";
import moment from "moment";
import { Table } from "@/components";
import { Emergency } from "@alerta-ciudadana/entity";
import { AttendEmergencyModal } from "./AttendEmergencyModal";
import { createColumnHelper } from "@tanstack/react-table";

interface TableRowType {
  isSelected: boolean;
}

interface TableDataType extends Emergency, TableRowType {}

const columnHelper = createColumnHelper<TableDataType>();

export const EmergenciesTable = () => {
  const { emergencies } = useEmergencyContext();

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("date", { cell: ({ getValue }) => moment(getValue()).format("LLL"), header: "Date" }),
      columnHelper.accessor("emergency", { cell: ({ getValue }) => getValue(), header: "Emergencia" }),
      columnHelper.accessor("user", { cell: ({ getValue }) => getValue(), header: "Usuario" }),
      columnHelper.accessor("place", { cell: ({ getValue }) => getValue(), header: "Lugar" }),
      columnHelper.accessor("phone", { cell: ({ getValue }) => getValue(), header: "Teléfono" }),
      columnHelper.accessor("values", {
        cell: ({ getValue }) => {
          const values = getValue();
          return (
            <Tag size="sm" colorScheme={values === "Verdadero" ? "green" : "red"}>
              {String(values)}
            </Tag>
          );
        },
        header: "Valoración",
      }),
      columnHelper.accessor("status", {
        cell: ({ getValue }) => {
          const status = getValue();
          return (
            <Tag variant="solid" size="sm" colorScheme={status === "Por Atender" ? "red" : "green"}>
              {status}
            </Tag>
          );
        },
        header: "Estado",
      }),
      columnHelper.accessor("timestamp", {
        cell: ({ row }) => <AttendEmergencyModal emergency={row.original} />,
        header: "",
        enableColumnFilter: false,
      }),

      columnHelper.accessor("token", {
        cell: ({ row }) => <EmergencyModal emergency={row.original} />,
        header: "",
        enableColumnFilter: false,
      }),
    ],
    []
  );

  return <Table columns={columns} data={emergencies as TableDataType[]} />;
};
