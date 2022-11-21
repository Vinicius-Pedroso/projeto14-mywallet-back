import express from 'express';
import { postLogin } from './controlers/loginControler.js';
import { postSignin } from './controlers/signControler.js';
import { postTransaction, getTransactions } from './controlers/transactionsControler.js';
import { validationSignup } from './validationMiddlewere.js';

const router = express.Router();
router.post("/", postLogin)
router.post("/Signup", validationSignup ,postSignin);
router.get("/home", getTransactions);
router.post("/Transaction", postTransaction)
export default router;
