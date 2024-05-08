"use client";
import { UploadApiResponse } from "cloudinary";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import PinkButton from "../varios/PinkButton";
import { IProducto } from "@/Libs/interfaces";
import { useRouter } from "next/navigation";
import UploadImage from "../varios/UploadImage";

const ProductForm = ({ id }: Readonly<{ id: string | null }>) => {
  const router = useRouter();
  const [uploadData, setUploadData] = useState<
    // Response del cloudinary
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

    const productoCreado = await fetch("/api/v1/producto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (productoCreado.ok) {
      router.push("/admin/dashboard");
    }
  };

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
        <UploadImage
          product={product}
          setProduct={setProduct}
          uploadData={uploadData}
          setUploadData={setUploadData}
        />
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
