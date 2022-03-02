import Joi from 'joi';

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

