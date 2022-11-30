import { LogInPipe, PostPipe } from "../services/api";
import { defineStore } from "pinia";
import { router } from "../router";
import { validatePassword } from "../helpers";

export const useUserStore = defineStore("user", {
	state: () => ({
		user:
			JSON.parse(localStorage.getItem("user")) ??
			JSON.parse(sessionStorage.getItem("user")),
	}),
	actions: {
		async signUp(userBody, remember) {
			try {
				// Passwords do not match
				if (userBody.user.password !== userBody.user.password_confirmation)
					throw "matching";

				// Password do not matches requiremets
				const passwordValidation = validatePassword(userBody.user.password);
				if (passwordValidation !== "success") throw passwordValidation;

				const { id } = await LogInPipe(userBody, "users");

				// if user was created succesfully in database
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
				} // TODO: add error message
				else {
					return "errorMsg";
				}
			} catch (error) {
				return error;
			}
		},

		// Sign in with existing user and password
		async signIn(email, password, remember) {
			try {
				// Get user info from database
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

		// Close user session
		async signOut() {
			this.user = null;
			localStorage.removeItem("user");
			sessionStorage.removeItem("user");
			router.push("/login");
		},
	},
});
