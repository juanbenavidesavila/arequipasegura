import React, { FC } from "react";

import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { MoreVertical } from "react-feather";
import { useDirectoryContext } from "@/contexts";
import { Directory } from "@alerta-ciudadana/entity";
import { UpdateDirectoryModal } from "./UpdateDirectoryModal";

interface MenuDirectoryProps {
  directory: Directory;
}

export const MenuDirectory: FC<MenuDirectoryProps> = ({ directory }) => {
  const { deleteDirectory } = useDirectoryContext();

  return (
    <Menu>
      <MenuButton
        size="sm"
        as={IconButton}
        aria-label="Options"
        icon={<MoreVertical size="1.25rem" />}
        variant="ghost"
        _focus={{}}
      />
      <MenuList>
        <UpdateDirectoryModal directory={directory} />
        <MenuItem fontSize="sm" onClick={() => deleteDirectory(directory.id)}>
          Eliminar
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
