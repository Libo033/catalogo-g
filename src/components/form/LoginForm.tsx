import { TextField } from "@mui/material";
import React, { FormEvent } from "react";
import PinkButton from "../varios/PinkButton";
import { IErrorLogin } from "@/Libs/interfaces";

const LoginForm = ({
  handleLogin,
  error,
  handleOnChange,
}: Readonly<{
  handleLogin: (Event: FormEvent, email: string, password: string) => void;
  error: IErrorLogin;
  handleOnChange: () => void;
}>) => {
  return (
    <form
      onSubmit={(Event: FormEvent) =>
        handleLogin(
          Event,
          (document.getElementById("email") as HTMLInputElement).value,
          (document.getElementById("password") as HTMLInputElement).value
        )
      }
      className="bg-white translate-y-[-15%] border-2 rounded-lg w-11/12 px-4 py-8 sm:w-96"
    >
      <div className="flex justify-center mt-4 mb-14">
        <h1 className="text-3xl font-bold">Catalogo Griselda</h1>
      </div>
      <div>
        <p className="capitalize text-3xl font-medium">Iniciar sesion</p>
      </div>
      <div className="flex flex-col gap-8 my-8">
        <TextField
          fullWidth
          id="email"
          variant="outlined"
          label="EMAIL"
          type="email"
          error={error.email}
          onChange={handleOnChange}
          required
        />
        <TextField
          fullWidth
          id="password"
          variant="outlined"
          label="CONTRASEÑA"
          type="password"
          error={error.pass}
          onChange={handleOnChange}
          required
        />
      </div>
      <div>
        <PinkButton
          props={{ fullWidth: true, variant: "contained", type: "submit" }}
        >
          iniciar sesion
        </PinkButton>
      </div>
    </form>
  );
};

export default LoginForm;
