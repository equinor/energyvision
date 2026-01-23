export const nameRegex = /^[\p{Letter}\s\-.']+$/u
export const contentRegex = /^[a-zA-Z0-9\s,.!?]+$/
export const englishTextRegex = /^[a-zA-Z0-9 ]*$/
export const urlRegex =
  /^(https?:\/\/)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(:\d+)?(\/.*)?$/
export const phoneRegex =
  /^[+]?([0-9]?[()]|[0-9]+|[0-9]+-){8,20}(?:x[0-9]{0,10})?$/g
export const emailRegex =
  /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/g
