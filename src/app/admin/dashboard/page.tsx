"use client";
import AdminCard from "@/components/card/AdminCard";
import { IProducto } from "@/Libs/interfaces";
import { InputAdornment, Skeleton, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface ApiResponse {
  code: number;
  productos: IProducto[];
}

const Dashboard = () => {
  const [productos, setProductos] = useState<IProducto[]>();

  const handleDeleteProduct = (id: string) => {
    Swal.fire({
      // Primera pantalla para verificar si se quiere borrar
      title: "Estas seguro?",
      text: "Una vez borrado no se podra recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c88fd1",
      cancelButtonColor: "#f44336",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se quiere borrar, se llama a la API para borrar
        fetch(`/api/v1/producto/${id}`, { method: "DELETE" })
          .then((res: Response) => res.json)
          .then((data) => {
            setProductos(
              productos ? productos.filter((p) => p._id !== id) : productos
            );
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              // Error en caso de que no se pueda borrar
              title: "Error",
              text: "No se pudo elimnar el producto",
              icon: "error",
              confirmButtonColor: "#c88fd1",
            });
            return;
          });
        Swal.fire({
          // Borrado exitosamente
          title: "Borrado!",
          text: "El producto se ha eliminado!",
          icon: "success",
          confirmButtonColor: "#c88fd1",
        });
      }
    });
  };

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
            <AdminCard
              producto={producto}
              handleDeleteProduct={handleDeleteProduct}
              key={producto._id}
            />
          ))
        ) : (
          <>
            {" "}
            <Skeleton
              width={"100%"}
              sx={{ height: "456px", transform: "scale(1,1)" }}
            />
            <Skeleton
              width={"100%"}
              sx={{ height: "456px", transform: "scale(1,1)" }}
            />
            <Skeleton
              width={"100%"}
              sx={{ height: "456px", transform: "scale(1,1)" }}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
