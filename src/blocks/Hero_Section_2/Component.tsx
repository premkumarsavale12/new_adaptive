import RichText from "@/components/RichText";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import Link from "next/link";
import React from "react";

interface Hero_Section_2Props {
    Heading?: string,
    richText: DefaultTypedEditorState,
    button1?: string,
    Url1?: string,
    target1?: ('_self' | '_blank'),
    button2?: string,
    Url2?: string,
    target2?: ('_self' | '_blank'),
}

export const Hero_Section_2: React.FC<Hero_Section_2Props> = ({ Heading, richText, button1, Url1, target1, button2, Url2, target2 }) => {

    return (

        <>
            <section className="hero-section pt-[100px]">
                <div className="container">
                    <div className="inner pt-[18px] lg:pt-0">
                        <div className="inner-content flex flex-col lg:flex-row lg:space-y-0 space-y-[56px]">
                            <div className="hero-left px-2 lg:px-8 py-6 sm:py-[70px] lg:py-[100px] xl:py-[130px] w-full flex justify-start flex-col items-start text-left">
                                <div className="hero-text sm:space-y-8 space-y-4 text-h5 font-inter text-black-100">
                                    <h1
                                        className="text-h1 text-black font-ivy font-semibold"

                                    > {Heading} </h1>

                                    {richText && (
                                        <RichText
                                            className="mb-0 text-[19.9538px]"
                                            data={richText}
                                            enableGutter={false}
                                        />
                                    )}

                                </div>
                                <div className="button-area flex flex-wrap justify-start items-start lg:gap-12 gap-4 lg:mt-16 md:mt-8 mt-4">
                                    {button1 && Url1 && (
                                        <div className={`btn-link *:text-4`}>
                                            <Link href={Url1} target={target1}>
                                                {button1}
                                            </Link>
                                        </div>
                                    )}

                                    {/* Button 2 with Dynamic Color */}
                                    {button2 && Url2 && (
                                        <div className={`btn-green *:text-4`}>
                                            <Link href={Url2} target={target2}>
                                                {button2}
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )

}
