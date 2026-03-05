import React from "react";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";

interface Tailored_downsideProps {
  Items?: {
    Heading?: string;
    richText: DefaultTypedEditorState;
  }[];
}

export const Tailored_downside: React.FC<Tailored_downsideProps> = ({ Items }) => {
  if (!Items || Items.length === 0) return null;

  return (
    <section className="tools-section lg:py-[150px] md:py-[80px] py-[50px] w-full bg-dots_bg bg-cover bg-center bg-no-repeat border-y border-black-200">
      <div className="container">
        <div className="inner lg:space-y-[100px] md:space-y-16 space-y-6">

          {Items.map((item, i) => (
            <div className="top text-black text-left space-y-6" key={i}>

              {item.Heading && (
                <div className="title flex justify-start items-start">
                  <h2 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] before:left-[-16px] before:opacity-20 before:z-0">
                    {item.Heading}
                  </h2>
                </div>
              )}

              <div className="text text-body font-inter font-normal text-black-100">
                {item.richText && <RichText data={item.richText} />}
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
