<template>
    <div class="ground">
        <div class="bg-wrapper design-bg"></div>
        <Header></Header>
        <router-view></router-view> 
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
    components: {Header, Footer}
}
</script>

<style scope>
.bg-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -10;

    height: 100%;
}
</style>