import db from '../db.js';

export async function postLogin(req, res) {

    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });

    if(password === user.password) {

        return res.send(user);

    } else {
        alert("E-mail ou senha incorretos")
    }
}