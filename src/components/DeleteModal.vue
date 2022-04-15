<template>
    <ModalWin>
        <template v-slot:title>
            할일 삭제 경고창
        </template>
        <template v-slot:body>
            내용을 삭제하시겠습니까?
        </template>
        <template v-slot:footer>
            <button type="button" class="btn btn-secondary" @click="onClose">
                Close
            </button>
            <button type="button" class="btn btn-danger" @click="onDelete">
                Delete
            </button>
        </template>
    </ModalWin>
</template>

<script>
import ModalWin from '@/components/ModalWin.vue'
export default {
    components: {
        ModalWin
    },
    emits: ['close', 'delete'],
        setup(props, {emit}) {
            const onClose = () => {
                emit('close')
            };
            const onDelete = () => {
                emit('delete')
            }
            return {
                onClose,
                onDelete
            }
        }

}
</script>

<style>

</style>