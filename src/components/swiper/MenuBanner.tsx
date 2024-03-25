import React, { FC, useMemo } from "react";

import { Menu, MenuButton, MenuList, MenuItem, IconButton, HStack } from "@chakra-ui/react";
import { MoreVertical, X, Trash2, Edit } from "react-feather";

import { database } from "@/firebase";
import Cookies from "universal-cookie";
import { EditTitle } from "./EditTitle";

interface MenuBannerProps {
  bannerId: string;
}
const cookies = new Cookies();

export const MenuBanner: FC<MenuBannerProps> = ({ bannerId }) => {
  const districtId = useMemo(() => cookies.get("district_id"), []);

  async function handleDelete() {
    await database.ref(`district/${districtId}/banner/${bannerId}`).remove();
  }

  return (
    <HStack>
      <EditTitle bannerId={bannerId} />

      <IconButton
        onClick={handleDelete}
        colorScheme="red"
        rounded="sm"
        aria-label=""
        size="sm"
        _focus={{ ring: 0 }}
        ring="0"
        icon={<Trash2 size="1.25rem" />}
      />
    </HStack>
  );
};
