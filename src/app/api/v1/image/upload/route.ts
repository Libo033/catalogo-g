import cloudinary from "@/Libs/database/cloudinarydb";
import { UploadApiResponse } from "cloudinary";

export async function POST(req: Request) {
  try {
    const data: { url: string } = await req.json();

    const imagen: UploadApiResponse = await cloudinary.uploader.upload(
      data.url,
      { upload_preset: "07-catalogo-gri" }
    );

    return Response.json({ code: 201, imagen }, { status: 201 });
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}
