import mysql from 'mysql';
const db = mysql.createConnection({
  host: 'sql11.freesqldatabase.com',
  user: 'sql11658678',
  password: 'S8XgnAQstX',
  database: 'sql11658678',
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