import React from 'react'
import { HideHeaderFooter } from '@/components/HideHeaderFooter'

export default function PromotionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .header { display: none !important; }
          `,
        }}
      />

      <HideHeaderFooter />

      {children}

 
      <footer className="py-[50px] bg-white-100">
        <div className="container">
          <h3 className="text-center">
            2025 © Adaptive Investment Solutions LLC
          </h3>
        </div>
      </footer>
    </>
  )
}
