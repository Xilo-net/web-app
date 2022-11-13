<script setup>
import LoginForm from '../components/LoginForm.vue';
function onClickCreateAccount() {
    console.log('Crear cuenta nueva!')
} 
</script>

<template>
    <div class="flex min-h-full items-center justify-center p-0 md:py-12 md:px-4 sm:px-6">
        <div class="bg-white drop-shadow-md rounded-md w-full p-10 max-w-md space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=lime&shade=400"
                    alt="Signa Admin" />
                <h2 class="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900">Iniciar sesión </h2>
            </div>
            <LoginForm />
            <hr>
            <div class="text-center">
                <p class="font-light text-sm">¿No tienes cuenta?</p>
                <a @click="onClickCreateAccount"
                    class="font-light text-sm text-lime-700 hover:text-lime-900 hover:underline">
                    Crear cuenta
                </a>
            </div>
        </div>
    </div>
</template>