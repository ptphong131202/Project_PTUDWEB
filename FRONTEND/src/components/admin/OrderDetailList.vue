<template>
  <div class="container">
    <section class="section">
      <div class="card">
        <div class="card-body">
          <table class="table table-striped text-center" id="table1">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên bánh</th>
                <th>Hình ảnh</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Tổng</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in orders.products" :key="order._id">
                <td>{{ index + 1 }}</td>
                <td>{{ product.name }}</td>
                <td>
                  <img :src="'http://localhost:3000/' + product.image" alt="Product Image" style="height: 50px" />
                </td>
                <td>{{ product.quantity_sale }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.quantity_sale * product.price }}</td>
                <td
                  :style="{ color: order.status === 0 ? 'grey' : order.status === 1 ? 'green' : 'red', fontWeight: 'bold' }">
                  {{ order.status === 0 ? "Chưa duyệt..." : order.status === 1 ? "Đã duyệt" : "Đã hủy" }}
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
import { defineComponent, reactive } from "vue";
import { Field } from "vee-validate";

export default defineComponent({
  components: {
    Field,
  },
  props: {
    order: { type: Object, required: true },
  },

  setup(props, context) {
    const orders = reactive(props.order);
    console.log(orders)
    return {
      orders,
    };
  },
});
</script>
  
<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
@import url(https://www.w3schools.com/w3css/4/w3.css);
@import url(https://fonts.googleapis.com/css?family=Raleway);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
</style>
  