import React, { FC } from "react";

import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";

import { MoreVertical } from "react-feather";
import { ChangeNameModal } from "./options/changeName/ChangeNameModal";
import { EditUserModal } from "./options/editUser/EditUserModal";
import { DeleteDistrict } from "./options/deleteDistrict";
import { District } from "@alerta-ciudadana/entity";

interface DistrictTableMenuOptionsProps {
  district: District;
}

export const DistrictTableMenuOptions: FC<DistrictTableMenuOptionsProps> = ({ district }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        variant="ghost"
        size="sm"
        _focus={{}}
        icon={<MoreVertical size="1.25rem" />}
      />
      <MenuList>
        <ChangeNameModal district={district} />
        <EditUserModal />
        <DeleteDistrict district={district} />
      </MenuList>
    </Menu>
  );
};
