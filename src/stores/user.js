// /store/user.js

import { defineStore } from "pinia";
import { router } from "../router";

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
			this.user = true;
			router.push("/groups");
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
