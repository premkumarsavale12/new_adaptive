import RichText from "@/components/RichText";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import React from "react";

interface Adaptive_PortfolioProps {

    title: string,
    description: DefaultTypedEditorState,
    ProtectionLevels?:
    {
        title?: string,
        content: DefaultTypedEditorState,

    }[],

    conclusion?: DefaultTypedEditorState,


}

export const Adaptive_Portfolio: React.FC<Adaptive_PortfolioProps> = ({ title, description, ProtectionLevels, conclusion }) => {

    return (

        <>

            <section className="tools-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full bg-dots_bg bg-cover bg-center bg-no-repeat border-b-[1px] border-b-black-200 border-b-solid border-t-[1px] border-t-black-200 border-t-solid">
                <div className="container">
                    <div className="inner">
                        <div className="tool-content font-inter space-y-8">
                            <div className="text-h5">
                                <p>
                                    <strong dangerouslySetInnerHTML={{ __html: title }}></strong>
                                </p>
                            </div>
                            <div
                                className="text-black-300 space-y-4"

                            >
                                {description && <RichText className="mb-0" data={description} enableGutter={false} />}</div>
                            <ul className="text-gray-600 space-y-4 relative [&_li]:relative [&_li]:pl-6 [&_li]:before:content-[''] [&_li]:before:w-2 [&_li]:before:h-2 [&_li]:before:bg-gray-400 [&_li]:before:rounded-full [&_li]:before:absolute [&_li]:before:top-[7px] [&_li]:before:left-0 [&_li]:before:z-0">
                                {ProtectionLevels?.map((level, index) => (
                                    <li key={index}>
                                        <strong

                                        > {level.title} </strong>
                                        <br />

                                        <div>
                                            {level.content && <RichText className="mb-0" data={level.content} enableGutter={false} />}</div>

                                    </li>
                                ))}
                            </ul>
                            {/* {conclusion && (
                                <div>
                                    <RichText data={conclusion} />
                                </div>
                            )} */}
                            <div>
                                {conclusion && <RichText className="mb-0" data={conclusion} enableGutter={false} />}</div>


                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}