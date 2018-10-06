import { Reader, Writer } from "deno";
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

// Based on deno/io/copy
/**
 * Copies up to `max` bytes from `src` to `dst`.
 * @returns The number of bytes copied.
 */
export async function copyMax(dst: Writer, src: Reader, max: number): Promise<number> {
	let n = 0;
	const b = new Uint8Array(1024);
	while (n < max) {
		const result = await src.read({
			buffer: b.buffer,
			byteLength: Math.min(b.byteLength, max - n),
			byteOffset: 0,
		});
		n += await dst.write(b.subarray(0, result.nread));
		if (result.eof) {
			break;
		}
	}
	return n;
}
