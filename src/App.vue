<script setup>
import AddTask from './components/AddTask.vue'
import TaskList from './components/TaskList.vue';
import TaskFilter from './components/TaskFilter.vue';
import { useTask } from './store/TaskStore.js';
import { onMounted } from 'vue';


const store = useTask();
store.getTasksFromUrl();



</script>

<template>
  <div class=" bg-slate-200">

    <div class="container flex items-center flex-col justify-center min-h-screen">
      <h1 class="font-bold text-center text-2xl mb-4">Todo App</h1>

      <div class=" p-8 rounded-lg shadow-md bg-white w-3/4">

        <template v-if="store.loading">
          <div style="background-color:rgba(0, 213, 255, 0.077)"
            class=" absolute bottom-0 left-0 flex items-center justify-center w-full h-screen">
            <h2 class="font-bold text-2xl text-center">Loading...</h2>
          </div>
        </template>

        <!-- add task from -->
        <AddTask />
        <!-- checkbox -->
        <TaskList :tasks="store.tasks" />
        <!-- radio button -->
        <TaskFilter />

      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 1000px;
  margin: auto;
}
</style>
