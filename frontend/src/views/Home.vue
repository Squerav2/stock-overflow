<template>
    <main class="home-page">
       <Sidebar />
        <Header> </Header>
        <PortfolioComp />
    </main>
    
</template>

<script setup>
import Sidebar from '../components/SideBar.vue';
import Header from '../components/Header.vue';
</script>

<script>
import PortfolioComp from '../components/Stocklist.vue';
export default {
    components: {
        PortfolioComp
    },
}
</script>