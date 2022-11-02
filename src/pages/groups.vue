<route lang="json">
{
  "meta": {
    "title": "Grupos"
  }
}
</route>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems, Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
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

const open = ref(false)
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
              <MenuButton class="intButton">
                <span class="material-icons">expand_more</span>
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
              <button class="intButton" @click="open = true">
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
          <div class="relative">
            <h1 class="font-bold tracking-tight text-gray-900 sm:text-3xl">
              Nombre usuario seleccionado
            </h1>
            <img class="w-20 h-20 top-0 right-0 absolute rounded-full"
              src="../../src/assets/img/default-profile-pic-yoda.jpg" alt="Rounded avatar">
          </div>
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

    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Agregar miembros
                      </DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">Aquí va a ir una interfaz para agregar nuevos usuarios</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="open = false">Agregar</button>
                  <button type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="open = false" ref="cancelButtonRef">Cancelar</button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<style>
.intButton {
  @apply inline-flex w-full justify-center rounded-md border border-gray-300 bg-white pr-4 pl-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-gray-100;
}
</style>