declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

class RSAKeyPair {
  constructor(encryptionExponent: string, decryptionExponent: string, modulus: string): this
}

class Base64 {
  constructor(): this
  encode(source: string): string
}

interface Window {
  RSAKeyPair: RSAKeyPair
  Base64: Base64
  encryptedString: (key: RSAKeyPair, s: string) => string
  setMaxDigits: (number: number) => void
}

type Nullable<T> = T | null
