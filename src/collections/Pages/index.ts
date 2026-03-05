import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'


import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { ToolSection } from '@/blocks/Our_free_tools/config'
import { Card } from '@/blocks/Card/config'
import { MarketShield } from '@/blocks/MarketShield/config'
import { HorizontalContent } from '@/blocks/Advisors-Wealth-Managers/config'
import { LeaderShip } from '@/blocks/LeaderShip/config'
import { Hero_Image } from '@/blocks/Hero_Image/config'
import { Adaptive_Factor } from '@/blocks/Adaptive_Factor/config'
import { Adaptive_Portfolio } from '@/blocks/Adaptive_Portfolio/config'
import { Cboe } from '@/blocks/Cboe/config'
import { Covered } from '@/blocks/Covered/config'
import { Down_Protection } from '@/blocks/Down_Protection/config'
import { Effortless } from '@/blocks/Effortless/config'
import { Enterprise_Soluction } from '@/blocks/Enterprise_Soluction/config'
import { For_Feature } from '@/blocks/For_Feature/config'
import { How_to_manage } from '@/blocks/How_to_manage/config'
import { Manage_PortFilio } from '@/blocks/Manage_PortFilio/config'
import { Measure_Fit } from '@/blocks/Measure_Fit/config'
import { Measure_risk } from '@/blocks/Measure_risk/config'
import { Personalize } from '@/blocks/Personalize/config'
import { Personalized } from '@/blocks/Personalized/config'
import { Safeguard } from '@/blocks/Safeguard/config'
import { See_For } from '@/blocks/See_For/config'
import { Tailored_downside } from '@/blocks/Tailored_downside/config'
import { The_call_Writing } from '@/blocks/The_Call_Writing/config'
import { The_Put_Buying } from '@/blocks/The_Put_Buying/config'
import { UnderStanding_Adaptive } from '@/blocks/Understanding_Adaptive/config'
import { Understanding_Risk } from '@/blocks/Understanding_Risk/config'
import { What_is_market } from '@/blocks/What_is_market/config'
import { What_is_project_risk } from '@/blocks/What_is_project_risk/config'
import { Market_Shield_for_Individual } from '@/blocks/market_shield_for_individual/config'
import { Hero_Section_2 } from '@/blocks/Hero_Section_2/config'
import { Faq } from '@/blocks/Faq/config'
import { Pricing } from '@/blocks/Pricing/config'
import { risk_weather } from '@/blocks/risk_weather/config'
import { risk_contribution } from '@/blocks/risk_contribution/config'
import { Protection_Calculator } from '@/blocks/protection-calculator/config'
import { Forward_Test } from '@/blocks/Forward_Test/config'
import { Tools_Section } from '@/blocks/Tools_Section/config'
import { Intelligence_report } from '@/blocks/Intelligence_report/config'
import { Cta_Section } from '@/blocks/Cta_Section/config'
import { Media_Section } from "@/blocks/Media_Section/config"

import { ToolsTab } from '@/blocks/ToolsTab/config'


import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { Hero_with_content } from '@/blocks/Hero_with_content/config'
import { Tailored_Tool } from '@/blocks/Tailored_Tool/config'
import { Advisors_Choose_Adaptive } from '@/blocks/why-advisors-choose-adaptive/config'


export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      type: 'tabs',
      tabs: [
        // {
        //   fields: [hero],
        //   label: 'Hero',
        // },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [

                Hero_Image,
                HorizontalContent,
                MarketShield,
                ToolSection,
                LeaderShip,
                Card,
                Hero_with_content,
                Tailored_Tool,
                Advisors_Choose_Adaptive,
                Adaptive_Factor,
                Adaptive_Portfolio,
                Cboe,
                Covered,
                Down_Protection,
                Effortless,
                Enterprise_Soluction,
                For_Feature,
                How_to_manage,
                Manage_PortFilio,
                Measure_Fit,
                Measure_risk,
                Personalize,
                Personalized,
                Safeguard,
                See_For,
                Tailored_downside,
                The_call_Writing,
                The_Put_Buying,
                UnderStanding_Adaptive,
                Understanding_Risk,
                What_is_market,
                What_is_project_risk,
                Market_Shield_for_Individual,
                Hero_Section_2,
                Faq,
                Pricing,
                risk_weather,
                risk_contribution,
                ToolsTab,
                Protection_Calculator,
                Forward_Test,
                Tools_Section,
                Intelligence_report,
                Cta_Section,
                Media_Section


              ],

              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
