"use client";
import LoginForm from "@/components/form/LoginForm";
import { IErrorLogin } from "@/Libs/interfaces";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

interface ApiResponse {
  code: number;
}

const Admin = () => {
  const router = useRouter();
  const [error, setError] = useState<IErrorLogin>({
    email: false,
    pass: false,
    info: "",
  });

  const handleOnChange = () => {
    setError({ email: false, pass: false, info: "" });
  };

  const handleLogin = async (
    Event: FormEvent,
    email: string,
    password: string
  ) => {
    Event.preventDefault();

    const res: Response = await fetch("/api/v1/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.code === 200) {
      router.push("/admin/dashboard");
    } else {
      if (true) {
        setError({
          email: true,
          pass: true,
          info: "Email y/o contraseña incorrecto!",
        });
      }
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
