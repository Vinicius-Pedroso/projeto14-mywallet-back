import joi from 'joi'

export function validationSignup(req, res, next) {

    const newUser = req.body;

    const signUpSchema = joi.object({
        name: joi.string().required().min(3).max(30),
        email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string().required(),
        passwordConfirm: joi.ref('password')
    });

	const validation = signUpSchema.validate(newUser);

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}