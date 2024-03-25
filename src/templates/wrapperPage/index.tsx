import React, { FC, useEffect, useMemo } from "react";

import { Flex, SimpleGrid, Stack } from "@chakra-ui/react";

import { NextSeo } from "next-seo";

import { Header } from "../header";

import { Breadcrumb, RoutesBreadcrumbType } from "@/components";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

const cookies = new Cookies();

interface WrapperPageProps {
  title: string;
  description?: string;
  fullScreen?: boolean;
  breadcrumb?: {
    routes: RoutesBreadcrumbType[];
  };
  rows?: number;
}

export const WrapperPage: FC<WrapperPageProps> = ({ children, title, description, fullScreen, breadcrumb }) => {
  const districtId = useMemo(() => cookies.get("district_id"), []);

  const { push } = useRouter();

  useEffect(() => {
    if (!districtId) push("/signin");
  }, []);

  if (!districtId) return null;

  return (
    <>
      <NextSeo title={`${title} - Alerta Ciudadana`} description={description} />
      <Stack spacing={["1", null, null, "2"]} bgColor="#eceff3" minH={["100vh"]}>
        <Header />
        <Stack pb={["1", null, null, "2"]} flex="1" px={["1", null, null, "2"]}>
          {breadcrumb && <Breadcrumb {...breadcrumb} />}
          <SimpleGrid flex={fullScreen ? "1" : undefined} columns={12} gap={[1, null, null, 2]}>
            {children}
          </SimpleGrid>
        </Stack>
      </Stack>
    </>
  );
};
