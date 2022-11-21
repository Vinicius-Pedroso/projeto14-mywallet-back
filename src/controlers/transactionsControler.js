import db from '../db.js';

export async function getTransactions (req,res){

    const user = req.headers.email

    db.collection("users").findOne({email: user}).toArray().then(transactions => {
        res.send(transactions);
    }).catch(error => {
        console.log(error)
        return res.sendStatus(500)
    });

}

export async function postTransaction (req,res){

    const { date, description, value } = req.body;
    const user = req.headers.user

    try {

    const transaction = {
        date: date,
        description: description,
        value: value
    }

    await db.collection("users").updateOne({email: user}, {$push: { "transactions": {transaction} } }
    )

    return res.sendStatus(201)

    } catch (error){
        console.error(error);
        return res.sendStatus(500);
    }

}
