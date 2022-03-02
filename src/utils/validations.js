import Joi from 'joi';

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
