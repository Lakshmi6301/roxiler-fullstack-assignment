import { useState } from "react"
import axios from "../api/axios"
import { useNavigate, Link } from "react-router-dom"

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validate = () => {
    if (form.name.length < 20) {
      return "Name must be at least 20 characters"
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/

    if (!passwordRegex.test(form.password)) {
      return "Password must be 8–16 chars, include uppercase & special character"
    }

    return ""
  }

  const handleSignup = async () => {
    setError("")
    const validationError = validate()

    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      await axios.post("/auth/signup", form)
      alert("Signup successful. Please login.")
      navigate("/")
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Signup failed. Please check your inputs."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "450px", margin: "auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Create Account
        </h2>

        <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
          Sign up as a normal user
        </p>

        {error && (
          <p style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
            {error}
          </p>
        )}

        <input
          placeholder="Full Name (min 20 characters)"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          style={{ width: "100%" }}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#2563eb" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
