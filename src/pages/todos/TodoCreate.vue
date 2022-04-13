<template>
  <h1>할일 생성</h1>
  <TodoForm :editing="false" @new-todo="newTodo"/>
</template>

<script>
import TodoForm from '@/components/TodoForm.vue'
export default {
    components: {
        TodoForm
    }, 
    emits: ['new-todo-toast'],
    setup(props, {emit}) {
      const newTodo = () => {
        console.log("새글등록");
        emit('new-todo-toast', {});
      }
      return {
        newTodo
      }
    }
}
</script>

<style>

</style>