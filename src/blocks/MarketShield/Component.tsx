'use client'

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import type {
  SerializedLexicalNode,
  SerializedTextNode,
} from 'lexical'

interface FeatureItem {
  title: string
  richText?: DefaultTypedEditorState
  image?: {
    url: string
    alt?: string
  }
}

interface MarketShieldProps {
  heading?: string
  richText?: DefaultTypedEditorState
  ctaText?: string
  ctaLink?: string
  subheading?: string
  Bottom_subheading: string
  subrichText?: DefaultTypedEditorState
  features?: FeatureItem[]
}

export const MarketShieldBlock: React.FC<MarketShieldProps> = ({
  heading,
  richText,
  ctaText,
  ctaLink,
  subheading,
  Bottom_subheading,
  subrichText,
  features = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!features.length) return

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % features.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [features.length])

  useEffect(() => {
    const titles = document.querySelectorAll('.title-head')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('font-bold', 'after:w-[180px]')
              entry.target.classList.remove('font-normal')
            }, 500)
          } else {
            entry.target.classList.remove('font-bold', 'after:w-[180px]')
            entry.target.classList.add('font-normal')
          }
        })
      },
      { threshold: 0.75 },
    )

    titles.forEach((title) => observer.observe(title))
    return () => titles.forEach((title) => observer.unobserve(title))
  }, [])

  const renderTextNode = (node: SerializedTextNode, key: number) => {
    let element: React.ReactNode = node.text

    if (node.format & 1) {
      element = <strong key={`b-${key}`}>{element}</strong>
    }
    if (node.format & 2) {
      element = <em key={`i-${key}`}>{element}</em>
    }
    if (node.format & 4) {
      element = <u key={`u-${key}`}>{element}</u>
    }
    if (node.format & 8) {
      element = <s key={`s-${key}`}>{element}</s>
    }

    return <React.Fragment key={key}>{element}</React.Fragment>
  }

  const renderChildren = (children?: SerializedLexicalNode[]) => {
    if (!children) return null

    return children.map((child, index) => {
      if (child.type === 'text') {
        return renderTextNode(child as SerializedTextNode, index)
      }
      return null
    })
  }

  const renderRichText = (state?: DefaultTypedEditorState) => {
    if (!state) return null

    return state.root.children.map((node, i) => {
      if (node.type === 'list') {
        return (
          <ul
            key={i}
            className="para text-dark text-h4 leading-snug pl-24 [&_li]:list-disc space-y-24"
          >
            {node.children?.map((child, idx) => (
              <li key={idx}>{'children' in child ? renderChildren(child.children as SerializedLexicalNode[]) : null}</li>
            ))}
          </ul>
        )
      }

      if (node.type === 'paragraph') {
        return <p key={i}>{renderChildren(node.children as SerializedLexicalNode[])}</p>
      }

      if (node.type === 'heading') {
        return <h3 key={i}>{renderChildren(node.children as SerializedLexicalNode[])}</h3>
      }

      return null
    })
  }

  return (
    <section className="timeline-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 h-full">
      <div className="container">
        <div className="inner lg:space-y-[100px] md:space-y-[64px] space-y-8">
          <div className="timeline-top w-full">
            <div className="t-left w-full">
              <h2
                className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] before:left-[-16px] before:opacity-20 before:z-0 mb-8"
                dangerouslySetInnerHTML={{ __html: heading || '' }}
              ></h2>
              <div className="content flex justify-start items-center gap-8 flex-col lg:flex-row">
                <div className="t-left lg:w-[85%] w-full">
                  <div className="text font-inter text-black-100 font-normal text-body space-y-4">
                    {renderRichText(richText)}
                  </div>
                </div>
                {ctaText && ctaLink && (
                  <div className="t-right lg:w-[15%] w-full flex justify-start lg:justify-end items-end">
                    <div className="btn-link *:text-4 border-green hover:border-black">
                      <Link href={ctaLink} role="link">
                        {ctaText}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="timeline-mid flex justify-start items-start gap-[30px] flex-col lg:flex-row">
            <div className="time-left lg:w-[50%] w-full">
              <div className="top">
                <div className="title relative">
                  <h3 className="title-head text-h3 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-0 after:h-[20px] after:bg-bg_line2 after:bg-center after:bg-cover after:bg-no-repeat after:transition-all after:duration-500 transition-all duration-300 ease-in-out font-bold after:w-[180px]">
                    {subheading}
                  </h3>
                </div>
              </div>
              <div className="timeline-box flex flex-col lg:flex-row gap-4 mt-[48px] md:w-[80%] w-full">
                <div className="menu1 flex- 1">
                  {features.map((item, index) => (
                    <div
                      key={index}
                      className="menu-item flex items-center gap-2 mb-5 transition-all relative cursor-pointer"
                      data-target={index}
                      onClick={() => setActiveIndex(index)}
                    >
                      <div
                        className={`indicator w-4 h-4 border-[2px] rounded-full absolute top-[16px] left-0 -translate-y-1/2 transition-colors flex justify-center items-center ${activeIndex === index ? 'border-green' : 'border-gray-300'
                          }`}
                      >
                        <div
                          className={`circle w-2 h-2 border rounded-full transition-colors ${activeIndex === index ? 'bg-black' : 'bg-[#D9D9D9]'
                            }`}
                        ></div>
                      </div>

                      <ul className="list-none ml-[32px] p-0">
                        <li>
                          <h3 className="title text-h5 font-bold font-inter mb-[10px]">
                            {item.title}
                          </h3>
                          <div
                            className={`menu-content ${activeIndex === index ? 'block' : 'hidden'}`}
                            data-target={index}
                          >
                            <div className="text text-black-100">
                              {renderRichText(item.richText)}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="time-right lg:w-[50%] full">
              <div className="content-area flex-2 relative">
                {features[activeIndex]?.image && (
                  <div className="content-item">
                    <div className="image">
                      <Image
                        src={features[activeIndex].image.url}
                        width={746}
                        height={468}
                        alt={features[activeIndex].title}
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="timeline-btm font-inter font-normal">
            <div className="top mb-5">
              <div className="title relative">
                <h3 className="title-head text-h3 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-0 after:h-[20px] after:bg-bg_line2 after:bg-center after:bg-cover after:bg-no-repeat after:transition-all after:duration-500 transition-all duration-300 ease-in-out font-bold after:w-[180px]">
                  {Bottom_subheading}
                </h3>
              </div>
            </div>
            <div className="text space-y-4 text-black-100">
              {renderRichText(subrichText)}

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
