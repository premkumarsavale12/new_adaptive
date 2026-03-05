import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type PayloadRichText = DefaultTypedEditorState | null

interface FactorAnalysisSub {
    title?: PayloadRichText
}

interface BasketItem {
    title: string
    desc?: PayloadRichText
}

interface UnderStandingAdaptiveProps {
    title?: PayloadRichText
    factor_analysis_desc?: PayloadRichText
    factor_analysis_sub?: FactorAnalysisSub[]
    basket_title?: PayloadRichText
    basket?: BasketItem[]
}

export const UnderStandingAdaptive: React.FC<UnderStandingAdaptiveProps> = ({ title, factor_analysis_desc, factor_analysis_sub, basket_title, basket }) => {


    return (
        <section className="t-section factor-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b-[1px] border-b-black-200 border-b-solid">
            <div className="container">
                <div className="inner md:space-y-[48px] space-y-6">
                    <div className="top text-left md:space-y-8 space-y-6">
                        {/* Title */}
                        {title && (
                            <div className="title flex justify-start items-start">
                                <h2 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-[0] before:opacity-20 before:z-0 text-black">
                                    <RichText data={title} enableGutter={false} enableProse={false} className="m-0 relative z-10" />
                                </h2>
                            </div>
                        )}

                        {/* Description */}
                        {factor_analysis_desc && (
                            <div className="text text-body font-inter font-normal text-black-300 space-y-4">
                                <RichText data={factor_analysis_desc} enableGutter={false} enableProse={false} />
                            </div>
                        )}

                        {/* Bullet Points */}
                        <ul className="[&_li]:pl-6 [&_li]:relative [&_li]:before:content-[''] [&_li]:before:w-[10px] [&_li]:before:h-[10px] [&_li]:before:bg-black-200 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[6px] [&_li]:before:rounded-full space-y-2">
                            {factor_analysis_sub?.map((item, index) => (
                                <li key={index} >
                                    {item.title && (
                                        <RichText data={item.title} enableGutter={false} enableProse={false} className="inline-block" />
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Basket */}
                        <div className="basket md:space-y-8 space-y-6">
                            {basket_title && (
                                <p className="text-h5 font-bold">
                                    <RichText data={basket_title} enableGutter={false} enableProse={false} className="m-0" />
                                </p>
                            )}

                            <div className="basket-block grid md:grid-cols-2 grid-cols-1 gap-4">
                                {basket?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="b-block flex flex-col space-y-4 p-8 bg-white-100"
                                    >
                                        <span className="text-h5 font-[600]">
                                            {item.title}
                                        </span>

                                        {item.desc && (
                                            <div>
                                                <RichText data={item.desc} enableGutter={false} enableProse={false} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
