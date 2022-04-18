<template>
  <h1>할일 생성</h1>
  <TodoForm :editing="false"/>
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