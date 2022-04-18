<template>
    <!-- html 태그 작성 장소 -->

    <form action="" v-on:submit.prevent="onSubmit">

        <div class="d-flex">
            <div class="flex-grow-1 mr-2">
                <input type="text" placeholder="Type New Todo" class="form-control" v-model="todo">
            </div>
            <div>
                <button class="btn btn-primary" type="submit">Add</button>
            </div>
        </div>


        <!-- 내용 입력 안내창 -->
        <div v-show="hasError" class="red">내용을 입력하세요.</div>

    </form>

</template>
<script>
    import {ref} from 'vue'
    import {getCurrentInstance} from 'vue'
    
    // js 코딩 장소
    export default {
        emits: ['add-todo'],

        setup() {

            const { emit } = getCurrentInstance();
            
            // 추가할 할일
            const todo = ref('');
            // 내용 입력 안내창 여부
            const hasError = ref(false);
            // 버튼 클릭시 처리
            const onSubmit = () => {
                // 내용이 있는지 없는지 구분한다.
                if (todo.value === '') {
                    //안내창 보여준다.
                    hasError.value = true;
                } else {
                    // 안내창 숨기기
                    hasError.value = false;

                    // 할일의 내용을 배열로 추가한다.
                    // 이때 상위 컴포넌트로 전달한다.
                    // context.emit('이벤트', {데이터});
                    emit('add-todo', {
                        id: Date.now(),
                        subject: todo.value,
                        complete: false
                    });
                }
                todo.value = '';
            };

            return {
                todo,
                hasError,
                onSubmit
            }
        }
    }
</script>
<style>
    /* css 작성장소 */
</style>