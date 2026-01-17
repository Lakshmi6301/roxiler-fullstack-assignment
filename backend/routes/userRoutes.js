const express = require("express")

const db = require("../db/database")
const authMiddleware = require("../middleware/auth")

const router = express.Router()

router.get("/stores", authMiddleware(["user"]), (req, res) => {
  const userId = req.user.id

  const query = `
    SELECT
      s.id,
      s.name,
      s.address,
      IFNULL(ROUND(AVG(r.rating), 1), 0) as overallRating,
      ur.rating as userRating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    LEFT JOIN ratings ur
      ON s.id = ur.store_id AND ur.user_id = ?
    GROUP BY s.id
    ORDER BY s.name ASC
  `

  db.all(query, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Database error" })
    }

    res.json(rows)
  })
})

router.post("/ratings", authMiddleware(["user"]), (req, res) => {
  const userId = req.user.id
  const storeId = req.body.store_id
  const rating = req.body.rating

  if (!storeId || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Invalid rating data" })
  }

  const query = `
    INSERT INTO ratings (user_id, store_id, rating)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id, store_id)
    DO UPDATE SET rating = excluded.rating
  `

  db.run(query, [userId, storeId, rating], function (err) {
    if (err) {
      return res.status(500).json({ message: "Rating submission failed" })
    }

    res.json({ message: "Rating submitted successfully" })
  })
})

module.exports = router
