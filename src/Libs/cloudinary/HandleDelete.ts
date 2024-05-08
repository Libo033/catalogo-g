type handleDeleteProps = {
  (img: string, upload_preset: string): Promise<boolean>;
};

export const handleDelete: handleDeleteProps = async (
  img: string,
  upload_preset: string
) => {
  let borrado = false;
  const public_id: string = img.slice(
    img.indexOf(upload_preset) + upload_preset.length,
    img.length - 4
  );

  fetch(`/api/v1/image/${public_id}`, { method: "DELETE" })
    .then((res: Response) => res.json())
    .then((data) => {
      if (data.deleted.result === "ok") {
        borrado = true;
      }
    })
    .catch((error) => {
      if (error instanceof Error) {
        borrado = false;
      }
    });

  return borrado;
};
