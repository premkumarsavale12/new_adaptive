import React from "react";
import Image from "next/image";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Link from "next/link";

interface MeasureItem {
  Heading?: string;
  richText: DefaultTypedEditorState;
}

interface MeasureFitProps {
  Heading?: string;
  Items?: MeasureItem[];
  Image?: {
    url: string;
    alt: string;
  };
  button: {
    label?: string
    url?: string
    target?: string
  }
}

export const Measure_Fit: React.FC<MeasureFitProps> = ({
  Heading,
  Items,
  Image: imageData,
  button,
}) => {
  return (
    <section className="t-section factor-section lg:py-[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b border-black-200">
      <div className="container">
        <div className="inner md:space-y-[48px] space-y-6">
          {/* Top Section */}
          {Heading && (
            <div className="top text-left space-y-8">
              <div className="title flex justify-start items-start">
                <h2 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-0 before:opacity-20 before:z-0 text-black">
                  {Heading}
                </h2>
              </div>
            </div>
          )}

          {/* Bottom Section */}
          <div className="btm-column flex md:gap-[48px] gap-8 xmd:flex-row flex-col-reverse">
            {/* Left */}
            <div className="btm-col-left flex flex-col space-y-8 xmd:w-1/2 w-full">
              <div className="btm-col-main space-y-6">
                {Items?.map((item, index) => (
                  <div key={index} className="measure-item space-y-2">
                    {item.Heading && (
                      <h3 className="relative before:content-[''] before:w-[10px] before:h-[10px] before:bg-green text-h5 font-semibold text-black pl-5 before:absolute before:left-0 before:top-[10px] before:rounded-full">
                        {item.Heading}
                      </h3>
                    )}

                    <div className="text-body font-inter text-black-300">
                      {item.richText && <RichText data={item.richText} />}
                    </div>
                  </div>
                ))}

              </div>
              {button?.label && button?.url && (
                <Link
                  href={button.url}
                  target={button.target || "_self"}
                  className="inline-block"
                >
                  <span className="btn-pink bg-green font-overpass font-medium text-black text-body px-6 py-3 border-solid border-[1.5px] border-transparent hover:bg-transparent hover:border-green transition-all duration-300 ease-in-out cursor-pointer">
                    {button.label}
                  </span>
                </Link>
              )}
            </div>

            {/* Right */}
            {imageData?.url && (
              <div className="btm-col-right xmd:w-1/2 w-full h-full">
                <Image
                  src={imageData.url}
                  alt={imageData.alt || "Measure image"}
                  width={712}
                  height={391}
                  className="w-full h-full object-cover"
                />
              </div>
            )}


          </div>
        </div>
      </div>
    </section>
  );
};

export default Measure_Fit;
