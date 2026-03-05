import { Block } from "payload";

export const Media_Section: Block = {
    slug: 'media_section',
    imageURL: '/block-previews/media_section.png',
    imageAltText: 'Media Section',
    interfaceName: 'media_section',
    labels: {
        singular: 'media_section',
        plural: 'media_sections'
    },
    fields: [


        {
            name: 'video',
            type: 'upload',
            relationTo: 'media',
            label: 'Upload Video',
        },
    ],




}