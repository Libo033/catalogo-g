"use client";
import { UploadApiResponse } from "cloudinary";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import PinkButton from "../varios/PinkButton";
import Image from "next/image";
import { IProducto } from "@/Libs/interfaces";
import { handleAdd } from "@/Libs/cloudinary/HandleAdd";
import { handleDelete } from "@/Libs/cloudinary/HandleDelete";

let buttonClass =
  "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPink MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPink MuiButton-root MuiButton-contained MuiButton-containedPink MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPink css-ggvnso-MuiButtonBase-root-MuiButton-root";

const ProductForm = ({ id }: Readonly<{ id: string | null }>) => {
  const [uploadData, setUploadData] = useState<
    UploadApiResponse | Error | undefined
  >();
  const [product, setProduct] = useState<Partial<IProducto>>({
    categoria: "",
    marca: "",
    detalle: "",
    imagen: "",
    talle: false,
    stock: true,
    precio: 0,
    oferta: 0,
  });

  const handleNuevoProducto = async (event: FormEvent) => {
    event.preventDefault();

    console.log(product);
  };

  const handleAddImage = () => {
    if (product.imagen) handleAdd(product.imagen, setUploadData);
  };

  const handleDeleteImage = async () => {
    if (uploadData && !(uploadData instanceof Error)) {
      // RETORNA SIEMPRE FALSE
      const borrado: boolean = await handleDelete(
        uploadData.secure_url,
        "07-catalogo-gri/"
      );

      if (borrado) {
        // BUSCAR ERROR
        setUploadData(undefined);
        setProduct((prod) => ({ ...prod, imagen: "" }));
      }
    }
  };

  useEffect(() => {
    if (uploadData instanceof Error) {
      console.log(uploadData);
    } else if (uploadData) {
      setProduct((prod) => ({ ...prod, imagen: uploadData.secure_url }));
    }
  }, [uploadData]);

  return (
    <form
      className="px-4 mt-4 mb-10 md:px-16 lg:px-40"
      onSubmit={(Event: FormEvent) => handleNuevoProducto(Event)}
    >
      <p className="text-xl font-medium pb-3">
        {!id ? "Nuevo Producto" : "Editar Producto"}
      </p>
      <div className="flex flex-col gap-6">
        {id && (
          <div>
            <TextField
              fullWidth
              variant="outlined"
              label="ID"
              value={id}
              disabled
            />
          </div>
        )}
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="CATEGORIA"
            value={product.categoria}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProduct((prod) => ({ ...prod, categoria: e.target.value }))
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="MARCA"
            value={product.marca}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProduct((prod) => ({ ...prod, marca: e.target.value }))
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="DETALLE"
            value={product.detalle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProduct((prod) => ({ ...prod, detalle: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <TextField
              fullWidth
              variant="outlined"
              label="IMAGEN"
              value={product.imagen}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProduct((prod) => ({ ...prod, imagen: e.target.value }))
              }
            />
            <label className={buttonClass} htmlFor="image-uploader">
              <Image
                src={"/img/folder.svg"}
                alt="folder"
                width={24}
                height={24}
              />
            </label>
            <input className="hidden" id="image-uploader" type="file" />
            <PinkButton
              props={{
                variant: "contained",
                sx: { height: "56px" },
                onClick: (e) => handleAddImage(),
              }}
            >
              +
            </PinkButton>
          </div>
          {uploadData && !(uploadData instanceof Error) && (
            <div className="max-h-[382px] relative">
              <Image
                className="border-2 rounded-xl"
                src={uploadData.secure_url}
                alt=""
                width={480}
                height={480}
              />
              <Image
                onClick={handleDeleteImage}
                className="absolute top-4 right-4"
                src={"/img/close.svg"}
                alt="close"
                width={24}
                height={24}
              />
            </div>
          )}
        </div>
        <div className="flex gap-6">
          <TextField
            fullWidth
            variant="outlined"
            label="TALLE"
            value={product.talle !== false ? product.talle : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProduct((prod) => ({
                ...prod,
                talle: e.target.value === "" ? false : e.target.value,
              }))
            }
          />
          <FormControlLabel
            sx={{ width: "99%" }}
            control={
              <Switch
                defaultChecked
                value={product.stock}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProduct((prod) => ({ ...prod, stock: e.target.checked }))
                }
              />
            }
            label="Stock"
          />
        </div>
        <div className="flex gap-6">
          <TextField
            fullWidth
            variant="outlined"
            label="PRECIO"
            type="number"
            value={product.precio}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProduct((prod) => ({
                ...prod,
                precio: parseFloat(e.target.value),
              }))
            }
          />
          <TextField
            fullWidth
            variant="outlined"
            label="OFERTA"
            type="number"
            value={product.oferta}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProduct((prod) => ({
                ...prod,
                oferta: parseFloat(e.target.value),
              }))
            }
          />
        </div>
        <div>
          <PinkButton
            props={{ fullWidth: true, variant: "contained", type: "submit" }}
          >
            {!id ? "Crear Producto" : "Editar Producto"}
          </PinkButton>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
