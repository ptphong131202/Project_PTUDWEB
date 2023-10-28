<template>
    <head>Đơn Hàng </head>
    <div class="container">
        <h3 class="text-center text-primary py-3">HÓA ĐƠN CỦA BẠN</h3>
        <section class="section">
            <div class="card">
                <div class="card-body">
                    <table class="table table-striped text-center" id="table1">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID hóa đơn</th>
                                <th>Tổng giá</th>
                                <th>Ngày đặt</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(order, index) in state.orders" :key="order._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ order._id }}</td>
                                <td>{{ order.total }}</td>
                                <td>{{ order.created_at }}</td>
                                <td
                                    :style="{ color: order.status === 0 ? 'grey' : order.status === 1 ? 'green' : 'red', fontWeight: 'bold' }">
                                    {{ order.status === 0 ? "Chưa duyệt..." : order.status === 1 ? "Đã duyệt" : "Đã hủy" }}
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <router-link :to="{ name: 'customer.order.detail', params: { id: order._id } }">
                                            <button type="button" class="btn btn-info">Chi tiết</button>
                                        </router-link>
                                        <button v-if="order.status === 0" type="button"
                                            @click="updateCancelOrderStatus(order._id, { status: 2 })"
                                            class="btn btn-danger ms-3">Hủy
                                        </button>
                                        <button v-if="order.status !== 0" type="button"
                                            class="btn btn-warning ms-3">N/A</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
import { defineComponent, reactive, ref } from "vue";
import OrderService from "@/services/order.service";
import VueJwtDecode from "vue-jwt-decode";

export default defineComponent({
    setup(props, context) {
        const activeIndex = ref(-1);
        const state = reactive({
            orders: [],
        });

        const retrieveOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const decoded = VueJwtDecode.decode(token);
                const orders = await OrderService.getUserOrders(decoded.id);
                state.orders = orders;
            } catch (error) {
                console.log(error);
            }
        };

        //Duyệt đơn hàng
        const updateCancelOrderStatus = async (id, data) => {
            if (confirm("Bạn muốn duyệt đơn hàng này?")) {
                try {
                    await OrderService.updateOrderStatus(id, data);
                    retrieveOrders();
                } catch (error) {
                    console.log(error);
                }
            }
        };

        retrieveOrders();
        return {
            state,
            activeIndex,
            retrieveOrders,
            updateCancelOrderStatus,
        };
    },
});
</script>
  
<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css";

.table thead th {
    font-weight: bold;
    background-color: #f8f9fa;
    border-color: #dee2e6;
    text-align: center;
}

.table tbody td {
    vertical-align: middle;
    text-align: center;
}

.table tbody tr:nth-child(odd) {
    background-color: #f2f2f2;
}

.table tbody tr:hover {
    background-color: #dcdcdc;
}
</style>
  