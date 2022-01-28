export default {
    files: '**/*.{md,markdown,mdx}',
    menu:[
        "Welcome to Hydra Ecosystem Docs",
        "Quickstart",
        {name: 'Tutorial', menu:['Workflow']},
        {name: 'How To Guides', menu: ['First How to Guide']},
        {name: 'Conceptual Guides', menu: ['Conceptual Guide 1']},
        {name: 'Usage', menu: ['CLI Usage of hydrus']},
        {name: 'Modules', menu: ['Hydra in Depth']},
        {name: 'FAQ', menu: ['Some Questions']},
        
    ],
    ignore: ['readme.md', 'changelog.md', 'code_of_conduct.md', 'contributing.md', 'license.md'],
}