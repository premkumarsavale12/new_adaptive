'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Post, Category } from '@/payload-types'
import RichText from '@/components/RichText'

// --- SearchInput Component ---
const SearchInput = ({
    searchTerm,
    setSearchTerm,
    placeholder,
}: {
    searchTerm: string
    setSearchTerm: (v: string) => void
    placeholder: string
}) => (
    <div className="w-full flex justify-start items-center mb-4 xmd:mt-0 sticky top-[120px] z-20 bg-white-100 pb-2 pt-6 xmd:pt-2 before:content-[''] before:absolute before:bottom-full before:left-0 before:w-full before:h-12 before:bg-white-100 before:z-20">
        <div className="flex relative group lg:w-1/4 sm:w-1/3 xsm:w-1/2 w-[95%]">
            <button
                aria-label="search button"
                className="p-2 text-gray-500 hover:text-black transition absolute left-2 top-1.5"
            >
                <Image src="/media/searchicon.svg" alt="Search" width={20} height={20} />
            </button>
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 py-1 pr-3 pl-12 border border-black-200 bg-white rounded"
            />
        </div>
    </div>
)

// --- BlogCard Component ---
const BlogCard = ({ blog }: { blog: Post }) => {
    const getEmbedUrl = (url: string) => {
        try {
            const parsed = new URL(url)
            if (parsed.hostname === 'youtu.be') {
                return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`
            }
            if (parsed.hostname.includes('youtube.com')) {
                const v = parsed.searchParams.get('v')
                if (v) return `https://www.youtube.com/embed/${v}`
                if (parsed.pathname.startsWith('/shorts/')) {
                    return `https://www.youtube.com/embed/${parsed.pathname.split('/shorts/')[1]}`
                }
            }
            return ''
        } catch {
            return ''
        }
    }

    const embedUrl = blog.link ? getEmbedUrl(blog.link) : ''

    return (
        <div className="item card-item h-full flex flex-col">
            <div className="bg-white p-4 border border-solid  border-black-200 flex flex-col flex-1">
                {embedUrl ? (
                    <iframe
                        src={embedUrl}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="w-full aspect-video"
                        allowFullScreen
                    />
                ) : blog.heroImage && typeof blog.heroImage === 'object' ? (
                    <Image
                        src={blog.heroImage.url || ''}
                        alt={blog.title || ''}
                        width={600}
                        height={400}
                        className="w-full md:h-[240px] object-cover"
                    />
                ) : null}

                <div className="content space-y-[20px] my-6 flex-1 flex flex-col">
                    <span className="flex justify-between items-center">
                        <span className="text-[12px] font-medium font-inter bg-[#EEA7DF33] text-[#A10078] px-2 py-1 rounded-[4px]">
                            {blog.categories && blog.categories.length > 0 && typeof blog.categories[0] === 'object'
                                ? blog.categories[0].title
                                : blog.tag}
                        </span>
                        <span className="text-[12px] font-medium font-inter text-black-100">
                            {new Date(blog.date || blog.createdAt).toLocaleDateString('en-GB')}
                        </span>
                    </span>

                    <h3 className="text-body font-bold font-inter md:min-h-[20px] min-h-auto">{blog.title}</h3>

                    <div className="text text-black-100 font-inter font-normal line-clamp-4">
                        {blog.content && <RichText data={blog.content} />}
                    </div>
                </div>

                <Link href={`/blog/${blog.slug}`} className="block underline underline-offset-4 text-black font-semibold font-overpass">
                    Read More
                </Link>
            </div>
        </div>
    )
}

// --- BlogSection Component ---
const BlogSection = ({
    title,
    blogs,
    loadMore,
    hasMore,
    loading,
}: {
    title?: string | null
    blogs: Post[]
    loadMore: () => void
    hasMore: boolean
    loading: boolean
}) => {
    const observerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!hasMore) return
        const node = observerRef.current
        if (!node) return

        const observer = new IntersectionObserver(
            (entries) => entries[0].isIntersecting && !loading && loadMore(),
            { threshold: 1 }
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [loadMore, hasMore, loading])

    return (
        <div className="btm-content py-8 border-t border-black-200 xmd:px-0 px-4">
            {title && (
                <div className="heading mx-8 mb-8 relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] before:left-[-24px] before:opacity-20 before:z-0">
                    <h2 className="text-h2 font-ivy font-semibold">{title}</h2>
                </div>
            )}

            <div className="blogs grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>

            {hasMore && <div ref={observerRef} className="w-full h-8 flex justify-center items-center" />}
        </div>
    )
}

// --- Main BlogTab Component ---
export const BlogTab = ({
    allPosts,
}: {
    allPosts: Post[]
    allCategories: Category[]
}) => {
    const [activeTab, setActiveTab] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [visibleCount, setVisibleCount] = useState(100)
    const [loadingMore, setLoadingMore] = useState(false)

    // 🔹 Use Tags for tabs
    const displayTags = useMemo(() => {
        const uniqueTags = new Set<string>()
        allPosts.forEach((post) => {
            if (post.tag) uniqueTags.add(post.tag)
        })
        return Array.from(uniqueTags).map((tag) => ({
            id: tag,
            title: tag,
        }))
    }, [allPosts])

    // 🔹 Filter by TAG + Search
    const searchedBlogs = useMemo(() => {
        let posts = allPosts

        if (activeTab !== 'All') {
            posts = posts.filter((blog) => blog.tag === activeTab)
        }

        if (searchTerm) {
            const q = searchTerm.toLowerCase()
            posts = posts.filter(
                (blog) =>
                    (blog.title || '').toLowerCase().includes(q) ||
                    (blog.tag || '').toLowerCase().includes(q)
            )
        }

        return posts
    }, [allPosts, activeTab, searchTerm])

    const loadMore = () => {
        setLoadingMore(true)
        setTimeout(() => {
            setVisibleCount((prev) => prev + 6)
            setLoadingMore(false)
        }, 300)
    }

    const postsToDisplay = searchedBlogs.slice(0, visibleCount)

    return (
        <section className="hero-section  border-b border-black-200 bg-white-100">
            <div className="flex justify-start items-start relative xmd:flex-row flex-col">
                {/* TAG SIDEBAR */}
                <div className="flex items-center justify-center px-2 py-6 xl:w-[20%] xmd:w-[30%] w-full sticky xmd:top-[120px] top-[112px] shadow-lg xmd:shadow-none xmd:bg-transparent bg-white-100">
                    <div className="container">
                        <div className="relative flex items-center w-full">
                            <div className="main-btns flex xmd:flex-col flex-row sm:gap-2 gap-6 sm:overflow-x-visible overflow-x-auto xmd:whitespace-pre-wrap whitespace-nowrap scroll-smooth no-scrollbar text-black w-full text-body font-medium font-inter xmd:justify-start sm:justify-center justify-start">
                                <button
                                    aria-label="tab button"
                                    className={`menut-btn p-2 w-full xmd:text-left text-center ${activeTab === "All" ? "bg-pink-80 font-semibold" : ""
                                        }`}
                                    onClick={() => {
                                        setActiveTab('All')
                                        setVisibleCount(100)
                                    }}
                                >
                                    All
                                </button>

                                {displayTags.map((tag) => (
                                    <button
                                        aria-label="tab list button"
                                        key={tag.id}
                                        className={` menut-btn p-2  w-full xmd:text-left text-center  ${activeTab === tag.title && 'bg-pink-80 font-semibold'
                                            }`}
                                        onClick={() => {
                                            setActiveTab(tag.title)
                                            setVisibleCount(100)
                                        }}
                                    >
                                        {tag.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* BLOG CONTENT */}
                <div className="inner xmd:px-10 xmd:py-10 py-2 xl:w-[80%] xmd:w-[70%] px-0 w-full">
                    <SearchInput
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        placeholder="Search blog title "
                    />

                    {postsToDisplay.length ? (
                        <BlogSection
                            title={activeTab === 'All' ? null : activeTab}
                            blogs={postsToDisplay}
                            loadMore={loadMore}
                            loading={loadingMore}
                            hasMore={searchedBlogs.length > visibleCount}
                        />
                    ) : (
                        <p className="text-center py-10 text-gray-500">
                            No results found
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}

// --- BlogSingleContent Component ---
/**
 * A wrapper component for a single blog post's content.
 * It provides a container and potential client-side enhancements for the post view.
 */
// export const BlogSingleContent = ({
//     children,

// }: {
//     children: React.ReactNode
//     post: Post
// }) => {
//     return (
//         <div className="relative w-full animate-in fade-in duration-1000 slide-in-from-bottom-2">
//             <div className="flex flex-col w-full">
//                 {children}
//             </div>
//         </div>
//     )
// }
