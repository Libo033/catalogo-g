"use client";
import AdminCard from "@/components/card/AdminCard";
import { IProducto } from "@/Libs/interfaces";
import { InputAdornment, Skeleton, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ApiResponse {
  code: number;
  productos: IProducto[];
}

const Dashboard = () => {
  const [productos, setProductos] = useState<IProducto[]>();

  useEffect(() => {
    fetch("/api/v1/producto", { method: "GET" })
      .then((res: Response) => res.json())
      .then((data: ApiResponse) => {
        setProductos(data.productos);
      })
      .catch((err) => {
        if (err instanceof Error) {
          console.log(err);
        }
      });
  }, []);

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
        {productos && productos.length > 0 ? (
          productos.map((producto) => (
            <AdminCard key={producto._id} {...producto} />
          ))
        ) : (
          <Skeleton width={"100%"} height={"382px"} />
        )}
      </section>
    </div>
  );
};

export default Dashboard;
