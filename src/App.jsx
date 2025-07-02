import React from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();

  // List of public routes (not wrapped in MainLayout)
  const publicRoutes = ["/", "/login"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  return isPublicRoute ? (
    <AppRoutes />
  ) : (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
}

export default App;
