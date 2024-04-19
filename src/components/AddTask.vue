<script setup>
import { ref } from 'vue';
import { useTask } from '../store/TaskStore';


const store = useTask();
const task = ref('');
const addTask = () => {
    let newTask = {
        name: task.value,
        done: false
    }
    store.createTask(newTask);
    task.value = '';
}

const changeHandler = (e) => {
    if (e.data !== null) {
        store.clearErrors();
    }
}
</script>
<template>
    <div>
        <form class=" mb-4" @submit.prevent="addTask">
            <div class="flex gap-1">
                <div class=" w-full">
                    <input @input="changeHandler" type="text" id="text" v-model="task"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Add something...">

                </div>
                <div class="flex justify-end items-center w-24">
                    <button type="submit"
                        class="bg-indigo-500 hover:bg-indigo-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add</button>
                </div>
            </div>
            <div v-if="store.errors.name">
                <span class=" text-sm  text-red-500 font-bold">{{ store.errors.name[0] }}</span>
            </div>
        </form>
    </div>
</template>