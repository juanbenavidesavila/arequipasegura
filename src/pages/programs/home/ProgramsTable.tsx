
import React, { useMemo } from "react";

import { Avatar } from "@chakra-ui/react";

import { Programs } from "@alerta-ciudadana/entity";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components";
import { useProgramContext } from 'src/contexts/programs';
import { InactivateUser } from "src/pages/users/home/InactivateUser";
import { ProgramsModal } from "./ProgramsModal";
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { MoreVertical } from "react-feather";

interface TableRowType {
  isSelected: boolean;
}
interface TableDataType extends Programs, TableRowType {}

const columnHelper = createColumnHelper<TableDataType>();

export const ProgramsTable = () => {

    const {programs}= useProgramContext();

    const columns = useMemo(
        () => [
            columnHelper.accessor("img1", {
                cell: ({ getValue }) => {
                  return <Avatar w="8" h="8" src={getValue()} />;
                },
                header: "Imagen 1",
                enableColumnFilter: false,
              }),
              columnHelper.accessor("img2", {
                cell: ({ getValue }) => {
                  return <Avatar w="8" h="8" src={getValue()} />;
                },
                header: "Imagen 2",
                enableColumnFilter: false,
              }),
            columnHelper.accessor("titulo", { cell: ({ getValue }) => getValue(), header: "Titulo" }),
            columnHelper.accessor("data1", { cell: ({ getValue }) => {
              const data1 = getValue()
              return data1.length > 50 ? data1.substring(0, 49).concat("...") : data1;

            }, header: "datos" }),
            columnHelper.accessor("data2", { cell: ({ getValue }) => {
              const data2 = getValue()
              return data2.length > 50 ? data2.substring(0, 49).concat("...") : data2;
            }, header: "datos2" }),

            columnHelper.accessor("detalles", {
              cell: ({ row }) => <ProgramsModal programs={row.original} />,
              header: "",
              enableColumnFilter: false,
            }),
            columnHelper.accessor("opciones", {
              cell: ({ row }) => <Menu>
              <MenuButton
                size="sm"
                as={IconButton}
                aria-label="Options"
                icon={<MoreVertical size="1.25rem" />}
                variant="ghost"
                _focus={{}}
              />
              <MenuList>
                {/* <UpdateDirectoryModal banner={banner} /> */}
                <MenuItem fontSize="sm" onClick={() => {}}>
                  Editar
                </MenuItem>
                <MenuItem fontSize="sm" onClick={() => {}}>
                  Eliminar
                </MenuItem>
              </MenuList>
            </Menu>,
              header: "",
              enableColumnFilter: false,
            }),
           
          ],
          []
        );
      
 
    return <Table columns={columns} data={programs as TableDataType[]} />;
  
}
