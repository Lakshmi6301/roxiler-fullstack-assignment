import { useEffect, useState } from "react"
import axios from "../api/axios"
import Header from "../components/Header"

function UserStores() {
  const [stores, setStores] = useState([])

  const fetchStores = async () => {
    const res = await axios.get("/user/stores")
    setStores(res.data)
  }

  useEffect(() => {
    fetchStores()
  }, [])

  const rateStore = async (storeId, rating) => {
    await axios.post("/user/ratings", { store_id: storeId, rating })
    fetchStores()
  }

  return (
    <>
      <Header title="Stores" />

      <div className="container">
        {stores.map(store => (
          <div className="card" key={store.id}>
            <h3>{store.name}</h3>
            <p><strong>Address:</strong> {store.address}</p>
            <p><strong>Overall Rating:</strong> {store.overallRating}</p>
            <p><strong>Your Rating:</strong> {store.userRating ?? "Not rated"}</p>

            {[1, 2, 3, 4, 5].map(num => (
              <button
                className="rating-btn"
                key={num}
                onClick={() => rateStore(store.id, num)}
              >
                {num}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default UserStores
