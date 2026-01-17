import { useEffect, useState } from "react"
import axios from "../api/axios"
import Header from "../components/Header"

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  })

  useEffect(() => {
    axios.get("/admin/dashboard").then(res => setStats(res.data))
  }, [])

  return (
    <>
      <Header title="Admin Dashboard" />

      <div className="container">
        <div className="card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div className="card">
          <h3>Total Stores</h3>
          <p>{stats.totalStores}</p>
        </div>

        <div className="card">
          <h3>Total Ratings</h3>
          <p>{stats.totalRatings}</p>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
