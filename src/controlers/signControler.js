import db from '../db.js';

export async function getSignin(req,res) {

    const {name, email, password, passwordConfirm} = body.req

    try {

        const verifyUserEmail = await db.collection("users").findOne({
            email: email
        })
    
        if (verifyUserEmail) {
            console.log("Esse e-mail já esta cadastrado")
            return res.sendStatus(409);
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        }
    
        await db.collection("users").insertOne(newUser)
        return res.sendStatus(201);
    
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}