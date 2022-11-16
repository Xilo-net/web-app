export function normalizeString(string) {
	return string
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
}

export function getWeekdaysFromToday(string) {
	const days = [
		"Lunes",
		"Martes",
		"Miercoles",
		"Jueves",
		"Viernes",
		"Sabado",
		"Domingo",
	];
	let goBackDays = 7;

	let today = new Date().getDay();
	let daysSorted = new Array(goBackDays);

	for (var i = 0; i < goBackDays; i++) {
		daysSorted[i] = days[(today + i + goBackDays) % 7];
	}

	return daysSorted;
}
