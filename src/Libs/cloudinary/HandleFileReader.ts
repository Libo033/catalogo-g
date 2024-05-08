import React, { SetStateAction } from "react";
import { UploadApiResponse } from "cloudinary";
import { IProducto } from "../interfaces";

export const handleFileReader = (
  changeEvent: any,
  setUploadData: React.Dispatch<
    SetStateAction<UploadApiResponse | Error | undefined>
  >,
  setProduct: React.Dispatch<SetStateAction<Partial<IProducto>>>
): void => {
  try {
    const reader: FileReader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      if (typeof onLoadEvent.target?.result?.toString() === "string") {
        setProduct((prod) => ({
          ...prod,
          imagen: changeEvent.target.files[0].name,
        }));
        setUploadData(undefined);
      }
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  } catch (error) {
    setUploadData(undefined);
  }
};
