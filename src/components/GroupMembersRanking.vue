<script setup>
import { toRefs, computed } from 'vue';
const props = defineProps({
    groupUsers: Array,
});

const { groupUsers } = toRefs(props)

const average = computed(() => {
    return calculateAverage(groupUsers);
});

function calculateAverage() {
    if (groupUsers.value.length > 0) {
        let sum = 0;
        groupUsers.value.forEach(user => {
            sum += user.points;
        });
        return (sum / groupUsers.value.length).toFixed(2);
    }
    else {
        return 0;
    }
}

const daysData = [500, 527, 567, 481, 575, 381, 201];

</script>

<template>
    <h2 class="font-semibold sm:text-xl mt-3 tracking-tight">
        Puntaje acumulado por día
    </h2>
    <BarChart :daysData="daysData" :styles="{ color: 'red' }" />
    <h2 class="font-semibold sm:text-xl mt-3 tracking-tight">
        Promedio diario grupal:
        <span class="font-normal sm:text-xl mt-3 tracking-tight">{{ parseInt(average) }}</span>
    </h2>
    <h2 class="font-semibold sm:text-xl mt-3 tracking-tight">Usuarios más activos</h2>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full">
                        <thead class="border-b">
                            <tr>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"> # </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"> Nombre
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"> Puntos
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in groupUsers" :key="index" class="border-b">
                                <td class=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                                    {{ index + 1 }}
                                </td>
                                <td class=" text-sm text-gray-700 font-light px-6 py-4 whitespace-nowrap ">
                                    {{ user.first_name }} {{ user.last_name }}
                                </td>
                                <td class=" text-sm text-gray-700 font-light px-6 py-4 whitespace-nowrap ">
                                    {{ user.points }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>