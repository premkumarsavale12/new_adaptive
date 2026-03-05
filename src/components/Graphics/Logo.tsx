import React from 'react'
import Image from 'next/image'
const Logo: React.FC = () => {
    return (
        <Image
            src="/media/adaptive-Logo.svg"
            alt="Adaptive Logo"
            height={150}
            width={150}
        // style={{ width: '150px' }}
        />
    )
}

export default Logo
