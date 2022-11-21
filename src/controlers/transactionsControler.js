import joi from 'joi'
import db from '../db';

async function getTransactions (req,res){

    db.collection("users").find().toArray().then(transactions => {
        res.send(transactions);
    }).catch(error => {
        console.log(error)
        return res.sendStatus(500)
    });

}

async function addTransaction (req,res){

    const transactionSchema = joi.object({
        value: joi.number().required
    })

    const { date, description, value } = req.body;
    const email = req.headers.user

    try {

    const transaction = {
        date: date,
        description: description,
        value: value
    }

    const transactionValidation = transactionSchema.validate();

    if (transactionValidation.error) {
        console.log(transactionValidation.error.details)
        return res.sendStatus(422)
    }

    await db.collection("users").findOne({
        email: email
    }).insertOne(transaction)
    return res.sendStatus(201)

    } catch (error){
        console.error(error);
        return res.sendStatus(500);
    }

}

export {getTransactions, addTransaction};