import React from "react";
import { FC } from "react";

interface ComposeProps {
  providers: FC<any>[];
}

export const Compose: FC<ComposeProps> = ({ children, providers }) => {
  return (
    <>
      {providers.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};
