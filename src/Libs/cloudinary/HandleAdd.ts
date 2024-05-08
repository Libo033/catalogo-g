import { UploadApiResponse } from "cloudinary";
import { handleUploadURL } from "./HandleUploadURL";

export const handleAdd = (
  event: React.FormEvent,
  url: string,
  setUploadData: React.Dispatch<
    React.SetStateAction<UploadApiResponse | Error | undefined>
  >
) => {
  event.preventDefault();

  const fileInput: Element | null = document.getElementById("file");

  if ((fileInput as HTMLInputElement).files?.length === 0) {
    handleUploadURL(url, setUploadData);
  } else {
    //handleUploadPC("00-start", setUploadData);
  }
};
