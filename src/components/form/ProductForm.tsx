"use client";
import { UploadApiResponse } from "cloudinary";
import {
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import PinkButton from "../varios/PinkButton";
import Image from "next/image";
import { IProducto } from "@/Libs/interfaces";
import { handleAdd } from "@/Libs/cloudinary/HandleAdd";
import { handleDelete } from "@/Libs/cloudinary/HandleDelete";
import { handleFileReader } from "@/Libs/cloudinary/HandleFileReader";
import { useRouter } from "next/navigation";

let buttonClass =
  "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPink MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPink MuiButton-root MuiButton-contained MuiButton-containedPink MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPink css-ggvnso-MuiButtonBase-root-MuiButton-root";

const ProductForm = ({ id }: Readonly<{ id: string | null }>) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Para boton de agregar imagen
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

  const handleAddImage = () => {
    setLoading(true);
    if (product.imagen) handleAdd(product.imagen, setUploadData);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleDeleteImage = async () => {
    if (uploadData && !(uploadData instanceof Error)) {
      handleDelete(uploadData.secure_url, "07-catalogo-gri/");
      setProduct((prod) => ({ ...prod, imagen: "" }));
      setUploadData(undefined);
    }
  };

  useEffect(() => {
    // Cuando se agrega una imagen se guarda en el hook product y se mantiene en uploadData
    // Manejar errores con SweetAlert2
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
              autoComplete="off"
              disabled={Boolean(uploadData && !(uploadData instanceof Error))}
            />
            <label className={buttonClass} htmlFor="image-uploader">
              <Image
                src={"/img/folder.svg"}
                alt="folder"
                width={24}
                height={24}
              />
            </label>
            <input
              className="hidden"
              onChange={(e) => handleFileReader(e, setUploadData, setProduct)}
              id="image-uploader"
              type="file"
            />
            <PinkButton
              props={{
                variant: "contained",
                sx: { height: "56px" },
                onClick: (e) => handleAddImage(),
              }}
            >
              {loading ? (
                <CircularProgress size={"18px"} sx={{ color: "white" }} />
              ) : (
                "+"
              )}
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
