// import { Block } from "payload/types";

import { Block } from "payload";

export const ToolsTab: Block = {
     slug: 'toolstab',
     imageURL: '/block-previews/toolstab.png',
     imageAltText: 'toolstab preview',
     interfaceName: 'toolstab',
     labels: {
          singular: 'toolstab',
          plural: 'toolstabs'
     },
     fields: [
          {
               name: "tabs",
               type: "array",

               fields: [
                    {
                         name: "label",
                         type: "text",

                    },
                    {
                         name: 'Url',
                         type: 'text',
                         label: {
                              en: 'URL',
                              de: 'URL',
                         },
                    },
                    {
                         name: 'target',
                         type: 'select',
                         label: {
                              en: 'Target',
                              de: 'Ziel',
                         },
                         options: [
                              {
                                   label: {
                                        en: 'Same Tab',
                                        de: 'Gleiches Fenster',
                                   },
                                   value: '_self',
                              },
                              {
                                   label: {
                                        en: 'New Tab',
                                        de: 'Neues Fenster',
                                   },
                                   value: '_blank',
                              },
                         ],
                         defaultValue: '_self',
                    },
               ],
          },
     ],
}