import RichText from "@/components/RichText";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import React from "react";
import Image from "next/image";
import Link from "next/link";




interface For_FeatureProps {

    Heading?: string,
    richText: DefaultTypedEditorState,
    Items?: {
        Image?: {
            url: string,
            alt: string,
        }

        Heading?: string,
        richText: DefaultTypedEditorState,

    }[],
    button: {
        label?: string | null;
        url?: string | null;
        target?: ('_self' | '_blank') | null;
    };

}

export const For_Feature: React.FC<For_FeatureProps> = ({ Heading, richText, Items, button }) => {

    return (
        <>

            <section className="t-section lg:py-[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-y border-black-200 bg-white-100">
                <div className="container">
                    <div className="inner-content flex flex-col space-y-8">
                        <div className="top text-black text-center w-[90%] mx-auto md:space-y-8 space-y-10">
                            <div className="title flex justify-center items-center">
                                <h2
                                    className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] before:left-[-16px] before:opacity-20 before:z-0"

                                >  {Heading}  </h2>
                            </div>
                            <div
                                className="text"

                            >     {richText && <RichText className="mb-0" data={richText} enableGutter={false} />} </div>
                        </div>

                        <div className="inner flex flex-col lg:gap-16 sm:gap-8 gap-4">
                            {Items?.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`box bg-white xsm:p-8 p-4 flex justify-start sm:gap-8 gap-6 w-full ${index % 2 === 0
                                        ? "xmd:flex-row flex-col-reverse"
                                        : "xmd:flex-row-reverse flex-col-reverse"
                                        }`}
                                >
                                    {feature.Image?.url && (
                                        <div className="xmd:w-1/2 w-full">
                                            <Image
                                                width={696}
                                                height={312}
                                                src={feature.Image?.url}
                                                alt={`key-feature image ${index + 1}`}
                                                role="img"
                                                className="w-full rounded-md xsm:h-full h-[200px] aspect-[2/1] inset-0 object-cover"
                                            />
                                        </div>

                                    )}
                                    <div className="xmd:w-1/2 w-full xmd:space-y-8 space-y-6">
                                        <div className="content font-inter flex flex-col gap-4 xmd:py-8 py-0">
                                            <span
                                                className="text-h5 font-semibold"

                                            > {feature.Heading} </span>
                                            <span

                                            >  {feature.richText && <RichText className="mb-0" data={feature.richText} enableGutter={false} />}  </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}

                        {button?.label && (
                            <div className="flex justify-center">
                                <div className="btn-green text-center text-4">
                                    <Link href={button.url || "#"}>
                                        {button.label}
                                    </Link>
                                </div>
                            </div>
                        )}




                    </div>
                </div>
            </section>
        </>
    )
}

