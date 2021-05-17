export const replaceStringNumInt = (value: string) => {
  return parseInt(value.replace(/\$\s?|(,*)/g, ''))
}
