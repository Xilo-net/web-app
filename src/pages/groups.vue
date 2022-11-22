<route lang="json">
{
  "meta": {
    "title": "Grupos"
  }
}
</route>

<script setup>
import { GetPipe, PostPipe } from '../services/api.js'
useHead({ title: 'Grupos' });

const groupOptions = ref([]);
const selectedGroup = ref({});
const groupUsers = ref([]);

// Gets users from database
function fetchGroups() {
  GetPipe('groups')
    .then((response) => {
      groupOptions.value = response;
      selectGroup(0);
    })
    .catch((error) => {
      console.log(error)
    })
}

// Changes group data on Dropdown selection
function selectGroup(groupIndex = 0) {
  selectedGroup.value = groupOptions.value[groupIndex];
  groupUsers.value = selectedGroup.value.group_users.map((userData) => {
    return userData.user;
  });
}

const isModalOpen = ref(false)
const modalTitle = ref('Agregar miembros');
const modalSlot = ref('members')

function openModal(slot) {
  modalSlot.value = slot;
  switch (slot) {
    case 'members':
      modalTitle.value = 'Agregar miembros';
      break;

    case 'resources':
      modalTitle.value = 'Agregar recursos';
      break;

    default:
      modalTitle.value = 'Agregar';
      break;
  }
  isModalOpen.value = true;
}

const usersData = ref([]);

function updateUserData(data) {
  usersData.value = data;
}

// Uploads user to database, asumes 'usersData' has a length of at least 1
function uploadUsers() {
  usersData.value.map((user) => {
    console.log({
      ...user,
      "admin": false,
      "points": 0,
      "progress": []
    }, 'users')
    // PostPipe(body, 'users')
  })
}

const resourceData = ref({});

function updateResourceData(data) {
  resourceData.value = data;
}

// Checks if all fields of 'resourceData' are filled
const resourceDataIsComplete = computed(() => {
  return resourceData.value.file && resourceData.value.title !== '' && resourceData.value.category !== ''
})

// Uploads resource to database, asumes 'resourceData' fields are filled
function uploadResources() {
  console.log('UPLOAD RESOURCES', resourceData.value)
}

// Selects modal upload function depending on form
function modalUpload() {
  if (modalSlot.value == 'members') uploadUsers();
  else if (modalSlot.value == 'resources') uploadResources()
  isModalOpen.value = false;
}

onMounted(() => {
  fetchGroups();
})
</script>
 
<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div>
        <div class="bg-white drop-shadow-md rounded-md p-6">
          <div class="relative">
            <h1 class="font-bold tracking-tight text-gray-900 sm:text-3xl">
              Estadisticas
            </h1>
            <Dropdown class="right-0 top-0 absolute" :groupOptions="groupOptions" @select="selectGroup" />
          </div>
          <GroupMembersRanking :group-users="groupUsers" />
        </div>
      </div>

      <div>
        <div class="bg-white drop-shadow-md rounded-md p-6 mb-4">
          <div class="relative">
            <h1 class=" font-bold tracking-tight text-gray-900 sm:text-3xl">
              Miembros
            </h1>
            <div class="inline-block text-left absolute right-0 top-0">
              <button
                class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white pr-4 pl-2 py-2 text-sm font-medium text-gray-700 
                       shadow-sm focus:ring-2 focus:ring-lime-400 focus:outline-none focus:ring-offset-2 hover:bg-gray-50 focus:ring-offset-gray-100;"
                @click="openModal('members')">
                Agregar miembros
              </button>
            </div>
          </div>

          <GroupMembersExplorer :groupUsers="groupUsers" />
        </div>
        <div class="bg-white drop-shadow-md rounded-md p-6">
          <div class="relative">
            <h1 class=" font-bold tracking-tight text-gray-900 sm:text-3xl">
              Recursos
            </h1>
            <div class="inline-block text-left absolute right-0 top-0">
              <button
                class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white pr-4 pl-2 py-2 text-sm font-medium text-gray-700 
                       shadow-sm focus:ring-2 focus:ring-lime-400 focus:outline-none focus:ring-offset-2 hover:bg-gray-50 focus:ring-offset-gray-100;"
                @click="openModal('resources')">
                Agregar recursos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal :open="isModalOpen" :isButtonActive="modalSlot == 'members' ? usersData.length > 0 : resourceDataIsComplete"
      :title="modalTitle" @close="isModalOpen = false" @upload="modalUpload">
      <AddMembersForm v-if="modalSlot == 'members'" @onUpdateData="updateUserData" />
      <AddResourcesForm v-if="modalSlot == 'resources'" @onUpdateData="updateResourceData" />
    </Modal>
  </div>
</template>