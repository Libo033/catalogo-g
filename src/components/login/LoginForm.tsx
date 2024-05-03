import { TextField } from "@mui/material";
import React from "react";
import PinkButton from "../varios/PinkButton";

const LoginForm = () => {
  return (
    <form className="bg-white translate-y-[-15%] border-2 rounded-lg w-11/12 px-4 py-8">
      <div className="flex justify-center mt-4 mb-14">
        <h1 className="text-3xl font-bold">Catalogo Griselda</h1>
      </div>
      <div>
        <p className="capitalize text-3xl font-medium">Iniciar sesion</p>
      </div>
      <div className="flex flex-col gap-6 my-8">
        <TextField fullWidth variant="outlined" label="EMAIL" type="email" />
        <TextField
          fullWidth
          variant="outlined"
          label="CONTRASELA"
          type="password"
        />
      </div>
      <div>
        <PinkButton props={{ fullWidth: true, variant: "contained" }}>
          iniciar sesion
        </PinkButton>
      </div>
    </form>
  );
};

export default LoginForm;
