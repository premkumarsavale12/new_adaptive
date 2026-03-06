import RichText from "@/components/RichText"
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"
import Image from "next/image"

interface CoveredProps {
    Heading?: string,
    richText: DefaultTypedEditorState,
    SubHeading?: string,

    Items?: {

        Heading?: string,

    }[],

    Image?: {
        url: string,
        alt: string
    }

}

export const Covered: React.FC<CoveredProps> = ({ Heading, richText, SubHeading, Items, Image: coverImage }) => {


    return (

        <>
            <section className="tools-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full bg-dots_bg bg-cover bg-center bg-no-repeat border-b-[1px] border-b-black-200 border-b-solid border-t-[1px] border-t-black-200 border-t-solid">
                <div className="container">
                    <div className="inner">
                        <div className="tool-content font-inter md:space-y-8 space-y-6">
                            <div className="md:text-h3 text-h4">
                                <p>
                                    <strong>   {Heading} </strong>
                                </p>
                            </div>

                            <div
                                className="*:text-black-300"

                            >      {richText && <RichText data={richText} enableGutter={false} enableProse={false}
                                className="mb-1" />}     </div>
                            <div className="features">
                                <div className="flex xl:gap-16 gap-8 lg:flex-row flex-col">
                                    <div className="md:space-y-8 space-y-6 lg:w-[50%] w-full">
                                        <h2 className="text-h3 font-ivy font-[600]">{SubHeading}</h2>
                                        <ul
                                            className="feature-list flex flex-col gap-4 [&_li]:relative [&_li]:pl-8 [&_li]:before:content-[''] [&_li]:before:w-[18px] [&_li]:before:h-[18px] [&_li]:before:absolute [&_li]:before:top-[3px] [&_li]:before:left-0 [&_li]:before:bg-tick_icon [&_li]:before:bg-cover [&_li]:before:bg-center [&_li]:before:bg-no-repeat [&_li]:text-h5 font-[600]"
                                        // dangerouslySetInnerHTML={{ __html: subdescription }}
                                        >
                                            {Items?.map((item, i) => (
                                                <li key={i}>{item.Heading}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    {coverImage?.url && (
                                        <div className="lg:w-[50%] w-full">

                                            <Image
                                                src={coverImage.url}
                                                alt="graph"
                                                role="img"
                                                width={712}
                                                height={518}
                                                className="w-full h-full object-cover"
                                            />

                                        </div>
                                    )}
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}