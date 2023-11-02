import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secretKey = 'dfkjjsnmdskjdsckmdsfjialksnofnm';
const { json, urlencoded }=bodyParser;
import db from './db.js';
import  registeRoute from './routes/register.js';
import  loginRoute from './routes/login.js';
import addCarRoute from './routes/addcar.js';
import bookCarRoute from './routes/bookcar.js';
import bookingsRoute from './routes/bookings.js';
import availableCarsRoute from './routes/availablecars.js';
import verifyToken from './verifyToken.js';
const app = express();
const port = 3789;





app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*
const createUsersTableSQL = `
 CREATE TABLE IF NOT EXISTS users (
   user_id INT AUTO_INCREMENT PRIMARY KEY,
   username VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   role ENUM('customer', 'agency') NOT NULL
 )
`;
const createCarsTableSQL = `
 CREATE TABLE IF NOT EXISTS cars (
   car_id INT AUTO_INCREMENT PRIMARY KEY,
   vehicle_model VARCHAR(255) NOT NULL,
   vehicle_number VARCHAR(255) NOT NULL,
   seating_capacity INT NOT NULL,
   rent_per_day DECIMAL(10, 2) NOT NULL,
   is_available BOOLEAN NOT NULL
 )
`; 
const createBookingsTableSQL = `
 CREATE TABLE IF NOT EXISTS bookings (
   booking_id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT NOT NULL,
   car_id INT NOT NULL,
   start_date DATE NOT NULL,
   end_date DATE NOT NULL,
   total_cost DECIMAL(10, 2) NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(user_id),
   FOREIGN KEY (car_id) REFERENCES cars(car_id)
 )
`;
  
db.query(createBookingsTableSQL, (err) => {
  if (err) throw err;
  console.log('Bookings table created.');
});




  */

app.use('/login',loginRoute);
app.use('/register',registeRoute);
app.use('/addcar',addCarRoute);
app.use('/bookcar',bookCarRoute);
app.use('/availablecars',availableCarsRoute);
app.use('/bookings',bookingsRoute);

app.get('/',(req,res)=>{
   res.send("hi there ");
})
app.get('/hi',(req,res)=>{
  res.send("hi there1 ");
})




