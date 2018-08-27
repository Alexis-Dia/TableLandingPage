import validator from 'validator';

export function validateEmail (value) {
    if (!validator.isEmail(value)) {
        return `${value} is not a valid email.`
    }
    return ''
}

export function validateMessage (value) {
    if (value.length < 5) {
        return `The message must contain at least 5 characters.`
    }
    return ''
}