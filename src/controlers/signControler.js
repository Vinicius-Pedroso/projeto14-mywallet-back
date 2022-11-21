import db from '../db.js';

export async function postSignin(req,res) {

    const newUser = req.body

    try {

        const verifyUserEmail = await db.collection("users").findOne({
            email: newUser.email
        })
    
        if (verifyUserEmail) {
            console.log("Esse e-mail já esta cadastrado")
            return res.sendStatus(409);
        }

        const newUserAdd = {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        }
    
        await db.collection("users").insertOne(newUserAdd)
        return res.sendStatus(201);
    
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}