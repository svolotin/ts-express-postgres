import express, { Request } from "express";
import { createTransaction } from '../repository/transaction';

const transactionRouter = express.Router();

transactionRouter
  .route("/")
  .post(async (req, res, next) => {
    try {
      await createTransaction(req, res);
    } catch (err) {
      next(err);
    }
  }
  );

export default transactionRouter;