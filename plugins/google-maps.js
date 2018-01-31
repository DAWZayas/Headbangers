import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB0BavoaQqF9ViPldtHAp4kj2FJ7CHAFRI',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})