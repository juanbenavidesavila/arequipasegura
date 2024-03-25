import { Emergency } from "@alerta-ciudadana/entity";
import React, { FC } from "react";
import ReactPlayer from "react-player";

interface VideoSectionProps {
  emergency: Emergency;
}

export const VideoSection: FC<VideoSectionProps> = ({ emergency }) => {
  return (
    <>
      {/* @ts-ignore */}
      <ReactPlayer config={{}} width="100%" controls url={emergency.video} />
    </>
  );
};
