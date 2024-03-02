export function validateProperties(
	item: any,
	properties: any[]
): [boolean, string | null] {
	for (let i = 0; i < properties.length; i += 1) {
		if (!Object.prototype.hasOwnProperty.call(item, properties[i])) {
			return [false, properties[i]];
		}
	}

	return [true, null];
}

export function validateValues(item: any): [boolean, string | null] {
	const entries = Object.entries(item);

	for (let i = 0; i < entries.length; i += 1) {
		const [property, value] = entries[i];

		if (!value) {
			return [false, property];
		}
	}

	return [true, null];
}
