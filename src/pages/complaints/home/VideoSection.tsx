import { Complaint } from "@alerta-ciudadana/entity";
import React, { FC } from "react";
import ReactPlayer from "react-player";

interface VideoSectionProps {
  complaint: Complaint;
}

export const VideoSection: FC<VideoSectionProps> = ({ complaint }) => {
  return (
    <>
      {/* @ts-ignore */}
      <ReactPlayer config={{}} width="100%" controls url={complaint.video} />
    </>
  );
};
