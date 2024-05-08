export const handleDelete = (img: string, upload_preset: string) => {
  const public_id: string = img.slice(
    img.indexOf(upload_preset) + upload_preset.length,
    img.length - 4
  );

  fetch(`/api/v1/image/${public_id}`, { method: "DELETE" });
};
