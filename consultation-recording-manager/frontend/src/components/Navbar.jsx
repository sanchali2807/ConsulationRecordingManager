import { Link, useNavigate }
from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

export default function Navbar() {

  const navigate =
    useNavigate();

  const { logout } =
    useAuth();

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (
    <nav className="navbar"
      style={{
        padding: "15px",
        display: "flex",
        justifyContent:
          "space-between",
        alignItems:
          "center",
        borderBottom:
          "1px solid #ddd"
      }}
    >
      <h2>
        Consultation Manager
      </h2>

      <div>
        <Link
          to="/"
          style={{
            marginRight:
              "20px"
          }}
        >
          Dashboard
        </Link>

        <button
        className="primary-btn"
          onClick={
            handleLogout
          }
        >
          Logout
        </button>
      </div>
    </nav>
  );
}