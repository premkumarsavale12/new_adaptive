"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  label: string;
  Url?: string;
  target?: "_self" | "_blank";
};

type Props = {
  tabs?: Tab[];
};

export default function ToolTab({ tabs = [] }: Props) {
  const pathname = usePathname();

  return (
    <div className="tab-main bg-dots_bg xxl:pt-[193px] md:pt-[170px] pt-[150px]">
      <div className="container">
        <div className="tabs-container mx-auto">
          <div className="tab-list flex justify-start items-center xl:gap-[100px] lg:gap-[60px] md:gap-8 gap-4 lg:overflow-x-hidden overflow-x-auto no-scrollbar lg:whitespace-pre-wrap whitespace-nowrap">
            {tabs.map((tab, index) => {
              if (!tab.Url) return null;

              const isActive = pathname === tab.Url;

              return (
                <Link
                  key={index}
                  href={tab.Url}
                  target={tab.target || "_self"}
                  prefetch
                  className={`tab-button1 p-4 text-lg font-inter font-medium text-black transition-all duration-300 ease-in-out
                    ${isActive ? "bg-[#eea7df4d]" : ""}
                  `}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
