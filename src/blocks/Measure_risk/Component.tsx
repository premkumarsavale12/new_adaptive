import RichText from "@/components/RichText";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import React from "react";
import Image from "next/image";


interface Measure_riskProps {
    Heading?: string,

    richText: DefaultTypedEditorState

    Items?: {
        Image?: {
            url: string,
            alt: string,
            src: string,

        },

        Heading?: string,
        richText: DefaultTypedEditorState
    }[],

}


export const Measure_risk: React.FC<Measure_riskProps> = ({ Heading, richText, Items }) => {


    return (


        <>

            <section className="t-section measure-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b-[1px] border-b-black-200 border-b-solid bg-white-100">
                <div className="container">
                    <div className="inner md:space-y-8 space-y-6">
                        <div className="top text-left md:space-y-8 space-y-6">
                            <div className="title flex justify-center items-center text-center">
                                <h2
                                    className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-[0] before:opacity-20 before:z-0 text-black"

                                >   {Heading}   </h2>
                            </div>
                            <div
                                className="text-center text-body font-inter font-normal text-black-300 space-y-4"

                            >      {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}   </div>
                        </div>

                        <div className="measure-card-block flex gap-8 flex-wrap">
                            {Items?.map((measure, i) => (
                                <div key={i} className="m-card md:w-[calc(50%-20px)] w-full">

                                    {measure.Image?.url && (
                                        <Image
                                            width={725}
                                            height={310}
                                            src={measure.Image.url}
                                            alt={measure.Image.alt || "measure card image"}
                                            role="img"
                                            className="mb-8 lg:aspect-[2/1] aspect-auto inset-0"
                                        />
                                    )}

                                    <h3
                                        className="text-h3 font-bold mb-4"

                                    >  {measure.Heading}   </h3>
                                    <div

                                    >      {measure.richText && <RichText className="mb-0" data={measure.richText} enableGutter={false} />}   </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


        </>

    )

}
