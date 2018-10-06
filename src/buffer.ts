// TODO: Find a native function that does this
export function copy(
	dst: ArrayBufferLike,
	dstOffset: number,
	src: ArrayBufferView,
) {
	const dst_ = new Uint8Array(dst);
	const src_ = new Uint8Array(src.buffer);

	for (let i = 0; i < src.byteLength; i++) {
		dst_[dstOffset + i] = src_[src.byteOffset + i];
	}
}

export function viewBuffer(
	buffer: ArrayBuffer | SharedArrayBuffer | ArrayBufferView,
	byteLength = buffer.byteLength,
	byteOffset = 0,
): ArrayBufferView {
	if (buffer instanceof ArrayBuffer || buffer instanceof SharedArrayBuffer) {
		return { buffer, byteLength, byteOffset };
	} else {
		return {
			buffer: buffer.buffer,
			byteLength,
			byteOffset: buffer.byteOffset + byteOffset,
		};
	}
}
