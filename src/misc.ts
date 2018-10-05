export function viewBuffer(
	buffer: BufferSource,
	byteLength = buffer.byteLength,
	byteOffset = 0,
): ArrayBufferView {
	if (buffer instanceof ArrayBuffer) {
		return { buffer, byteLength, byteOffset };
	} else {
		return {
			buffer: buffer.buffer,
			byteLength,
			byteOffset: buffer.byteOffset + byteOffset,
		};
	}
}
