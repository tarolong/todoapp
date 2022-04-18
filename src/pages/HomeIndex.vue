<template>
    <h1>Home page</h1>
    {{ count }}
    <button @click="count++">증가</button>
</template>
<script>
import { useCount } from '@/composables/count.js'
export default {
    setup() {
        // 분해해서 사용한다.
        const { count } = useCount();
        return {
            count
        }
    }
}
</script>
<style>
</style>