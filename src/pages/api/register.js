import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds for bcrypt

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, dob, email, password } = req.body;

    // Basic validation (you may want to enhance this)
    if (!fullName || !dob || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Store user information in your database
      // Replace this part with your actual database logic
      // For demonstration, we are just logging to the console
      console.log({
        fullName,
        dob,
        email,
        password: hashedPassword, // Store hashed password
      });

      // Send success response
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Handle any other HTTP method
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
