<route lang="json">
{
  "meta": {
    "title": "Grupos"
  }
}
</route>

<script setup>
import { GetPipe, PostPipe } from '../services/api.js'
import { onMounted } from 'vue'
useHead({ title: 'Grupos' });

const groupOptions = ref([]);
const groupUsers = ref([]);
const selectedGroup = ref({});

// function fetchUsers() {
//   GetPipe('users')
//     .then((response) => {
//       groupUsers.value = response;
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// }

function fetchGroups() {
  GetPipe('groups')
    .then((response) => {
      groupOptions.value = response;
      selectGroup(0);
      // selectedGroup.value = response[0];
      // groupUsers.value = selectedGroup.value.group_users.map((userData) => {
      //   return userData.user;
      // });
      // console.log(groupUsers.value)
    })
    .catch((error) => {
      console.log(error)
    })
}

function selectGroup(groupIndex = 0) {
  selectedGroup.value = groupOptions.value[groupIndex];
  groupUsers.value = selectedGroup.value.group_users.map((userData) => {
    return userData.user;
  });

}

onMounted(() => {
  // fetchUsers();
  fetchGroups();
})


const isModalOpen = ref(false)
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
            <Dropdown class="right-0 top-0 absolute" :groupOptions="groupOptions" @select="selectGroup" />
          </div>
          <GroupMembersRanking :group-users="groupUsers" />
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
                class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white pr-4 pl-2 py-2 text-sm font-medium text-gray-700 
                       shadow-sm focus:ring-2 focus:ring-lime-400 focus:outline-none focus:ring-offset-2 hover:bg-gray-50 focus:ring-offset-gray-100;"
                @click="isModalOpen = true">
                Agregar miembros
              </button>
            </div>
          </div>

          <GroupMembersExplorer :groupUsers="groupUsers" />
        </div>
      </div>
    </div>

    <Modal :open="isModalOpen" title="Agregar miembros" @close="isModalOpen = false">
      <AddMembersForm />
    </Modal>
  </div>
</template>