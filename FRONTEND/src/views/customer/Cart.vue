<template>
    <head>
        <title>Giỏ Hàng</title>
    </head>
    <div class="container">
        <div class="page-heading">
            <h3 class="text-center text-primary py-3">GIỎ HÀNG CỦA BẠN</h3>
            <section class="section">
                <div class="card">
                    <div class="card-body">
                        <table class="table table-striped" id="table1">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên bánh</th>
                                    <th>Ảnh bánh</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(product, index) in state.customer.cart" :key="product.product_id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ product.name }}</td>
                                    <td>
                                        <img :src="'http://localhost:3000/' + product.image" alt="" style="width: 100px" />
                                    </td>
                                    <td>{{ (product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                    }}</td>
                                    <td>{{ product.quantity_sale }}</td>
                                    <td>{{ (product.subtotal).toLocaleString('it-IT', {
                                        style: 'currency', currency: 'VND'
                                    }) }}</td>
                                    <td>
                                        <button type="button" @click="deleteProductFromCart(product.product_id)"
                                            class="btn btn-danger ms-3">
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

        <div class="row mt-4">
            <div class="col-8"></div>
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Tổng giá tiền: {{ (state.total).toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND'
                        }) }}</h5>
                        <h5 class="card-title text-end">Khuyến mãi: 0%</h5>
                        <h5 class="card-title text-end">Free Ship</h5>
                        <h5 class="card-title">Thành tiền: {{ (state.total).toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND'
                        }) }}</h5>
                        <div class="text-end">
                            <button class="btn btn-cart btn-primary" @click="addToOrder()">
                                <i class="fas fa-cart-plus"></i> ĐẶT HÀNG
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
import { defineComponent, reactive, ref } from "vue";
import CustomerService from "@/services/customer.service";
import OrderService from "@/services/order.service";
import VueJwtDecode from "vue-jwt-decode";
import { useRouter } from "vue-router";

export default defineComponent({
    setup(props, context) {
        const state = reactive({
            customer: [],
            total: 0,
        });
        const activeIndex = ref(-1);
        const deleteProductFromCart = async (id) => {
            if (confirm("Bạn muốn xóa sản phẩm này trong giỏ hàng?")) {
                try {
                    await CustomerService.deleteProductFromCart(id);
                    retrieveCustomer();
                } catch (error) {
                    console.log(error);
                }
            }
        };
        const retrieveCustomer = async () => {
            try {
                const customer = await CustomerService.getCustomer();
                state.customer = customer;
                state.customer.cart.reduce((acc, product) => {
                    const price = product.price;
                    const quantity_sale = product.quantity_sale;
                    const total_temp = price * quantity_sale;
                    state.total += total_temp;
                }, 0);

            } catch (error) {
                console.log(error);
            }
        };

        const router = useRouter();
        const addToOrder = async () => {
            try {
                const token = localStorage.getItem("token");
                const decoded = VueJwtDecode.decode(token);
                const customer = await CustomerService.getCustomer(decoded.id);
                await OrderService.addToOrder({
                    customer_id: customer._id,
                    products: state.customer.cart,
                    total: state.total,
                });
                await CustomerService.deleteAllProductsFromCart();
                state.customer = [];
                state.total = 0;
                router.push({ name: "order" });
            } catch (error) {
                console.log(error);
            }
        };

        retrieveCustomer();
        return {
            state,
            activeIndex,
            retrieveCustomer,
            deleteProductFromCart,
            addToOrder,
        };
    },
});
</script>
  
<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css";

.card-body {
    background-color: #f8f9fa;
    padding: 1.25rem;
    border: none;
    border-radius: 0.25rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.075);
}

.card-title {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    font-weight: 500;
}

.text-end {
    text-align: right;
}

.btn-cart {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
}

.btn-cart:hover {
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
}
</style>
  