<template>    
    <h1>할일 내용수정</h1>
    <TodoForm :editing="true" @update-todo="updateTodo"/>
</template>

<script>
import TodoForm from '@/components/TodoForm.vue'
export default {
    components: {
        TodoForm
    }, 
    emits: ['update-todo-toast'],
    setup(props, {emit}) {
      const updateTodo = () => {
        console.log("내용갱신");
        emit('update-todo-toast', {});

      }
      return {
        updateTodo
      }
    }
}
</script>

<style>
</style>