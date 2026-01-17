const express = require("express")
const bcrypt = require("bcrypt")

const db = require("../db/database")
const authMiddleware = require("../middleware/auth")

const router = express.Router()

router.get("/dashboard", authMiddleware(["admin"]), (req, res) => {
  const result = {}

  db.get("SELECT COUNT(*) as totalUsers FROM users", [], (err, row) => {
    result.totalUsers = row.totalUsers

    db.get("SELECT COUNT(*) as totalStores FROM stores", [], (err, row) => {
      result.totalStores = row.totalStores

      db.get("SELECT COUNT(*) as totalRatings FROM ratings", [], (err, row) => {
        result.totalRatings = row.totalRatings
        res.json(result)
      })
    })
  })
})

router.post("/users", authMiddleware(["admin"]), (req, res) => {
  const name = req.body.name
  const email = req.body.email.trim().toLowerCase()
  const password = req.body.password
  const address = req.body.address
  const role = req.body.role

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  const hashedPassword = bcrypt.hashSync(password, 10)

  const query = `
    INSERT INTO users (name, email, password, address, role)
    VALUES (?, ?, ?, ?, ?)
  `

  db.run(query, [name, email, hashedPassword, address, role], function (err) {
    if (err) {
      return res.status(400).json({ message: "User creation failed" })
    }

    res.status(201).json({ message: "User created successfully" })
  })
})

router.get("/users", authMiddleware(["admin"]), (req, res) => {
  const query = `
    SELECT id, name, email, address, role
    FROM users
    ORDER BY name ASC
  `

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Database error" })
    }

    res.json(rows)
  })
})

router.post("/stores", authMiddleware(["admin"]), (req, res) => {
  const name = req.body.name
  const email = req.body.email.trim().toLowerCase()
  const address = req.body.address
  const ownerId = req.body.owner_id

  if (!name || !email || !ownerId) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  const query = `
    INSERT INTO stores (name, email, address, owner_id)
    VALUES (?, ?, ?, ?)
  `

  db.run(query, [name, email, address, ownerId], function (err) {
    if (err) {
      return res.status(400).json({ message: "Store creation failed" })
    }

    res.status(201).json({ message: "Store created successfully" })
  })
})

router.get("/stores", authMiddleware(["admin"]), (req, res) => {
  const query = `
    SELECT
      s.id,
      s.name,
      s.email,
      s.address,
      IFNULL(ROUND(AVG(r.rating), 1), 0) as rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
    ORDER BY s.name ASC
  `

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Database error" })
    }

    res.json(rows)
  })
})

module.exports = router
