"use client";

import React from "react";
import Image from "next/image";
import type { Media } from "@/payload-types";
import Link from 'next/link'
import type {
  SerializedLexicalNode,
  SerializedTextNode,
} from "lexical";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

interface Tools_SectionsProps {
  toolsHeading?: string;
  useAlternateLayout?: boolean;
  content: DefaultTypedEditorState;
  image?: Media;
}

export const Tools_Sections: React.FC<Tools_SectionsProps> = ({
  toolsHeading,
  useAlternateLayout,
  content,
  image,
}) => {
  /* -- Lexical → HTML ---- */
  const extractHTML = (
    nodes?: SerializedLexicalNode[]
  ): string => {
    if (!Array.isArray(nodes)) return "";

    return nodes
      .map((node) => {
        // ✅ MUST check both property and array type
        if (
          !("children" in node) ||
          !Array.isArray(node.children)
        ) {
          return "";
        }

        const text = node.children
          .map((child) => {
            if (child.type === "text") {
              return (child as SerializedTextNode).text;
            }
            return "";
          })
          .join("");

        return text ? `<p>${text}</p>` : "";
      })
      .join("");
  };


  const descriptionHTML = extractHTML(
    content?.root?.children as SerializedLexicalNode[]
  );

  return (
    <>
      <section className="tools-section lg:py[150px] py-[80px] w-full bg-dots_bg bg-cover bg-center bg-no-repeat">
        <div className="container">
          <div className="md:space-y-8 space-y-4 max-w-[1024px] mx-auto">
            <div className="top w-full flex justify-center items-center xmd:mb-16 mb-10">
              <div className="logo">
                <Link href="/" role="link">
                  <Image
                    src="/media/Frame.webp"
                    width={310}
                    height={85}
                    alt="Adaptive logo"
                    className="w-[150px] md:w-[200px] lg:w-[310px] h-auto"
                  />
                </Link>
              </div>
            </div>

            {useAlternateLayout ? (
              <div className="inner-content flex flex-col space-y-8">

                <div className="heading">
                  <h2
                    className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-24px] before:left-[-12px] before:opacity-20 before:z-0 text-left"
                    dangerouslySetInnerHTML={{ __html: toolsHeading ?? "" }}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start justify-between">

                  {descriptionHTML && (
                    <div
                      className="content font-inter flex flex-col gap-4 xmd:pt-8 pt-4 text-p text-black-300 md:w-1/2 w-full"
                      dangerouslySetInnerHTML={{ __html: descriptionHTML }}
                    />
                  )}

                  <div className="inner flex lg:gap-16 gap-8 flex-col md:w-1/2">
                    {image?.url && (
                      <div className="left w-full flex-shrink-0">
                        <Image
                          src={image.url}
                          width={1488}
                          height={489}
                          alt={image.alt || "promotion image"}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ) : (
              <div className="inner-content flex flex-col space-y-8">

                <div className="heading">
                  <h2
                    className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-24px] before:left-[-12px] before:opacity-20 before:z-0 text-left"
                    dangerouslySetInnerHTML={{ __html: toolsHeading ?? "" }}
                  />

                  {descriptionHTML && (
                    <div
                      className="content font-inter flex flex-col gap-4 xmd:pt-8 pt-4 text-p text-black-300"
                      dangerouslySetInnerHTML={{ __html: descriptionHTML }}
                    />
                  )}
                </div>

                {image?.url && (
                  <div className="left w-full flex-shrink-0">
                    <Image
                      src={image.url}
                      width={1488}
                      height={489}
                      alt={image.alt || "promotion image"}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div >
        </div >
      </section >
    </>
  );
};
