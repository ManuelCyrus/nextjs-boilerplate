import CryptoJS from 'crypto-js'
import { setCookie } from 'nookies';

const SECRET_KEY =process.env.SECRET_KEY as string;

export function Criptograph(key: string, value: string) {
  console.log("value //")
  const encryptedValue = CryptoJS?.AES?.encrypt(value, SECRET_KEY).toString()
  setCookie(null, key,encryptedValue, {
    maxAge:86700, 
    path: '/'
});
}
export function CriptographRoute(value: string) {
  const data = CryptoJS?.AES?.encrypt(value, SECRET_KEY).toString()
    return data
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function DescriptograhRoute(value: string): string | null {
 
  const normalData =  value.replace(/-/g, "+")
    .replace(/_/g, "/")
    + "=".repeat((4 - value.length % 4) % 4);

  const decryptedBytes = CryptoJS?.AES?.decrypt(normalData, SECRET_KEY)
  return decryptedBytes.toString(CryptoJS.enc.Utf8)
}

export function Descriptograh(value: string): string | null {
  const decryptedBytes = CryptoJS?.AES?.decrypt(value, SECRET_KEY)
  return decryptedBytes.toString(CryptoJS.enc.Utf8)
}