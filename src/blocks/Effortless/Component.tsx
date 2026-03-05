import RichText from "@/components/RichText";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import React from "react";
import Image from 'next/image';

interface EffortlessProps {
  Heading?: string;
  richText: DefaultTypedEditorState;
  SubHeading?: string;
  Items?: {
    Heading?: string;
    richText: DefaultTypedEditorState;
  }[];
  SubrichText?: DefaultTypedEditorState;
}

export const Effortless: React.FC<EffortlessProps> = ({
  Heading,
  richText,
  SubHeading,
  Items,
  SubrichText,
}) => {
  return (
    <section className="t-section work-section lg:py[150px] md:py-[80px] py-[50px] w-full border-b-[1px] border-b-black-200 border-b-solid">
      <div className="container">
        <div className="inner md:space-y-[48px] space-y-6">
          {/* Top Section */}
          <div className="top text-black text-left md:space-y-[48px] space-y-6">
            {Heading && (
              <div className="title flex justify-start items-start">
                <h2 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-[0] before:opacity-20 before:z-0">
                  {Heading}
                </h2>
              </div>
            )}

            {richText && (
              <div className="text text-body font-inter font-normal text-black-100">
                <RichText data={richText} enableGutter={false} />
              </div>
            )}
          </div>

          {/* Items Section */}
          <div className="space-y-8">
            {SubHeading && (
              <h3 className="title-head text-h3 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-0 after:h-[20px] after:bg-bg_line2 after:bg-center after:bg-cover after:bg-no-repeat after:transition-all after:duration-500 transition-all duration-300 ease-in-out font-bold after:w-[180px]">
                {SubHeading}
              </h3>
            )}

            <div className="work-area flex justify-start items-stretch sm:gap-8 gap-4 flex-wrap *:w-full *:sm:w-[calc(50%-16px)] *:xlg:w-[calc(33%-24px)] ">
              {Items?.map((item, i) => (
                <div
                  key={i}
                  className="work-block flex justify-start items-start gap-[10px]"
                >
                  {/* <div className="indicator-icon mt-[5px]">

                    <img
                       src="/media/greenicon.svg"
       
                      alt="indicator"
                      className="w-4 h-4"
                    />
                  </div> */}

                  <div className="indicator-icon mt-[5px]  w-[5%]">
                    <Image
                      src="/media/greenicon.svg"
                      alt="indicator"
                      width={16}
                      height={16}

                    />
                  </div>

                  <div className="content w-[95%]">
                    {item.Heading && (
                      <h3 className="text-h5 font-bold font-inter mb-[10px]">
                        {item.Heading}
                      </h3>
                    )}

                    {item.richText && (
                      <RichText
                        data={item.richText}
                        enableGutter={false}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Rich Text */}
          {SubrichText && (
            <div className="text text-body font-inter text-black-100">
              <RichText data={SubrichText} enableGutter={false} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
