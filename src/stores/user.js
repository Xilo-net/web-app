// /store/user.js

import { LogInPipe, PostPipe } from "../services/api";
import { defineStore } from "pinia";
import { router } from "../router";

// Validar contraseñas https://stackoverflow.com/questions/3466850/regular-expression-to-enforce-complex-passwords-matching-3-out-of-4-rules

export const useUserStore = defineStore("user", {
	state: () => ({
		user: null,
	}),

	actions: {
		async fetchUser() {
			// const res = await fetch("https://localhost:3000/user");
			// const user = await res.json();
			// this.user = user;
		},
		async signUp(email, password) {
			// const res = await fetch("https://localhost:3000/register", {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify({ email, password }),
			// });
			// const user = await res.json();
			// this.user = user;
		},
		async signIn(email, password) {
			console.log(`You tried to log in with: ${email} ${password}`);
			try {
				const { token } = await LogInPipe({ email, password }, "auth/login");
				this.userToken = token;
				this.user = {
					id: "01741757",
					name: "Luis Ángel Guzmán",
					email: "lag@test.com",
					token,
				};
				router.push("/groups");
			} catch (error) {
				console.error(error);
			}
			// const res = await fetch("https://localhost:3000/register", {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify({ email, password }),
			// });
			// const user = await res.json();
			// this.user = user;
		},
	},
});
