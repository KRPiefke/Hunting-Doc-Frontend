import Joi from 'joi';

const passwordPattern = new RegExp(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*!@$%^&(){}[\]:#;<>,.?/~_+\-=|])(?:[0-9a-zA-Z*!@$%^&(){}[\]:#;<>,?/~_+\-=|]){8,32}$/
);
const passwordLowerCasePattern = new RegExp(/^(?!.*[a-z]{1}).+$/);
const passwordUpperCasePattern = new RegExp(/^(?!.*[A-Z]{1}).+$/);
const passwordSpecialCharPattern = new RegExp(/^(?!.*[*!@$%^&(){}[\]:#;<>,.?/~_+\-=|]{1}).+$/);
const usernamePattern = new RegExp(/^(?!.*[_.-]{2})[0-9a-zA-Z_.-]+$/);
const usernameRepeatetCharsPattern = new RegExp(/^(?=.*[_.-]{2}).+$/);

export const nameValidation = name => {
    let { error } = Joi.string()
        .min(2)
        .max(32)
        .required()
        .messages({
            'string.min': 'Dein Name muss mindestens 2 Zeichen lang sein.',
            'string.max': 'Dein Name darf höchsten 32 Zeichen lang sein.',
            'any.required': 'Dein Name ist ein Pflichtfeld.',
        })
        .validate(name);
    return error?.details[0].message;
};

export const usernameValidation = username => {
    if (usernameRepeatetCharsPattern.test(username)) {
        return 'Zwei oder mehr aufeinander folgende Sonderzeichen sind nicht erlaubt.';
    }
    let { error } = Joi.string()
        .min(6)
        .max(32)
        .required()
        .pattern(usernamePattern)
        .messages({
            'string.min': 'Der Nutzername muss mindestens 6 Zeichen lang sein.',
            'string.max': 'Der Nutzername darf höchstens 32 Zeichen lang sein.',
            'any.required': 'Der Nutzername ist ein Pflichtfeld.',
            'string.pattern.base':
                'Der Nutzername darf nur Kleinbuchstaben, Großbuchstaben, Zahlen, ".", "_", und "-" enthalten.',
        })
        .validate(username);
    return error?.details[0].message;
};

export const emailValidation = email => {
    let { error } = Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .messages({
            'string.email': 'Die E-Mail Adresse ist ungültig.',
            'any.required': 'Der Nutzername ist ein Pflichtfeld.',
        })
        .validate(email);
    return error?.details[0].message;
};

export const passwordValidation = password => {
    if (passwordLowerCasePattern.test(password)) {
        return 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten.';
    }
    if (passwordUpperCasePattern.test(password)) {
        return 'Das Passwort muss mindestens einen Großbuchstaben enthalten.';
    }
    if (passwordSpecialCharPattern.test(password)) {
        return 'Das Passwort muss mindestens ein Sonderzeichen enthalten.';
    }
    let { error } = Joi.string()
        .min(8)
        .max(32)
        .required()
        .pattern(passwordPattern)
        .messages({
            'string.min': 'Das Passwort muss mindestens 8 Zeichen lang sein.',
            'string.max': 'Das Passwort darf höchstens 32 Zeichen lang sein.',
            'any.required': 'Das Passwort ist ein Pflichtfeld.',
            'string.pattern.base': 'Das Passwort ist ungültig.',
        })
        .validate(password);
    return error?.details[0].message;
};

export const repeatedPasswordValidation = (password, repeatedPassword) => {
    if (!repeatedPassword) return 'Das Passwort wiederholen ist ein Pflichtfeld.';
    if (password === repeatedPassword) {
        return null;
    }
    return 'Die Passwörter stimmen nicht überein.';
};
