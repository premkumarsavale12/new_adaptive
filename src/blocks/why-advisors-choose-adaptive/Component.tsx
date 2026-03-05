import { Media } from '@/payload-types'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Image from 'next/image'

interface Advisors_Choose_AdaptiveProps {
  Heading?: string
  Items?: {
    heading?: string
    richText: DefaultTypedEditorState
    Image?: Media | null
  }[]
  SubHeading: string
  richText: DefaultTypedEditorState
}
interface LexicalTextNode {
  text: string
}

interface LexicalNode {
  type: string
  children?: LexicalNode[] | LexicalTextNode[]
}


export const Advisors_Choose_Adaptive: React.FC<Advisors_Choose_AdaptiveProps> = ({
  Heading,
  Items,
  SubHeading,
  richText,
}) => {
  const renderRichText = (state?: DefaultTypedEditorState) => {
    if (!state) return null
    return state.root.children.map((node: LexicalNode, i: number) => {
      if (node.type === 'list') {
        return (
          <ul
            key={i}
            className="para text-dark text-h4 leading-snug pl-24 [&_li]:list-disc space-y-24"
          >
            {(node.children as LexicalNode[] | undefined)?.map((c, j) => (
              <li key={j}>
                {(c.children as LexicalTextNode[] | undefined)?.map((t) => t.text).join(' ')}
              </li>
            ))}
          </ul>
        )
      }
      if (node.type === 'paragraph') {
        return (
          <p key={i}>
            {(node.children as LexicalTextNode[] | undefined)?.map((c) => c.text).join(' ')}
          </p>
        )
      }
      if (node.type === 'heading') {
        return (
          <h3 key={i}>
            {(node.children as LexicalTextNode[] | undefined)?.map((c) => c.text).join(' ')}
          </h3>
        )
      }
      return null
    })
  }

  return (
    <section className="t-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b-[1px] border-b-black-200 border-b-solid border-t-[1px] border-t-black-200 border-t-solid">
      <div className="container">
        <div className="inner-content flex flex-col space-y-8">
          <div className="heading mx-auto">
            <h2 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-4 before:opacity-20 before:z-0 text-black text-center">
              {Heading}
            </h2>
          </div>

          <div className="inner flex lg:gap-16 gap-8 flex-col">
            {(Items ?? []).length > 0 &&
              (Items ?? []).map((item, index) => {
                return (
                  <div
                    key={index}
                    className="box1 bg-white-100 xmd:pb-6 pb-0 pt-6 xmd:pl-8 pl-6 xmd:pr-0 pr-6 flex justify-start lg:gap-16 gap-8 w-full xmd:flex-row flex-col"
                  >
                    <div className="left xmd:w-1/2 w-full xl:space-y-16 xmd:space-y-8 space-y-6">
                      <div className="number text-blue text-h2 font-ivy font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="content font-inter flex flex-col gap-2">
                        <span
                          className="text-h5 font-semibold"
                          dangerouslySetInnerHTML={{ __html: item.heading || '' }}
                        ></span>
                        <span>{renderRichText(item.richText)}</span>
                        {/* <span className="font-semibold">{item.additionalInfo}</span> */}
                      </div>
                    </div>
                    <div className="right xmd:w-1/2 w-full">
                      {item.Image?.url && (
                        <Image
                          width={696}
                          height={390}
                          src={item.Image?.url}
                          alt={`advisory image ${index + 1}`}
                          role="img"
                          className="w-full rounded-l-md xmd:rounded-b-md rounded-b-none xmd:rounded-r-none rounded-r-md h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                )
              })}

            <div className="title relative space-y-6">
              <h3 className="title-head text-h3 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-0 after:h-[20px] after:bg-bg_line2 after:bg-center after:bg-cover after:bg-no-repeat after:transition-all after:duration-500 transition-all duration-300 ease-in-out font-bold after:w-[180px]">
                {SubHeading}
              </h3>
              {renderRichText(richText)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
