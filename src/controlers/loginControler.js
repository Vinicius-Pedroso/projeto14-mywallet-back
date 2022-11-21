import db from '../db.js';

export async function postLogin(req, res) {

    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });

    if(password === user.password) {

        res.sendStatus(200);

    } else {
        console.log("E-mail ou senha incorretos")
    }
}