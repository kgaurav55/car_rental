import db from '../db.js';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verifyToken  from '../verifyToken.js';
const secretKey = 'dfkjjsnmdskjdsckmdsfjialksnofnm';
const router =express.Router();
router.post('', verifyToken, (req, res) => {
    console.log("inside bookings")
    if (req.user.role === 'customer') {
      return res.status(400).json({ message: 'You are not allowed to see the bookings' });
    }
    // Fetch all booked cars and user details
    const query = `
      SELECT c.*, b.*, u.username AS user_username 
      FROM cars c
      INNER JOIN bookings b ON c.car_id = b.car_id
      INNER JOIN users u ON b.user_id = u.user_id
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        return res.status(500).json({ message: 'Failed to retrieve bookings' });
      }
      // Send the list of booked cars, user details, and car details in the response
      res.status(200).json({ bookings: results });
    });
  });
export default router;