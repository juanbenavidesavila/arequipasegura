import React, { useEffect } from "react";

import { NextPage } from "next";

import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const HomePage: NextPage = () => {
  const { push } = useRouter();
  useEffect(() => {
    push("/dashboard");
  }, []);

  return <Box></Box>;
};
