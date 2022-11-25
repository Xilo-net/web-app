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
		async signUp(userBody, remember) {
			try {
				console.log(userBody);
				const { id } = await LogInPipe(userBody, "users");
				console.log("ID: ", id);
				// if user was created succesfully
				if (!!id) {
					const { email, password } = userBody;
					const user = await LogInPipe({ email, password }, "auth/login");

					this.user = user;

					if (remember) {
						localStorage.setItem("user", JSON.stringify(user));
					} else {
						sessionStorage.setItem("user", JSON.stringify(user));
					}

					router.push("/groups");
				} // TODO: poner un mensaje de error
				else {
					return "errorMsg";
				}
			} catch (error) {
				console.error("Creating", error);
			}
		},
		async signIn(email, password, remember) {
			console.log(`You tried to log in with: ${email} ${password}`);
			try {
				const user = await LogInPipe({ email, password }, "auth/login");

				this.user = user;

				if (remember) {
					localStorage.setItem("user", JSON.stringify(user));
				} else {
					sessionStorage.setItem("user", JSON.stringify(user));
				}

				router.push("/groups");
			} catch (error) {
				// TODO: poner un mensaje de error
				console.error(error);
			}
		},
		async signOut() {
			this.user = null;
			localStorage.removeItem("user");
			sessionStorage.removeItem("user");
			router.push("/login");
		},
	},
});
