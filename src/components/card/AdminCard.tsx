"use client";
import { IProducto } from "@/Libs/interfaces";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const EditIcon = () => {
  return <Image src={"/img/edit.svg"} alt="edit" width={18} height={18} />;
};

const TrashIcon = () => {
  return <Image src={"/img/trash.svg"} alt="edit" width={18} height={18} />;
};

const AdminCard = (producto: Readonly<IProducto>) => {
  const r = useRouter();

  const handleEditProduct = (id: string) => {
    r.push(`/admin/dashboard/${id}`);
  };

  const handleDeleteProduct = (id: string) => {
    Swal.fire({
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
        Swal.fire({
          title: "Borrado!",
          text: "El producto se ha eliminado!",
          icon: "success",
          confirmButtonColor: "#c88fd1",
        });
      }
    });
  };

  return (
    <article className="w-full h-fit border-2 rounded-xl p-2">
      <div className="relative flex justify-center border rounded-lg h-72">
        <Image
          className="object-contain"
          src={
            "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg"
          }
          alt={producto.detalle}
          width={480}
          height={480}
        />
        {producto.precio < producto.oferta && (
          <p className="absolute bottom-2 right-2 bg-slate-700 px-2 py-px rounded font-medium text-white text-lg bg-opacity-80">
            $ {Intl.NumberFormat().format(producto.precio)}
          </p>
        )}
        {producto.precio >= producto.oferta && (
          <p className="absolute bottom-2 right-2 bg-[#ff6bb5] px-2 py-px rounded font-medium text-black text-lg bg-opacity-80">
            OFERTA $ {Intl.NumberFormat().format(producto.oferta)}{" "}
            <s className="text-sm">
              $ {Intl.NumberFormat().format(producto.precio)}
            </s>
          </p>
        )}
      </div>
      <div className="pt-4 h-24">
        {true && <p className="text-xl font-semibold">{producto.marca}</p>}
        <p className="text-lg font-medium">{producto.detalle}</p>
        {producto.talle && <p className="">Talle: {producto.talle}</p>}
      </div>
      <div className="flex gap-4 mt-4">
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => handleEditProduct(producto._id)}
        >
          Modificar
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<TrashIcon />}
          onClick={() => handleDeleteProduct(producto._id)}
        >
          Eliminar
        </Button>
      </div>
    </article>
  );
};

export default AdminCard;
