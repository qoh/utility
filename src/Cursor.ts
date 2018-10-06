import { Reader, ReadResult, Seeker } from "deno";
import { copy, viewBuffer } from "./buffer";

interface ReadSeeker extends Reader, Seeker { }

export class Cursor implements ReadSeeker {
	private readonly buffer: ArrayBuffer;
	private byteLength: number;
	private byteOffset: number;

	constructor(source: ArrayBufferView) {
		this.buffer = source.buffer;
		this.byteLength = source.byteLength;
		this.byteOffset = source.byteOffset;
	}

	read(p: ArrayBufferView): Promise<ReadResult> {
		let nread;
		let eof;

		if (p.byteLength >= this.byteLength) {
			nread = this.byteLength;
			eof = true;
		} else {
			nread = p.byteLength;
			eof = false;
		}

		copy(p.buffer, p.byteOffset, viewBuffer(this.buffer, nread, this.byteOffset));
		this.byteLength -= nread;
		this.byteOffset += nread;
		return Promise.resolve({ nread, eof });
	}

	async seek(offset: number, whence: number): Promise<void> {
		throw new Error("Not yet implemented");
	}
}
