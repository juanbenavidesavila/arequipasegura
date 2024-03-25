import React, { useMemo } from "react";

import { Text } from "@chakra-ui/react";
import { useComplaintContext } from "@/contexts";
import { Table } from "@/components";
import { ComplaintModal } from "./EmergencyModal";
import { createColumnHelper } from "@tanstack/react-table";
import { Complaint } from "@alerta-ciudadana/entity";
import Cookies from "universal-cookie";
import { Tag } from "@chakra-ui/react";

interface TableRowType {
  isSelected: boolean;
}

interface TableDataType extends Complaint, TableRowType {}

const columnHelper = createColumnHelper<any>();
const cookies = new Cookies();
export const ComplaintsTable = () => {
  const type = useMemo(() => cookies.get("type"), []);
  const {complaints} = useComplaintContext();
  
  const columns = useMemo(
    () => [
      columnHelper.accessor("date", { cell: ({ getValue }) => getValue(), header: "Date" }),
      columnHelper.accessor("user", { cell: ({ getValue }) => getValue(), header: "Usuario" }),
      
      columnHelper.accessor("type", {
        cell: ({ getValue }) => (getValue() ? getValue() : <Text textAlign="center">-</Text>),
        header: "Tipo de Denuncia",
      }),
      columnHelper.accessor("status", { cell: ({ getValue }) => getValue(), header: "Estado" }),
      columnHelper.accessor("phone", { cell: ({ getValue }) => getValue(), header: "Teléfono" }),
      columnHelper.accessor("place", { cell: ({ getValue }) => getValue(), header: "Lugar" }),
      columnHelper.accessor("description", {
        cell: ({ getValue }) => {
          const description = getValue();
          return description.length > 50 ? description.substring(0, 49).concat("...") : description;
        },
        header: "Denuncia",
      }),
      columnHelper.accessor("isSelected", {
        cell: ({ row }) => <ComplaintModal complaint={row.original} />,
        header: "",
        enableColumnFilter: false,
      }),
    ],
    []
  );

  const columns2 = useMemo(
    () => [
      columnHelper.accessor("fecha", { cell: ({ getValue }) => getValue(), header: "Date" }),
      columnHelper.accessor("interes", { cell: ({ getValue }) => {
        const value = getValue();
        const color = value.includes('policial') ? 'green' : (value.includes('municipal') ? 'blue' : 'black');
        return <span style={{ color }}>{value}</span>;
      },
      header: "Interes"
    }),

      columnHelper.accessor("identificacion", { cell: ({ getValue }) => getValue(), header: "Identificacion" }),


      columnHelper.accessor("tiporeporte", {
        cell: ({ getValue }) => (getValue() ? getValue() : <Text textAlign="center">-</Text>),
        header: "Tipo de Denuncia",
      }),
      columnHelper.accessor("estado",  {  cell: ({ getValue }) => {
        const status = getValue();
        return (
          <Tag variant="solid" size="sm" colorScheme={status === "Por Atender" ? "red" : "green"}>
            {status}
          </Tag>
        );
      },}),
      columnHelper.accessor("direccion", { cell: ({ getValue }) => getValue(), header: "Lugar" }),
      columnHelper.accessor("descripciondenuncia", {
        cell: ({ getValue }) => {
          const description = getValue();
          return description.length > 50 ? description.substring(0, 49).concat("...") : description;
        },
        header: "Denuncia",
      }),
      columnHelper.accessor("isSelected", {
        cell: ({ row }) => <ComplaintModal complaint={row.original} />,
        header: "",
        enableColumnFilter: false,
      }),
    ],
    []
  );

  const sortedComplaints = useMemo(() => {
    const complaintsCopy = [...complaints];
    complaintsCopy.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    return complaintsCopy;
  }, [complaints]);

  return <Table columns={type == "arequipa" ? columns2 : columns} data={sortedComplaints} />;
};
