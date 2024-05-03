"use client";
import LoginForm from "@/components/login/LoginForm";
import { IErrorLogin } from "@/Libs/interfaces";
import { Alert } from "@mui/material";
import React, { FormEvent, useState } from "react";

const Admin = () => {
  const [error, setError] = useState<IErrorLogin>({
    email: false,
    pass: false,
    info: "",
  });

  const handleOnChange = () => {
    setError({ email: false, pass: false, info: "" });
  };

  const handleLogin = async (Event: FormEvent) => {
    Event.preventDefault();

    if (true) {
      setError({
        email: true,
        pass: true,
        info: "Email y/o contraseña incorrecto!",
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#c88fd160]">
      {error.info !== "" && (
        <Alert
          sx={{ position: "absolute", top: "15px" }}
          severity="error"
          variant="filled"
          onClose={() =>
            setError({ email: error.email, pass: error.pass, info: "" })
          }
        >
          {error.info}
        </Alert>
      )}
      <LoginForm
        handleLogin={handleLogin}
        error={error}
        handleOnChange={handleOnChange}
      />
    </div>
  );
};

export default Admin;
