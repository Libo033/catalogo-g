import cloudinary from "@/Libs/database/cloudinarydb";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const imagen = await cloudinary.uploader.destroy(
      "07-catalogo-gri/" + params.id,
      { resource_type: "image" }
    );

    return Response.json({ code: 200, deleted: imagen }, { status: 200 });
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}
