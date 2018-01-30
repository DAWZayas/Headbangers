module.exports = {
    head: {
        title: 'Headbangers',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Find the best concerts around you' }
        ],
        script: [
            { type: 'text/javascript', src: '/slideout/slideout.js' },
            { type: 'text/javascript', src: '/utils/blob-util.min.js' },
            { type: 'text/javascript', src: '/utils/utils.js' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/img/brand/favicon.ico' },
            { rel: 'manifest', href: 'manifest.json', type: 'application/manifest+json' }
        ]
    },
    env: {
        authNeeded: ['publish', 'account', 'myevents']
    },
    loading: {
        height: '2px',
        color: '#5B7BD5'
    },
    css: [
        '@/assets/styles/main.scss',
        '@/assets/styles/element-custom.scss',
        '@/assets/styles/linearicons/style.css',
        '@/node_modules/element-ui/lib/theme-chalk/index.css',
        '@/static/slideout/slideout.css'
    ],
    plugins: [
        'plugins/element-ui.js',
        {src: 'plugins/slideout.config.js', ssr: false}
    ]
}
