<script setup>
import { useUserStore } from "../stores/user";
const userStore = useUserStore();

const email = ref('')
const password = ref('')
const remember = ref(false);

const errorMsg = ref(false);

async function login() {
    errorMsg.value = await userStore.signIn(email.value, password.value, remember.value)
}

</script>

<template>
    <form class="mt-10 space-y-6" @submit.prevent="login">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
            <div>
                <label for="email-address" class="sr-only">Correo electrónico</label>
                <input id="email-address" name="email" type="email" required="" v-model="email"
                    class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-200 focus:outline-none focus:ring-lime-500 sm:text-sm"
                    placeholder="Correo electrónico" />
            </div>
            <div>
                <label for="password" class="sr-only">Contraseña</label>
                <input id="password" name="password" type="password" required="" v-model="password"
                    class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-200 focus:outline-none focus:ring-lime-500 sm:text-sm"
                    placeholder="Contraseña" />
            </div>
        </div>

        <p v-if="errorMsg" class="text-sm text-red-500"> Tu correo o contraseña son incorrectos </p>

        <div class="md:flex justify-between">
            <div class="flex justify-center">
                <input id="remember-me" name="remember-me" type="checkbox" v-model="remember"
                    class="h-4 w-4 rounded border-gray-300 text-lime-500 focus:ring-lime-400" />
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">Recuérdame</label>
            </div>

            <div class="mt-4 md:mt-0 text-sm text-center">
                <a href="#" class="font-medium text-gray-600 hover:text-gray-900 hover:underline">
                    ¿Olvidaste tu contraseña?
                </a>
            </div>
        </div>

        <div>
            <button type="submit"
                class="group relative flex w-full justify-center rounded-md border border-transparent bg-lime-400 py-2 px-4 text-sm font-medium text-gray hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-200 focus:ring-offset-2">
                Iniciar sesión
            </button>
        </div>
    </form>
</template>