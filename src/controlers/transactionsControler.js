import db from '../db.js';

export async function getTransactions (req,res){

    db.collection("users").find().toArray().then(transactions => {
        res.send(transactions);
    }).catch(error => {
        console.log(error)
        return res.sendStatus(500)
    });

}

export async function postTransaction (req,res){

    const { date, description, value } = req.body;
    const user = req.headers.email

    const transactionSchema = joi.object({
        value: joi.number().required
    })

    const transactionValidation = transactionSchema.validate(value);

    if (transactionValidation.error) {
        console.log(transactionValidation.error)
        return res.sendStatus(422)
    }

    try {

    const transaction = {
        date: date,
        description: description,
        value: value
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
