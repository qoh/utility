export { prefixLines } from "./string";
export { toUTF8, decode, fromUTF8Fatal, fromUTF8Safe, fromUTF8 } from "./encoding";
export { collectAsync, joinAsync, joinSync } from "./iterable";
export { copy, viewBuffer } from "./buffer";

// deno-specific
export { decodeStream } from "./stream";
export { decodeFile, readFileToBufferFull, readFileToString } from "./fs";
