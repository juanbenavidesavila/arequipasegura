import { useDistrictContext } from "@/contexts";
import { Card } from "@/layout";
import { Box, Flex, HStack, IconButton, Text, Select, Tag, Image, chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { LogOut, Settings } from "react-feather";
import Cookies from "universal-cookie";
import { Navbar } from "../navbar";
import { MenuDrawer } from "./MenuDrawer";

const cookies = new Cookies();

export const Header = () => {
  const { push, pathname } = useRouter();
  const { districts } = useDistrictContext();
  const hasSuperAdmin = cookies.get("hasSuperAdmin") === "true";
  const type = useMemo(() => cookies.get("type"), []);

  const districtSelected = useMemo(
    () => districts.find((district) => district.id === cookies.get("district_id")),
    [districts]
  );

  const currentDistrict = districts.find((district) => district.id === cookies.get("district_id"));

  function signOut() {
    cookies.remove("user");
    cookies.remove("hasSuperAdmin");
    cookies.remove("district_id");
    window.location.href = "/signin";
  }

  return (
    <Card.Wrapper rounded="none" shadow="sm">
      <Flex h={["16", null, null, "auto"]} px="6" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Box mr="5">
            {
              (type === 'arequipa')
              ?(
                <Image
                userSelect="none"
                mx="auto"
                w="28"
                src="SEGURA.png"
                alt=""
              />

              ) : (
               <Image
                  userSelect="none"
                  mx="auto"
                  w="28"
                  src="https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/logos%2Flogito.png?alt=media"
                  alt=""
                />
                )
            }
           
          </Box>
          <Navbar />
        </Flex>
        <HStack>
          <Box textAlign="right">
            <Text fontSize="sm" mb="0.5" lineHeight="none">
              <chakra.strong color="gray.500">
                Bienvenido <chakra.span color="gray.800">{currentDistrict?.user.name}</chakra.span>
              </chakra.strong>
            </Text>
            <Tag variant="solid" colorScheme="pri" size="sm">
              {currentDistrict?.name}
            </Tag>
          </Box>
          {hasSuperAdmin && (
            <>
              <Tag colorScheme="pri" variant="solid" minWidth="max-content" fontSize="sm">
                {districtSelected?.name}
              </Tag>
              <Select
                onChange={(e: any) => {
                  cookies.set("district_id", e.target.value, { path: "/" });
                  window.location.reload();
                }}
              >
                <option>Seleccionar...</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </Select>
            </>
          )}

          <IconButton
            aria-label="Settings"
            size="sm"
            variant={pathname !== "/settings" ? "ghost" : undefined}
            _focus={{}}
            colorScheme="blue"
            icon={<Settings size="1.25rem" />}
            onClick={() => push("/settings")}
          />
          {/* <IconButton
            aria-label="Settings"
            size="sm"
            variant="ghost"
            _focus={{}}
            colorScheme="green"
            icon={<Bell size="1.25rem" />}
          /> */}

          <IconButton
            _focus={{}}
            display={["none", null, null, "flex"]}
            size="sm"
            aria-label=""
            icon={<LogOut size="1rem" />}
            colorScheme="red"
            variant="ghost"
            onClick={signOut}
          />
          <Box display={["flex", null, null, "none"]}>
            <MenuDrawer />
          </Box>
        </HStack>
      </Flex>
    </Card.Wrapper>
  );
};
