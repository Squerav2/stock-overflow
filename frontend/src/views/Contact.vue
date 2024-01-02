
<template>
    <main class="watchlist-page">
        <Sidebar />
        <Header> </Header>
        <div class="contact-info"> 
            <div class="contact-header">
                <span class="material-icons">mail</span>
                info@stockoverflow.com
                <div class="contact-header-cell">İletişim Bilgileri</div>
                <span class="material-icons">phone</span>
                    <h4>Omer Faruk Sağlam -> 0542 510 55 51</h4>
                    <h4>Efe Ulkem Ceylan -> 0554 592 78 68</h4>
            </div>
            
        </div>
    </main>
</template>

<script setup>
import Sidebar from '../components/SideBar.vue';
import Header from '../components/Header.vue';
</script>

<style scoped>

.contact-info{
    margin-left: 30%;
    margin-top : 10%;
}

</style>
