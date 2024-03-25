import React, { useState } from "react";

import { NextPage } from "next";
import Cookies from "universal-cookie";
import { Flex, Image, Stack, useToast } from "@chakra-ui/react";
import { Card } from "@/layout";
import { Form } from "./signinForm/Form";
import { auth, database } from "@/firebase";
import { useDistrictContext } from "@/contexts";

const cookies = new Cookies();

export const SigninPage: NextPage = () => {
  const { onSubmit, isLoading } = useLogin();

  return (
    <Flex bgColor="#eceff3" h="100vh" w="100vw" alignItems="center" justifyContent="center">
      <Stack>
        <Image
          mb="2"
          userSelect="none"
          mx="auto"
          w="36"
          src="SEGURA.png"
          alt=""
        />
        <Card.Wrapper w="sm">
          <Card.Header title="Iniciar Sesión" />
          <Card.Container>
            <Form onSubmit={onSubmit} isLoading={isLoading} />
          </Card.Container>
        </Card.Wrapper>
      </Stack>
    </Flex>
  );
};

const useLogin = () => {
  const toast = useToast();
  const { districts } = useDistrictContext();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: SigninFormOnSubmit) {
    database.ref("admin/credentials").on("value", async (snapshot) => {

      let typesOfEmergencies = snapshot.val() || {};
      if (typesOfEmergencies.password === values.password && typesOfEmergencies.username === values.email) {
        startAsSuperadmin();
      } else {
        setIsLoading(true);
        try {
          console.log(values)
          const response = await auth.signInWithEmailAndPassword(values.email, values.password);
          console.log(response);
          if (response) {
            const district = districts.find((d) => d.user.credentials.username === values.email);
            console.log(JSON.stringify(district));
            if (district) {
              cookies.set("user", district.user.name, { path: "/" });
              cookies.set("type", district.user.type, { path: "/" });
              cookies.set("district_id", district.id, { path: "/" });
              cookies.set("hasSuperAdmin", false, { path: "/" });
              window.location.href = "/dashboard";
            }
          }
        } catch (err) {
          const error: any = err;
          if (["auth/user-not-found", "auth/wrong-password"].includes(error.code)) {
            toast({
              position: "top-right",
              title: "Credenciales inválidas",
              description: "El identificador o la contraseña son incorrectos",
              status: "error",
              variant: "left-accent",
            });
          }

          if (error.code === "auth/too-many-requests") {
            toast({
              position: "top-right",
              title: "Demasiados intentos",
              description: "Demasiados intentos de inicio de sesión, inténtalo más tarde",
              status: "error",
              variant: "left-accent",
            });
          }
          setIsLoading(false);
        }
      }
    });
  }

  async function startAsSuperadmin() {
    cookies.set("hasSuperAdmin", true, { path: "/" });
    cookies.set("district_id", districts[0].id, { path: "/" });

    window.location.href = "/dashboard";
  }

  return { onSubmit, isLoading };
};
