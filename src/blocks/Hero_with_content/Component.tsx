import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Link from 'next/link'
import React from 'react'
import type {
  SerializedLexicalNode,
  SerializedTextNode,
} from 'lexical'

interface Hero_with_contentProps {
  Heading?: string
  richText: DefaultTypedEditorState
  button1?: string
  Url1?: string
  target1?: '_self' | '_blank'
  button2?: string
  Url2?: string
  target2?: '_self' | '_blank'
}

export const Hero_with_content: React.FC<Hero_with_contentProps> = ({
  Heading,
  richText,
  button1,
  Url1,
  target1 = '_self',
  button2,
  Url2,
  target2 = '_self',
}) => {

  const renderTextNode = (node: SerializedTextNode, key: number) => {
    let element: React.ReactNode = node.text

    if (node.format & 1) {
      element = <strong key={`b-${key}`} className="block text-black">{element}</strong>
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
      if (child.type === 'linebreak') {
        return <br key={index} className="hidden" />
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
    <section className="hero-section pt-[100px]">
      <div className="container">
        <div className="inner pt-[18px] lg:pt-0">
          <div className="inner-content flex flex-col lg:flex-row lg:space-y-0 space-y-[56px]">
            <div className="hero-left px-2 lg:px-8 py-6 sm:py-[70px] lg:py-[100px] xl:py-[130px] w-full flex justify-center flex-col items-center text-center">
              <div className="hero-text sm:space-y-8 space-y-4 text-h5 font-inter text-black-100">
                <h1
                  className="text-h1 text-black font-ivy font-semibold"
                  dangerouslySetInnerHTML={{ __html: Heading || '' }}
                ></h1>

                <div>{renderRichText(richText)}</div>
              </div>
              <div className="button-area flex flex-wrap justify-center items-center lg:gap-[48px] gap-4 lg:mt-[64px] md:mt-8 mt-4">

                {button1 && Url1 && (
                  <div className={`btn-link *:text-4`}>
                    <Link href={Url1} target={target1}>
                      {button1}
                    </Link>
                  </div>
                )}

                {/* Button 2 with Dynamic Color */}
                {button2 && Url2 && (
                  <div className={`btn-green *:text-4`}>
                    <Link href={Url2} target={target2}>
                      {button2}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
