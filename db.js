var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "kkk",
  database: "test"
});
connection.connect();

const queryUserByCity = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT content FROM quill WHERE ID = ${id}`,
      (err, rows, fields) => {
        console.log("rows is" + rows);
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

module.exports = { queryUserByCity };
