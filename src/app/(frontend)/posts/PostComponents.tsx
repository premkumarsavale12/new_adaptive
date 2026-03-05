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
    <div className="w-full flex justify-start items-center mb-4 xmd:mt-0 mt-4">
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
            <div className="bg-white p-4 border border-black-200 flex flex-col flex-1">
                {embedUrl ? (
                    <iframe
                        src={embedUrl}
                        title="YouTube video"
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

                <div className="content space-y-5 my-6 flex-1 flex flex-col">
                    <span className="flex justify-between items-center">
                        <span className="text-[12px] font-medium uppercase bg-[#EEA7DF33] p-1 rounded">
                            {blog.tag}
                        </span>
                        <span className="text-[12px] text-black-100">
                            {new Date(blog.date || blog.createdAt).toLocaleDateString('en-GB')}
                        </span>
                    </span>

                    <h3 className="font-bold">{blog.title}</h3>

                    <div className="text-black-100 line-clamp-4">
                        {blog.content && <RichText data={blog.content} />}
                    </div>
                </div>

                <Link href={`/posts/${blog.slug}`} className="underline font-semibold">
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
        <div className="py-8 border-t border-black-200">
            {title && (
                <div className="heading mx-8 mb-8 relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] before:left-[-24px] before:opacity-20 before:z-0">
                    <h2 className="text-h2 font-ivy font-semibold">{title}</h2>
                </div>
            )}

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>

            {hasMore && <div ref={observerRef} className="h-8" />}
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

    // 🔹 Extract unique TAGS
    const displayTags = useMemo(() => {
        const tags = allPosts
            .map((post) => post.tag)
            .filter((tag): tag is string => Boolean(tag))
        return Array.from(new Set(tags))
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
                                        key={tag}
                                        className={` menut-btn p-2  w-full xmd:text-left text-center  ${activeTab === tag && 'bg-pink-80 font-semibold'
                                            }`}
                                        onClick={() => {
                                            setActiveTab(tag)
                                            setVisibleCount(100)
                                        }}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* BLOG CONTENT */}
                <div className="xl:w-[80%] xmd:w-[70%] w-full p-4">
                    <SearchInput
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        placeholder="Search blog"
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
export const BlogSingleContent = ({
    children,

}: {
    children: React.ReactNode
    post: Post
}) => {
    return (
        <div className="relative w-full animate-in fade-in duration-1000 slide-in-from-bottom-2">
            <div className="flex flex-col w-full">
                {children}
            </div>
        </div>
    )
}
