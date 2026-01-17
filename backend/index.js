const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes")
const ownerRoutes = require("./routes/ownerRoutes")

require("./db/database")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/user", userRoutes)
app.use("/api/owner", ownerRoutes)

app.listen(5000, () => {
  console.log("Server running on port 5000")
})
