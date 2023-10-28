<template>
    <head>
        <title>Sản Phẩm</title>
    </head>
    <div class="container row">
        <div class="product-card col-3 mb-3" v-for="(product, index) in products" :key="product._id">
            <div class="product-content">
                <img :src="'http://localhost:3000/' + product.image" alt="" />
                <h5 class="title text-center" style="font-size: 20px">
                    <p class="desc">
                        {{ product.name }}
                    </p>
                </h5>
                <div class="price text-danger text-center" style="
        font-size: 20px;
        font-weight: bold;
        font-family: Arial, sans-serif;
        color: #ff0000;
      ">
                    {{ (product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) }}
                </div>
                <div class="price text-danger text-center" style="
        font-size: 16px;
        font-weight: normal;
        font-family: Verdana, sans-serif;
        color: #000000;
      ">
                    {{
                        product.quantity_remain === 0
                        ? "HẾT HÀNG"
                        : "Số lượng kho:" + product.quantity_remain
                    }}
                </div>

                <div class="card-footer text-center ">
                    <div class="input-group quantity">
                        <input type="number" class="form-control input-quantity" v-model="quantity_sale[index]" min="1"
                            :max="product.quantity_remain" />
                        <button class="btn-cart btn" style="margin: 0px; 
                            font-size: 14px;  
                               padding: 8px 5px;
                    " @click="
                        addToCart({
                            _id: product._id,
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            image: product.image,
                            quantity_sale: quantity_sale[index],
                            category_id: product.category._id,
                        })
                        " :disabled="product.quantity_remain === 0 ||
        quantity_sale[index] > product.quantity
        ">
                            <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import CustomerService from "@/services/customer.service";

export default defineComponent({
    props: {
        products: { type: Array, required: true },
    },

    setup(props, context) {
        const quantity_sale = ref(Array(props.products.length).fill(1));

        const router = useRouter();
        const addToCart = async (data) => {
            console.log(data);
            try {
                await CustomerService.addToCart(data);
                router.push({ name: "cart" });
            } catch (error) {
                console.log(error);
            }
        };
        return {
            addToCart,
            quantity_sale,
        };
    },
});
</script>
<style>
.product-card {
    border: none;
}

.product-content {
    position: relative;
    top: 0;
    transition: top linear 0.2s;
    border-radius: 5px;
    overflow: hidden;
    height: 320px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.product-content:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    top: -10px;
}

.product-content img {
    width: 100%;
    height: 150px;
}

.product-content .title {
    margin-top: 10px;
    padding: 0 5px;
}

.product-content .price {
    margin-top: 5px;
}

.product-content .card-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 0 0 8px 8px;
    height: 60px;
    padding: 0 5px;
}

.product-content .input-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
}

.product-content .input-group input {
    width: 50px;
    margin-right: 5px;
    border-radius: 3px;
    padding: 3px 8px;
}

.product-content .input-group button {
    margin-left: 5px;
    border-radius: 3px;
    background-color: #ffa07a;
    color: #fff;
    font-size: 16px;
    padding: 5px 15px;
    transition: background-color 0.2s ease-in-out;
    border: none;
}

.product-content .input-group button:hover {
    background-color: #ff8c61;
}

.btn-cart {
    background-color: #ffa07a;
    color: #fff;
    border-radius: 20px;
    font-size: 18px;
    transition: background-color 0.2s ease-in-out;
}

.btn-cart:hover {
    background-color: #ff8c61;
}

.quantity {
    display: flex;
    justify-content: center;
    align-items: center;
}

.desc {
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 25px;
    margin: 0;
}
</style>
