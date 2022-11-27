<script setup>
import { validateEmail } from '../helpers'
import readXlsxFile from 'read-excel-file'

const emit = defineEmits(['onUpdateData'])

const name = ref('');
const surname = ref('');
const email = ref('');

const file = ref(null);
const fileName = ref('Ningún archivo seleccionado')

const schema = {
    'nombres': {
        prop: 'first_name', required: true, type: String
    },
    'apellidos': {
        prop: 'last_name', type: String, required: true
    },
    'email': {
        prop: 'email', type: String, required: true
    },
}

const handleFileUpload = async () => {
    fileName.value = file.value.files[0].name;
    readXlsxFile(file.value.files[0], { schema }).then(({ rows, errors }) => {
        if (errors.length === 0) {
            emit('onUpdateData', rows)
        }
        // TODO: Agregar excepciones
    })
}

function updateData() {
    if (name.value != '' && surname.value != '' && validateEmail(email.value)) {
        emit('onUpdateData', [{ first_name: name.value, last_name: surname.value, email: email.value }])
    }
    else {
        emit('onUpdateData', [])
    }
}

watch(name, updateData);
watch(surname, updateData);
watch(email, updateData);
</script>

<template>
    <!-- TODO: Agregar funcionalidad del formulario -->
    <!-- TODO: Deshabilitar  la subida de archivo si alguno de los campos tiene algo -->
    <label for="name">Nombre(s)</label>
    <input id="name" placeholder="ej. Luis Ángel" v-model="name"
        class="w-full border-gray-300 rounded-md mb-3 focus:border-lime-300 focus:outline-none focus:ring-lime-300"
        type="text">

    <label for="surname">Apellido(s)</label>
    <input id="surname" placeholder="ej. Guzmán Iribe" v-model="surname"
        class="w-full border-gray-300 rounded-md mb-3 focus:border-lime-300 focus:outline-none focus:ring-lime-300"
        type="text">

    <label for="email">Correo Electrónico</label>
    <input id="email" placeholder="ej. nombre@empresa.com" v-model="email"
        class="w-full border-gray-300 rounded-md mb-3 focus:border-lime-300 focus:outline-none focus:ring-lime-300"
        type="email">

    <hr class="mb-5">

    <p class="mb-3">Ingresar múltiples usuarios en hoja de excel</p>
    <input @change="handleFileUpload" type="file" id="actual-btn" ref="file" accept=".xlsx" hidden />
    <label
        class="bg-lime-500 text-white text-base  border border-transparent font-medium px-4 py-2 mt-2 rounded-md cursor-pointer"
        for="actual-btn">
        Elegir archivo
    </label>
    <span class="ml-2 text-gray-700 text-ellipsis overflow-hidden" id="file-chosen">
        {{ fileName }}
    </span>
    <p class="mt-3 text-sm font-light text-gray-600">
        La hoja debe tener 3 columnas con los titulos 'nombres', 'apellidos' y 'email'
        <!-- <a href=".././assets/xlsx/user-form.xlsx" download class="font-normal text-gray-700 underline">
            Descargar plantilla
        </a> -->
    </p>

</template>