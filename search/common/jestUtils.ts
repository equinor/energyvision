// fail() is currently missing from jest runner
// ref: https://github.com/facebook/jest/issues/11698
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fail = (reason: any) => {
  throw new Error(reason.toString())
}
