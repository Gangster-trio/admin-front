// str byteToHex(uint8 byte)
//   converts a single byte to a hex string
function byteToHex(byte) {
  return ("0" + byte.toString(16)).slice(-2);
}

// str generateId(int len);
//   len - must be an even number (default: 40)
export function generateId(len) {
  let arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return [].map.call(arr, byteToHex).join("");
}