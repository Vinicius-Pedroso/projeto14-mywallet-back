import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import { getLogin } from './controlers/loginControler.js';
import { getSignin } from './controlers/signControler.js';
import { addTransaction, getTransactions } from './controlers/transactionControler.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", getLogin)

app.post("/Signup", getSignin);

app.get("/home", getTransactions);

app.post("/Transaction", addTransaction)

app.listen(5000);