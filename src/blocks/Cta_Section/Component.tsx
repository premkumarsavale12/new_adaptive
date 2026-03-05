"use client";

import React from "react";
import Link from "next/link";
import RichText from "@/components/RichText";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

interface Cta_SectionProps {
    ctaHeading?: string;
    descrip?: DefaultTypedEditorState;
    button?: {
        label?: string;
        url?: string;
        target?: "_self" | "_blank" | null;
    };
}

export const Cta_Section: React.FC<Cta_SectionProps> = ({ ctaHeading, descrip, button }) => {

    const showCTA = Boolean(ctaHeading);

    return (
        <>
            <section className="tools-section lg:py[150px] py-[80px] w-full bg-dots_bg bg-cover bg-center bg-no-repeat">
                <div className="container">
                    <div className="md:space-y-8 space-y-4 max-w-[1024px] mx-auto">
                        {showCTA && (
                            <div className="sub-box py-8 space-y-8 flex flex-col justify-center items-center">

                                <h2
                                    className="text-h2 font-ivy font-semibold relative text-center"
                                    dangerouslySetInnerHTML={{ __html: ctaHeading ?? "" }}
                                />

                                {descrip && (
                                    <RichText data={descrip} enableGutter={false} />
                                )}

                                {button?.url && (
                                    <div className="btn-green *:text-4">
                                        <Link
                                            href={button.url}
                                            target={button.target ?? "_self"}
                                        >
                                            {button.label}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
