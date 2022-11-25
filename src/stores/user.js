// /store/user.js

import { LogInPipe, PostPipe } from "../services/api";
import { defineStore } from "pinia";
import { router } from "../router";

// Validar contraseñas https://stackoverflow.com/questions/3466850/regular-expression-to-enforce-complex-passwords-matching-3-out-of-4-rules

export const useUserStore = defineStore("user", {
	state: () => ({
		user: JSON.parse(localStorage.getItem("user")),
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
		async signIn(email, password, remember) {
			console.log(`You tried to log in with: ${email} ${password}`);
			try {
				const { token } = await LogInPipe({ email, password }, "auth/login");

				// if token is not undefined
				if (!!token) {
					const user = {
						id: "01741757",
						name: "Luis Ángel Guzmán",
						email: "lag@test.com",
						token,
					};

					this.user = user;

					if (remember) {
						localStorage.setItem("user", JSON.stringify(user));
					} else {
						sessionStorage.setItem("user", JSON.stringify(user));
					}

					router.push("/groups");
				} // TODO: poner un mensaje de error
				else {
					return errorMsg;
				}
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
		async signOut() {
			this.user = null;
			localStorage.removeItem("user");
			router.push("/login");
		},
	},
});
