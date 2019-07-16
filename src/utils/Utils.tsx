export function formatDateTime(dateTime: Date | string): string {
	if (!dateTime) {
		return null;
	}

	if (typeof dateTime === "string") {
		dateTime = new Date(dateTime);
	}

	return dateTime && (dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString());
}

export function getDuration(startDate: Date | string, endDate: Date | string): string {
	if (!startDate || !endDate) {
		return null;
	}

	if (typeof startDate === "string") {
		startDate = new Date(startDate);
	}

	if (typeof endDate === "string") {
		endDate = new Date(endDate);
	}
	//maybe to use moment.js for formatted duration
	const duration = endDate.getTime() - startDate.getTime()
	//const days = Math.floor(duration / (1000 * 60 * 60 * 24));
	const hours = Math.floor(duration / (1000 * 60 * 60));
	const minutes = Math.abs(hours * 60 - Math.floor(duration / (1000 * 60))).toLocaleString(navigator.language, { minimumIntegerDigits: 2, useGrouping: false });
	const seconds = Math.floor(duration / 1000 % 60).toLocaleString(navigator.language, { minimumIntegerDigits: 2, useGrouping: false });

	return `${hours}:${minutes}:${seconds}`;
}

export interface IConstructor<T> {
	new(...args: any[]): T;
}

export function objectConstructor<T>(constructor: IConstructor<T>, ...args: any[]): T {
	return new constructor(args);
}
