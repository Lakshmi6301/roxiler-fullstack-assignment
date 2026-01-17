const sqlite3 = require("sqlite3").verbose()
const path = require("path")

const dbPath = path.join(__dirname, "../database.sqlite")
console.log("USING DATABASE FILE:", dbPath)

const db = new sqlite3.Database(dbPath)

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      address TEXT,
      role TEXT NOT NULL
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS stores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      address TEXT,
      owner_id INTEGER
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      store_id INTEGER,
      rating INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, store_id)
    )
  `)
})
const bcrypt = require("bcrypt")

db.get(
  "SELECT * FROM users WHERE role = 'admin'",
  [],
  (err, admin) => {
    if (!admin) {
      const hashedPassword = bcrypt.hashSync("Admin@123", 10)

      db.run(
        `
        INSERT INTO users (name, email, password, address, role)
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          "System Administrator Main Account",
          "admin@roxiler.com",
          hashedPassword,
          "System Head Office Address",
          "admin"
        ]
      )
    }
  }
)
module.exports = db
