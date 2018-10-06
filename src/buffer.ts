// TODO: Find a native function that does this
export function copy(
	dst: ArrayBuffer | SharedArrayBuffer,
	dstOffset: number,
	src: ArrayBufferView,
) {
	const dst_ = new Uint8Array(dst);
	const src_ = new Uint8Array(src.buffer);

	for (let i = 0; i < src.byteLength; i++) {
		dst_[dstOffset + i] = src_[src.byteOffset + i];
	}
}
