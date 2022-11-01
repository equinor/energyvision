/* eslint-disable no-undef */
export const enableDynatrace = () => {
  if (dtrum) dtrum?.enable()
}
export const disableDynatrace = () => {
  if (dtrum) dtrum?.disable()
}
