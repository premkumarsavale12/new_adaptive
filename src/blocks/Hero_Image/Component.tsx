import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { SerializedLexicalNode } from 'lexical'

type SerializedElementNode = SerializedLexicalNode & {
  children?: SerializedLexicalNode[]
}

type SerializedTextNode = SerializedLexicalNode & {
  text?: string
}


interface HeroImageProps {
  heading?: string
  richText?: DefaultTypedEditorState
  button1?: {
    label?: string
    url?: string
  }
  button2?: {
    label?: string
    url?: string
  }
  heroImage?: {
    url: string
    alt?: string
  }
}

const renderRichText = (state?: DefaultTypedEditorState) => {
  if (!state) return null

  return state.root.children.map((node, i) => {
    const elementNode = node as SerializedElementNode

    if (node.type === 'list') {
      return (
        <ul
          key={i}
          className="para text-dark text-h4 leading-snug pl-24 [&_li]:list-disc space-y-24"
        >
          {elementNode.children?.map((listItem, j) => {
            const listItemNode = listItem as SerializedElementNode

            return (
              <li key={j}>
                {listItemNode.children
                  ?.map(
                    (child) => (child as SerializedTextNode).text ?? ''
                  )
                  .join(' ')}
              </li>
            )
          })}
        </ul>
      )
    }

    if (node.type === 'paragraph') {
      return (
        <p key={i}>
          {elementNode.children
            ?.map(
              (child) => (child as SerializedTextNode).text ?? ''
            )
            .join(' ')}
        </p>
      )
    }

    if (node.type === 'heading') {
      return (
        <h3 key={i}>
          {elementNode.children
            ?.map(
              (child) => (child as SerializedTextNode).text ?? ''
            )
            .join(' ')}
        </h3>
      )
    }

    return null
  })
}


export const Hero_Image: React.FC<HeroImageProps> = ({
  heading,
  richText,
  button1,
  button2,
  heroImage,
}) => {
  return (
    <section className="hero-section pt-[100px]">
      <div className="container">
        <div className="inner pt-[48px] lg:pt-0">
          <div className="inner-content flex flex-col xxl:flex-row xxl:space-y-0 space-y-[56px]">
            {/* Left Section */}
            <div className="hero-left py-0 md:py-8 xxl:py-[100px] xl:py-[130px] xxl:w-[45%] w-full pr-0 xxl:pr-[50px] xl:pr-[100px] flex justify-center flex-col">
              <div className="hero-text sm:space-y-8 space-y-4 text-h5 font-inter text-black-100">
                {heading && (
                  <h1
                    className="text-h1 text-black font-ivy font-semibold"
                    dangerouslySetInnerHTML={{ __html: heading }}
                  />
                )}

                {richText?.root?.children && (
                  <div>
                    {renderRichText(richText)}
                  </div>
                )}
              </div>

              {/* Buttons */}
              {(button1 || button2) && (
                <div className="button-area flex flex-wrap items-center lg:gap-[48px] gap-4 lg:mt-[64px] mt-8">
                  {button1 && (
                    <div className="btn-link *:text-4">
                      <Link href={button1.url || '#'}>{button1.label}</Link>
                    </div>
                  )}
                  {button2 && (
                    <div className="btn-green *:text-4">
                      <Link href={button2.url || '#'}>{button2.label}</Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="hero-right xxl:w-[55%] w-full flex xxl:justify-end justify-start items-end">
              {heroImage?.url && (
                <Image
                  src={heroImage.url}
                  width={818}
                  height={483}
                  alt={heroImage.alt || "Hero image"}
                  className="xxl:w-fit w-full lg:h-auto h-full"
                  quality={75}
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
