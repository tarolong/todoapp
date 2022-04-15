<template>
    <div class="form-group">
        <label>{{label}}</label>
        <input 
            type="text" 
            class="form-control" 
            :value="subject"
            @input="onInput"
        >
        <div 
            v-if="err" 
            class="red-text bold-text"
        >
            {{err}}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                required: true
            },
            err: {
                type: String,
                required: true
            },
            subject: {
                type: String,
                required: true
            }
        },
        emits: ['update-subject'],
        setup(props, {emit}) {
            const onInput = (event) => {
                emit('update:subject', event.target.value);
            }

            return {
                onInput
            }
        }
    }
</script>

<style scoped>
    .red-text {
        color: red;
    }
    .bold-text {
        font-weight: bold;
    }
</style>