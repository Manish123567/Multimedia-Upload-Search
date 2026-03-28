import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";   
import FileDetail from "./pages/FileDetails"; 

function ProtectedRoute({ children }) {
  const token = useSelector(state => state.auth.token);
  return token ? children : <Navigate to="/" />;
}


function PublicRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  return !token ? children : <Navigate to="/upload" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
         <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />


        {/* Protected Routes */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        {/* File Detail */}
        <Route
          path="/files/:id"
          element={
            <ProtectedRoute>
              <FileDetail />
            </ProtectedRoute>
          }
        />

{ /*  Smart fallback */ }
       <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate to="/upload" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}