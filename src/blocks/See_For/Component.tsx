import React from "react";
import Link from "next/link";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import type {
  SerializedLexicalNode,
  SerializedTextNode,
} from 'lexical'

interface See_ForProps {
  Heading?: string;
  richText: DefaultTypedEditorState;
  button?: {
    label?: string;
    url?: string;
    target?: "_self" | "_blank";
  };
  dots_bg?: boolean;
}


export const See_For: React.FC<See_ForProps> = ({ Heading, richText, button }) => {

  const renderTextNode = (node: SerializedTextNode, key: number) => {
    let element: React.ReactNode = node.text

    if (node.format & 1) {
      element = <strong key={`b-${key}`} className="block text-black">{element}</strong>
    }
    if (node.format & 2) {
      element = <em key={`i-${key}`}>{element}</em>
    }
    if (node.format & 4) {
      element = <u key={`u-${key}`}>{element}</u>
    }
    if (node.format & 8) {
      element = <s key={`s-${key}`}>{element}</s>
    }

    return <React.Fragment key={key}>{element}</React.Fragment>
  }

  const renderChildren = (children?: SerializedLexicalNode[]) => {
    if (!children) return null

    return children.map((child, index) => {
      if (child.type === 'text') {
        return renderTextNode(child as SerializedTextNode, index)
      }
      if (child.type === 'linebreak') {
        return <br key={index} className="hidden" />
      }
      return null
    })
  }

  const renderRichText = (state?: DefaultTypedEditorState) => {
    if (!state) return null

    return state.root.children.map((node, i) => {
      if (node.type === 'list') {
        return (
          <ul
            key={i}
            className="para text-dark text-h4 leading-snug pl-24 [&_li]:list-disc space-y-24"
          >
            {node.children?.map((child, idx) => (
              <li key={idx}>{'children' in child ? renderChildren(child.children as SerializedLexicalNode[]) : null}</li>
            ))}
          </ul>
        )
      }

      if (node.type === 'paragraph') {
        return <p key={i}>{renderChildren(node.children as SerializedLexicalNode[])}</p>
      }

      if (node.type === 'heading') {
        return <h3 key={i}>{renderChildren(node.children as SerializedLexicalNode[])}</h3>
      }

      return null
    })
  }
  return (
    <section className="t-section market-section bg-dots_bg lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b-[1px] border-b-black-200 border-b-solid">
      <div className="container">
        <div className="inner md:space-y-[48px] space-y-6">
          <div className="top text-left md:space-y-8 space-y-6">
            {/* Heading */}
            {Heading && (
              <div className="title flex justify-center items-center text-center">
                <h2 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-[0] before:opacity-20 before:z-0 text-black">
                  {Heading}
                </h2>
              </div>
            )}

            {/* Rich Text */}
            {/* {richText && (
              <div className="text-center text-body font-inter font-normal text-black-300  space-y-2">
                <RichText
                  className="mb-0"
                  data={richText}
                  enableGutter={false}
                />
              </div>
            )} */}


            <div className="text-center text-body font-inter font-normal text-black-300 space-y-4">
              {renderRichText(richText)}
            </div>
            {/* Button */}
            {button?.url && button?.label && (
              <div className="btn-link border-green hover:border-black mx-auto w-fit">
                <Link
                  href={button.url}
                  target={button.target ?? "_self"}
                  className="flex gap-3 items-center justify-center"
                >
                  {button.label}
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5 12.1089H5.5"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14.5 17.1089L19.5 12.1089"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14.5 7.10889L19.5 12.1089"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
