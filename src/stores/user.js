// /store/user.js

import { LogInPipe, PostPipe } from "../services/api";
import { defineStore } from "pinia";
import { router } from "../router";
import { validatePassword } from "../helpers";

// Validar contraseñas https://stackoverflow.com/questions/3466850/regular-expression-to-enforce-complex-passwords-matching-3-out-of-4-rules

export const useUserStore = defineStore("user", {
	state: () => ({
		user:
			JSON.parse(localStorage.getItem("user")) ??
			JSON.parse(sessionStorage.getItem("user")),
	}),
	actions: {
		async fetchUser() {
			// const res = await fetch("https://localhost:3000/user");
			// const user = await res.json();
			// this.user = user;
		},
		async signUp(userBody, remember) {
			try {
				if (userBody.user.password !== userBody.user.password_confirmation)
					throw "matching";

				const passwordValidation = validatePassword(userBody.user.password);
				if (passwordValidation !== "success") throw passwordValidation;

				const { id } = await LogInPipe(userBody, "users");
				// if user was created succesfully
				if (!!id) {
					const { email, password } = userBody.user;
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
				return error;
			}
		},
		async signIn(email, password, remember) {
			try {
				const user = await LogInPipe({ email, password }, "auth/login");

				if (user.error) throw "unsuccesfull login";

				this.user = user;

				if (remember) {
					localStorage.setItem("user", JSON.stringify(user));
				} else {
					sessionStorage.setItem("user", JSON.stringify(user));
				}

				router.push("/groups");
			} catch (error) {
				return error;
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
