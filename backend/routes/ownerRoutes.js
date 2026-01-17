const express = require("express")

const db = require("../db/database")
const authMiddleware = require("../middleware/auth")

const router = express.Router()

router.get("/dashboard", authMiddleware(["owner"]), (req, res) => {
  const ownerId = req.user.id

  const storeQuery = `
    SELECT id, name
    FROM stores
    WHERE owner_id = ?
  `

  db.get(storeQuery, [ownerId], (err, store) => {
    if (!store) {
      return res.status(404).json({ message: "Store not found" })
    }

    const ratingQuery = `
      SELECT
        IFNULL(ROUND(AVG(r.rating), 1), 0) as averageRating
      FROM ratings r
      WHERE r.store_id = ?
    `

    db.get(ratingQuery, [store.id], (err, ratingRow) => {
      const usersQuery = `
        SELECT
          u.id,
          u.name,
          u.email,
          r.rating
        FROM ratings r
        JOIN users u ON r.user_id = u.id
        WHERE r.store_id = ?
        ORDER BY r.created_at DESC
      `

      db.all(usersQuery, [store.id], (err, users) => {
        res.json({
          storeName: store.name,
          averageRating: ratingRow.averageRating,
          users
        })
      })
    })
  })
})

module.exports = router
