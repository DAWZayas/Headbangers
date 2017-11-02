module.exports = {
    head: {
        title: "Headbangers",
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Find the best concerts around you' }
          ]
    },
    css: [
        '@/assets/styles/main.scss',
        'element-ui/lib/theme-chalk/index.css',
        'assets/styles/linearicons/style.css'
    ],
    plugins: [
        'plugins/element-ui.js'
    ],
}