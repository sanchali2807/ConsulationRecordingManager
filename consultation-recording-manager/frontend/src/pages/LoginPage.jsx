import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

import {
  login
} from "../services/authService";

export default function LoginPage() {

  const navigate =
    useNavigate();

  const { setUser } =
    useAuth();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const data =
          await login({
            email,
            password
          });

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

        setUser(
          data.user
        );

        navigate("/");

      } catch (err) {

        setError(
          err.response?.data
            ?.message ||
          "Login Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div>

      <h1>Login</h1>

      {error && <p>{error}</p>}

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          type="submit"
        >
          {
            loading
              ? "Loading..."
              : "Login"
          }
        </button>

      </form>

    </div>
  );
}