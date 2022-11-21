import express from 'express';
import { getLogin } from './controlers/loginControler.js';
import { getSignin } from './controlers/signControler.js';
import { addTransaction, getTransactions } from './controlers/transactionControler.js';

const router = express.Router();
router.post("/", getLogin)
router.post("/Signup", getSignin);
router.get("/home", getTransactions);
router.post("/Transaction", addTransaction)
export default router;
