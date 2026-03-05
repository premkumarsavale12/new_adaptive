"use client";

import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import Image from "next/image";
import React from "react";
import type { Media } from "@/payload-types";
import RichText from "@/components/RichText";

interface The_Call_WritingProps {
    title?: string;
    des?: DefaultTypedEditorState;
    measures?: {
        item_title?: string;
        item_desc?: DefaultTypedEditorState;
        description?: DefaultTypedEditorState;
    }[];
    buttonTitle?: {
        title?: string | null;
        url?: string | null;
        target?: "_self" | "_blank" | null;
    };
    imageSrc?: Media;
      borderBlack: string
}

export const The_Call_Writing: React.FC<The_Call_WritingProps> = ({
    title,
    des,
    measures,
    imageSrc,
      borderBlack,
}) => {
    return (
        <section className="t-section factor-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b-[1px] border-b-black-200 border-b-solid">
            <div className="container">
                <div className="inner md:space-y-[48px] space-y-6">
                    <div className="top text-left space-y-8">
                        <div className="title flex justify-start items-start">
                            {title && (
                                <h2
                                    className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-[0] before:opacity-20 before:z-0 text-black"

                                > {title} </h2>
                            )}
                        </div>

                        {des && (
                            <div
                                className="text text-body font-inter font-normal text-black-300 space-y-4"
                            >   {des && <RichText className="mb-0" data={des} enableGutter={false} />}  </div>

                        )}
                    </div>

                    <div className="btm-column flex md:gap-[48px] gap-8 xmd:flex-row flex-col-reverse">
                        <div className="btm-col-left flex flex-col justify-start items-start space-y-8 xmd:w-1/2 w-full">
                            <div className="btm-col-main space-y-6">
                                {measures?.map((measure, index) => (
                                    <div key={index} className="measure-item space-y-2">
                                        <h3 className="relative before:content-[''] before:w-[10px] before:h-[10px] before:bg-green text-h5 font-semibold text-black pl-5 before:absolute before:top-0 before:left-0 before:rounded-full before:mt-[11px]">
                                            {measure.item_title}
                                        </h3>

                                        {measure.item_desc && (
                                            <div>  {measure.item_desc && <RichText className="mb-0" data={measure.item_desc} enableGutter={false} />}  </div>


                                        )}

                                        {measure.description && (
                                            <div>  {measure.description && <RichText className="mb-0" data={measure.description} enableGutter={false} />}   </div>


                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {imageSrc?.url && (
                            <div  className={`btm-col-right xmd:w-1/2 w-full ${borderBlack && "border border-solid border-black"
                } p- h-full`}>
                                <Image
                                    src={imageSrc.url}
                                    alt={imageSrc.alt ?? ""}
                                    width={712}
                                    height={391}
                                    role="img"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};
