<script setup>

</script>

<template>
    <div class="flex min-h-full items-center justify-center p-0 md:py-12 md:px-4 sm:px-6">
        <div class="bg-white drop-shadow-md rounded-md w-full p-10 max-w-md space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=lime&shade=400"
                    alt="Your Company" />
                <h2 class="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900">Iniciar sesión </h2>
            </div>
            <form class="mt-10 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label for="email-address" class="sr-only">Correo electrónico</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required=""
                            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-200 focus:outline-none focus:ring-lime-500 sm:text-sm"
                            placeholder="Correo electrónico" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Contraseña</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required=""
                            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-200 focus:outline-none focus:ring-lime-500 sm:text-sm"
                            placeholder="Contraseña" />
                    </div>
                </div>

                <div class="md:flex justify-between">
                    <div class="flex justify-center">
                        <input id="remember-me" name="remember-me" type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-lime-500 focus:ring-lime-400" />
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">Recuerdame</label>
                    </div>

                    <div class="mt-4 md:mt-0 text-sm text-center">
                        <a href="#" class="font-medium text-gray-600 hover:text-gray-900 hover:underline">
                            Olvistaste tu contraseña?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative flex w-full justify-center rounded-md border border-transparent bg-lime-400 py-2 px-4 text-sm font-medium text-gray hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-200 focus:ring-offset-2">
                        Inicar sesión
                    </button>
                </div>
            </form>
            <hr>
            <div class="text-center">
                <p class="font-light text-sm">¿No tienes cuenta?</p>
                <a href="#" class="font-light text-sm text-lime-700 hover:text-lime-900 hover:underline"> Crear
                    cuenta </a>
            </div>
        </div>
    </div>
</template>

<style>

</style>