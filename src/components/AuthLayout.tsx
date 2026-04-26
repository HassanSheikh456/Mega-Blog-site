"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";


type Props = {
  children: React.ReactNode;
  authentication?: boolean;
};

const Protected = ({ children, authentication = true }: Props) => {
  const navigate = useNavigate();
  const authstatus = useSelector((state: RootState) => state.auth.status);
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    if (authentication && authstatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authstatus !== authentication) {
      navigate("/");
    } 
  }, [authstatus, navigate, authentication]);

  return loader ? <h1>Loading</h1> : <>{children}</>;
};

export default Protected;