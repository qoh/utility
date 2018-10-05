
const textEncoder = new TextEncoder();
const textDecoderUTF8Fatal = new TextDecoder("utf-8", { fatal: true });
const textDecoderUTF8Safe = new TextDecoder();

export function toUTF8(input: string) {
	return textEncoder.encode(input);
}

export function decode(input: BufferSource, encoding: string, fatal?: boolean) {
	return new TextDecoder(encoding, { fatal }).decode(input);
}

export function fromUTF8Fatal(input: BufferSource) {
	return textDecoderUTF8Fatal.decode(input);
}

export function fromUTF8Safe(input: BufferSource) {
	return textDecoderUTF8Safe.decode(input);
}

export const fromUTF8 = fromUTF8Fatal;
