import clientPromise from "@/Libs/database/mongodb";
import { IProducto } from "@/Libs/interfaces";
import {
  Db,
  DeleteResult,
  Document,
  MongoClient,
  ObjectId,
  OptionalId,
  UpdateResult,
  WithId,
} from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("catalogo-gri");

    const producto: WithId<Document>[] = await db
      .collection("productos")
      .find({ _id: new ObjectId(params.id) })
      .toArray();

    return Response.json({ code: 200, producto: producto[0] }, { status: 200 });
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data: Partial<IProducto> = await req.json();
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("catalogo-gri");

    const modificar_producto: OptionalId<Document> = {
      categoria: data.categoria,
      marca: data.marca,
      detalle: data.detalle,
      imagen: data.imagen,
      talle: data.talle,
      stock: data.stock,
      precio: data.precio,
      oferta: data.oferta,
    };

    const producto_modificado: UpdateResult<Document> = await db
      .collection("productos")
      .updateOne(
        { _id: new ObjectId(params.id) },
        { $set: modificar_producto }
      );

    return Response.json(
      { code: 200, modificado: producto_modificado.acknowledged },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("catalogo-gri");

    const producto_borrado: DeleteResult = await db
      .collection("productos")
      .deleteOne({ _id: new ObjectId(params.id) });

    return Response.json(
      { code: 200, borrado: producto_borrado.acknowledged },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}
