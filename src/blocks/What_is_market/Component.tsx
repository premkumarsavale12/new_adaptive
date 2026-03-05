import React from "react";
import Image from "next/image";
import { Media } from "@/payload-types";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

type LocalNodeShape = {
  type?: string
  text?: string
  children?: unknown[]
  format?: number | string
  tag?: number
  listType?: string
}

const renderLexical = (
  nodes?: unknown[]
): React.ReactNode => {
  if (!nodes) return null;

  return nodes.map((node: unknown, index: number) => {
    const n = node as LocalNodeShape

    if (n.type === "text") {
      let textElement: React.ReactNode = n.text as string | undefined;

      if (typeof n.format === 'number' && (n.format & 1)) {
        textElement = <strong>{textElement}</strong>;
      }

      if (typeof n.format === 'number' && (n.format & 2)) {
        textElement = <em>{textElement}</em>;
      }

      if (typeof n.format === 'number' && (n.format & 8)) {
        textElement = <u>{textElement}</u>;
      }

      return <React.Fragment key={index}>{textElement}</React.Fragment>;
    }

    if (n.type === "paragraph") {
      return (
        <p key={index} className="mb-4">
          {renderLexical(n.children)}
        </p>
      );
    }

    if (n.type === "heading") {
      const tagName = `h${n.tag || 2}`;

      return React.createElement(
        tagName,
        { key: index, className: 'font-semibold mb-4' },
        renderLexical(n.children),
      );
    }


    if (n.type === "list") {
      const ListTag = n.listType === "number" ? "ol" : "ul";

      return (
        <ListTag key={index} className="pl-6 mb-4 list-disc">
          {renderLexical(n.children)}
        </ListTag>
      );
    }


    if (n.type === "listitem") {
      return (
        <li key={index}>
          {renderLexical(n.children)}
        </li>
      );
    }

    return null;
  });
};

interface WhatIsMarketProps {
  reverse?: boolean;
  title: string;
  description?: DefaultTypedEditorState;
  protectionDetails?: DefaultTypedEditorState;
  protectionDetailsArray?: {
    content?: DefaultTypedEditorState;
  }[];
  imageSrc: string | Media;
}

export const What_is_market: React.FC<WhatIsMarketProps> = ({
  title,
  description,
  protectionDetails,
  protectionDetailsArray,
  imageSrc,
  reverse = false,
}) => {
  const imageUrl =
    typeof imageSrc === "string" ? imageSrc : imageSrc?.url;

  return (
    <section className="t-section market-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b-[1px] border-b-black-200 border-b-solid">
      <div className="container">
        <div className="inner md:space-y-[48px] space-y-6">
          <div className="top text-left space-y-8">
            <div className="title flex justify-start items-start">
              <h2
                className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-[0] before:opacity-20 before:z-0 text-black"
                dangerouslySetInnerHTML={{ __html: title }}
              ></h2>
            </div>

            <div
              className="text text-body font-inter font-normal text-black-300"

            >    {renderLexical(description?.root?.children)}</div>

          </div>

          <div
            className={`protection-text flex justify-start items-start lg:gap-[64px] gap-8 lg:flex-row flex-col-reverse ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
          >
            {(protectionDetails || (protectionDetailsArray && protectionDetailsArray.length > 0)) && (
              <div className="p-text-left font-inter space-y-4 !text-black-300 lg:w-[58%] w-full">
                {protectionDetails && renderLexical(protectionDetails?.root?.children)}
                {protectionDetailsArray && (
                  <ul className="[&amp;_li]:pl-8 [&amp;_li]:relative [&amp;_li]:before:content-[''] [&amp;_li]:before:w-[10px] [&amp;_li]:before:h-[10px] [&amp;_li]:before:bg-black-200 [&amp;_li]:before:absolute [&amp;_li]:before:left-0 [&amp;_li]:before:top-[6px] [&amp;_li]:before:rounded-full space-y-2">
                    {protectionDetailsArray &&
                      protectionDetailsArray?.map((items, i) => {
                        return <li key={i}> {renderLexical(items.content?.root?.children)}</li>;
                      })}
                  </ul>
                )}
              </div>
            )}

            {imageUrl && (
              <div className="p-text-right lg:w-[42%] w-full">
                <Image
                  src={imageUrl}
                  width={598}
                  height={294}
                  alt="market image"
                  className="w-full h-auto lg:aspect-[2/1] inset-0 aspect-auto object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
