import { Reader } from "deno";
import { viewBuffer } from "./buffer";

const streamOptions = { stream: true };

export async function* decodeStream(
	input: Reader,
	encoding = "utf-8",
	fatal = false,
	chunkSize = 1024,
): AsyncIterableIterator<string> {
	const decoder = new TextDecoder(encoding, { fatal });
	const readBuffer = new ArrayBuffer(chunkSize);
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
