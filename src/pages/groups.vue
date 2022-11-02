<route lang="json">
{
  "meta": {
    "title": "Grupos"
  }
}
</route>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
useHead({ title: 'About' });

const groupOptions = ref(
  Array(10).fill({ name: 'Grupo x' }),
)

function logSelectedGroup(group) {
  console.log('Grupo: ', group)
}

const userNameQuery = ref('')

const usersRanking = ref(
  Array(10).fill({ name: 'Nombre Apellido Apellido', points: 59 }),
);


</script>
 
<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div>
        <div class="bg-white drop-shadow-md rounded-md p-6">
          <div class="relative">
            <h1 class="font-bold tracking-tight text-gray-900 sm:text-3xl">
              Estadisticas del grupo
            </h1>
            <Menu as="div" class="inline-block text-left absolute right-0 top-0">
              <MenuButton
                class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-gray-100">
                Seleccionar grupo
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="absolute mt-2 w-56 right-0 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-for="(group, index) in groupOptions" :key="index" v-slot="{ active }">
                    <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                      @click="logSelectedGroup(index)">
                      {{ group.name }}
                    </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

          </div>
          <h2 class="font-semibold sm:text-xl mt-3 tracking-tight">
            Puntaje Acumulado por día
          </h2>
          <BarChart :height="150" :styles="{ color: 'red' }" />
          <h2 class="font-semibold sm:text-xl mt-3 tracking-tight">
            Promedio diaro grupal:
            <span class="font-normal sm:text-xl mt-3 tracking-tight">46 puntos</span>
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
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"> Nombre </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"> Puntos </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(user, index) in usersRanking" :key="index" class="border-b">
                        <td class=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                          {{ index + 1 }}
                        </td>
                        <td class=" text-sm text-gray-700 font-light px-6 py-4 whitespace-nowrap ">
                          {{ user.name }}
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

        </div>
      </div>

      <div>
        <div class="bg-white drop-shadow-md rounded-md p-6">
          <div class="relative">
            <h1 class=" font-bold tracking-tight text-gray-900 sm:text-3xl">
              Miembros del grupo
            </h1>
            <div class="inline-block text-left absolute right-0 top-0">
              <button
                class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-gray-100">
                Agregar miembros
              </button>
            </div>
          </div>
          <div>
            <!-- <label for="price" class="block text-sm font-medium text-gray-700">Price</label> -->
            <div class="relative mt-3 rounded-md shadow-sm">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <!-- <span class="text-gray-500 sm:text-sm">$</span> -->
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
              <li v-for="(user, index) in usersRanking" :key="index"
                class="py-2 px-4 w-full border-b transition ease-in-out border-gray-200 hover:bg-lime-300">
                Nombre Apellido Apellido
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-white drop-shadow-md rounded-md mt-3 p-6">
          <h1 class=" font-bold tracking-tight text-gray-900 sm:text-3xl">
            Usuario seleccionado
          </h1>
          <h2 class="font-semibold sm:text-xl mt-3 tracking-tight">
            Puntaje Acumulado por día: {{ 59 }}
          </h2>
          <h2 class="font-semibold sm:text-xl mt-3 tracking-tight">
            Secciones prácticadas
          </h2>
          <ul class="inline-grid grid-cols-4 gap-4 mt-3 w-full">
            <li>Comida</li>
            <li>Hogar</li>
            <li>Frutas</li>
            <li>Cuerpo</li>
            <li>Pronombres</li>
            <li>Lugares</li>
            <li>Maquinaria pesada</li>
            <li>Días de la semana</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>