'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Header } from '@/payload-types'

interface HeaderClientProps {
  data: Header
}

type DropdownRef = {
  button: HTMLElement | null
  menu: HTMLElement | null
}

type HeaderMenuItem = {
  link?: {
    label?: string | null
    url?: string | null
    target?: '_self' | '_blank' | null
  }

  menuType?: 'single' | 'mega' | null
  megaColumns?: number | null
  megaWidth?: 'sm' | 'md' | 'lg' | null

  submenus?:
  | {
    links?:
    | {
      link?: {
        label?: string | null
        url?: string | null
        target?: '_self' | '_blank' | null
      }
    }[]
    | null
  }[]
  | null
}

const getMegaWidthClass = (width?: 'sm' | 'md' | 'lg' | null) => {
  switch (width) {
    case 'sm':
      return 'lg:w-[400px]'
    case 'lg':
      return 'lg:w-[700px]'
    case 'md':
    default:
      return 'lg:w-[520px]'
  }
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const dropdownRefs = useRef<DropdownRef[]>([])
  const dropdownMenus = useRef<(HTMLElement | null)[]>([])
  const [isSticky, setIsSticky] = useState(false)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const toggleSidebar = () => setIsSidebarOpen((p) => !p)

  const setDropdownRef = (index: number, button: HTMLElement | null, menu: HTMLElement | null) => {
    dropdownRefs.current[index] = { button, menu }
  }

  const isMobile = useCallback(() => typeof window !== 'undefined' && window.innerWidth <= 1024, [])

  const openMenu = useCallback((menu: HTMLElement | null) => {
    if (!menu) return
    menu.style.maxHeight = `${menu.scrollHeight}px`
    menu.classList.remove('opacity-0', 'invisible')
    menu.classList.add('opacity-100', 'visible')
  }, [])

  const closeMenu = useCallback((menu: HTMLElement | null) => {
    if (!menu) return
    menu.style.maxHeight = '0px'
    menu.classList.remove('opacity-100', 'visible')
    menu.classList.add('opacity-0', 'invisible')
  }, [])

  useEffect(() => {
    dropdownRefs.current.forEach(({ button, menu }) => {
      if (!button || !menu) return

      let timer: ReturnType<typeof setTimeout>

      const enter = () => {
        if (isMobile()) return
        clearTimeout(timer)
        openMenu(menu)
      }

      const leave = () => {
        if (isMobile()) return
        timer = setTimeout(() => closeMenu(menu), 200)
      }

      const click = (e: MouseEvent) => {
        if (!isMobile()) return
        e.preventDefault()
        const isOpen = menu.style.maxHeight !== '0px' && menu.style.maxHeight !== ''
        if (isOpen) {
          closeMenu(menu)
        } else {
          openMenu(menu)
        }
      }

      button.addEventListener('mouseenter', enter)
      button.addEventListener('mouseleave', leave)
      menu.addEventListener('mouseenter', enter)
      menu.addEventListener('mouseleave', leave)
      button.addEventListener('click', click)

      return () => {
        button.removeEventListener('mouseenter', enter)
        button.removeEventListener('mouseleave', leave)
        menu.removeEventListener('mouseenter', enter)
        menu.removeEventListener('mouseleave', leave)
        button.removeEventListener('click', click)
        clearTimeout(timer)
      }
    })
  }, [openMenu, closeMenu, isMobile])

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return

      const offsetTop = headerRef.current.offsetTop
      setIsSticky(window.scrollY > offsetTop)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const hasSubmenu = (menu: HeaderMenuItem) =>
    Array.isArray(menu.submenus) && menu.submenus.length > 0

  const headerLogo =
    data.Header_Logo && typeof data.Header_Logo === 'object' ? data.Header_Logo : null

  return (
    <>
      <header
        ref={headerRef}
        className={`header fixed w-full z-[99] transition-all duration-300 ${isSticky ? 'is-sticky' : ''}`}
      >
        {/* {data.Announcement_Enable ? ( */}
        <div className="header-top text-base leading-relaxed bg-blue px-4 py-3 text-center text-white flex justify-center items-center">
          <p className="flex  justify-center text-center flex-wrap items-center gap-1">
            <span className="font-normal text-white">
              {data.Announcement_Heading ||
                'Are Your Portfolios Hedgeable with Tax-Smart Index Options?'}
            </span>

            {data.Announcement_Button_text?.url ? (
              <Link
                href={data.Announcement_Button_text.url}
                className="font-normal text-[#e58b76] hover:text-[#fff] underline transition-colors"
              >
                {data.Announcement_Button_text?.label || ' Free On-Demand Webinars.'}
              </Link>
            ) : null}
          </p>
        </div>
        {/* ) : (
          <></>
        )} */}
        <div className="haeder-btm lg:py-0 py-[34px] border-b-black-200 border-b-solid border-b-[1px] w-full left-0 top-0 z-[99] bg-white">
          <div className="container">
            <div className="w-full flex justify-between items-center gap-3 2xl:gap-8">
              {/* Logo */}
              <Link href="/" className="max-w-[170px]">
                <Image src={headerLogo?.url || ''} alt="logo" width={159} height={44} priority />
              </Link>

              {/* Navigation */}
              <nav
                className={`
              fixed left-0 transform lg:translate-x-0 transition-transform duration-500 lg:left-0 top-0 lg:relative w-[300px] lg:w-auto h-full lg:h-auto px-6 py-12 lg:p-0 bg-blue lg:bg-transparent flex lg:justify-center justify-start lg:items-center items-start gap-[48px] flex-col lg:flex-row overflow-y-auto lg:overflow-visible z-[9999] no-scrollbar ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                  }`}
              >
                {/* Sidebar toggle button */}
                <button
                  className="lg:hidden vs-menu-toggle w-5 h-5 absolute
                top-3 right-3"
                  aria-label="Toggle button"
                  onClick={toggleSidebar}
                >
                  {/* Hamburger icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 384 512"
                  >
                    <path
                      d="M342.6 150.6a32 32 0 0 0-45.3-45.3L192 210.7 86.6 105.4a32 32 0 0 0-45.3 45.3L146.7 256 41.4 361.4a32 32 0 0 0 45.3 45.3L192 301.3l105.4 105.3a32 32 0 0 0 45.3-45.3L237.3 256l105.3-105.4z"
                      fill="#fff"
                    />
                  </svg>
                </button>
                <ul className="flex lg:items-center items-start gap-4 2xl:gap-3 text-body lg:flex-row flex-col lg:text-black text-white font-inter font-medium lg:w-auto w-full">
                  {data.menus?.map((menu, index) => {
                    const hasDropdown = hasSubmenu(menu)
                    const layout = menu.menuType ?? 'single'
                    const columns = menu.megaColumns ?? 2
                    const widthClass = getMegaWidthClass(menu.megaWidth)

                    return (
                      <li key={index} className="relative w-full lg:w-auto">
                        <Link
                          href={menu.link?.url || '#'}
                          target={menu.link?.target ?? '_self'}
                          className="group flex items-center justify-between lg:text-black text-white hover:lg:text-blue cursor-pointer w-full lg:w-auto"
                          ref={(el) => {
                            if (el && hasDropdown) {
                              setDropdownRef(index, el, dropdownMenus.current[index])
                            }
                          }}
                        >
                          {menu.link?.label}
                          {hasDropdown && (
                            <span className="down-arrow ml-2">
                              {' '}
                              <svg
                                className="transition-colors duration-300 !fill-white lg:!fill-black group-hover:fill-blue"
                                height="14"
                                width="14"
                                viewBox="0 0 330 330"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {' '}
                                <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />{' '}
                              </svg>{' '}
                            </span>
                          )}
                        </Link>

                        {hasDropdown && (
                          <div
                            className={`
                            dropdown-content
                            static lg:absolute
                            left-1/2 top-full
                         bg-white lg:bg-white bg-transparent
                            rounded
                            overflow-hidden
                            transition-all duration-300 ease-out
                            max-h-0
                          lg:-translate-x-[60%] lg:shadow-xl shadow-[0px_4px_10px_rgba(255,255,255,0.5)] opacity-0 invisible
                            z-10
                           border-t border-t-black-200
                            ${layout === 'mega' ? `${widthClass} lg:-translate-x-[60%]` : 'lg:w-[20vw] lg:-translate-x-[60%]'}
                          `}
                            ref={(el) => {
                              if (el) {
                                dropdownMenus.current[index] = el
                                setDropdownRef(
                                  index,
                                  dropdownRefs.current[index]?.button ?? null,
                                  el,
                                )
                              }
                            }}
                          >
                            {/* ===== SINGLE DROPDOWN ===== */}
                            {layout === 'single' && (
                              <ul className="flex flex-col p-4 space-y-4 text-black">
                                {menu.submenus?.map((submenu, subIndex) =>
                                  submenu.links?.map((item, itemIndex) => (
                                    <li key={`${subIndex}-${itemIndex}`}>
                                      <Link
                                        href={item.link?.url || '#'}
                                        target={item.link?.target ?? '_self'}
                                        className="hover:text-blue block"
                                        onClick={() => setIsSidebarOpen(false)}
                                      >
                                        {item.link?.label}
                                      </Link>
                                    </li>
                                  )),
                                )}
                              </ul>
                            )}

                            {/* ===== MEGA MENU ===== */}
                            {layout === 'mega' && (
                              <div
                                className="flex flex-col lg:grid gap-x-10 gap-y-4 p-6 lg:text-black text-white"
                                style={!isMobile() ? {
                                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                                } : {}}
                              >
                                {menu.submenus?.map((submenu, subIndex) =>
                                  submenu.links?.map((item, itemIndex) => (
                                    <Link
                                      key={`${subIndex}-${itemIndex}`}
                                      href={item.link?.url || '#'}
                                      target={item.link?.target ?? '_self'}
                                      className="hover:text-blue whitespace-nowrap"
                                      onClick={() => setIsSidebarOpen(false)}
                                    >
                                      {item.link?.label}
                                    </Link>
                                  )),
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>

                <div className="button-area flex items-center">
                  <div className="btn-link *:text-4 border-green hover:border-black cursor-pointer">
                    <Link href="#" role="link">
                      Sign In
                    </Link>
                  </div>
                  <div className="btn-green *:text-4">
                    <Link href="#" role="link">
                      Sign Up
                    </Link>
                  </div>
                </div>
              </nav>

              {/* Mobile Toggle */}
              <div
                className="menu w-10 h-10 p-1 flex flex-col justify-center items-center gap-1 border-blue border-[1px] border-solid cursor-pointer lg:hidden"
                onClick={toggleSidebar}
              >
                {' '}
                <div className="bg-blue w-8 h-[3px]"></div>{' '}
                <div className="bg-blue w-8 h-[3px]"></div>{' '}
                <div className="bg-blue w-8 h-[3px]"></div>{' '}
              </div>
            </div>
          </div>
        </div>
      </header >
    </>
  )
}
