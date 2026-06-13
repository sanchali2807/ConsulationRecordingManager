import {
  useState
} from "react";

import { Link } from "react-router-dom";
import {
  useNavigate
} from "react-router-dom";

import {
  register
} from "../services/authService";

export default function RegisterPage() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const data =
          await register(
            formData
          );

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        navigate("/");

      } catch (err) {

        setError(
          err.response?.data
            ?.message ||
          "Registration Failed"
        );

      } finally {

        setLoading(false);
      }
    };



return (
  <div className="auth-container">

    <form
      className="auth-card"
      onSubmit={handleSubmit}
    >

      <h1>Create Account</h1>

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email Address"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button
        className="primary-btn"
        type="submit"
      >
        {loading
          ? "Creating Account..."
          : "Register"}
      </button>

      <p className="auth-switch">
        Already have an account?
        <Link to="/login">
          Login
        </Link>
      </p>

    </form>

  </div>
);}