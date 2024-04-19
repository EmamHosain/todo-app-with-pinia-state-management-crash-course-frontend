<script setup>

import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useTask } from '../store/TaskStore';

const store = useTask();
const { value, getAllTaskCount, getAllCompleteTask, getAllPendingTask } = storeToRefs(store);

// const value = ref('all');
</script>

<template>
    <div>
        <div class="mb-4 text-right">
            <label class="inline-flex items-center">
                <input v-model="value" type="radio" class="form-radio text-blue-500 focus:outline-none focus:shadow-outline"
                    name="plan" value="all">
                <span class="ml-2">All ({{ getAllTaskCount }})</span>
            </label>
            <label class="inline-flex items-center ml-6">
                <input v-model="value" type="radio" class="form-radio text-blue-500 focus:outline-none focus:shadow-outline"
                    name="plan" value="completed">
                <span class="ml-2">Completed ({{ getAllCompleteTask }})</span>
            </label>
            <label class="inline-flex items-center ml-6">
                <input v-model="value" type="radio" class="form-radio text-blue-500 focus:outline-none focus:shadow-outline"
                    name="plan" value="pending">
                <span class="ml-2">Pending ({{ getAllPendingTask }})</span>
            </label>
        </div>
    </div>
</template>