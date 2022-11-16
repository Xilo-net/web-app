<script setup>
import { toRefs, watch } from 'vue';
import { normalizeString } from '../helpers'
const props = defineProps({
    groupUsers: Array,
});

const { groupUsers } = toRefs(props)

const selectedUser = ref({
    'data': {
        "id": null,
        "first_name": null,
        "last_name": null,
        "email": null,
        "progress": [],
        "admin": null,
        "points": null,
        "created_at": null,
        "updated_at": null
    }
});

watch(groupUsers, (newUsers, oldUsers) => {
    selectedUser.value = newUsers[0];
})

const userNameQuery = ref('');

function userMatchesQuery(user) {
    const name = `${user.first_name} ${user.last_name}`

    if (userNameQuery.value == '') {
        return true
    }

    return normalizeString(name).includes(normalizeString(userNameQuery.value));
}

</script>

<template>
    <div>
        <div class="relative mt-3 rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="material-icons" style="color: #6b7280;">
                    search
                </span>
            </div>
            <input type="text" name="price" id="price"
                class="block w-full rounded-md transition ease-in-out border-gray-300 pl-11 pr-12 focus:border-lime-400 focus:ring-lime-400 sm:text-sm"
                placeholder="Nombre del miembro" v-model="userNameQuery" />
        </div>
    </div>

    <div class="mt-3 rounded-md">
        <ul class="w-full text-sm font-medium text-gray-700 bg-gray-100 rounded-lg border border-gray-300">
            <template v-for="(user, index) in groupUsers" :key="index">
                <li @click="selectedUser = user" v-if="userMatchesQuery(user)"
                    class="py-2 px-4 w-full border-b transition ease-in-out border-gray-200 hover:bg-lime-300">
                    {{ user.first_name }} {{ user.last_name }}
                </li>
            </template>
        </ul>
    </div>

    <hr class="my-3">

    <div class="relative">
        <h1 class="font-bold tracking-tight text-gray-900 sm:text-3xl">
            {{ selectedUser.first_name }} {{ selectedUser.last_name }}
        </h1>
        <img class="w-20 h-20 top-0 right-0 absolute rounded-full"
            src="../../src/assets/img/default-profile-pic-yoda.jpg" alt="Rounded avatar">
    </div>
    <h2 class="font-semibold sm:text-xl mt-3 tracking-tight">
        Puntaje acumulado: {{ selectedUser.points }}
    </h2>
    <h2 class="font-semibold sm:text-xl mt-3 tracking-tight">
        Secciones completadas:
    </h2>
    <ul class="inline-grid grid-cols-4 gap-4 mt-3 w-full">
        <li v-for="(lesson, index) in selectedUser.progress" :key="index">
            {{ lesson }}
        </li>
    </ul>
</template>