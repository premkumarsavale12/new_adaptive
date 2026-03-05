import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Media } from "@/payload-types";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";

interface UnderstandingRiskProps {
  Heading?: string;

  description?: DefaultTypedEditorState;

  button?: {
    label?: string;
    url?: string;
    target?: "_self" | "_blank";
  };

  content?: DefaultTypedEditorState;
  image?: Media;

  SubHeading?: string;
  richText?: DefaultTypedEditorState;
  list?: DefaultTypedEditorState;
  bottomdescription?: DefaultTypedEditorState;
}

export const Understanding_Risk: React.FC<UnderstandingRiskProps> = ({
  Heading,
  description,
  button,
  content,
  image,
  SubHeading,
  richText,
  list,
  bottomdescription,
}) => {
  return (
    <section className="t-section forecast-section lg:py-[150px] md:py-[80px] sm:py-[50px] py-6 h-full">
      <div className="container">
        <div className="inner">
          {/* Top Section */}
          <div className="timeline-top w-full">
            <div className="t-left w-full">
              {Heading && (
                <h2 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] before:left-[-16px] before:opacity-20 before:z-0 md:mb-8 mb-6">
                  {Heading}
                </h2>
              )}

              <div className="content flex justify-start items-center md:gap-8 gap-4 flex-col lg:flex-row">
                <div className="t-left lg:w-[85%] w-full">
                  {description && (
                    <RichText
                      className="text font-inter text-black-100 font-normal  text-body"
                      data={description}

                    />
                  )}
                </div>

                {button?.url && button?.label && (
                  <div className="t-right lg:w-[15%] w-full flex justify-start lg:justify-end items-end">
                    <Link
                      href={button.url}
                      target={button.target ?? "_self"}
                      className="btn-green text-[18px]"

                    >
                      {button.label}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mid Section */}
          <div className="timeline-mid flex justify-start items-start lg:gap-16 md:gap-8 gap-6 flex-col lg:flex-row mt-4">
            <div className="time-left lg:w-[50%] w-full space-y-4">
              {content && (
                <RichText
                  data={content}

                />
              )}
            </div>

            {image?.url && (
              <div className="time-right lg:w-[50%] w-full">
                <Image
                  src={image.url}
                  alt={image.alt ?? "Forecast image"}
                  className="w-full h-auto lg:aspect-[2/1] inset-0 aspect-auto object-cover"
                  width={712}
                  height={420}
                />
              </div>
            )}
          </div>

          <div className="timeline-btm font-inter font-normal lg:mt-16 md:mt-12 mt-8">
            <div className="top mb-5">
              <div className="title relative">
                <h3
                  className="title-head text-h3 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-0 after:h-[20px] after:bg-bg_line2 after:bg-center after:bg-cover after:bg-no-repeat after:transition-all after:duration-500 transition-all duration-300 ease-in-out font-bold after:w-[180px]"

                >   {SubHeading}    </h3>
              </div>
            </div>

            <div className="text space-y-4 text-black-100">
              {richText && <RichText className="mb-0" data={richText} />}
              <div className="box bg-black-200 p-6">
                <div className="list-b [&_ul>li]:list-disc w-fit mx-auto">

                  {list && <RichText className="mb-0" data={list} />}
                </div>
              </div>
              {bottomdescription && <RichText className="mb-0" data={bottomdescription} />}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
