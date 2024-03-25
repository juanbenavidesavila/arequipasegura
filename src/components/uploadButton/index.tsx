import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Code,
  Icon,
} from "@chakra-ui/react";
import { useController } from "react-hook-form";
import { useRef } from "react";
import { File } from "react-feather";

export const FileUpload = ({ name, placeholder, acceptedFileTypes, control, children, isRequired = false }: any) => {
  const inputRef = useRef<any>(null);

  return (
    <FormControl /* isInvalid={invalid} */ isRequired>
      <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={File} />
        </InputLeftElement>
        <input type="file" accept={acceptedFileTypes} name={name} ref={inputRef} style={{ display: "none" }}></input>
        <Input placeholder={placeholder || "Your file ..."} onClick={() => inputRef.current.click()} />
      </InputGroup>
    </FormControl>
  );
};

export default FileUpload;
