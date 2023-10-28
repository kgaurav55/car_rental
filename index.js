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
const port = 3000;
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
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




