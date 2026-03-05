'use client'
import React from 'react'
import { Media } from '@/payload-types'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Image from 'next/image'
interface Tailored_ToolsProps {
  Heading?: string,
  image?: Media,
  item?: {
    heading?: string
    richText: DefaultTypedEditorState
    Check_Image?: Media,
  }[]
}

type LexicalTextNode = {
  text: string
}

type LexicalNode = {
  type: string
  children?: LexicalNode[] | LexicalTextNode[]
}

export const Tailored_Tool: React.FC<Tailored_ToolsProps> = ({ Heading, image, item }) => {

  const renderRichText = (state?: DefaultTypedEditorState) => {
    if (!state) return null
    return state.root.children.map((node, i) => {
      if (node.type === 'list') {
        return (
          <ul
            key={i}
            className="para text-dark text-h4 leading-snug pl-24 [&_li]:list-disc space-y-24"
          >
            {(node.children as LexicalNode[])?.map((c, idx) => (
              <li key={idx}>
                {(c.children as LexicalTextNode[])?.map((t) => t.text).join(' ')}
              </li>
            ))}

          </ul>
        )
      }
      if (node.type === 'paragraph') {
        return (
          <p key={i}>
            {(node.children as LexicalTextNode[])?.map((c) => c.text).join(' ')}
          </p>
        )

      }

      if (node.type === 'heading') {
        return (
          <h3 key={i}>
            {(node.children as LexicalTextNode[])?.map((c) => c.text).join(' ')}
          </h3>
        )

      }

      return null
    })
  }

  return (
    <section className="tools-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full bg-dots_bg bg-cover bg-center bg-no-repeat border-b-[1px] border-b-black-200 border-b-solid border-t-[1px] border-t-black-200 border-t-solid">
      <div className="container">
        <div className="inner-content flex flex-col space-y-8">
          <div className="heading mx-8">
            <h2
              className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-24px] before:left-3 before:opacity-20 before:z-0 xsm:text-left text-center"
              dangerouslySetInnerHTML={{ __html: Heading || '' }}
            ></h2>
          </div>

          <div className="inner flex lg:gap-16 gap-8 xlg:flex-row flex-col">
            <div className="left">
              {image?.url && (
                <Image
                  width={655}
                  height={450}
                  src={image?.url}
                  alt={image.alt || ''}
                  role="img"
                  className="w-full h-full object-cover"
                />)}
            </div>
            <div className="right font-inter">
              <div className="right-block space-y-8">
                {item?.map((item, i) => {
      
                  return (
                    <div
                      key={i}
                      className="flex justify-start items-start bg-white border border-solid border-black-200 md:p-6 p-4 gap-3"
                    >
                      <div className="icon w-[18px] h-[28px] flex-shrink-0">
                        {item.Check_Image?.url && (
                          <Image
                            src={item.Check_Image?.url}
                            width={18}
                            height={28}
                            alt={item.Check_Image.alt || ''}
                            role="img"
                            className="w-[18px] h-[28px] flex-shrink-0"
                          />
                        )}
                      </div>
                      <div className="content space-y-2">
                        <h3
                          className="text-h5 font-semibold"
                          dangerouslySetInnerHTML={{ __html: item.heading || '' }}
                        ></h3>
                        <div>{renderRichText(item.richText)}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
