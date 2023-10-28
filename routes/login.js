import db from '../db.js';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secretKey = 'dfkjjsnmdskjdsckmdsfjialksnofnm';
const router =express.Router();
router.post('',(req, res) => {
    console.log("inside login route")
    const { username, password } = req.body;
    // Query the database to find the user by username
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (error, results) => {
      if (error) {
        // Handle database query error
        res.status(500).json({ message: 'Database error' });
      } else if (results.length === 1) {
        // User found in the database
        const user = results[0];
        const hashedPassword = user.password; // Retrieve the hashed password from the database
        // Verify the provided password against the stored hash
        bcrypt.compare(password, hashedPassword, (compareError, isMatch) => {
          if (compareError) {
            // Handle bcrypt comparison error
            res.status(500).json({ message: 'Authentication error' });
          } else if (isMatch) {
            // Authentication successful
            const token = jwt.sign({ username: user.username, role: user.role }, secretKey, {
              expiresIn: '1h',
            });
            res.json({ token, role: user.role });
          } else {
            // Authentication failed
            res.status(401).json({ message: 'Authentication failed' });
          }
        });
      } else {
        // User not found in the database
        res.status(401).json({ message: 'Authentication failed' });
      }
    });
  });
   export default router;