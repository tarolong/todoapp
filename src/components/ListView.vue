<template>
   <div class="card mt-2" 
    v-for="(item, index) in items" 
    v-bind:key="item.id"
    >
        <slot :item="item" :index="index"></slot>
    </div>

</template>

<script>
    export default {
        props: {
            items: {
                type: Array,
                required: true
            }
        }

    }
</script>

<style>

</style>