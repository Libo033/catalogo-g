import ProductForm from "@/components/form/ProductForm";
import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import React from "react";

const Producto = () => {
  return (
    <div className="pt-20 w-full mx-auto max-w-screen-2xl">
      <Breadcrumbs className="p-4 text-sm md:px-16 lg:px-40">
        <Link className="underline text-[#007acc]" href={"/admin/dashboard"}>
          ADMIN
        </Link>
        <p className="text-[#007acc]">NUEVO PRODUCTO</p>
      </Breadcrumbs>
      <ProductForm id={null} />
    </div>
  );
};

export default Producto;
