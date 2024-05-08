import { UploadApiResponse } from "cloudinary";
import cloudinary from "../database/cloudinarydb";

export const handleUploadURL = (
  url: string,
  setUploadData: React.Dispatch<
    React.SetStateAction<UploadApiResponse | Error | undefined>
  >
) => {
  cloudinary.uploader
    .upload(url, { upload_preset: "" })
    .then((data: UploadApiResponse) => {
      setUploadData(data);
    })
    .catch((error) => {
      if (error instanceof Error) {
        setUploadData(error);
      }
    });
};
