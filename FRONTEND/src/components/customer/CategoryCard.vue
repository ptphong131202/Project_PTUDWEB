<template>
    <div style="width: 145px; z-index: 10;">
        <div class="card-header bg-success text-center font-weight-bold text-light" style="width: 100%;">
            DANH MỤC
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(category, index) in categories" :key="category._id"
                @click="setSelected(category)" :class="{
                    active: selectedCategory && category._id === selectedCategory._id,
                }">
                {{ category.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent, reactive } from "vue";

export default defineComponent({
    props: {
        categories: { type: Object, required: true },
        selectedCategory: { type: Object },
    },

    emits: ["filter:category"],

    setup(props, context) {
        const setSelected = (category) => {
            context.emit("filter:category", category);
        };
        return {
            setSelected,
        };
    },
});
</script>

<style>
.category-list .active {
    background-color: blue;
    border-color: blue;
}
</style>
