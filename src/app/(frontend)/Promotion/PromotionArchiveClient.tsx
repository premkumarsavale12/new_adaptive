"use client"

import React from "react"
import type { Promotion } from "@/payload-types"

export const PromotionArchiveClient = ({
  data,
  renderBlocks,
}: {
  data: Promotion | Promotion[]
  renderBlocks?: React.ReactNode
}) => {

  if (!data) return null
  if (Array.isArray(data)) return null

  return (
    <div>
      {renderBlocks && <div className="w-full">{renderBlocks}</div>}
    </div>
  )
}
