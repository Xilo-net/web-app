<script setup>
const emit = defineEmits(['onUpdateData'])

const category = ref('');
const title = ref('');

const file = ref(null);
const fileName = ref('Ningún archivo seleccionado')

function updateData() {
    emit('onUpdateData', {
        file: file.value.files[0],
        title: title.value,
        category: category.value
    })
}

const handleFileUpload = async () => {
    fileName.value = file.value.files[0].name;
    updateData();
}

watch(category, updateData);
watch(title, updateData);

</script>

<template>

    <label for="category">Categoría</label>
    <input id="category" placeholder="ej. Colores" v-model="category"
        class="w-full border-gray-300 rounded-md mb-3 focus:border-lime-300 focus:outline-none focus:ring-lime-300"
        type="text">

    <label for="title">Titulo</label>
    <input id="title" placeholder="ej. Verde" v-model="title"
        class="w-full border-gray-300 rounded-md mb-3 focus:border-lime-300 focus:outline-none focus:ring-lime-300"
        type="text">

    <!-- <label for="video">Video</label>
    <input id="video" placeholder="nombre@empresa.com"
        class="w-full border-gray-300 rounded-md mb-3 focus:border-lime-300 focus:outline-none focus:ring-lime-300"
        type="file"> -->

    <p class="mb-2">Video</p>

    <input @change="handleFileUpload" type="file" id="video" ref="file" accept=".mp4" hidden />
    <label
        class="bg-lime-500 text-white text-base  border border-transparent font-medium px-4 py-2 mt-2 rounded-md cursor-pointer"
        for="video">
        Elegir archivo
    </label>
    <span class="ml-2 text-gray-600 font-light text-ellipsis overflow-hidden" id="file-chosen">
        {{ fileName }}
    </span>
</template>