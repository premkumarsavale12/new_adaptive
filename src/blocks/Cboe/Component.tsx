import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import React from "react";
import NextImage from "next/image";
import { Media } from "@/payload-types";


import type { SerializedLexicalNode, SerializedTextNode } from "lexical";

interface CboeProps {
    Image?: Media,
    Heading?: string,
    richText: DefaultTypedEditorState
    SubHeading?: string,
    SImage?: Media,
}

export const Cboe: React.FC<CboeProps> = ({ Image, Heading, richText, SubHeading, SImage }) => {
    const renderTextNode = (node: SerializedTextNode, key: number) => {
        let element: React.ReactNode = node.text

        if (node.format & 1) {
            element = <strong key={`b-${key}`} className="font-bold text-black">{element}</strong>
        }
        if (node.format & 2) {
            element = <em key={`i-${key}`}>{element}</em>
        }

        return <React.Fragment key={key}>{element}</React.Fragment>
    }

    const renderChildren = (children?: SerializedLexicalNode[]) => {
        if (!children) return null

        return children.map((child, index) => {
            if (child.type === 'text') {
                return renderTextNode(child as SerializedTextNode, index)
            }
            return null
        })
    }

    const renderRichText = (state?: DefaultTypedEditorState) => {
        if (!state) return null

        return state.root.children.map((node, i) => {
            if (node.type === 'paragraph') {
                return <p key={i} className="mb-0">{renderChildren(node.children as SerializedLexicalNode[])}</p>
            }
            return null
        })
    }

    return (

        <>
            <section className="tools-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 h-full bg-white-100">
                <div className="container">
                    <div className="inner font-inter space-y-8">
                        {/* Top Section */}
                        <div className="top flex flex-col justify-center items-center text-center lg:gap-8 gap-4 mb-8">

                            <NextImage
                                src={Image?.url || ""}
                                alt="measure image"
                                role="img"
                                width={362}
                                height={300}
                            />
                            <div className="text space-y-2">
                                <h2
                                    className="text-h5 font-bold *:text-green"
                                    dangerouslySetInnerHTML={{ __html: Heading || '' }}
                                ></h2>

                                <div className="text-black-300">
                                    {renderRichText(richText)}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="btm-block space-y-4 text-center">
                            <h3
                                className="text-h3 font-semibold"

                            > {SubHeading}</h3>
                            <NextImage
                                src={SImage?.url || ""}
                                width={1488}
                                height={528}
                                alt="chart image"
                                role="img"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

