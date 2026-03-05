import React from 'react'
import Image from 'next/image'

const Icon: React.FC = () => {
    return (
        <Image
            src="/media/adaptive-Logo.svg"
            alt="Adaptive Icon"
            height={50}
            width={50}
        // style={{ width: '50px' }}
        />
    )
}

export default Icon
