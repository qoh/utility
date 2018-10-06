import { open, stat } from "deno";
import { decodeStream } from "./stream";
import { collectAsync } from "./iterable";
import { viewBuffer } from "./misc";
import { copy } from "./buffer";

export async function* decodeFile(
	filename: string,
	encoding?: string,
	fatal?: boolean,
	chunkSize?: number,
): AsyncIterableIterator<string> {
	const file = await open(filename);
	yield* decodeStream(file, encoding, fatal, chunkSize);
	await file.close();
}

export async function readFileToBufferFull(
	filename: string,
): Promise<ArrayBufferView> {
	const info = await stat(filename);
	const buffer = new ArrayBuffer(info.len);
	const file = await open(filename);

	let remaining = buffer.byteLength;
	let totalRead = 0;

	do {
		const { nread, eof } = await file.read(viewBuffer(buffer, remaining));

		if (totalRead + nread > buffer.byteLength) {
			// TODO: What to do if the file size increases during read?
			break;
		}

		copy(buffer, totalRead, viewBuffer(buffer, nread));

		remaining -= nread;
		totalRead += nread;

		if (eof) {
			break;
		}
	} while (true);

	await file.close();
	return viewBuffer(buffer, totalRead);
}

export async function readFileToString(
	filename: string,
	encoding?: string,
	fatal?: boolean,
	chunkSize?: number,
): Promise<string> {
	return (await collectAsync(
		decodeFile(filename, encoding, fatal, chunkSize))).join("");
}
