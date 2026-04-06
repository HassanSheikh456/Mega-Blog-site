import React from "react";
import authService from "@/src/appwrite/config";
import { logout } from "@/src/store/authSlice";
import { useDispatch } from "react-redux";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout();
    dispatch(logout());
  }

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-6 py-2 duration-200
       hover:bg-blue-100 rounded-full"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
