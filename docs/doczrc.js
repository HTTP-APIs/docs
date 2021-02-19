export default {
    files: '**/*.{md,markdown,mdx}',
    menu:[
        "Welcome to Hydra Ecosystem Docs",
        "Quickstart",
        {name: 'Tutorial', menu:['First Tutorial']},
        {name: 'How To Guides', menu: ['First How to Guide']},
        {name: 'Conceptual Guides', menu: ['Pagination in Hydra']},
        {name: 'Modules', menu: ['Hydra in Depth']},
        {name: 'FAQ', menu: ['Some Questions']},
    ],
    ignore: ['readme.md', 'changelog.md', 'code_of_conduct.md', 'contributing.md', 'license.md'],
}