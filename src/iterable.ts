export async function collectAsync<T>(iterable: AsyncIterable<T>): Promise<T[]> {
	const values = [];

	for await (const value of iterable) {
		values.push(value);
	}

	return values;
}

export async function joinAsync(iterable: AsyncIterable<string>, separator = ""): Promise<string> {
	const parts = [];

	for await (const part of iterable) {
		parts.push(part);
	}

	return parts.join(separator);
}

export function joinSync(iterable: Iterable<string>, separator = ""): string {
	return Array.from(iterable).join(separator);
}
