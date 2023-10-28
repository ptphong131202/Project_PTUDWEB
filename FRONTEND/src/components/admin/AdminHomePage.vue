<template>
    <div class="w3-light-grey" style="height: 100vh;">
        <AppBar></AppBar>
        <AppDrawer></AppDrawer>
        <div class="w3-overlay w3-hide-large w3-animate-opacity" style="cursor: pointer"></div>
        <div class="w3-main" style="margin-left: 310px; ">
            <router-view v-slot="{ Component }">
                <transition name="fade">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script>
import AppDrawer from "@/components/admin/AppDrawer.vue";
import AppBar from "@/components/admin/AppBar.vue";
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        AppBar,
        AppDrawer,
    },
});
</script>

<style>
@import url(https://www.w3schools.com/w3css/4/w3.css);
@import url(https://fonts.googleapis.com/css?family=Raleway);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
</style>