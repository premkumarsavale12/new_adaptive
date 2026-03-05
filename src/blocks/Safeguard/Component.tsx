import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import type {
    SerializedLexicalNode,
    SerializedTextNode,
    SerializedParagraphNode,
    SerializedLineBreakNode,
} from "lexical";

interface Button {
    url: string;
    label: string;
    target?: string;
}

interface SafeguardProps {
    Heading?: string;
    richText?: DefaultTypedEditorState;
    Items?: {
        Image?: {
            url: string;
            alt: string;
        };
        Heading?: string;
        richText?: DefaultTypedEditorState;
    }[];
    button?: Button;
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

const isLineBreakNode = (
    node: SerializedLexicalNode
): node is SerializedLineBreakNode => {
    return node.type === "linebreak";
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
                content = (
                    <strong className="font-bold text-black">
                        {content}
                    </strong>
                );
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
                <p key={index} className="mb-0">
                    {renderLexical(node.children)}
                </p>
            );
        }

        /* ---------- Line Break ---------- */
        if (isLineBreakNode(node)) {
            return <br key={index} />;
        }

        return null;
    });
};

export const Safeguard: React.FC<SafeguardProps> = ({ Heading, richText, Items, button }) => {

    return (

        <>
            <section className="t-section market-section bg-dots_bg lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b-[1px] border-b-black-200 border-b-solid">
                <div className="container">
                    <div className="inner md:space-y-[48px] space-y-6">
                        {/* Top Section */}
                        <div className="top text-left md:space-y-8 space-y-6">
                            <div className="title flex justify-center items-center text-center">
                                <h2
                                    className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-[0] before:opacity-20 before:z-0 text-black"

                                >  {Heading}</h2>
                            </div>
                            <div
                                className="text-center text-body font-inter font-normal text-black-300 space-y-1"

                            >      {richText && renderLexical(richText.root.children)}   </div>
                        </div>

                        {/* Grid Section */}
                        <div className="block-box grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-16 md:gap-8 gap-4">
                            {Items?.map((box, index) => (
                                <div
                                    key={index}
                                    className="box p-4 flex flex-col space-y-4 bg-white justify-start items-start border border-black-200 border-solid"
                                >
                                    {box.Image?.url && (
                                        <Image
                                            src={box.Image.url}
                                            width={120}
                                            height={121}
                                            alt={box.Image.alt || "box image"}
                                            role="img"
                                        />
                                    )}
                                    <div className="sm:space-y-5 space-y-4 font-inter">
                                        <h3
                                            className="text-h5 font-semibold"

                                        >   {box.Heading}  </h3>
                                        {box.richText && (
                                            <div className="rich-text-content">
                                                {renderLexical(box.richText.root.children)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="btn-green mx-auto">
                            {button && (
                                <Link href={button.url} target={button.target} role="link">
                                    {button.label}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}
