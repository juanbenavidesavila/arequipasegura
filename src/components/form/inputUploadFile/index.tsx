import { InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { File } from "react-feather";
import { useFormContext } from "react-hook-form";
import { Input } from "../Input";

interface FileUploadProps {
  name: string;
  acceptedFileTypes?: string[];
}

export const InputUploadFile: FC<FileUploadProps> = ({ name }) => {
  const [file, setFile] = useState<File>();
  const { setValue } = useFormContext();
  const onDrop = useCallback(([acceptedFile]) => {
    setFile(acceptedFile);
    setValue(name, acceptedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    multiple: false,
  });



  return (
    <>
      <div {...getRootProps()}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={File} />
          </InputLeftElement>
          <input {...getInputProps()} type="file" name={name} style={{ display: "none" }}></input>
          <Input
            name="c"
            inputProps={{
              placeholder: "Selecciona un archivo",
              pl: "8",
              defaultValue: file?.name,
            }}
          />
        </InputGroup>
      </div>
    </>
  );
};
