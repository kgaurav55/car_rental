import db from '../db.js';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secretKey = 'dfkjjsnmdskjdsckmdsfjialksnofnm';
const router =express.Router();
// Define authentication routes
router.post('',(req, res) => {
        console.log("inside register api")
        const { username, email, password, role } = req.body;
        console.log(username);
        console.log("role" + role);
        console.log("req.body" + req.body);
        if (!username || !email || !password || !role) {
          return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if the user already exists in the database
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {
          if (err) {
            console.error('MySQL query error:', err);
            return res.status(500).json({ message: 'Registration failed' });
          }
          if (results.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
          }
          // Hash the password securely (use a library like bcrypt)
          const saltRounds = 10;
          bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
              console.error('Password hashing error:', err);
              return res.status(500).json({ message: 'Registration failed' });
            }
            // Insert the user into the database
            const insertQuery = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
            db.query(insertQuery, [username, email, hashedPassword, role], (err, result) => {
              if (err) {
                console.error('MySQL insert error:', err);
                return res.status(500).json({ message: 'Registration failed' });
              }
              // Create and send a JWT token as a response
              const token = jwt.sign({ username, role }, secretKey);
              res.status(201).json({ token });
            });
          });
        });
      });
// Export the router
export default router;
//module.exports  = router;