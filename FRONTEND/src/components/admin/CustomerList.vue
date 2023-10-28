<template>
    <head>
        <title>Quản Lý Khách Hàng</title>
    </head>
    <div class="page-heading">
        <div class="page-title">
            <div class="row mb-3">
                <div class="col-12 order-md-1 order-last">
                    <h3 class="text-center text-primary py-2">QUẢN LÝ KHÁCH HÀNG</h3>
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
                </div>
                <div class="card-body">
                    <table class="table table-striped text-center" id="table1">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th style="width: 150px;">Họ tên</th>
                                <th style="width: 100px;">Email</th>
                                <th>SĐT</th>
                                <th style="width: 100px;">Ngày sinh</th>
                                <th>Giới tính</th>
                                <th>Địa chỉ</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(customer, index) in filteredCustomers" :key="customer._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ customer.name }}</td>
                                <td style="width: 100px;">
                                    <p class="desc">
                                        {{ customer.email }}
                                    </p>
                                </td>
                                <td>{{ customer.phone }}</td>
                                <td>{{ customer.birthday }}</td>
                                <td>{{ customer.sex === 1 ? 'Nam' : 'Nữ' }}</td>
                                <td>
                                    <p class="desc">
                                        {{ customer.address }}
                                    </p>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <!-- <button type="button" @click="deleteCustomer(customer._id)"
                                            class="btn btn-warning ms-3">Khóa tài khoản
                                        </button> -->
                                        <button type="button" class="btn btn-warning ms-3">Khóa
                                        </button>
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
// import CustomerService from "@/services/customer.service";

export default defineComponent({
    props: {
        customers: { type: Array, default: [] },
    },
    setup(props, context) {
        const searchText = ref("");
        const filteredCustomers = computed(() => {
            if (!searchText.value) {
                return reactive(props.customers);
            }
            return props.customers.filter((customer) =>
                Object.values(customer).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });
        // const deleteCustomer = async (id) => {
        //     if (confirm("Bạn muốn xóa khách hàng này?")) {
        //         try {
        //             await CustomerService.delete(id);
        //             context.emit("rerender:customers", reactive(props.customers));
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // };
        return {
            searchText,
            filteredCustomers,
            // deleteCustomer,
        };
    },
});
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css";

.desc {
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 20px;
    width: 320px;
    margin: 0;
}
</style>