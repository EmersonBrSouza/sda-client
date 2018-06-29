import validator from 'validator'

function isAlpha (data) {
  data = validator.blacklist(data, '\'')
  return validator.isAlpha(data.replace(new RegExp(' ', 'g'), ''), 'pt-BR')
}

function isAlphanumeric (data) {
  return validator.isAlphanumeric(data.replace(new RegExp(' ', 'g'), ''), 'pt-BR')
}

export { isAlpha, isAlphanumeric }
