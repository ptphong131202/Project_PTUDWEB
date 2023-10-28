<template>
    <nav class="w3-sidebar w3-white" style="z-index: 3; width: 300px; z-index: 100;">
        <br />
        <div class="w3-container w3-row">
            <div>
                <img src="../../assets/img/logo/phong.png" style="width: 100px; margin-left: 70px; border-radius: 50%;" />
            </div>
        </div>
        <hr />
        <div class="w3-bar-block">
            <a class="w3-bar-item w3-padding menu-item navbar" @click="goToDashBoard">
                <i class="fa fa-tachometer fa-fw"></i> DASH BOARD
            </a>
            <a class="w3-bar-item w3-padding menu-item navbar" @click="goToCategory">
                <i class="fa fa-list-alt fa-fw"></i> QUẢN LÝ DANH MỤC
            </a>
            <a class="w3-bar-item w3-padding menu-item navbar" @click="goToProduct">
                <i class="fa fa-shopping-cart fa-fw"></i> QUẢN LÝ SẢN PHẨM
            </a>
            <a class="w3-bar-item w3-padding menu-item navbar" @click="goToCustomer">
                <i class="fa fa-users fa-fw"></i> QUẢN LÝ KHÁCH HÀNG
            </a>
            <a class="w3-bar-item w3-padding menu-item navbar" @click="goToOrder">
                <i class="fa fa-file-text fa-fw"></i> QUẢN LÝ HÓA ĐƠN
            </a>
        </div>
    </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { defineComponent } from 'vue';

export default defineComponent({
    components: {

    },
    setup() {
        const router = useRouter();

        const goToDashBoard = () => { router.push({ name: "admin.dashboard.show" }); };
        const goToCategory = () => { router.push({ name: "admin.category.all" }); };
        const goToProduct = () => { router.push({ name: "admin.product.all" }); };
        const goToCustomer = () => { router.push({ name: "admin.customer.all" }); };
        const goToOrder = () => { router.push({ name: "admin.order.all" }); };

        return {
            goToDashBoard,
            goToCategory,
            goToProduct,
            goToCustomer,
            goToOrder,
        };
    },
});
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
@import url(https://www.w3schools.com/w3css/4/w3.css);
@import url(https://fonts.googleapis.com/css?family=Raleway);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);

.w3-sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
}

.navbar {
    color: black;
    text-decoration: none;
}

.menu-item:hover {
    background-color: orange;
    text-decoration: none;
}

.menu-item {
    margin-bottom: 20px;

}

.w3-bar-block {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
}
</style>