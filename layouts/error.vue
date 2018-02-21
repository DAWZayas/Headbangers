<template>
    <div class="text-center">
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred: {{error.statusCode}}</h1>
        <a class="link" href="/">Home page</a>
    </div>
</template>

<script>
import HeaderComponent from '~/components/header/HeaderComponent'
import SideMenu from '~/components/SideMenu'
import FooterComponent from '~/components/FooterComponent'
export default {
    layout: 'default',
    components: {
        HeaderComponent,
        SideMenu,
        FooterComponent
    },
    props: ['error']
}
</script>