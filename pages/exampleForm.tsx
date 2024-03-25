import React, { FC } from "react";

import * as yup from "yup";
import { faker } from "@faker-js/faker";
import { FormProvider, InputControl } from "@/components";
import { Button, Flex, Stack } from "@chakra-ui/react";

const exampleFormSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  lastname: yup.string().required("El apellido es requerido"),
  email: yup.string().email().required("El email es requerido"),
});

export interface ExampleFormSchema extends RemoveIndex<yup.InferType<typeof exampleFormSchema>> {}

const fakerValues: ExampleFormSchema = {
  email: faker.internet.email(),
  name: faker.name.firstName("male"),
  lastname: faker.name.lastName(),
};

interface ComponentFormProps<T> {
  onSubmit(values: T): void;
}

export interface ExampleFormProps extends ComponentFormProps<ExampleFormSchema> {}

const ExampleForm: FC<ExampleFormProps> = ({ onSubmit }) => {
  return (
    <FormProvider id="example-form" schema={exampleFormSchema} onSubmit={onSubmit} faker={fakerValues}>
      <Stack w="xl" mx="auto">
        <InputControl formControl={{ label: "name" }} name="name" />
        <InputControl formControl={{ label: "lastname" }} name="lastname" />
        <InputControl formControl={{ label: "email" }} name="email" />
        <Flex justifyContent="flex-end">
          <Button type="submit">Submit</Button>
        </Flex>
      </Stack>
    </FormProvider>
  );
};

export default ExampleForm;
