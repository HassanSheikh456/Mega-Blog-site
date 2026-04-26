"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "@/src/appwrite/auth_services";
import { login, logout } from "@/src/store/authSlice";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);
    if (loading) return null; return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    );
};

export default Page;
