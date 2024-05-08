import { UploadApiResponse } from "cloudinary";
import { handleUploadURL } from "./HandleUploadURL";
import { handleUploadPC } from "./HandleUploadPC";

export const handleAdd = (
  url: string,
  setUploadData: React.Dispatch<
    React.SetStateAction<UploadApiResponse | Error | undefined>
  >
) => {
  const fileInput: Element | null = document.getElementById("image-uploader");

  if ((fileInput as HTMLInputElement).files?.length === 0) {
    handleUploadURL(url, setUploadData);
  } else {
    handleUploadPC("07-catalogo-gri", setUploadData);
  }
};
