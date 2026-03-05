'use client'

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SerializedLexicalNode, SerializedTextNode } from 'lexical'

interface Item {
  title: string
  subtitle?: string
  richText: DefaultTypedEditorState
  buttonText?: string
  buttonUrl?: string
  image?: {
    url: string
    alt?: string
  }
}

interface Props {
  items: Item[]
}

export const HorizontalContent: React.FC<Props> = ({ items }) => {
  const [activeImage, setActiveImage] = useState<string | undefined>(
    items[0]?.image?.url
  )

  /** Properly typed refs */
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLElement | null>(null)
  const stickyImageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const sections = sectionsRef.current.filter(
      (el): el is HTMLDivElement => Boolean(el)
    )

    const container = containerRef.current
    const stickyImage = stickyImageRef.current

    if (!container || !stickyImage || sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target.getAttribute('data-image')
            if (image) {
              setActiveImage(image)
            }
          }
        })
      },
      {
        threshold: [0.4, 0.6, 0.8],
        rootMargin: '-40% 0px -40% 0px',
      }
    )

    sections.forEach((section) => observer.observe(section))

    const adjustHeight = () => {
      const imageHeight = stickyImage.offsetHeight
      const sectionEls =
        container.querySelectorAll<HTMLElement>('.content-section')

      sectionEls.forEach((section) => {
        section.style.minHeight = `${imageHeight}px`
      })

      container.style.minHeight = `${imageHeight * sectionEls.length}px`
    }

    adjustHeight()
    window.addEventListener('resize', adjustHeight)

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
      window.removeEventListener('resize', adjustHeight)
    }
  }, [])

  if (!items?.length) return null

  return (
    <section
      ref={containerRef}
      className="tools-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 bg-[#f7f7f7]  border-t-[1px] border-t-black-200 border-t-solid"
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row items-start lg:gap-[100px] md:gap-[48px] gap-[32px]">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8 lg:gap-20">
            {items.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  sectionsRef.current[index] = el
                }}
                className="content-section space-y-8 flex flex-col"
                data-image={item.image?.url}
              >
                <h2 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] before:left-[-16px] before:opacity-20 before:z-0">
                  {item.title}
                </h2>

                <div className="text font-inter text-black-100 font-normal text-body space-y-4">
                  {item.subtitle && (
                    <h3 className="text-black font-medium">
                      {item.subtitle}
                    </h3>
                  )}

                  <div>
                    {item.richText?.root?.children?.map(
                      (block: SerializedLexicalNode, i: number) => (
                        <p key={i}>
                          {'children' in block && Array.isArray(block.children)
                            ? block.children
                              .map(
                                (c) =>
                                  (c as SerializedTextNode).text ?? ''
                              )
                              .join(' ')
                            : ''}
                        </p>
                      )
                    )}
                  </div>
                </div>

                <div className="btn-link *:text-4 border-green hover:border-black">
                  {item.buttonUrl && item.buttonText && (
                    <Link href={item.buttonUrl}>{item.buttonText}</Link>
                  )}
                </div>

                {/* Mobile image */}
                {item.image?.url && (
                  <div className="content-img w-full mb-8 lg:hidden block">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || ''}
                      width={694}
                      height={410}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sticky Image */}
          <div className="stick-box w-full lg:w-1/2 sticky top-40 lg:block hidden">
            {activeImage && (
              <Image
                ref={stickyImageRef}
                src={activeImage}
                width={694}
                height={410}
                alt="Sticky Image"
                className="relative w-full h-full object-cover transition-all duration-500"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
