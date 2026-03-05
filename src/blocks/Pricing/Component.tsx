"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import RichText from "@/components/RichText";

interface PricingHeader {
    plan_title: string;
    plan_description?: DefaultTypedEditorState,
    cta_text: string;
}

interface PricingFeature {
    feature_name: string;
    feature_hover_name?: string,
    investor_plan?: string,
    advisor_plan?: string,
    advisor_pro_plan?: string,
}

interface PricingGroup {
    headers?: PricingHeader[];
    features?: PricingFeature[];
}

interface PricingProps {
    pricing_main_title: string;
    pricing_description?: DefaultTypedEditorState,
    monthly?: PricingGroup;
    yearly?: PricingGroup;
}

export const Pricing: React.FC<PricingProps> = ({
    pricing_main_title,
    pricing_description,
    monthly,
    yearly,
}) => {
    const [isYearly, setIsYearly] = useState(false);

    const activeHeaders = isYearly ? yearly?.headers : monthly?.headers;
    const activeFeatures = isYearly ? yearly?.features : monthly?.features;

    return (
        <section className="tools-section lg:py-[150px] md:py-[80px] sm:py-[50px] py-6 w-full bg-dots_bg bg-cover bg-center bg-no-repeat border-b-[1px] border-b-black-200 border-b-solid border-t-[1px] border-t-black-200 border-t-solid">
            <div className="container">
                <div className="inner-content flex flex-col lg:space-y-16 md:space-y-10 space-y-6">

                    {/* Heading */}
                    <div className="top text-black text-center w-[90%] mx-auto md:space-y-8 space-y-10">
                        <div className="title flex justify-center items-center">
                            <h2
                                className="text-h1 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] before:left-[-16px] before:opacity-20 before:z-0"
                                dangerouslySetInnerHTML={{ __html: pricing_main_title }}
                            />
                        </div>
                        {pricing_description && <RichText className="text-h3" data={pricing_description} enableGutter={false} />}
                    </div>

                    {/* Toggle Switch  */}
                    <div className="inner flex justify-center items-center">
                        <div className="w-full">

                            <div className="flex justify-center max-w-[14rem] mx-auto mb-8">
                                <div className="relative flex w-full p-1 rounded-md border-2 border-black">

                                    <span className="absolute inset-0 m-1 pointer-events-none">

                                        <span
                                            className={`absolute inset-0 w-1/2 shadow-sm transform transition-transform duration-200 ease-in-out ${isYearly ? "translate-x-full" : "translate-x-0"}`}
                                            style={{ backgroundColor: "black" }}
                                        />
                                    </span>

                                    <button
                                        onClick={() => setIsYearly(false)}
                                        className={`relative flex-1 font-medium p-3 text-center transition-colors duration-150 ease-in-out ${!isYearly ? "text-white" : "text-black"}`}
                                    >
                                        Monthly
                                    </button>

                                    <button
                                        onClick={() => setIsYearly(true)}
                                        className={`relative flex-1 font-medium p-3 text-center transition-colors duration-150 ease-in-out ${isYearly ? "text-white" : "text-black"}`}
                                    >
                                        Yearly
                                    </button>
                                </div>
                            </div>

                            {/* Pricing Table */}
                            <div className="overflow-x-auto feature-table">
                                <table className="w-[1000px] xlg:w-full border border-gray-300 text-sm text-center">
                                    <thead className="text-black" >
                                        <tr>
                                            <th className="border border-gray-300 px-6 py-3 text-left !bg-white font-semibold font-ivy xxl:text-h2 text-h3">
                                                Features
                                            </th>

                                            {activeHeaders?.map((h, idx) => (
                                                <th key={idx} className="border border-gray-300 px-6 py-3 !bg-white font-semibold text-center space-y-4">
                                                    <div className="font-bold font-ivy xxl:text-h2 text-h3">{h.plan_title}</div>
                                                    {h.plan_description && (
                                                        <div className="text-p">   {h.plan_description && <RichText className="mb-0" data={h.plan_description} enableGutter={false} />}</div>
                                                    )}
                                                    <Link href="/" className="btn-green block w-full text-center mt-auto font-medium text-p">
                                                        {h.cta_text}
                                                    </Link>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {activeFeatures?.map((f, idx) => (
                                            <tr key={idx}>
                                                <td className="border px-6 py-3 text-left font-medium text-p">
                                                    <div className="relative  gap-1 w-fit">
                                                        <span

                                                            data-tooltip-id={`tooltip-${idx}`}
                                                            data-tooltip-content={f.feature_hover_name}
                                                            aria-label={`More info about ${f.feature_name}`}
                                                            className=" align-middle"
                                                            dangerouslySetInnerHTML={{ __html: f.feature_name }}   ></span>
                                                        {f.feature_hover_name && (
                                                            <>
                                                                <span
                                                                    data-tooltip-id={`tooltip-${idx}`}
                                                                    data-tooltip-content={f.feature_hover_name}
                                                                    aria-label={`More info about ${f.feature_name}`}

                                                                    className="text-[10px] text-white rounded-full  bg-black w-4 h-4  ml-1 align-middle inline-flex justify-center items-center cursor-pointer"
                                                                >
                                                                    i
                                                                </span>
                                                                <ReactTooltip
                                                                    id={`tooltip-${idx}`}
                                                                    content={f.feature_hover_name}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </td>

                                                {(["investor_plan", "advisor_plan", "advisor_pro_plan"] as const).map(
                                                    (key, i) => (
                                                        <td key={i} className="border px-6 py-3 text-p">
                                                            {f[key] === "TRUE" && (
                                                                <Image src="/media/list-tick.svg" width={24} height={24} alt="yes" className="mx-auto" />
                                                            )}
                                                            {f[key] === "FALSE" && (
                                                                <Image src="/media/close.svg" width={24} height={24} alt="no" className="mx-auto" />
                                                            )}
                                                            {f[key] !== "TRUE" && f[key] !== "FALSE" && f[key]}
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        ))}

                                        {/* Bottom CTA */}
                                        <tr>
                                            <td className="border px-6 py-3 text-left font-medium text-p" />
                                            {activeHeaders?.map((h, idx) => (
                                                <td key={idx} className="border px-6 py-3 text-left font-medium text-p">
                                                    <Link href="/" className="btn-green block w-full text-center mt-auto font-medium text-p ">
                                                        {h.cta_text}
                                                    </Link>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </section>
    );
};
