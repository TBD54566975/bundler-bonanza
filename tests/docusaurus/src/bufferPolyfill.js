import { Buffer } from "buffer";

// Make Buffer available globally
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}
