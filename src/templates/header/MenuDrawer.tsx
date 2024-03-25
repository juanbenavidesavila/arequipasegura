import React from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  IconButton,
  ListItem,
  List,
} from "@chakra-ui/react";
import { Menu } from "react-feather";
import { itemsMenu } from "../navbar";
import Link from "next/link";
import { useRouter } from "next/router";

export const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>(null);
  const { pathname, push } = useRouter();

  return (
    <div>
      <IconButton
        ref={btnRef}
        onClick={onOpen}
        aria-label=""
        _focus={{}}
        colorScheme="pri"
        size="sm"
        icon={<Menu size="1.25rem" />}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Menú</DrawerHeader>

          <DrawerBody px="0">
            <List spacing={2}>
              {itemsMenu.map((item, key) => {
                return (
                  <Link key={key} href={item.pathname}>
                    <a>
                      {" "}
                      <ListItem
                        onClick={onClose}
                        fontWeight="medium"
                        borderLeft="4px"
                        py="3"
                        bgColor={pathname.includes(item.pathname) ? "pri.50" : "transparent"}
                        borderColor={pathname.includes(item.pathname) ? "pri.600" : "transparent"}
                        color={pathname.includes(item.pathname) ? "pri.600" : "black"}
                        px="6"
                      >
                        {item.label}
                      </ListItem>
                    </a>
                  </Link>
                );
              })}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
