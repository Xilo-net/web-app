<script setup>
import readXlsxFile from 'read-excel-file'
// import { } from 'vue';

const emit = defineEmits(['onUpdateData'])

const file = ref(null);
const fileName = ref('Ningún archivo seleccionado')

const schema = {
    'nombres': {
        // JSON object property name.
        prop: 'first_name',
        required: true,
        type: String
    },
    'apellidos': {
        prop: 'last_name',
        type: String,
        required: true
    },
    'email': {
        prop: 'email',
        type: String,
        required: true
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

/*
{
        "id": "7ce00a3c-04c8-4b2e-8a55-df5b8a735a4e",
        "first_name": "Antonio",
        "last_name": "Lopez",
        "email": "al@test.com",
        "progress": [],
        "admin": true,
        "points": 0,
        "created_at": "2022-11-02T23:41:49.152Z",
        "updated_at": "2022-11-02T23:41:49.152Z",
        "groups": []
    },
    */
</script>

<template>
    <input @change="handleFileUpload" type="file" id="actual-btn" ref="file" hidden />
    <label
        class="bg-lime-500 text-white text-base  border border-transparent font-medium px-4 py-2 mt-2 rounded-md cursor-pointer"
        for="actual-btn">
        Elegir archivo
    </label>
    <span class="ml-2 text-gray-600 font-light text-ellipsis overflow-hidden" id="file-chosen">
        {{ fileName }}
    </span>

</template>