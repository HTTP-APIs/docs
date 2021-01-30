export default {
    files: '**/*.{md,markdown,mdx}',
    menu:[
        "Welcome to Hydra Ecosystem Docs",
        "Quickstart",
        {name: 'Tutorial', menu:['First Tutorial']},
        {name: 'How To Guides', menu: ['How to use Authentication in Hydrus']},
        {name: 'Conceptual Guides', menu: ['Conceptual Guide 1']},
        {name: 'Modules', menu: ['Hydra in Depth']},
        {name: 'FAQ', menu: ['Some Questions']},
    ],
    ignore: ['readme.md', 'changelog.md', 'code_of_conduct.md', 'contributing.md', 'license.md'],
}