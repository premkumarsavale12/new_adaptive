import { Media } from '@/payload-types'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Image from 'next/image'
import React from 'react'
import type {
  SerializedLexicalNode,
  SerializedTextNode,
} from 'lexical'

interface LeaderShipBlock {
  Heading?: string
  richText?: DefaultTypedEditorState
  Items?: LeaderShipItem[]
}

interface LeaderShipItem {
  Image?: Media
  richText?: DefaultTypedEditorState
  title?: string
  designation?: string
}

export const LeaderShip: React.FC<LeaderShipBlock> = ({
  Heading,
  richText,
  Items,
}) => {
  const renderText = (children?: SerializedLexicalNode[]) =>
    children
      ?.filter(
        (c): c is SerializedTextNode =>
          c.type === 'text' && 'text' in c
      )
      .map((c) => c.text)
      .join(' ')

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
              <li key={idx}>
                {'children' in child ? renderText(child.children) : null}
              </li>
            ))}
          </ul>
        )
      }

      if (node.type === 'paragraph') {
        return <p key={i}>{renderText(node.children)}</p>
      }

      if (node.type === 'heading') {
        return <h3 key={i}>{renderText(node.children)}</h3>
      }

      return null
    })
  }
  return (
    <section className="testimonial-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 overflow-hidden">
      <div className="container">
        <div className="top text-black text-center lg:w-[70%] w-full mx-auto lg:space-y-[64px] space-y-8">
          <div className="title flex justify-center items-center">
            <h2
              className="text-h1 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-[0] before:opacity-20 before:z-0"
              dangerouslySetInnerHTML={{ __html: Heading || '' }}
            ></h2>
          </div>
          <div className="text italic text-h5 font-inter font-normal">
            <strong>       {renderRichText(richText)}</strong>

          </div>
        </div>

        <div className="testimonial-block lg:mt-[100px] md:mt-[48px] mt-8 flex gap-8 md:flex-row flex-col">
          {Items?.map((item, i) => {
            return (
              <div className="item test-items md:w-1/2 w-full" key={i}>
                <div className="test-inner flex justify-start items-center flex-col xlg:flex-row md:flex-col xsm:flex-row">
                  <div className="testleft w-[40%]">
                    <div className="testimg max-w-[250px] w-full">
                      {item.Image?.url && (
                        <Image
                          src={item.Image.url}
                          alt={item.Image.alt ?? 'Leadership Image'}
                          width={250}
                          height={251}
                        />
                      )}
                    </div>
                  </div>

                  <div className="testright p-[30px] xlg:w-[60%] md:w-full xsm:w-[60%] w-full xsm:text-left text-center">
                    <div className="test-content space-y-8">
                      {renderRichText(item.richText)}

                    </div>
                    <div className="details flex flex-col mt-6">
                      <span className="font-medium">{item.title}</span>
                      <span>{item.designation}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
