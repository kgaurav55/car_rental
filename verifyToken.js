//import jwt from 'jasonwebtoken';
import jwt from 'jsonwebtoken';
const secretKey = 'dfkjjsnmdskjdsckmdsfjialksnofnm';
function verifyToken(req, res, next) {
    // Get the token from the request headers
    const token = req.header('Authorization');
    console.log("showing token "+token);
    // Check if the token is missing
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
      }
      // Store the decoded user information in the request object
      req.user = decoded;
      // Continue to the next middleware or route
      next();
    });
  }
  export default verifyToken;
  