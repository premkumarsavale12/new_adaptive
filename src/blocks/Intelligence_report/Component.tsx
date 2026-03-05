"use client";

import React from "react";
import Image from "next/image";
import type {
    SerializedLexicalNode,
    SerializedTextNode,
} from "lexical";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

interface Intelligence_reportProps {
    intelligences: {
        intelligenceHeading?: string;
        description?: DefaultTypedEditorState;
    }[];

}

export const Intelligences_report: React.FC<Intelligence_reportProps> = ({
    intelligences,
}) => {
    const extractHTML = (
        nodes?: SerializedLexicalNode[]
    ): string => {
        if (!Array.isArray(nodes)) return "";

        return nodes
            .map((node) => {
                // Proper type narrowing
                if (
                    !("children" in node) ||
                    !Array.isArray(node.children)
                ) {
                    return "";
                }

                const text = node.children
                    .filter(
                        (child): child is SerializedTextNode =>
                            child.type === "text"
                    )
                    .map((child) => child.text)
                    .join("");

                return text ? `<p>${text}</p>` : "";
            })
            .join("");
    };


    return (
        <>
            <section className="tools-section lg:py[150px] py-[80px] w-full bg-dots_bg bg-cover bg-center bg-no-repeat">
                <div className="container">
                    <div className="md:space-y-8 space-y-4 max-w-[1024px] mx-auto">

                        <div className="right font-inter flex flex-col xmd:flex-row xmd:gap-8 gap-4">
                            <div className="left-block grid grid-cols-1 sm:grid-cols-2 md:gap-8 gap-4 w-full">
                                {intelligences?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-start items-start bg-white border border-solid border-black-200 md:p-6 p-4 gap-3"
                                    >
                                        <div className="icon w-[18px] h-[28px] flex-shrink-0">
                                            <Image
                                                src="/media/tick-svggreen.svg"
                                                width={18}
                                                height={28}
                                                alt="tick"
                                            />
                                        </div>

                                        <div className="content space-y-2">
                                            <h3 className="text-body font-bold font-inter heading flex-1">
                                                {item.intelligenceHeading}
                                            </h3>

                                            {item.description && (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: extractHTML(
                                                            item.description.root?.children as SerializedLexicalNode[]
                                                        ),
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
