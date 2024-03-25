import React, { FC } from "react";

import { Text, IconButton, Flex, HStack, Divider, chakra } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "react-feather";
import { Table } from "@tanstack/react-table";

interface PaginatioProps {
  table: Table<any>;
}

export const Pagination: FC<PaginatioProps> = ({ table }) => {
  const { pageSize } = table.getState().pagination;

  return (
    <div>
      <Divider my="3" />
      <Flex justifyContent="space-between" px="3">
        <HStack>
          {[10, 25, 50, 100].map((perPage) => (
            <IconButton
              key={perPage}
              id={perPage === pageSize ? "solid" : "ghost"}
              variant={perPage === pageSize ? "solid" : "ghost"}
              colorScheme="pri"
              onClick={() => table.setPageSize(perPage)}
              _focus={{}}
              size="sm"
              aria-label=""
              icon={<>{perPage}</>}
            />
          ))}
        </HStack>
        <HStack>
          <IconButton
            size="sm"
            aria-label="fist page"
            icon={<ChevronsLeft size="1.25rem" />}
            colorScheme="pri"
            variant="ghost"
            _focus={{}}
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
          />
          <IconButton
            size="sm"
            aria-label="fist page"
            icon={<ChevronLeft size="1.25rem" />}
            colorScheme="pri"
            variant="ghost"
            _focus={{}}
            disabled={!table.getCanPreviousPage()}
            onClick={table.previousPage}
          />
          <Flex>
            <Text userSelect="none" fontSize="sm" fontWeight="medium">
              Página <chakra.span color="pri.500">{table.getState().pagination.pageIndex + 1}</chakra.span> de{" "}
              {table.getPageCount()}
            </Text>
          </Flex>
          <IconButton
            size="sm"
            aria-label="last page"
            icon={<ChevronRight size="1.25rem" />}
            colorScheme="pri"
            variant="ghost"
            _focus={{}}
            disabled={!table.getCanNextPage()}
            onClick={table.nextPage}
          />
          <IconButton
            size="sm"
            aria-label="last page"
            icon={<ChevronsRight size="1.25rem" />}
            colorScheme="pri"
            variant="ghost"
            _focus={{}}
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          />
        </HStack>
      </Flex>
    </div>
  );
};
