import { UploadApiResponse } from "cloudinary";

interface ApiResponse {
  code: number;
  imagen: UploadApiResponse;
}

export const handleUploadURL = (
  url: string,
  setUploadData: React.Dispatch<
    React.SetStateAction<UploadApiResponse | Error | undefined>
  >
) => {
  fetch("/api/v1/image/upload", {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res: Response) => res.json())
    .then((data: ApiResponse) => {
      setUploadData(data.imagen);
    })
    .catch((err) => {
      if (err instanceof Error) {
        setUploadData(err);
      }
    });
};
