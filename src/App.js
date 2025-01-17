import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import AvoidAuth from "./components/AvoidAuth";
import Recipe from "./components/Recipe";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AvoidAuth>
              <Home />
            </AvoidAuth>
          }
        />
        <Route
          path="/login"
          element={
            <AvoidAuth>
              <Login />
            </AvoidAuth>
          }
        />
        <Route
          path="/register"
          element={
            <AvoidAuth>
              <Register />
            </AvoidAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <ProtectedRoute>
              <Recipe />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
