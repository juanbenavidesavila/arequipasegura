import React, { FC, useEffect, useState } from "react";
import { FieldValues, FormProvider as _FormProvider, useForm, UseFormReturn } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

const IS_DEVELOPMENT = true;

export interface FormProviderProps {
  id: string;
  onSubmit(values: any, methods: UseFormReturn<FieldValues, any>): void;
  setMethods?(methods: UseFormReturn<FieldValues, any>): void;
  defaultValues?: any;
  schema?: any;
  faker?: any;
}

export const FormProvider: FC<FormProviderProps> = ({
  children,
  id,
  onSubmit,
  defaultValues,
  setMethods,
  schema,
  faker,
}) => {
  const [defaultValuesInternal, setDefaultValuesInternal] = useState<any>(null);
  const methods = useForm({ resolver: schema ? yupResolver(schema) : undefined });
  useEffect(() => {
    if (defaultValues && JSON.stringify(defaultValues) !== JSON.stringify(defaultValuesInternal)) {
      methods.reset(defaultValues);
      setDefaultValuesInternal(defaultValues);
    } else {
      if (IS_DEVELOPMENT) {
        methods.reset(faker);
        setDefaultValuesInternal(faker);
      }
    }
  }, [defaultValues]);

  useEffect(() => {
    setMethods?.(methods);
  }, []);

  return (
    <_FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((values) => onSubmit(values, methods))} id={id}>
        {children}
      </form>
    </_FormProvider>
  );
};
