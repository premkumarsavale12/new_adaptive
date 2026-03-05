'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import Image from 'next/image'
import { Webinar, Category } from '@/payload-types'
import RichText from '@/components/RichText'


import Fahne from '../../../../public/media/Fahne.webp'
import Key from '../../../../public/media/Key.webp'
import truck from '../../../../public/media/truck.svg'
import tea from '../../../../public/media/tea.svg'
import heart from '../../../../public/media/heart.svg'
import home from '../../../../public/media/home.svg'
import airoplain from '../../../../public/media/airoplain.svg'
import star from '../../../../public/media/star.svg'
import Tree from '../../../../public/media/Tree.webp'


import type { StaticImageData } from 'next/dist/shared/lib/get-img-props'

type IconData = {
  value: string;
  label: string;
  image: StaticImageData;

};
export default function WebinarArchiveClient({
  initialWebinars,
  categories,
}: {
  initialWebinars: Webinar[]
  categories: Category[]
}) {

  const [activeTab, setActiveTab] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleCount, setVisibleCount] = useState(initialWebinars.length)
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Webinar | null>(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    selectedIcon: '',
  })

  const [errors, setErrors] = useState<{ selectedIcon?: string }>({})
  const [isScrolled, setIsScrolled] = useState(false)
  const [randomIcons, setRandomIcons] = useState<IconData[]>([]);
  const [loading, setLoading] = useState(true)
  const [randomLabel, setRandomLabel] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState<string>("")

  const iconData = useMemo<IconData[]>(
    () => [
      { value: 'Herz', label: ' the  heart', image: heart },
      { value: 'Tasse', label: ' the  cup', image: tea },
      { value: 'Stern', label: ' the  star', image: star },
      { value: 'LKW', label: ' the  truck', image: truck },
      { value: 'Schlüssel', label: ' the  key', image: Key },
      { value: 'Haus', label: ' the  house', image: home },
      { value: 'Flugzeug', label: ' the  airplane', image: airoplain },
      { value: 'Baum', label: ' the  tree', image: Tree },
      { value: 'Fahne', label: ' the  flag', image: Fahne },
    ],
    []
  )

  const LoadingDots: React.FC = () => (
    <section className="dots-container">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </section>
  );


  const getRandomItems = (array: IconData[], count: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };


  useEffect(() => {
    const selectedIcons = getRandomItems(iconData, 3)
    setRandomIcons(selectedIcons)

    const randomItem = selectedIcons[Math.floor(Math.random() * selectedIcons.length)]
    setRandomLabel(randomItem.label)
    setCorrectAnswer(randomItem.label)

    setLoading(false)
  }, [iconData])


  const filteredWebinars = useMemo(() => {
    return initialWebinars.filter((item) => {
      const matchesSearch = (item.title || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesCategory =
        activeTab === 'All' ||
        activeTab === 'On Demand' ||
        item.categories?.some(
          (cat) => typeof cat === 'object' && cat.title === activeTab
        )


      return matchesSearch && matchesCategory
    })
  }, [initialWebinars, searchTerm, activeTab])





  // ✅ Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          setTimeout(() => {
            setVisibleCount((prev) => {
              const newCount = prev + 3;
              if (newCount >= filteredWebinars.length) {
                setHasMore(false);
              }
              return newCount;
            });
          }, 400);
        }
      },
      { rootMargin: "100px", threshold: 0.1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [filteredWebinars, hasMore]);


  useEffect(() => {
    setVisibleCount(6);
    setHasMore(true);
  }, [activeTab, searchTerm]);


  useEffect(() => {
    setVisibleCount(initialWebinars.length)
  }, [initialWebinars])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getEmbedUrl = (url: string) => {
    if (!url) return ''
    const regExp = /^.*(youtu.be\/|watch\?v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match ? `https://www.youtube.com/embed/${match[2]}` : url
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (form.selectedIcon !== correctAnswer) {
      setErrors({ selectedIcon: 'Please select the correct icon' })
      return
    }

    alert("Thank you for registering!")

    setForm({ name: '', email: '', phone: '', selectedIcon: '' })
    setIsOpen(false)
  }
  return (
    <section className="hero-section pt-[160px] border-b border-black-200 bg-white-100">
      <div className="flex justify-start items-start relative xmd:flex-row flex-col">
        {/* Sidebar Categories */}
        <div className="flex items-center justify-center px-2 pb-6 pt-8 xl:w-[20%] xmd:w-[30%] w-full sticky xmd:top-[120px] top-[112px] shadow-lg xmd:shadow-none xmd:bg-transparent bg-white-100 ">
          <div className="container">
            <div className="main-btns flex xmd:flex-col flex-row sm:gap-2 gap-6 overflow-x-auto no-scrollbar">
              {["All", "On Demand", ...categories.filter((cat) => cat.title).map((cat) => cat.title as string)].map((cat) => (

                <button
                  key={cat}
                  className={`p-2 w-full text-start ${activeTab === cat ? "bg-pink-80 font-semibold" : ""
                    }`}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="inner xmd:px-10 xmd:py-10 py-2 xl:w-[80%] xmd:w-[70%] w-full">
          <div
            className={`sticky  xmd:top-[90px] top-[200px] xmd:px-0 px-2 z-50 py-4  border-t-[1px] border-t-solid xmd:border-t-transparent border-t-black-200 flex justify-between items-center gap-0 xsm:gap-8 xsm:flex-row flex-col   ${isScrolled
              ? "bg-white-100  border-b-[1px] border-b-solid border-b-black-200"
              : "bg-transparent"
              }`}
          >
            <h2 className="text-h2 font-ivy font-semibold mb-6">Webinars</h2>
            <div className="w-full flex justify-end items-center mb-4 xmd:mt-0 mt-4">
              <div className="flex relative group lg:w-1/4  xsm:w-1/2 w-[95%] ">
                <button
                  aria-label="search button"
                  className="p-2 text-gray-500 hover:text-black transition absolute left-2 top-1.5"
                >
                  <Image
                    src="/media/searchicon.svg"
                    alt="Search"
                    width={20}
                    height={20}
                  />
                </button>
                <input
                  type="text"
                  placeholder="Search Webinar title"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  className="w-full h-12 py-1 pr-3 pl-12 border border-gray-300 bg-white rounded"
                />
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="blogs grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredWebinars.slice(0, visibleCount).map((item, i) => {
              const heroImageUrl = typeof item.heroImage === 'object' ? item.heroImage?.url : null;
              const isYoutube = item.link?.includes('youtube.com') || item.link?.includes('youtu.be');

              return (
                <div key={i} className="card-item h-full flex flex-col">
                  <div className="bg-white p-4 border border-black-200 flex flex-col flex-1 ">
                    {isYoutube ? (
                      <iframe
                        src={getEmbedUrl(item.link || '')}
                        title={`YouTube video ${i}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-[200px]"
                      />
                    ) : heroImageUrl ? (
                      <Image
                        src={heroImageUrl}
                        alt={item.title || "Webinar"}
                        width={400}
                        height={250}
                        className="w-full h-[200px] object-cover"
                      />
                    ) : (
                      <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                        No Image Available
                      </div>
                    )}

                    <div className="content space-y-5 my-6 flex-1 flex flex-col">

                      {/* Categories */}
                      <div className="flex flex-wrap gap-1 justify-between">
                        <div className="flex flex-wrap gap-1">
                          {item.categories?.map((cat) => (
                            <span
                              key={typeof cat === 'object' ? cat.id : cat}
                              className="text-[12px] uppercase bg-[#EEA7DF33] text-pink-600 px-2 py-1 rounded"
                            >
                              {typeof cat === 'object' ? cat.title : 'Category'}
                            </span>
                          ))}

                          {item.tag && (
                            <span className="text-[12px] uppercase bg-[#EEA7DF33] px-2 py-1 rounded">
                              {item.tag}
                            </span>
                          )}
                        </div>

                        <span className="text-[12px]">
                          {item.date}
                        </span>
                      </div>




                      {/* Title */}
                      <h3 className="text-body font-bold">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <div className="line-clamp-4">
                        {item.content && <RichText data={item.content} enableGutter={false} enableProse={false} />}
                      </div>
                    </div>


                    {/* Buttons */}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setIsOpen(true);
                        }}
                        className="underline font-semibold"
                      >
                        Watch Now (Free)
                      </button>

                      {/* {item.link && (
                                                <Link
                                                    target="_blank"
                                                    href={item.link}
                                                    className="underline font-semibold hover:text-pink-600 transition-colors ml-4"
                                                >
                                                    View Details
                                                </Link>
                                            )} */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No results */}
          {filteredWebinars.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No webinars found matching your criteria.</p>
            </div>
          )}

          {/* Modal for registration */}
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
                <h2 className="text-2xl font-bold mb-4">Register for {selectedItem?.title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-md px-3 py-2 mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium ">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-md px-3 py-2 mt-1"
                    />
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium">
                      Phone (optional)
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 mt-1"
                    />
                  </div>
                  <div>
                    <p>
                      Are you human? Then please select
                      <strong>{randomLabel}</strong>.
                    </p>
                  </div>
                  <div className="input-box">
                    <div className="icon-options">
                      {loading ? (
                        <LoadingDots />
                      ) : (
                        randomIcons.map((icon, i) => {
                          return (
                            <label key={i} className="icon-label">
                              <input
                                type="radio"
                                name="selectedIcon"
                                value={icon.label}
                                checked={form.selectedIcon === icon.label}
                                onChange={handleChange}
                                className="hidden"
                              />
                              <div className="icon-container">
                                <Image
                                  className="rendom-img"
                                  src={icon.image}
                                  alt={icon.label}
                                  width={25}
                                  height={25}
                                />
                              </div>
                            </label>
                          );
                        })
                      )}
                    </div>

                    {errors.selectedIcon && (
                      <p className="error-text">{errors.selectedIcon}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-gray-200 rounded-md "
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#EEA7DF4D] text-black rounded-md "
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-black"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>
          )}
          {/* Loader */}
          {hasMore && (
            <div
              ref={loaderRef}
              className="w-full h-12 flex justify-center items-center"
            >
              <span className="text-gray-500 text-sm">Loading more...</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
