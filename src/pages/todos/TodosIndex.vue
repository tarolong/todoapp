<template>

  <div class="container">
    <!-- 타이틀 -->
    <div class="d-flex justify-content-between mt-3 mb-3">
      <AppTitle :apptitle="apptext" />
      <button 
        class="btn btn-primary btn-sm"
        @click="moveToCreate"
      >
        할일 등록
      </button>
    </div>  
    <!-- 할일 검색 입력창 -->
    <input class="form-control" v-model="searchText" type="text" placeholder="Search Todo list"
      @keyup.enter="searchTodo">
    <!-- 에러 안내창 -->
    <ErrorBox :errtext="error" />
    <hr />
    <!-- 목록없음 안내창 -->
    <div v-show="!todos.length" class="red">생성된 Todo 목록이 없습니다.</div>

    <!-- todo 목록창 -->
    <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" />

    <hr />

    <!-- 페이지네이션 -->
    <AppPagination :currentPage="nowPage" :allPage="numberOfPages" @page-show="getTodo" />

  </div>
</template>

<script>
  import {
    computed,
    ref,
    watch
  } from 'vue';
  // import axios from 'axios'
  import axios from '@/axios.js'
  import TodoList from '@/components/TodoList.vue'
  import AppTitle from '@/components/AppTitle.vue'
  import ErrorBox from '@/components/ErrorBox.vue'
  import AppPagination from '@/components/AppPagination.vue'
  
  import { useToast } from '@/composables/toast.js';
  import { useRouter } from 'vue-router';
  export default {
    components: {
      TodoList,
      AppTitle,
      ErrorBox,
      AppPagination
    },
    setup() {
      // 할일 생성 페이지로 이동
      const router = useRouter();
      const moveToCreate = () => {
        router.push({
          name: 'TodoCreate'
        });
      };
      // 타이틀
      const apptext = ref('오늘 할일');
      // 할일 목록(배열)을 저장
      const todos = ref([]);
      // 에러 메시지 
      const error = ref('');
      // 페이지네이션 관련
      // 전체 todos 개수 필요
      const totalTodos = ref(0);
      // 한 화면당 보여줄 todo 
      const limit = 5;
      // 현재 보여주는 페이지 번호
      const nowPage = ref(1);
      // 총페이지 숫자
      const numberOfPages = computed(() => {
        // 총 게시물 / 페이지당 출력 수  ====> 올림
        return Math.ceil(totalTodos.value / limit);
      });
      // ToastBox 관련
      const {
        showToast,
        toastMessage,
        triggerToast,
        toastAlertType
      } = useToast();
      
      // 할일 검색 관련 
      const searchText = ref('');
      let timeout = null;
      // 키보드의 Enter 키를 입력하면 검색을 바로 실행
      const searchTodo = () => {
        // 타이머 실행을 지워준다.
        clearTimeout(timeout);
        // 검색을 즉시 실행한다.
        getTodo(1);
      }
      watch(searchText, () => {
        // 연속으로 검색어를 서버에 전달하는 과정을 일부 제한한다.
        // clearTimeout 은 실행을 하려고 했던 명령을 취소한다.
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          getTodo(1);
        }, 2000);
      });
      // DB 에서 자료 불러오기
      const getTodo = async (page = nowPage.value) => {
        error.value = '';
        // 전달 된 값을 현재 페이지 번호로 받아들인다.
        nowPage.value = page;
        try {
          // 서버에서 자료를 요청을 진행 후에 결과를 
          // res 에서 받는다. (response)
          const res = await axios.get(
            `todos?subject_like=${searchText.value}&_page=${page}&_limit=${limit}&_sort=id&_order=desc`
          );
          // console.log(res.headers)
          // 총 todos 개수 파악
          totalTodos.value = res.headers["x-total-count"];
          if (numberOfPages.value < nowPage.value) {
            getTodo(nowPage.value - 1);
            return;
          }
          // response 가 될때 res라는 객체에 .data 를 화면에 보여줄
          // 목록으로 출력한다.
          todos.value = res.data;
        } catch (err) {
          console.log(err);
          error.value = "자료를 불러오는데 실패했습니다.";
          triggerToast("자료를 불러오는데 실패했습니다.", 'danger');
        }
      }
      // 최초에 데이터를 호출한다.
      getTodo();
      // TodoSimpleForm 에서  
      // add-todo 이벤트로 전달된 객체를 
      // 처리해 주는 콜백함수 
      const addTodo = async (추가되는할일) => {
        error.value = '';
        try {
          // 데이터 베이스에 저장이 되어야 하는 데이터
          await axios.post('todos', {
            subject: 추가되는할일.subject,
            complete: 추가되는할일.complete
          });
          getTodo(1);
        } catch (err) {
          console.log(err);
          error.value = "서버 확인해 주세요.";
          triggerToast("서버 확인해 주세요.", 'danger');
        }
      };
      const toggleTodo = async (index, checked) => {
        // complete 를 업데이트 하겠다.
        // id 를 통해서 내용을 업데이트 하겠다.
        error.value = '';
        const id = todos.value[index].id;
        try {
          // 서버의 DB 를 업데이트 한다.
          await axios.patch('todos/' + id, {
            complete: checked
          });
          // 웹브라우저의 todo 의 화면을 표현한다.
          todos.value[index].complete = checked;
          
          triggerToast("상태를 변경하였습니다.", 'success');
        } catch (err) {
          console.log(err);
          error.value = "업데이트에 실패하였습니다.";
          triggerToast("업데이트에 실패하였습니다.", 'danger');
        }
      }
      const deleteTodo = async (index) => {
        // 아래 문장은 순서 번호를 이용해서 목록에서 id 를 추출
        // 예전에는 index 는 순서 번호 였다.
        // 아래는 id를 알아내기 위한 과정이었습니다.
        // const id = todos.value[index].id;
        // 직접 id 를 받아오는 경우        
        const id = index;
        error.value = '';
        try {
          // 전체 삭제가 아니라 id와 같은 DB 를 삭제
          await axios.delete('todos/' + id);
          
          triggerToast("목록을 삭제하였습니다.", 'success');
          
          getTodo(nowPage.value);
        } catch (err) {
          console.log(err);
          error.value = "삭제에 실패했습니다.";
          triggerToast("삭제에 실패했습니다.", 'danger');
        }
      }
      return {
        moveToCreate,
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        searchText,
        searchTodo,
        error,
        nowPage,
        totalTodos,
        numberOfPages,
        getTodo,
        apptext,
        showToast,
        toastMessage,
        triggerToast,
        toastAlertType
      }
    }
  }
</script>

<style>
  .red {
    color: red;
  }
  .todocss {
    color: gray;
    text-decoration: line-through;
  }
</style>