import { Breadcrumbs, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div className="m-auto max-w-screen-2xl">
      <div className="px-4 pt-4">
        <Link
          className="text-[#007acc] text-lg underline"
          href={"/admin/dashboard/product"}
        >
          Crear producto
        </Link>
      </div>
      <div className="p-4">
        <TextField
          className="w-full sm:w-80"
          autoComplete="off"
          placeholder="Buscar productos"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Image
                  src={"/img/search.svg"}
                  alt="search"
                  width={24}
                  height={24}
                />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          sx={{ backgroundColor: "#fff" }}
        />
      </div>
      <section className="p-4"></section>
    </div>
  );
};

export default Dashboard;
