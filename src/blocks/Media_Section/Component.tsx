"use client";

import React from "react";
import type { Media } from "@/payload-types";

interface Media_SectionProps {
    video?: Media;
}

export const Media_Section: React.FC<Media_SectionProps> = ({
    video,
}) => {
    return (
        <>
            {video?.url && (
                <div className="left w-full max-w-[1024px] mx-auto">
                    <video src={video.url} controls width="100%" />
                </div>
            )}
        </>
    );
};
