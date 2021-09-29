<template>
    <div class="p-2">
        <div class="form-check">
            <input 
                :name="category" 
                class="form-check-input" 
                type="checkbox" 
                :value="category" 
                id="flexCheckDefault" 
                ref="category" 
                @change="updateCategoryQuery">
            <label class="form-check-label" :for="category">
                {{ category }}
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoryList',
    props: ['category'],
    methods: {
        updateCategoryQuery() {
            const type = this.$refs.category.checked ? 'add' : 'delete'
            this.$emit('updateCategoryQuery', {type, category: this.category})
        }
    }
}
</script>

<style>

</style>