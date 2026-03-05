import React from "react";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import type {
  SerializedLexicalNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from "lexical";

interface ManagePortfolioProps {
  Heading?: string;
  richText?: DefaultTypedEditorState;
  dots_bg?: boolean;
}

export const Measure_Portfilio: React.FC<ManagePortfolioProps> = ({
  Heading,
  richText,
  dots_bg = false,
}) => {
  /* ---------------- Type Guards ---------------- */

  const isParagraphNode = (
    node: SerializedLexicalNode
  ): node is SerializedParagraphNode => {
    return node.type === "paragraph";
  };

  const isTextNode = (
    node: SerializedLexicalNode
  ): node is SerializedTextNode => {
    return node.type === "text";
  };

  /* ---------------- Text Renderer ---------------- */

  const renderText = (
    child: SerializedTextNode,
    index: number
  ): React.ReactNode => {
    let content: React.ReactNode = child.text;

    // Bold
    if (child.format & 1) {
      content = <strong>{content}</strong>;
    }

    // Italic
    if (child.format & 2) {
      content = <em>{content}</em>;
    }

    // Underline
    if (child.format & 8) {
      content = <u>{content}</u>;
    }

    return <React.Fragment key={index}>{content}</React.Fragment>;
  };

  /* ---------------- Component ---------------- */

  return (
    <section
      className={`t-section market-section ${
        dots_bg ? "bg-dots_bg" : "bg-white-100"
      } lg:py-[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b border-black-200`}
    >
      <div className="container mx-auto">
        <div className="inner md:space-y-[48px] space-y-6">
          <div className="top text-center space-y-6">
            {Heading && (
              <h2 className="text-h2 font-semibold text-black">
                {Heading}
              </h2>
            )}

            {richText && (
              <div className="text-body text-black-300 leading-relaxed">
                {richText.root.children.map((node, index) => {
                  if (isParagraphNode(node)) {
                    return (
                      <p key={index} className="mb-4">
                        {node.children
                          ?.filter(isTextNode)
                          .map(renderText)}
                      </p>
                    );
                  }

                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};