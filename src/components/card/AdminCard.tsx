import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";

const EditIcon = () => {
  return <Image src={"/img/edit.svg"} alt="edit" width={18} height={18} />;
};

const TrashIcon = () => {
  return <Image src={"/img/trash.svg"} alt="edit" width={18} height={18} />;
};

const AdminCard = () => {
  return (
    <article className="w-full h-fit border-2 rounded-xl p-2">
      <div className="relative flex justify-center border rounded-lg h-72">
        <Image
          className="object-contain"
          src={
            "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg"
          }
          alt=""
          width={480}
          height={480}
        />
        {false && (
          <p className="absolute bottom-2 right-2 bg-slate-700 px-2 py-px rounded font-medium text-white text-lg bg-opacity-80">
            $ {Intl.NumberFormat().format(3000)}
          </p>
        )}
        {true && (
          <p className="absolute bottom-2 right-2 bg-[#ff6bb5] px-2 py-px rounded font-medium text-black text-lg bg-opacity-80">
            OFERTA $ {Intl.NumberFormat().format(2999)}{" "}
            <s className="text-sm">$ {Intl.NumberFormat().format(3500)}</s>
          </p>
        )}
      </div>
      <div className="pt-4 h-24">
        {true && <p className="text-xl font-semibold">Natura</p>}
        <p className="text-lg font-medium">Bolsa de Regalos</p>
        {false && <p className="">Talle: 1</p>}
      </div>
      <div className="flex gap-4 mt-4">
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
        >
          Modificar
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<TrashIcon />}
        >
          Eliminar
        </Button>
      </div>
    </article>
  );
};

export default AdminCard;
