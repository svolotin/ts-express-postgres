import { type Request, type Response } from 'express';
import * as db from "zapatos/db";
import type * as s from "zapatos/schema";
import pool from "../pool";

interface Payload {
  first_name: string,
  last_name: string,
  email: string
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await db.sql<s.users.SQL, s.users.Selectable[]>`
    SELECT * FROM ${"users"}`.run(pool);
    res.status(200).send(users);

  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send({ msg: err.message });
    } else {
      res.status(500).send({ msg: 'An unexpected error occurred' });
    }
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, first_name, last_name } = <Payload>req.body;
    let user: s.users.JSONSelectable | undefined;
    user = await db
      .insert("users", {
        email: email,
        first_name: first_name,
        last_name: last_name,
      })
      .run(pool);
    res.status(200).send(user);

  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send({ msg: err.message });
    } else {
      res.status(500).send({ msg: 'An unexpected error occurred' });
    }
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { params } = req;
    const { id } = params;
    const users = await db
    .select("users", {
      user_id: Number(id),
    })
    .run(pool);
  res.status(200).send(users[0]);

  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send({ msg: err.message });
    } else {
      res.status(500).send({ msg: 'An unexpected error occurred' });
    }
  }
};