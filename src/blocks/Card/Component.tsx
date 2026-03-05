'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import dayjs from 'dayjs'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { fetchPosts } from '@/app/lib/Getposts'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Post } from '@/payload-types'


interface CardBlockProps {
  heading: string
  richText?: DefaultTypedEditorState
}

// Define a local type for serialized Lexical nodes
type SerializedNode = {
  type: string
  text?: string
  children?: SerializedNode[]
}

export const Card: React.FC<CardBlockProps> = ({ heading, richText }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  // Load posts
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchPosts()
        setPosts(data)
      } catch (err) {
        console.error('Failed to load posts: ' + (err as Error).message)
      } finally {

      }
    }
    loadPosts()
  }, [])

  const nextSlide = () => swiperInstance?.slideNext()
  const prevSlide = () => swiperInstance?.slidePrev()

  const blogPosts = posts;

  const renderRichText = (state?: DefaultTypedEditorState | null) => {
    if (!state) return null

    // Render a single serialized node
    const renderNode = (node: SerializedNode, key: number): React.ReactNode => {
      if (node.type === 'list') {
        return (
          <ul
            key={key}
            className="para text-dark text-h4 leading-snug pl-24 [&_li]:list-disc space-y-24"
          >
            {node.children?.map((child, i) => (
              <li key={i}>
                {child.children?.map((c) => (c.type === 'text' ? c.text : '')).join(' ')}
              </li>
            ))}
          </ul>
        )
      }

      if (node.type === 'paragraph') {
        return (
          <p key={key}>
            {node.children?.map((c) => (c.type === 'text' ? c.text : '')).join(' ')}
          </p>
        )
      }

      if (node.type.startsWith('heading')) {
        return (
          <h3 key={key}>
            {node.children?.map((c) => (c.type === 'text' ? c.text : '')).join(' ')}
          </h3>
        )
      }

      return null
    }

    return state.root.children.map((node, i) => renderNode(node as SerializedNode, i))
  }
  return (
    <section className="card-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 border-b-[1px] border-b-black-200 border-b-solid border-t-[1px] border-t-black-200 border-t-solid overflow-hidden">
      <div className="container">
        <div className="top sm:w-[83%] w-full">
          <div className="title">
            <h2
              className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] before:left-[-16px] before:opacity-20 before:z-0 mb-8"
              dangerouslySetInnerHTML={{ __html: heading || '' }}
            ></h2>
          </div>
          <div className="text text-h5 font-inter">{renderRichText(richText)}</div>
        </div>

        <div className="card-block relative">
          <Swiper
            className="lg:!pt-[100px] md:!pt-20 !pt-14 sm:!pb-12 !pb-16 md:mt-[-50px]"
            modules={[Navigation, Autoplay, Pagination]}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            loop={true}
            spaceBetween={16}
            slidesPerView={4}
            breakpoints={{
              1280: { slidesPerView: 4 },
              1024: { slidesPerView: 3 },
              640: { slidesPerView: 2 },
              480: { slidesPerView: 1 },
              0: { slidesPerView: 1 },
            }}
            onSwiper={setSwiperInstance}
          >
            {blogPosts?.map((card, index) => (
              <SwiperSlide className="item card-item" key={index}>
                <div className="bg-white px-4 flex flex-col h-full flex-1">
                  {card.heroImage && typeof card.heroImage === 'object' && card.heroImage.url && (
                    <Image
                      src={card.heroImage.url}
                      alt={card.heroImage.alt ?? 'Card Image'}
                      width={230}
                      height={240}
                      className="w-full h-[240px] object-cover"
                    />
                  )}
                  <div className="content lg:space-y-5 space-y-3 my-6 equal-text flex flex-col h-full flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] font-medium font-inter uppercase text-black-100 bg-[#EEA7DF33] p-[6px] rounded-[4px]">
                        {card.tag}
                      </span>
                      <span className="text-[12px] font-medium float-right font-inter text-black-100">
                        {dayjs(card.date).format("D MMMM YYYY")}
                      </span>
                    </div>
                    <h3
                      className="text-body font-bold font-inter heading flex-1"
                      dangerouslySetInnerHTML={{
                        __html: card.title || '',
                      }}
                    ></h3>
                    <div
                      className="text text-black-100 font-inter font-normal paragraph line-clamp-2"
                    >{renderRichText(card.content)}</div>
                  </div>
                  <Link
                    href={`/blog/${card.slug}`}
                    className="text-black font-semibold font-overpass block underline underline-offset-4"
                  >
                    Read More
                  </Link>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination static mt-3 md:mt-6 sm:hidden block" />
          </Swiper>

          <button
            aria-label="swiper button"
            className="custom-swiper-button-prev absolute top-3 z-10 xl:left-[93%] lg:left-[92%] xmd:left-[90%] sm:left-[84%] xsm:left-[80%] left-[70%] -translate-x-[50%]"
            onClick={prevSlide}
          >
            <Image
              src="/image/prevarrow.svg"
              alt="prevarrow"
              width={8}
              height={8}
              className="w-8 h-8 object-cover"
            />
          </button>

          <button
            aria-label="swiper button"
            className="custom-swiper-button-next z-10 absolute top-3 right-5"
            onClick={nextSlide}
          >
            <Image
              src="/image/Arrownext.svg"
              alt="nextarrow"
              width={8}
              height={8}
              className="w-8 h-8 object-cover"
            />
          </button>
        </div>
      </div>
    </section>

  )
}
