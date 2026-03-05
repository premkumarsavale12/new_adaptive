import RichText from "@/components/RichText";
import { Media } from "@/payload-types"
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"
import Image from "next/image";

interface EnterPrise_SoluctionProps {

    Heading?: string,

    richText: DefaultTypedEditorState,

    Items?:
    {
        Heading?: string,

        Title?: string,

        richText: DefaultTypedEditorState,
        image?: Media


    }[],
}

export const Enterprise_Soluction: React.FC<EnterPrise_SoluctionProps> = ({ Heading, richText, Items }) => {

    return (

        <>

            <section className="tools-section lg:py-[100px] md:py-[80px] sm:py-[50px] py-6 w-full bg-dots_bg bg-cover bg-center bg-no-repeat  border-t-[1px] border-t-black-200 border-t-solid">
                <div className="block-enterprice top container text-left">
                    <div className="title flex flex-col justify-start items-start md:space-y-8 space-y-6 md:text-left text-center">
                        <h2
                            className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-[0] before:opacity-20 before:z-0 text-black"

                        >   {Heading}  </h2>
                        {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
                    </div>
                </div>
            </section>
            <section className="tools-section">
                {Items?.map((item, i) => {
                    return (
                        <div
                            key={i}
                            className={`block-enterprice t-section w-full border-b-[1px] border-b-black-200 border-b-solid ${i % 2 !== 0 ? "md:flex-row-reverse bg-white-100" : "md:flex-row"
                                }  ${i === 0 ? "bg-dots_bg" : ""
                                } md:py-[80px] sm:py-[50px] py-6`}
                        >
                            <div className="container">
                                <div className="inner-content flex flex-col lg:space-y-16 md:space-y-10 space-y-6">
                                    <div
                                        className={`inner flex justify-center items-center lg:gap-16 gap-8 flex-col md:flex-row ${i % 2 !== 0 ? "md:flex-row-reverse" : ""
                                            }`}
                                    >
                                        <div className="left md:w-1/2 w-full space-y-4">
                                            <h3
                                                className="text-h3 font-semibold"

                                            > {item.Heading} </h3>
                                            <div className="space-y-2">
                                                <p>
                                                    <b

                                                    >    {item.Title}  </b>
                                                </p>
                                                {item.richText && <RichText className="mb-0" data={item.richText} enableGutter={false} />}
                                            </div>
                                        </div>
                                        <div className="right md:w-1/2 w-full xsm:px-12 px-0 flex justify-start">

                                            {item.image?.url && (
                                                <Image
                                                    width={434}
                                                    height={416}
                                                    src={item.image.url}
                                                    alt={item.image.alt || "Description of the image"}
                                                    role="img"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </>
    )
}

