export default {
    files: '**/*.{md,markdown,mdx}',
    menu:[
        "Welcome to Hydra Ecosystem Docs",
        "Quickstart",
        {name: 'Tutorial', menu:['First Tutorial']},
        {name: 'How To Guides', menu: ['First How to Guide']}
    ],
    ignore: ['readme.md', 'changelog.md', 'code_of_conduct.md', 'contributing.md', 'license.md'],
}