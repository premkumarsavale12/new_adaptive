"use client";

import React, { useEffect, useRef, useState } from "react";
import { Post } from "@/payload-types";

type TOCSubHeader = {
  id: string;
  text: string;
};

type TOCHeader = {
  id: string;
  text: string;
  subHeaders: TOCSubHeader[];
};



const parseContentAndHeaders = (
  htmlString: string
): { html: string; headers: TOCHeader[] } => {
  if (typeof window === "undefined") {
    return { html: "", headers: [] };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const headers = Array.from(
    doc.querySelectorAll<HTMLHeadingElement>("h2, h3")
  );

  const structuredHeaders: TOCHeader[] = [];
  let currentH2: TOCHeader | null = null;

  headers.forEach((header, index) => {
    if (!header.id) {
      header.id = `header-${index}`;
    }

    if (header.tagName === "H2") {
      header.className = "text-h2 font-bold mb-4";

      currentH2 = {
        id: header.id,
        text: header.innerText,
        subHeaders: [],
      };

      structuredHeaders.push(currentH2);
    }

    if (header.tagName === "H3" && currentH2) {
      header.className = "text-h3 font-bold mb-4";

      currentH2.subHeaders.push({
        id: header.id,
        text: header.innerText,
      });
    }
  });

  Array.from(doc.querySelectorAll<HTMLParagraphElement>("p")).forEach((p) => {
    p.className =
      "text text-body font-inter font-normal text-black-100 mb-4";
  });

  Array.from(doc.querySelectorAll<HTMLLIElement>("li")).forEach((li) => {
    li.className =
      "text text-body font-inter font-normal text-black-100 mb-4";
  });

  return {
    html: doc.body.innerHTML,
    headers: structuredHeaders,
  };
};



const BlogSingleClient = ({ post }: { post: Post }) => {
  const [tocItems, setTocItems] = useState<TOCHeader[]>([]);
  const [contentHTML, setContentHTML] = useState<string>("");
  const [_activeHeaderId, setActiveHeaderId] = useState<string>("");
  const [_windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [isClickScrolling, _setIsClickScrolling] =
    useState<boolean>(false);

  const tocCollapseRef = useRef<HTMLDivElement | null>(null);
  const previousScrollRef = useRef<number>(0);
  const progressRef = useRef<HTMLDivElement | null>(null);



  useEffect(() => {
    if (post?.pagecontent?.Gutenberg_html) {
      const { html, headers } = parseContentAndHeaders(
        post.pagecontent.Gutenberg_html
      );
      setContentHTML(html);
      setTocItems(headers);
    }
  }, [post]);

  useEffect(() => {
    const handleResize = () =>
      setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);



  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (isClickScrolling) return;

      const allHeaders = Array.from(
        document.querySelectorAll<HTMLHeadingElement>(
          "h2[id], h3[id]"
        )
      );

      const offset = 70;
      let minDistance = Infinity;
      let currentId = "";

      allHeaders.forEach((header) => {
        const rect = header.getBoundingClientRect();
        const distance = Math.abs(rect.top - offset);

        if (distance < minDistance) {
          minDistance = distance;
          currentId = header.id;
        }
      });

      setActiveHeaderId(currentId);

      if (progressRef.current) {
        const container =
          progressRef.current.parentElement;

        if (!container) return;

        const totalHeight = container.scrollHeight || 150;
        const currentIndex = allHeaders.findIndex(
          (h) => h.id === currentId
        );

        const heightPerSection =
          totalHeight / allHeaders.length;

        const maxHeight = totalHeight * 0.95;

        const progressHeight = Math.min(
          (currentIndex + 1) * heightPerSection,
          maxHeight
        );

        progressRef.current.style.height = `${progressHeight}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [isClickScrolling, tocItems]);



  useEffect(() => {
    const tocCollapse = tocCollapseRef.current;
    const toggleBtn = document.getElementById("toc-toggle");

    if (!tocCollapse || !toggleBtn) return;

    const handleToggle = () => {
      if (!tocCollapse.classList.contains("expanded")) {
        previousScrollRef.current = window.scrollY;
        tocCollapse.classList.add("expanded");
        tocCollapse.style.maxHeight = `${tocCollapse.scrollHeight}px`;
      } else {
        tocCollapse.classList.remove("expanded");
        tocCollapse.style.maxHeight = "150px";
        window.scrollTo({
          top: previousScrollRef.current,
          behavior: "auto",
        });
      }
    };

    toggleBtn.addEventListener("click", handleToggle);
    return () =>
      toggleBtn.removeEventListener("click", handleToggle);
  }, []);

  return (
    <div className="container">
      <main
        className="lg:w-[70%] w-full flex flex-col gap-6"
        dangerouslySetInnerHTML={{ __html: contentHTML }}
      />
    </div>
  );
};

export default BlogSingleClient;
