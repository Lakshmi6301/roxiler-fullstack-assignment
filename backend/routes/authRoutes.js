const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

const db = require("../db/database")
const { signupValidation } = require("../utils/validators")

const router = express.Router()

router.post("/signup", signupValidation, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const name = req.body.name
  const email = req.body.email.trim().toLowerCase()
  const password = req.body.password
  const address = req.body.address

  const hashedPassword = bcrypt.hashSync(password, 10)

  const query = `
    INSERT INTO users (name, email, password, address, role)
    VALUES (?, ?, ?, ?, 'user')
  `

  db.run(query, [name, email, hashedPassword, address], err => {
    if (err) {
      return res.status(400).json({ message: "Email already exists" })
    }
    res.status(201).json({ message: "User registered successfully" })
  })
})

router.post("/login", (req, res) => {
  const email = req.body?.email?.trim().toLowerCase()
  const password = req.body?.password

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" })
  }

  const query = `
    SELECT * FROM users
    WHERE LOWER(TRIM(email)) = LOWER(TRIM(?))
  `

  db.get(query, [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Database error" })
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const isMatch = bcrypt.compareSync(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secretkey",
      { expiresIn: "1d" }
    )

    res.json({ token, role: user.role })
  })
})

module.exports = router
