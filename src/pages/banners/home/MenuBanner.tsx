import React, { FC } from "react";

import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { MoreVertical } from "react-feather";
import { useBannerContext } from "@/contexts";
import { Banner } from "@alerta-ciudadana/entity";
// import { UpdateDirectoryModal } from "./UpdateDirectoryModal";

interface MenuBannerProps {
  banner: Banner;
}

export const MenuBanner: FC<MenuBannerProps> = ({ banner }) => {
  const { deleteBanner } = useBannerContext();

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
        {/* <UpdateDirectoryModal banner={banner} /> */}
        <MenuItem fontSize="sm" onClick={() => deleteBanner(banner)}>
          Eliminar
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
