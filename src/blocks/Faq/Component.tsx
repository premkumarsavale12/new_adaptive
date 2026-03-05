"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import {
  SerializedLexicalNode,
} from "lexical";

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
type Props = {
  faq_title?: string;
  faq_desc?: DefaultTypedEditorState;
  categories: {
    name: string;
    posts: {
      title: string;
      content: DefaultTypedEditorState;
    }[];
  }[];
};

const FAQ_section: React.FC<Props> = ({
  faq_title,
  faq_desc,
  categories,
}) => {
  const [activeTab, setActiveTab] = useState(0);


  const [activeQuestions, setActiveQuestions] = useState<(number | null)[]>(
    categories.map(() => 0)
  );

  const [_isScrolled, setIsScrolled] = useState(false);

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabsBoxRef = useRef<HTMLDivElement | null>(null);
  const leftArrowRef = useRef<HTMLDivElement | null>(null);
  const rightArrowRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);


  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    setActiveQuestions((prev) =>
      prev.map((q, i) =>
        i !== categoryIndex ? q : q === questionIndex ? null : questionIndex
      )
    );
  };

  const iconClick = (direction: "left" | "right") => {
    const tabsBox = tabsBoxRef.current;
    if (!tabsBox) return;

    const scrollAmount = direction === "left" ? -340 : 340;
    tabsBox.scrollLeft += scrollAmount;
    handleIcons(tabsBox.scrollLeft);
  };

  const handleIcons = (scrollVal: number) => {
    const tabsBox = tabsBoxRef.current;
    if (!tabsBox) return;

    const maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;

    if (leftArrowRef.current) {
      leftArrowRef.current.style.display =
        scrollVal <= 0 ? "none" : "flex";
    }

    if (rightArrowRef.current) {
      rightArrowRef.current.style.display =
        maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 130);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(
      0,
      categories[activeTab]?.posts.length
    );
  }, [activeTab, categories]);

  useEffect(() => {
    const tabsBox = tabsBoxRef.current;
    if (!tabsBox) return;

    const handleMouseDown = () => {
      isDraggingRef.current = true;
      tabsBox.classList.add("dragging");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      tabsBox.scrollLeft -= e.movementX;
      handleIcons(tabsBox.scrollLeft);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      tabsBox.classList.remove("dragging");
    };

    tabsBox.addEventListener("mousedown", handleMouseDown);
    tabsBox.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    handleIcons(tabsBox.scrollLeft);

    return () => {
      tabsBox.removeEventListener("mousedown", handleMouseDown);
      tabsBox.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <section className="banner pt-[100px] xl:pb-[100px] lg:pb-20 md:pb-14 sm:pb-10 pb-6 bg-white-100 border-b-[1px] border-b-black-200 border-b-solid">
      <div className="relative">
        <div className="flex xmd:flex-row flex-col min-h-screen">

          {/* Sidebar Tabs */}
          <div className="xl:w-[20%] xmd:w-[30%] w-full xmd:pt-14 pt-10 pb-6 px-2 xmd:shadow-none shadow-lg xmd:relative sticky xmd:top-0 top-[100px] xmd:bg-transparent bg-white-100 z-30">
            <div className="sticky top-[160px] z-20">
              <div className="container relative">
                <div
                  ref={leftArrowRef}
                  onClick={() => iconClick("left")}
                  className="icon absolute left-0 top-1/2 transform -translate-y-1/2 bg-white z-10 px-2 cursor-pointer hidden sm:flex"
                >
                  <i className="fas fa-chevron-left text-gray-600"></i>
                </div>
                <div
                  ref={rightArrowRef}
                  onClick={() => iconClick("right")}
                  className="icon absolute right-0 top-1/2 transform -translate-y-1/2 bg-white z-10 px-2 cursor-pointer hidden sm:flex"
                >
                  <i className="fas fa-chevron-right text-gray-600"></i>
                </div>
                <div
                  ref={tabsBoxRef}
                  className="tablink-main w-full flex xmd:flex-col flex-row gap-2 scroll-smooth overflow-x-auto no-scrollbar"
                >
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveTab(index);
                        setActiveQuestions((prev) => {
                          const newState = [...prev];
                          newState[index] = 0;
                          return newState;
                        });
                      }}
                      className={`tablinks block text-left font-inter py-2 px-2 ${activeTab === index
                        ? "bg-pink-50 font-bold"
                        : "font-bold text-[#343434]"
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="xl:w-[80%] xmd:w-[70%] w-full xmd:p-14 p-8">
            <div className="section-heading z-index-5 flex flex-col justify-start items-start text-left gap-4 pb-8  border-b border-solid border-b-black-200">
              <h1 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-24px] before:left-[-14px] before:opacity-20 before:z-0 xsm:text-left text-left">
                {faq_title}
              </h1>
              <div >{extractTextFromLexical(faq_desc?.root?.children)}</div>

            </div>

            {categories[activeTab]?.posts.map((item, index) => {
              const isOpen = activeQuestions[activeTab] === index;
              // const ref = contentRefs.current[index] || null;
              // contentRefs.current[index] = ref;

              const contentStyle = {
                maxHeight: isOpen
                  ? `${contentRefs.current[index]?.scrollHeight}px`
                  : "0px",
                overflow: "hidden",
                transition: "max-height 0.35s ease",
              };


              return (
                <div
                  key={index}
                  className="accordion-item border-b py-6 space-y-2 max-w-[1024px] w-full"
                >
                  <div
                    className="accordion-header flex justify-between items-center cursor-pointer"
                    onClick={() => toggleQuestion(activeTab, index)}
                  >
                    <h3 className="text-h5 font-semibold w-[90%]">
                      {item.title}
                    </h3>
                    <span className="icon w-6 h-6 border border-solid border-black rounded-full flex justify-center items-center">
                      <Image
                        width={16}
                        height={16}
                        src={
                          isOpen
                            ? "/media/minus-svgrepo-com.svg"
                            : "/media/plus-svgrepo-com.svg"
                        }
                        alt="toggle"
                      />
                    </span>
                  </div>

                  <div
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    className="accordion-content"
                    style={contentStyle}
                  >

                    <div>{extractTextFromLexical(item.content?.root?.children)}</div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ_section;
