import joi from 'joi'
import db from '../db';

export async function getSignin(req,res) {

    const signUpSchema = joi.object({
        name: joi.string().required().min(3).max(30),
        email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string().required(),
        passwordConfirm: joi.ref('password')
    });

    try {
        const newUser = req.body;
    
        const validationName = signUpSchema.validate(newUser);
        console.log(validationName.error)
        if (validationName.error) {
            console.log("Erro no cadastro")
            return res.sendStatus(422);
        }
    
        const verifyUserEmail = await db.collection("users").findOne({
            email: newUser.email
        })
    
        if (verifyUserEmail) {
            console.log("Esse e-mail já esta cadastrado")
            return res.sendStatus(409);
        }
    
        await db.collection("users").insertOne(newUser)
        return res.sendStatus(201);
    
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}