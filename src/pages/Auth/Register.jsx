// src/pages/Auth/Register.jsx
import React from "react";
import RegisterForm from "../../components/forms/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div style={{ width: 760 }}>
        <h1 className="text-2xl font-semibold mb-4">Retailer Registration</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
