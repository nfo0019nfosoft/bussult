import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("TOKEN =>", token);
  console.log("ROLE =>", role);

  const allowedRoles = [
    "superadmin",
    "admin",
    "manager",
    "support",
    "sales"
  ];

  if (!token || !allowedRoles.includes(role)) {

    console.log("Redirecting to login...");

    return <Navigate to="/admin" replace />;

  }

  return children;

}

export default AdminProtectedRoute;