import { useUserStore } from "../stores/user";

// Aquí va el API service
const baseUrl = "https://xilonet.herokuapp.com/";

export async function GetPipe(endpoint) {
	const userStore = useUserStore();
	const { user } = userStore;

	const response = await fetch(baseUrl + endpoint, {
		method: "GET",
		headers: { "Content-Type": "application/json", Authorization: user.token },
	});
	return await response.json();
}

export async function PostPipe(body, endpoint) {
	const userStore = useUserStore();
	const { user } = userStore;

	const response = await fetch(baseUrl + endpoint, {
		method: "POST",
		headers: { "Content-Type": "application/json", Authorization: user.token },
		body: JSON.stringify(body),
	});
	return await response.json();
}

export async function LogInPipe(body, endpoint) {
	const response = await fetch(baseUrl + endpoint, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	return await response.json();
}
