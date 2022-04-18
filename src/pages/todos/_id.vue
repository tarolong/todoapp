<template>    
    <h1>할일 내용수정</h1>
    <TodoForm :editing="true"/>
</template>

<script>
import TodoForm from '@/components/TodoForm.vue'

export default {
    components: {
        TodoForm
    }, 
    setup() {      
      return {
      }
    }
}
</script>

<style>
</style>