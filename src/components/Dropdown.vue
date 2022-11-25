<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { toRefs } from 'vue';

const props = defineProps({
    groupOptions: Array,
});

const { groupOptions } = toRefs(props)

function logSelectedGroup(group) {
    console.log('Grupo: ', group)
}

</script>

<template>
    <Menu as="div" class="inline-block text-left">
        <MenuButton
            class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white pr-4 pl-2 py-2 text-sm font-medium text-gray-700 shadow-sm 
                   focus:ring-2 focus:ring-lime-400 focus:outline-none focus:ring-offset-2 hover:bg-gray-50 focus:ring-offset-gray-100;">
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
                        @click="$emit('select', index)">
                        {{ group.name }}
                    </a>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>