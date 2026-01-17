import { useEffect, useState } from "react"
import axios from "../api/axios"
import Header from "../components/Header"

function OwnerDashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get("/owner/dashboard").then(res => setData(res.data))
  }, [])

  if (!data) return null

  return (
    <>
      <Header title="Store Owner Dashboard" />

      <div className="container">
        <div className="card">
          <h3>{data.storeName}</h3>
          <p><strong>Average Rating:</strong> {data.averageRating}</p>
        </div>

        <div className="card">
          <h3>Users Who Rated</h3>

          {data.users.map(user => (
            <p key={user.id}>
              {user.name} ({user.email}) — Rating: {user.rating}
            </p>
          ))}
        </div>
      </div>
    </>
  )
}

export default OwnerDashboard
