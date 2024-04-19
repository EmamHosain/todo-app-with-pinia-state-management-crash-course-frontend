import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
export const useTask = defineStore('tasks', {
    state: () => {
        return {
            tasks: [],
            value: 'all',
            loading: false,
            errors: [],
        }
    },

    getters: {
        // all getters here

        filter() {
            if (this.value === 'all') {
                return this.getTasks
            } else if (this.value === 'completed') {
                return this.getDoneTasks
            } else {
                return this.getPendingTasks
            }
        },
        getTasks() {
            return this.tasks;
        },
        getDoneTasks() {
            return this.tasks.filter(task => task.done);
        },
        getPendingTasks() {
            return this.tasks.filter(task => !task.done);
        },

        //---------------
        getAllCompleteTask() {
            return this.tasks.filter(task => task.done).length;
        },
        getAllPendingTask() {
            return this.tasks.filter(task => !task.done).length;
        },

        getAllTaskCount() {
            return this.tasks.length;
        },



    },



    // actions is for write function and modify the state value
    actions: {

        // get all task from url 
        async getTasksFromUrl() {
            try {
                this.loading = true;
                const res = await axios.get('/sanctum/csrf-cookie');
                const response = await axios.get('/api/tasks');
                this.tasks = response.data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
                console.log(error)
            }
        },



        // add action
        async createTask(task) {
            // this.tasks.push(task)
            try {
                this.loading = true;
                const res = await axios.post('/api/tasks', task);
                this.tasks.push(res.data);
                this.loading = false;
                $toast.success('Task added');
            } catch (error) {
                this.loading = false;
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors
                }
                console.log(error)
            }
        },



        // delete action
        async deleteTask(id) {
            try {
                this.loading = true;
                const res = await axios.delete(`/api/tasks/${id}`)
                const index = this.tasks.findIndex(task => task.id === id);
                if (index !== -1) {
                    this.tasks.splice(index, 1);
                }
                this.loading = false;
                $toast.success('Task deleted')
            } catch (error) {
                this.loading = false;
                console.log(error)
            }
        },

        // update or modify action
        async updateTask(id) {
            try {
                this.loading = true;
                const res = await axios.patch(`api/tasks/${id}`)
                const task = this.tasks.find(task => task.id === id);
                task.done = !task.done;
                this.loading = false;
                $toast.success('Task Updated')
            } catch (error) {
                this.loading = false;
                console.log(error);
            }

        },

        // when text type in input field, error will be hidden
        clearErrors() {
            this.errors = [];
        }
    }
})