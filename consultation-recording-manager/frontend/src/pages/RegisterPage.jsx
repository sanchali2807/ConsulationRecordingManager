import {
  useState
} from "react";

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
    <div>

      <h1>Register</h1>

      {error && <p>{error}</p>}

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          name="name"
          placeholder="Name"
          onChange={
            handleChange
          }
        />

        <input
          name="email"
          placeholder="Email"
          onChange={
            handleChange
          }
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={
            handleChange
          }
        />

        <button
          type="submit"
        >
          {
            loading
              ? "Loading..."
              : "Register"
          }
        </button>

      </form>

    </div>
  );
}