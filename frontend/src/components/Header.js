import { useNavigate } from "react-router-dom"

function Header({ title }) {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="header">
      <h2>{title}</h2>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Header
