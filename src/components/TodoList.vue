<template>

    <div class="card mt-2" v-for="(todo, index) in todos" v-bind:key="todo.id">
        <div class="card-body p-2 d-flex">

            <div class="form-check flex-grow-1">
                <input type="checkbox" class="form-check-input" v-model="todo.complete" v-bind:id="todo.id">
                <label class="form-check-label" v-bind:class="{ todocss : todo.complete }" v-bind:for="todo.id">
                    {{ todo.subject }}
                </label>
            </div>
            <!-- 삭제버튼 -->
            <div>
                <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">Delete</button>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        // props: ['todos']
        props: {
            todos: {
                type: Array,
                required: true
            }
        }
    }
</script>
<style>

</style>