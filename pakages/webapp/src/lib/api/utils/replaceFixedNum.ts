export const replaceFixedNum = (value: number, fixed: number = 0) => {
  const numberFixed = value.toFixed(fixed).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return numberFixed
}
