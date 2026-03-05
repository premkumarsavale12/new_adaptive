import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ToolSection } from '@/blocks/Our_free_tools/Component'
import { Card } from '@/blocks/Card/Component'
import { MarketShieldBlock } from '@/blocks/MarketShield/Component'
import { HorizontalContent } from '@/blocks/Advisors-Wealth-Managers/Component'
import { LeaderShip } from '@/blocks/LeaderShip/Component'
import { Hero_Image } from '@/blocks/Hero_Image/Component'
import { Hero_with_content } from './Hero_with_content/Component'
import { Tailored_Tool } from './Tailored_Tool/Component'
import { Advisors_Choose_Adaptive } from './why-advisors-choose-adaptive/Component'
import { Market_Shield_for_Individual } from './market_shield_for_individual/Component'
import { Adaptive_Factor } from '@/blocks/Adaptive_Factor/Component'
import { Adaptive_Portfolio } from '@/blocks/Adaptive_Portfolio/Component'
import { Cboe } from '@/blocks/Cboe/Component'
import { Covered } from '@/blocks/Covered/Component'
import { Down_Protection } from '@/blocks/Down_Protection/Component'
import { Effortless } from '@/blocks/Effortless/Component'
import { Enterprise_Soluction } from '@/blocks/Enterprise_Soluction/Component'
import { For_Feature } from '@/blocks/For_Feature/Component'
import { How_to_manage } from '@/blocks/How_to_manage/Component'
import { Measure_Portfilio } from '@/blocks/Manage_PortFilio/Component'
import { Measure_Fit } from '@/blocks/Measure_Fit/Component'
import { Measure_risk } from '@/blocks/Measure_risk/Component'
import { Personalize } from '@/blocks/Personalize/Component'
import { Personalized } from '@/blocks/Personalized/Component'
import { Safeguard } from '@/blocks/Safeguard/Component'
import { See_For } from '@/blocks/See_For/Component'
import { Tailored_downside } from '@/blocks/Tailored_downside/Component'
import { The_Call_Writing } from '@/blocks/The_Call_Writing/Component'
import { The_Put_Buying } from '@/blocks/The_Put_Buying/Component'
import { UnderStandingAdaptive } from '@/blocks/Understanding_Adaptive/Component'
import { Understanding_Risk } from '@/blocks/Understanding_Risk/Component'
import { What_is_market } from '@/blocks/What_is_market/Component'
import { What_is_project_risk } from '@/blocks/What_is_project_risk/Component'
import { Hero_Section_2 } from '@/blocks/Hero_Section_2/Component'
import { Pricing } from '@/blocks/Pricing/Component'
import RiskWeather from '@/blocks/risk_weather/component'
import RiskContribution from '@/blocks/risk_contribution/Component'
import ToolTab from '@/blocks/ToolsTab/Component'
import { Protection_Calculator } from '@/blocks/protection-calculator/Component'
import { Forward_Test } from '@/blocks/Forward_Test/Component'
import Faq from '@/blocks/Faq/Component'
import { Tools_Sections } from '@/blocks/Tools_Section/Component'
import { Intelligences_report } from '@/blocks/Intelligence_report/Component'
import { Cta_Section } from '@/blocks/Cta_Section/Component'
import { Media_Section } from '@/blocks/Media_Section/Component'





const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  Our_free_tools: ToolSection,
  card: Card,
  marketShield: MarketShieldBlock,
  horizontalContent: HorizontalContent,
  leaderShip: LeaderShip,
  hero_image: Hero_Image,
  hero_with_content: Hero_with_content,
  tailored_tool: Tailored_Tool,
  advisors_choose_adaptive: Advisors_Choose_Adaptive,
  market_shield_for_individual: Market_Shield_for_Individual,
  adaptive_factor: Adaptive_Factor,
  adaptive_portfolio: Adaptive_Portfolio,
  cboe: Cboe,
  covered: Covered,
  down_protection: Down_Protection,
  effortless: Effortless,
  enterprise_soluction: Enterprise_Soluction,
  for_feature: For_Feature,
  how_to_manage: How_to_manage,
  manage_portfilio: Measure_Portfilio,
  measure_fit: Measure_Fit,
  measure_risk: Measure_risk,
  personalize: Personalize,
  personalized: Personalized,
  safeguard: Safeguard,
  see_for: See_For,
  tailored_downside: Tailored_downside,
  the_call_writing: The_Call_Writing,
  the_put_buying: The_Put_Buying,
  understanding_adaptive: UnderStandingAdaptive,
  understanding_risk: Understanding_Risk,
  what_is_market: What_is_market,
  what_is_project_risk: What_is_project_risk,
  hero_section_2: Hero_Section_2,

  pricing: Pricing,
  faq: Faq,
  risk_weather: RiskWeather,
  risk_contribution: RiskContribution,
  toolstab: ToolTab,
  protection_calculator: Protection_Calculator,
  forward_test: Forward_Test,
  tools_section: Tools_Sections,
  intelligences_report: Intelligences_report,
  cta_section: Cta_Section,
  media_section: Media_Section


}

export const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = ({ blocks }) => {
  if (!blocks?.length) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[
            blockType as keyof typeof blockComponents
          ] as React.ComponentType<Record<string, unknown>>

          return (
            <div className="" key={index}>
              <Block
                {...(block as unknown as Record<string, unknown>)}
                disableInnerContainer={true}
              />
            </div>
          )
        }

        return null
      })}
    </Fragment>
  )
}
