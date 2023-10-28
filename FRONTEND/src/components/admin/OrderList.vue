<template>
    <head>
        <title>Quản Lý Đơn Hàng</title>
    </head>
    <div class="page-heading">
        <div class="page-title">
            <div class="row mb-3">
                <div class="col-12  order-md-1 order-last">
                    <h3 class="text-center text-primary py-2">QUẢN LÝ HÓA ĐƠN</h3>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="card">
                <div class="card-header d-flex justify-content-between row" style="margin-left: 0;">
                    <div class="row">
                        <h4 class="col-4 mt-1"></h4>
                        <div class="col-8">
                            <input class="form-control" type="text" placeholder="search" v-model="searchText" />
                        </div>
                    </div>
                    <div class="col-2"></div>
                </div>
                <div class="card-body">
                    <table class="table table-striped text-center" id="table1">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên khách hàng</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Ngày chỉnh sửa</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(order, index) in filteredOrders" :key="order._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ order.customer.name }}</td>
                                <td>{{ order.total }}</td>
                                <td
                                    :style="{ color: order.status === 0 ? 'grey' : order.status === 1 ? 'green' : 'red', fontWeight: 'bold' }">
                                    {{ order.status === 0 ? "Chưa duyệt..." : order.status === 1 ? "Đã duyệt" : "Đã hủy" }}
                                </td>
                                <td>{{ order.created_at }}</td>
                                <td>{{ order.updated_at }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <router-link :to="{ name: 'admin.order.detail', params: { id: order._id } }">
                                            <button type="button" class="btn btn-info">Chi tiết</button>
                                        </router-link>
                                        <button v-if="order.status === 0" type="button"
                                            @click="updateOrderStatus(order._id, { status: 1 })"
                                            class="btn btn-success ms-3">Duyệt
                                        </button>
                                        <button v-if="order.status === 0" type="button"
                                            @click="updateOrderStatus(order._id, { status: 2 })"
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
import { defineComponent, reactive, ref, computed } from "vue";
import OrderService from "@/services/order.service";

export default defineComponent({
    props: {
        orders: { type: Array, default: [] },
    },

    setup(props, context) {
        const searchText = ref("");
        const filteredOrders = computed(() => {
            if (!searchText.value) {
                return reactive(props.orders);
            }
            return props.orders.filter((order) =>
                Object.values(order).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });
        //Duyệt đơn hàng
        const updateOrderStatus = async (id, data) => {
            if (confirm("Bạn muốn duyệt đơn hàng này?")) {
                try {
                    await OrderService.updateOrderStatus(id, data);
                    context.emit("rerender:orders", reactive(props.orders));
                } catch (error) {
                    console.log(error);
                }
            }
        };

        return {
            searchText,
            filteredOrders,
            updateOrderStatus,
        };
    },
});
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css";
</style>