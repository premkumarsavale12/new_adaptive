'use client'

import { useEffect } from 'react'

export const HideHeaderFooter: React.FC = () => {
    useEffect(() => {
        const header = document.querySelector('.header') as HTMLElement
        const footer = document.querySelector('.footer') as HTMLElement

        if (header) {
            header.style.display = 'none'
        }
        if (footer) {
            footer.style.display = 'none'
        }

        return () => {
            if (header) {
                header.style.display = ''
            }
            if (footer) {
                footer.style.display = ''
            }
        }
    }, [])

    return null
}
