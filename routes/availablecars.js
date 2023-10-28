import db from '../db.js';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verifyToken  from '../verifyToken.js';
const secretKey = 'dfkjjsnmdskjdsckmdsfjialksnofnm';
const router =express.Router();
router.get('',(req, res) => {

  console.log("inside avialable car");
    const query = 'SELECT * FROM cars WHERE is_available = true';
    db.query(query, (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        return res.status(500).json({ message: 'Error fetching available cars' });
      }
     // console.log(results);
      res.status(200).json(results);
    });
  });
export default router;