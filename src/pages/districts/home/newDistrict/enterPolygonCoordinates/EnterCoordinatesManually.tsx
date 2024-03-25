import { FormControl, Button, Input } from "@/components";
import { HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { X } from "react-feather";
import { useFieldArray, useFormContext } from "react-hook-form";

export const EnterCoordinatesManually = () => {
  const { getValues, setFocus, resetField, setValue } = useFormContext();
  const { append, fields, update, remove } = useFieldArray({ name: "coordinates" });

  function addNewCoordinate() {
    const { lat, lng } = getValues();

    if (!lat) {
      setFocus("lat");
      return;
    }
    if (!lng) {
      setFocus("lng");
      return;
    }

    append({ lat, lng });

    resetField("lat");
    resetField("lng");
    setFocus("lat");
  }

  useEffect(() => {
    setValue("coordinates", []);
    return () => {
      setValue("coordinates", []);
      setValue("lat", null);
      setValue("lng", null);
    };
  }, []);

  return (
    <div>
      <FormControl name="coordinates">
        <Stack mb="2">
          {fields.map((field, i) => (
            <HStack key={i}>
              <Text>{i + 1}</Text>
              <Input
                name={`lat-${i}`}
                inputProps={{
                  placeholder: "Latitud",
                  type: "number",
                  defaultValue: (field as any).lat,
                  onChange: (e) => update(i, { lat: e.target.value }),
                }}
              />
              <Input
                name={`lng-${i}`}
                inputProps={{
                  placeholder: "Longitud",
                  type: "number",
                  defaultValue: (field as any).lng,
                  onChange: (e) => update(i, { lng: e.target.value }),
                }}
              />
              <IconButton
                onClick={() => remove(i)}
                _focus={{}}
                aria-label=""
                colorScheme="red"
                variant="ghost"
                icon={<X size="1.25rem" />}
              />
            </HStack>
          ))}
        </Stack>
      </FormControl>
      <Stack ml="4" mr="12">
        <HStack alignItems="flex-end">
          <Input name="lat" inputProps={{ placeholder: "Latitud", type: "number" }} />
          <Input name="lng" inputProps={{ placeholder: "Longitud", type: "number" }} />
        </HStack>
        <Button colorScheme="sec" color="black" onClick={addNewCoordinate}>
          Nueva Cordenada
        </Button>
      </Stack>
    </div>
  );
};
