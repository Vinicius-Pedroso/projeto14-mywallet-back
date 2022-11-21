import db from '../db';
import express from 'express'
import cors from 'cors'
import { validationSignup } from '../validationMiddlewere';

app.use(cors());
app.use(express.json());

app.use(validationSignup);

export async function getSignin(req,res) {

    try {

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