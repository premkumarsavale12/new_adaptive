import React from "react";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import {
  SerializedLexicalNode,
} from "lexical";
import RichText from "@/components/RichText";

const extractTextFromLexical = (
  nodes?: SerializedLexicalNode[]
): string => {
  if (!nodes) return "";

  let text = "";

  for (const node of nodes) {
    // Paragraphs, headings, list items
    if ("children" in node && Array.isArray(node.children)) {
      text += extractTextFromLexical(node.children);
    }

    // Text nodes
    if ("text" in node && typeof node.text === "string") {
      text += node.text;
    }
  }

  return text;
};
interface RiskItem {
  Heading?: string;
  richText: DefaultTypedEditorState;
}

interface CategoryColumn {
  project_risk?: string;
  vix_range?: string;
  notes?: string;
}

interface WhatIsProjectRiskProps {
  Heading?: string;
  richText: DefaultTypedEditorState;
  descritpion: DefaultTypedEditorState;
  Items?: RiskItem[];
  Category?: CategoryColumn[];
  descrip: DefaultTypedEditorState,
}

export const What_is_project_risk: React.FC<WhatIsProjectRiskProps> = ({ Heading, descritpion, Items, Category, descrip }) => {

  return (
    <section className="t-section riskvalue-section bg-white-100 lg:py-[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b border-b-black-200">
      <div className="container">
        <div className="inner space-y-8">

          {/* ===== TOP CONTENT ===== */}
          <div className="top text-black text-left space-y-8">
            <div className="title flex justify-start items-start">
              {Heading && (
                <h2
                  className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-0 before:opacity-20 before:z-0"
                  dangerouslySetInnerHTML={{ __html: Heading }}
                />
              )}
            </div>

            <div className="text text-body font-inter font-normal space-y-4">
              {descritpion && <RichText className="mb-0" data={descritpion} enableGutter={false} />}
            </div>

          </div>

          {/* ===== RISK ITEMS ===== */}
          <div className="risk-block space-y-4 font-inter font-normal">
            {Items?.map((measure, measureIndex) => (
              <div className="r-block" key={measureIndex}>
                {measure?.Heading && (
                  <h3
                    className="text-h5 font-bold pl-6 relative before:content-[''] before:w-[10px] before:h-[10px] before:bg-green before:rounded-full before:absolute before:top-2 before:left-0"
                    dangerouslySetInnerHTML={{ __html: measure.Heading }}
                  />
                )}

                <div>
                  {extractTextFromLexical(measure.richText?.root?.children)}
                </div>
              </div>
            ))}
          </div>

          {/* ===== CATEGORY TABLE ===== */}
          {Array.isArray(Category) && Category.length > 0 && (
            <div className="definition space-y-8 font-inter font-normal">
              <div className="lg:w-[60%] w-full overflow-x-auto">
                <table className="md:w-full md:max-w-none max-w-[600px] text-left">
                  <thead className="bg-[#ededed]">
                    <tr>
                      <th className="p-3 font-medium">Project Risk</th>
                      <th className="p-3 font-medium">VIX Range</th>
                      <th className="p-3 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Category.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td className="border p-3">{row.project_risk}</td>
                        <td className="border p-3">{row.vix_range}</td>
                        <td className="border p-3">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div>
            {extractTextFromLexical(descrip?.root?.children)}
          </div>


        </div>
      </div>
    </section>
  );
};

export default What_is_project_risk;
