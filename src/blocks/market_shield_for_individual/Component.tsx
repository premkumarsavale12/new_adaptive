import { Media } from '@/payload-types'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Image from 'next/image'
import React from 'react'
import type {
  SerializedLexicalNode,
  SerializedTextNode,
} from 'lexical'

interface Market_Shield_for_IndividualProps {
  Heading?: string
  richText: DefaultTypedEditorState
  image: Media
}

export const Market_Shield_for_Individual: React.FC<
  Market_Shield_for_IndividualProps
> = ({ Heading, richText, image }) => {
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
    <>
      <section className="tools-section lg:py-[150px] md:py-[80px] sm:py-[50px] py-6 w-full bg-dots_bg bg-cover bg-center bg-no-repeat border-b-[1px] border-b-black-200 border-b-solid border-t-[1px] border-t-black-200 border-t-solid">
        <div className="container">
          <div className="inner-content flex flex-col lg:space-y-16 md:space-y-10 space-y-6">
            <div className="top text-black text-center w-[90%] mx-auto md:space-y-8 space-y-6">
              <div className="title flex justify-center items-center">
                <h2
                  className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] sm:before:left-[-16px] xsm:before:left-[-30px]  before:left-[20px] before:opacity-20 before:z-0"
                  dangerouslySetInnerHTML={{ __html: Heading || '' }}
                ></h2>
              </div>
              <div className="text">
                {renderRichText(richText)}
              </div>
            </div>
            <div className="inner flex justify-center items-center">
              {
                image.url && (
                  <Image src={image.url} width={960} height={485}
                    alt={image?.alt || ''}
                    role="img" />
                )
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
