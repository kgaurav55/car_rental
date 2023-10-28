import db from '../db.js';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verifyToken  from '../verifyToken.js';
const secretKey = 'dfkjjsnmdskjdsckmdsfjialksnofnm';
const router =express.Router();
router.post('',verifyToken,(req, res) => {

    console.log("inside book car");
    const {car_id, rentDays, start_date ,total_cost} = req.body;
    console.log(car_id);
    console.log(rentDays);
    console.log(start_date);
    console.log(total_cost);
    if (!car_id || !rentDays || !start_date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if(req.user.role==='agency')
    {
      return res.status(400).json({ message: 'you are not allowed to book the car'});
    }
    // Calculate the end date based on the start date and rent days
    const end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + rentDays);
    const username=req.user.username; 
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (error, results) => {
      if (error) {
        // Handle database query error
        res.status(500).json({ message: 'Database error' });
      } else if (results.length === 1) {
        // User found in the database
        const user = results[0];
        const user_id=user.user_id;
    // Query the database to check if the car exists in the booking table
    const carExistsQuery = 'SELECT * FROM bookings WHERE car_id = ?';
    db.query(carExistsQuery, [car_id], (err, carResults) => {
      if (err) {
        console.error('MySQL query error:', err);
        return res.status(500).json({ message: 'Booking failed' });
      }
  
      // If the car does not exist in the booking table, insert the booking
      if (carResults.length === 0) {
        // Insert the new booking into the database
        const insertQuery = 'INSERT INTO bookings (user_id,car_id, start_date, end_date,total_cost) VALUES (?, ?, ?,?,?)';
        db.query(insertQuery, [user_id,car_id, start_date, end_date,total_cost], (err, result) => {
          if (err) {
            console.error('MySQL insert error:', err);
            return res.status(500).json({ message: 'Booking failed' });
          }
          res.status(201).json({ message: 'Car booked successfully' });
        });
      } else {
        // Query the database to check for overlapping bookings
        const query = 'SELECT * FROM bookings WHERE car_id = ? AND (start_date <= ? AND end_date >= ?)';
        db.query(query, [car_id, end_date, start_date], (err, results) => {
          if (err) {
            console.error('MySQL query error:', err);
            return res.status(500).json({ message: 'Booking failed' });
          }
          if (results.length > 0) {
            return res.status(400).json({ message: 'Car is not available for the selected dates' });
          }
  
          // If no conflict is found, insert the new booking into the database
          const insertQuery = 'INSERT INTO bookings (user_id,car_id, start_date, end_date,total_cost) VALUES (?, ?, ?,?,?)';
          db.query(insertQuery, [user_id,car_id, start_date, end_date,total_cost], (err, result) => {
            if (err) {
              console.error('MySQL insert error:', err);
              return res.status(500).json({ message: 'Booking failed' });
            }
            res.status(201).json({ message: 'Car booked successfully' });
          });
        });
      }
    });
  }})
  });
export default router;