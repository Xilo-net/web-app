import { createRouter, createWebHistory } from "vue-router/auto";
import { useUserStore } from "./stores/user";

const router = createRouter({
	history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
	const userStore = useUserStore();
	const user = userStore.user;

	if (to.name !== "/login" && !user) {
		alert("Inicia sesión antes de continuar");
		next("/login");
	} else {
		next();
	}
});

export { router };
