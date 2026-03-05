import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Footer as FooterType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navigation || []
  const logo =
    footerData?.footerlogo && typeof footerData.footerlogo === 'object'
      ? footerData.footerlogo
      : null
  return (
 <footer className="footer lg:py[100px] md:py-[80px] py-[50px] bg-white-100">
        <div className="container">
          <div className="inner flex justify-start items-start gap-8 xlg:gap-[48px] xl:gap-[64px]  flex-wrap *:xl:w-[calc(25%-126px)] *:xlg:w-[calc(25%-93px)] *:md:w-[calc(33%-20px)] *:w-full">
            {/* Logo */}
            <div className="foot-col">
              <div className="footlogo">
                {logo?.url && (
                  <Link href="/" role="link">
                    <Image src={logo.url} width={159} height={44} alt={logo.alt ?? 'Footer logo'} />
                  </Link>
                )}
              </div>
            </div>
 
            {/* Services */}
            {navItems?.length > 0 &&
              navItems.map((item, i) => (
                <div key={i} className="foot-col space-y-4">
                  <div className="title text-smtitle *:text-black font-bold font-overpass">
                    <p>{item.heading}</p>
                  </div>
                  <div className="foot-menu">
                    <ul className="list-none p-0 space-y-4 font-inter text-black-100 font-normal">
                      {item?.menus
                        ?.filter((menu) => !!menu.url)
                        .map((subItem, index) => (
                          <li key={index}>
                            <Link href={subItem.url!}>{subItem.label}</Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </footer>
  )
}
