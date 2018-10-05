export function prefixLines(prefix: string, input: string): string {
	return input.split("\n").map(line => prefix + line).join("\n");
}
