import RichText from "@/components/RichText";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import React from "react";

interface Adaptive_FactorProps {

  Heading?: string,
  richText: DefaultTypedEditorState,
  SubHeading?: string,
  Items?:
  {
    Heading?: string,

  }[],
}


export const Adaptive_Factor: React.FC<Adaptive_FactorProps> = ({ Heading, richText, SubHeading, Items }) => {


  return (

    <>
      <section className="tools-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full bg-dots_bg bg-cover bg-center bg-no-repeat border-b-[1px] border-b-black-200 border-b-solid border-t-[1px] border-t-black-200 border-t-solid">
        <div className="container">
          <div className="inner">
            <div className="tool-content font-inter md:space-y-8 space-y-6">
              <div className="text-h3">
                <p>
                  <strong > {Heading}</strong>
                </p>
              </div>

              <div
                className="*:text-black-300 space-y-4"

              >
                {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
              </div>

              <div className="features md:space-y-8 space-y-6">
                {SubHeading && (
                  <h2
                    className="text-h3 font-ivy font-[600]"

                  >  {SubHeading}  </h2>
                )}

                <ul className="feature-list grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 [&_li]:relative [&_li]:pl-8 [&_li]:before:content-[''] [&_li]:before:w-[18px] [&_li]:before:h-[18px] [&_li]:before:absolute [&_li]:before:top-[3px] [&_li]:before:left-0 [&_li]:before:bg-tick_icon [&_li]:before:bg-cover [&_li]:before:bg-center [&_li]:before:bg-no-repeat [&_li]:text-h5 font-[600]">
                  {Items?.map((feature, index) => (
                    <li key={index}>{feature.Heading}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
} 