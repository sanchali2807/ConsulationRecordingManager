import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import RecordingDetailPage from "./pages/RecordingDetailPage";
import ProtectedRoute
from "./components/ProtectedRoute";
function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
  path="/"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>

        <Route
          path="/recordings/:id"
          element={<RecordingDetailPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;