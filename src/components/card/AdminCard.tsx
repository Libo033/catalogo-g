"use client";
import { IProducto } from "@/Libs/interfaces";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const EditIcon = () => {
  return <Image src={"/img/edit.svg"} alt="edit" width={18} height={18} />;
};

const TrashIcon = () => {
  return <Image src={"/img/trash.svg"} alt="edit" width={18} height={18} />;
};

const AdminCard = ({
  producto,
  handleDeleteProduct,
  show,
}: Readonly<{
  producto: IProducto;
  handleDeleteProduct: (id: string) => void;
  show: boolean;
}>) => {
  const r = useRouter();

  const handleEditProduct = (id: string) => {
    r.push(`/admin/dashboard/product/${id}`);
  };

  return (
    <>
      {show && (
        <article className="w-full h-fit border-2 rounded-xl p-2">
          <div className="relative flex justify-center border rounded-lg h-72">
            <Image
              className="object-cover object-center rounded-lg"
              src={producto.imagen}
              alt={producto.detalle}
              width={480}
              height={480}
            />
            {producto.precio > producto.oferta && producto.oferta !== 0 ? (
              <p className="absolute bottom-2 right-2 bg-[#ff6bb5] px-2 py-px rounded font-medium text-black text-lg bg-opacity-80">
                OFERTA $ {Intl.NumberFormat().format(producto.oferta)}{" "}
                <s className="text-sm">
                  $ {Intl.NumberFormat().format(producto.precio)}
                </s>
              </p>
            ) : (
              <p className="absolute bottom-2 right-2 bg-slate-700 px-2 py-px rounded font-medium text-white text-lg bg-opacity-80">
                $ {Intl.NumberFormat().format(producto.precio)}
              </p>
            )}
          </div>
          <div className="pt-4 h-24">
            {true && <p className="text-xl font-semibold">{producto.marca}</p>}
            <p className="text-lg font-medium">{producto.detalle}</p>
            {producto.talle && <p>Talle: {producto.talle}</p>}
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
      )}
    </>
  );
};

export default AdminCard;
