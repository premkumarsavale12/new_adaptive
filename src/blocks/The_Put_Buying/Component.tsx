import RichText from "@/components/RichText";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import React from "react";

interface The_Put_BuyingProps {

    Heading?: string,
    Items?:
    {
        Heading?: string,
        richText: DefaultTypedEditorState,


    }[],

    richText: DefaultTypedEditorState,
}

export const The_Put_Buying: React.FC<The_Put_BuyingProps> = ({ Heading, Items, richText }) => {

    return (

        <>

            <section className="t-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b-[1px] border-b-black-200 border-b-solid">
                <div className="container">
                    <div className="inner md:space-y-[48px] space-y-6">
                        <div className="top text-left md:space-y-8 space-y-6 font-inter">
                            <div className="title flex justify-start items-start">
                                <h2 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-[0] before:opacity-20 before:z-0 text-black">
                                    {Heading}
                                </h2>
                            </div>

                            <div className="basket md:space-y-8 space-y-6">
                                <div className="basket-block grid md:grid-cols-2 grid-cols-1 lg:gap-16 md:gap-8 gap-4">
                                    {Items?.map((section, index) => (
                                        <div
                                            key={index}
                                            className="b-block flex flex-col space-y-4 md:p-8 sm:p-6 p-4 bg-white-100"
                                        >
                                            <span className="text-h5 font-[600]">
                                                {section.Heading}
                                            </span>
                                            <div className="para space-y-4">
                                                <div

                                                >     {section.richText && <RichText className="mb-0" data={section.richText} enableGutter={false} />} </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="font-inter text-black font-bold [&_*]:text-black [&_strong]:font-extrabold [&_p]:font-bold">
                                {richText && (
                                    <RichText
                                        className="mb-0"
                                        data={richText}
                                        enableGutter={false}
                                    />
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
} 
