import db from '../db.js';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verifyToken  from '../verifyToken.js';
const secretKey = 'dfkjjsnmdskjdsckmdsfjialksnofnm';
const router =express.Router();
router.post('', verifyToken, (req, res) => {
    console.log("showing the body "+req.body);
    const {vehicle_model,vehicle_number, seating_capacity,rent_per_day } = req.body;
    const is_available=true;
    console.log("showng the role of the user "+req.user.role);
    // Check if the user has the "agency" role
    if (req.user.role !== 'agency') {
      return res.status(403).json({ message: 'Only agency users can add cars' });
    }
    if(!vehicle_model|| !vehicle_number|| ! seating_capacity|| ! rent_per_day)
      {
        return res.status(500).json({ message: 'Please fill all the details !' });
      }
    // Add the car to the database (use your database connection)
    const insertQuery = 'INSERT INTO cars (vehicle_model,vehicle_number,seating_capacity,rent_per_day,is_available) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [vehicle_model,vehicle_number,seating_capacity,rent_per_day,is_available ], (err, result) => {
      if (err) {
        console.error('MySQL insert error:', err);
        return res.status(500).json({ message: 'Car addition failed' });
      }
      res.status(201).json({ message: 'Car added successfully' });
    });
  });
  export default router;