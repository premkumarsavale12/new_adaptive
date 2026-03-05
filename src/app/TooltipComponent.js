import React from "react";
import { Tooltip } from 'react-tooltip';

// import tooltipContent from './TooltipText';
// import TooltipText from '@/app/TooltipText'
import tooltipContent from '@/app/TooltipText'
import Image from "next/image";

export default function TooltipComponent(props) {
    const tooltipValue = tooltipContent[props.id];
    if (tooltipValue) {
        const tooltipId = `tooltip-${props.id.replace(/[\s()%]/g, "")}`;
        return (
            <>
                &nbsp;

                <Image
                    id={tooltipId}
                    src="/media/risk-info.png"
                    alt="Risk information icon" 
                    width={16}               
                    height={16}              
                />


                <Tooltip anchorSelect={`#${tooltipId}`} place="top" variant="dark" clickable={true} html={tooltipValue}>

                </Tooltip>
            </>
        );
    }
}
