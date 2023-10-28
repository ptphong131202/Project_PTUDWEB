<template>
    <head>
        <title>Thêm Danh Mục</title>
    </head>
    <div class="container">
        <div class="page col-8 mx-auto">
            <h4 class="text-center text-primary">Thêm Danh mục</h4>
            <CategoryForm :category="{}" @submit:category="addCategory" />
        </div>
    </div>
</template>

<script>
import CategoryForm from "@/components/admin/CategoryForm.vue";
import CategoryService from "@/services/category.service";
import { defineComponent, ref } from "vue"
import { useRouter } from "vue-router"

export default defineComponent({
    components: {
        CategoryForm,
    },
    setup(props, context) {
        const router = useRouter();
        const addCategory = async (data) => {
            try {
                await CategoryService.create(data);
                router.push({ name: "admin.category.all" });
            } catch (error) {
                console.log(error);
            }
        }
        return {
            addCategory,
        }
    },
});
</script>