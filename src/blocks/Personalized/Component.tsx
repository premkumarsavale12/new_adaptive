import { Media } from "@/payload-types";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import Image from "next/image";
import React from "react";
import type {
  SerializedLexicalNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from "lexical";

interface PersonalizedProps {
  Items?: {
    Heading?: string;
    richText: DefaultTypedEditorState;
    image: Media;
    bgClass?: string;
  }[];
}

/* ---------------- Type Guards ---------------- */

const isTextNode = (
  node: SerializedLexicalNode
): node is SerializedTextNode => {
  return node.type === "text";
};

const isParagraphNode = (
  node: SerializedLexicalNode
): node is SerializedParagraphNode => {
  return node.type === "paragraph";
};

/* ---------------- Lexical Renderer ---------------- */

const renderLexical = (
  nodes?: SerializedLexicalNode[]
): React.ReactNode => {
  if (!nodes) return null;

  return nodes.map((node, index) => {
    /* ---------- Text ---------- */
    if (isTextNode(node)) {
      let content: React.ReactNode = node.text;

      if (node.format & 1) {
        content = <strong className="font-bold">{content}</strong>;
      }

      if (node.format & 2) {
        content = <em>{content}</em>;
      }

      if (node.format & 8) {
        content = <u>{content}</u>;
      }

      return <React.Fragment key={index}>{content}</React.Fragment>;
    }

    /* ---------- Paragraph ---------- */
    if (isParagraphNode(node)) {
      return (
        <p key={index}>
          {renderLexical(node.children)}
        </p>
      );
    }

    return null;
  });
};


export const Personalized: React.FC<PersonalizedProps> = ({ Items = [] }) => {
  return (
    <section className="tools-section">
      {Items.map((item, i) => (
        <div
          key={i}
          className={`block-enterprice t-section w-full ${item.bgClass ?? ""
            } border-b border-black-200 ${i % 2 !== 0 ? "md:flex-row-reverse bg-white-100" : "md:flex-row"
            } lg:py-[100px] md:py-[80px] sm:py-[50px] py-6`}
        >
          <div className="container">
            <div className="inner-content flex flex-col lg:space-y-16 md:space-y-10 space-y-6">
              <div
                className={`inner flex justify-start items-start lg:gap-16 gap-8 flex-col ${i % 2 !== 0 ? "xmd:flex-row-reverse" : "xmd:flex-row"
                  }`}
              >
                {/* LEFT */}
                <div className="left xmd:w-1/2 w-full space-y-8">
                  {item.Heading && (
                    <h3 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-[0] before:opacity-20 before:z-0">
                      {item.Heading}
                    </h3>
                  )}

                  <div className="space-y-4">
                    {renderLexical(item.richText?.root?.children as SerializedLexicalNode[])}
                  </div>


                </div>

                {/* RIGHT */}
                <div className="right xmd:w-1/2 w-full flex justify-start">
                  {item.image?.url && (
                    <Image
                      width={714}
                      height={450}
                      src={item.image.url}
                      alt={item.image.alt ?? item.image.filename ?? "Image"}
                      className="w-full h-full object-cover inset lg:aspect-[2/1] aspect-auto"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
