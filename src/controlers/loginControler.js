import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import db from '../db.js';

export async function getLogin(req, res) {

    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });

    if(user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        
				await db.collection("sessions").insertOne({
					userId: user._id,
					token
				})

        res.send(token);
    } else {
        console.log("E-mail ou senha incorretos")
    }
}