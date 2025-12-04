// src/components/forms/RegisterForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import { endpoints } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";

export default function RegisterForm(){
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  async function onSubmit(data) {
    try {
      await api.post(endpoints.register, { ...data, role: "retailer" });
      alert("Registered — wait for approval or login");
      nav("/catalog"); // adjust to desired page
    } catch(e) {
      alert(e.response?.data?.message || e.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow">
      <div className="mb-3">
        <label className="block text-sm">Business Name</label>
        <input {...register("businessName")} className="w-full border p-2 rounded"/>
      </div>

      <div className="mb-3">
        <label className="block text-sm">Contact Name</label>
        <input {...register("name")} className="w-full border p-2 rounded"/>
      </div>

      <div className="mb-3">
        <label className="block text-sm">Email</label>
        <input {...register("email")} type="email" className="w-full border p-2 rounded"/>
      </div>

      <div className="mb-3">
        <label className="block text-sm">Password</label>
        <input {...register("password")} type="password" className="w-full border p-2 rounded"/>
      </div>

      <div className="mb-4">
        <label className="block text-sm">GST / Tax ID</label>
        <input {...register("gst")} className="w-full border p-2 rounded"/>
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Register</button>
    </form>
  );
}
