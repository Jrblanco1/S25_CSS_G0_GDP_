import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotnev from 'dotenv';
import { NextApiRequest, NextApiResponse } from 'next';

dotnev.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log('API endpoint hit');

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const result = await pool.query(
        'SELECT * FROM Entity_Information WHERE email = $1', [email]
      );
      console.log(result.rows);
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const user = result.rows[0];
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error inserting data into PostgreSQL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

