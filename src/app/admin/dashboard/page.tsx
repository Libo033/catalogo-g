"use client";
import AdminCard from "@/components/card/AdminCard";
import { IProducto } from "@/Libs/interfaces";
import { InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const productos: IProducto = {
  _id: "1",
  categoria: "productos",
  marca: "Natura",
  detalle: "Bolsa de regalos",
  imagen:
    "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
  talle: false,
  stock: true,
  precio: 3800,
  oferta: 3500,
};

const Dashboard = () => {
  return (
    <div className="pt-20 w-full mx-auto max-w-screen-2xl">
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
      <section className="p-4 mb-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AdminCard {...productos} />
        <AdminCard {...productos} />
        <AdminCard {...productos} />
        <AdminCard {...productos} />
        <AdminCard {...productos} />
        <AdminCard {...productos} />
      </section>
    </div>
  );
};

export default Dashboard;
