import { FormControlLabel, Switch, TextField } from "@mui/material";
import React from "react";
import PinkButton from "../varios/PinkButton";
import Image from "next/image";

const ProductForm = ({ id }: Readonly<{ id: string | null }>) => {
  return (
    <form className="px-4 mt-4 mb-10 md:px-16 lg:px-40">
      <p className="text-xl font-medium pb-3">
        {!id ? "Nuevo Producto" : "Editar Producto"}
      </p>
      <div className="flex flex-col gap-6">
        {id && (
          <div>
            <TextField fullWidth variant="outlined" label="ID" />
          </div>
        )}
        <div>
          <TextField fullWidth variant="outlined" label="CATEGORIA" />
        </div>
        <div>
          <TextField fullWidth variant="outlined" label="MARCA" />
        </div>
        <div>
          <TextField fullWidth variant="outlined" label="DETALLE" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <TextField fullWidth variant="outlined" label="IMAGEN" />
            <label className="h-full" htmlFor="image-uploader">
              <PinkButton
                props={{ variant: "contained", sx: { height: "56px" } }}
              >
                <Image
                  src={"/img/folder.svg"}
                  alt="folder"
                  width={24}
                  height={24}
                />
              </PinkButton>
            </label>
            <input className="hidden" id="image-uploader" type="file" />
            <PinkButton
              props={{ variant: "contained", sx: { height: "56px" } }}
            >
              +
            </PinkButton>
          </div>
          {false && (
            <div className="max-h-[382px]">
              <Image
                className="border-2 rounded-xl"
                src={
                  "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg"
                }
                alt=""
                width={480}
                height={480}
              />
            </div>
          )}
        </div>
        <div className="flex gap-6">
          <TextField fullWidth variant="outlined" label="TALLE" />
          <FormControlLabel
            sx={{ width: "99%" }}
            required
            control={<Switch defaultChecked />}
            label="Stock"
          />
        </div>
        <div className="flex gap-6">
          <TextField fullWidth variant="outlined" label="PRECIO" />
          <TextField fullWidth variant="outlined" label="OFERTA" />
        </div>
        <div>
          <PinkButton props={{ fullWidth: true, variant: "contained" }}>
            {!id ? "Crear Producto" : "Editar Producto"}
          </PinkButton>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
