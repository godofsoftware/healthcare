// pages/api/login.js

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken'; // Import JWT library
import bcrypt from 'bcrypt';

// Mock user data (In real application, this would be from a database)
const users = [
  {
    email: 'doctor@bayer.com',
    password: '$2b$10$Xcm7wOOlSKDUUaCLvaGaLeguqPZSkoveTg.ybieD.mBlnjGYNJa0G', // 'password' hashed
    type: 'doctor',
  },
  {
    email: 'patient@bayer.com',
    password: '$2b$10$Xcm7wOOlSKDUUaCLvaGaLeguqPZSkoveTg.ybieD.mBlnjGYNJa0G', // 'password' hashed
    type: 'patient',
  },
];

// Secret key for JWT (store this securely)
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_KEY;

export default function handler(req = NextApiRequest, res = NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ email: user.email, type: user.type }, JWT_SECRET, { expiresIn: '1h' });

    // Send back the token
    return res.status(200).json({ message: 'Logged in successfully', token:token, type:user.type });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
