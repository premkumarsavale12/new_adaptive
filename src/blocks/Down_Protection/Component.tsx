"use client";

import React from "react";
import Image from "next/image";
import RichText from "@/components/RichText";
import { Media } from "@/payload-types";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

interface Down_ProtectionProps {
  Heading?: string;
  Description?: DefaultTypedEditorState;
  image?: Media;
  richText?: DefaultTypedEditorState;
}

export const Down_Protection: React.FC<Down_ProtectionProps> = ({
  Heading,
  Description,
  image,
  richText,
}) => {
  return (
    <section className="t-section market-section lg:py-[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b border-black-200">
      <div className="container">
        <div className="inner md:space-y-[48px] space-y-6">
          {/* Top Section */}
          <div className="top text-left space-y-8">
            {Heading && (
              <div className="title flex justify-start items-start">
                <h2 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] before:left-0 before:opacity-20 before:z-0 text-black">
                  {Heading}
                </h2>
              </div>
            )}

            {Description && (
              <div className="text text-body font-inter font-normal text-black-300">
                <RichText
                  className="mb-0"
                  data={Description}
                  enableGutter={false}
                />
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="protection-text flex justify-start items-start lg:gap-[64px] gap-8 lg:flex-row flex-col">
            {/* Image LEFT */}
            {image?.url && (
              <div className="p-text-left lg:w-[42%] w-full">
                <Image
                  src={image.url}
                  width={598}
                  height={294}
                  alt={image.alt || "protection image"}
                  className="w-full h-auto lg:aspect-[2/1] object-cover"
                />
              </div>
            )}

            {/* Content RIGHT */}
            {richText && (
              <div className="p-text-right font-inter space-y-4 text-black-300 lg:w-[58%] w-full">
                <RichText data={richText} enableGutter={false} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
