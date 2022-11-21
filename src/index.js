import express from 'express'
import cors from 'cors'
import joi from 'joi'
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
try {
    await mongoClient.connect()
    db = mongoClient.db("myWallet");
} catch (error){
    console.log(error)
}

const signUpSchema = joi.object({
    name: joi.string().required().min(3).max(30),
    email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi.string().required(),
    passwordConfirm: joi.ref('password')
});

const loginSchema = joi.object({
    email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi.string().required()
})

const transactionSchema = joi.object({
    value: joi.number().required
})

app.post("/", async (req, res) => {

    try {
        const Login = req.body;
        console.log(Login)


    } catch (error){
        return res.sendStatus(500)
    }

})

app.post("/Signup", async (req, res) => {
    
    try {
    const newUser = req.body;
    console.log(newUser)

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

});

app.post("/Transaction", async (req, res) => {
    
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
})

app.post("/Transaction", async (req, res) => {
    const { data, description, value } = req.body;
    const user = req.headers.user

    try {

    const transaction = {
        data: data,
        description: description,
        value: value
    }

    const transactionValidation = transactionSchema.validate();

    if (transactionValidation.error) {
    console.log(transactionValidation.error.details)
        return res.sendStatus(422)
    }

    await db.collection("transactions").insertOne(transaction)
    return res.sendStatus(201)

    } catch (error){
        console.error(error);
        return res.sendStatus(500);
    }

    
})

app.get("/home", (req, res) => {
    
    db.collection("transactions").find().toArray().then(transactions => {
        res.send(transactions);
    }).catch(error => {
        console.log(error)
        return res.sendStatus(500)
    });
    
});

app.listen(5000);