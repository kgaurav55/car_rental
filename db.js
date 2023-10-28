import mysql from 'mysql';
const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12656509',
  password: 'uqTPKvJkEL',
  database: 'sql12656509',
  multipleStatements: true,
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});
export default db;