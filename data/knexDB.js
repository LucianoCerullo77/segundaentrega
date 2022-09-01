const options = {
    //MariaDB
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "mainProject",
    },
  
    //MySqlite
    // client: "sqlite3",
    // connection: {
    //   filename: "./data/db/sqlite.db3",
    // },
  };
  
  module.exports = { options };