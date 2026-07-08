import API_URL from "../config";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  const navigate = useNavigate();

//   useEffect(() => {

//   const token = localStorage.getItem("token");

//   const role = localStorage.getItem("role");

//   if (
//     !token ||
//     !["superadmin", "admin"].includes(role)
//   ) {
//     navigate("/admin");
//   }

// }, [navigate]);

  return (
    <>
      <UserSidebar />

      <div
        style={{
          marginLeft: "270px",
          minHeight: "100vh",
          padding: "30px",
          background: "#f7f8fc",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            fontWeight: "600",
          }}
        >
          Admin Dashboard
        </h1>

        <div
          style={{
            marginTop: "20px",
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          Welcome to your dashboard
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;