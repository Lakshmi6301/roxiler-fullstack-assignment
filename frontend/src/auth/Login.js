import { useState } from "react"
import axios from "../api/axios"
import { useNavigate, Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError("")
    setLoading(true)

    try {
      const response = await axios.post("/auth/login", {
        email,
        password
      })

      localStorage.setItem("token", response.data.token)
      localStorage.setItem("role", response.data.role)

      if (response.data.role === "admin") navigate("/admin")
      if (response.data.role === "user") navigate("/user")
      if (response.data.role === "owner") navigate("/owner")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "420px", margin: "auto" }}>
        <h2 style={{ marginBottom: "10px", textAlign: "center" }}>
          Welcome Back
        </h2>

        <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
          Please login to continue
        </p>

        {error && (
          <p style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
            {error}
          </p>
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          style={{ width: "100%" }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#2563eb" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
