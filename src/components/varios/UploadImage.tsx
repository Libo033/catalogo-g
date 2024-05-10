"use client";
import { CircularProgress, TextField } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PinkButton from "./PinkButton";
import { IProducto } from "@/Libs/interfaces";
import { UploadApiResponse } from "cloudinary";
import { handleFileReader } from "@/Libs/cloudinary/HandleFileReader";
import { handleAdd } from "@/Libs/cloudinary/HandleAdd";
import { handleDelete } from "@/Libs/cloudinary/HandleDelete";
import Swal from "sweetalert2";

let buttonClass =
  "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPink MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPink MuiButton-root MuiButton-contained MuiButton-containedPink MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPink css-ggvnso-MuiButtonBase-root-MuiButton-root";

interface UploadImageProps {
  product: Partial<IProducto>;
  setProduct: React.Dispatch<React.SetStateAction<Partial<IProducto>>>;
  uploadData: Partial<UploadApiResponse> | Error | undefined;
  setUploadData: React.Dispatch<
    React.SetStateAction<Partial<UploadApiResponse> | Error | undefined>
  >;
}

const UploadImage = ({
  product,
  uploadData,
  setUploadData,
  setProduct,
}: Readonly<UploadImageProps>) => {
  const [loading, setLoading] = useState(false); // Para boton de agregar imagen

  const handleAddImage = () => {
    setLoading(true);
    if (product.imagen) handleAdd(product.imagen, setUploadData);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleDeleteImage = async () => {
    if (uploadData && !(uploadData instanceof Error)) {
      handleDelete(uploadData.secure_url || "", "07-catalogo-gri/");
      setProduct((prod) => ({ ...prod, imagen: "" }));
      setUploadData(undefined);
    }
  };

  useEffect(() => {
    // Cuando se agrega una imagen se guarda en el hook product y se mantiene en uploadData
    // Manejar errores con SweetAlert2
    if (uploadData instanceof Error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal!",
      });
    } else if (uploadData) {
      setProduct((prod) => ({ ...prod, imagen: uploadData.secure_url }));
    }
  }, [uploadData]);

  return (
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
          <Image src={"/img/folder.svg"} alt="folder" width={24} height={24} />
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
        <div className="max-h-[382px] flex justify-center items-center">
          <div className="relative">
            <Image
              className="border-2 rounded-xl flex max-h-[382px] object-contain"
              src={uploadData.secure_url || ""}
              alt={product.detalle ? product.detalle : ""}
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
        </div>
      )}
    </div>
  );
};

export default UploadImage;
