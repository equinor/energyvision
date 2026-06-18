export type Level2Keys<T> = {
  [K in keyof T]: T[K] extends object ? keyof T[K] : never
}[keyof T & (string | number)]
