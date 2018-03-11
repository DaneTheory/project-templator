export const defaults = {
  info: () => { },
  error: (msg: string) => {
    throw new Error(msg)
  },
}
