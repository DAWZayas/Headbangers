const path = require('path')
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
            { type: 'text/javascript', src: '/utils/utils.js' },
            { type: 'text/javascript', src: '/utils/geolocator.min.js' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/img/brand/favicon.ico' },
            { rel: 'manifest', href: 'manifest.json', type: 'application/manifest+json' }
        ]
    },
    env: {
        authNeeded: ['publish', 'account', 'myevents', 'edit'],
        googleMapsKey: 'AIzaSyB0BavoaQqF9ViPldtHAp4kj2FJ7CHAFRI'
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
        'plugins/google-maps.js'
    ],
    build: {
        extend (config, ctx) {
          /* your original config here */
    
          /* add the following */
          config.module.rules.splice(0, 0, {
            test: /\.js$/,
            include: [path.resolve(__dirname, './node_modules/vue2-google-maps')],
            loader: 'babel-loader',
          })
        }
    },
    generate: {
        routes: ['404']
    }
}
