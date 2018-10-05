import { Reader } from "deno";
import { viewBuffer } from "./misc";

const streamOptions = { stream: true };

export async function* decodeStream(input: Reader, encoding: string, fatal?: boolean): AsyncIterableIterator<string> {
	const decoder = new TextDecoder(encoding, { fatal });
	const readBuffer = new ArrayBuffer(1024);
	const readBufferView = viewBuffer(readBuffer);

	do {
		const { nread, eof } = await input.read(readBufferView);

		if (nread > 0) {
			const part = decoder.decode(
				viewBuffer(readBuffer, nread), streamOptions);

			if (part.length > 0) {
				yield part;
			}
		}

		if (eof) {
			break;
		}
	} while (true);

	const rest = decoder.decode();

	if (rest.length > 0) {
		yield rest;
	}
}
