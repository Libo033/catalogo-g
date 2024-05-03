import clientPromise from "@/Libs/database/mongodb";
import { IProducto } from "@/Libs/interfaces";
import {
  Db,
  Document,
  InsertOneResult,
  MongoClient,
  OptionalId,
} from "mongodb";

export async function GET(req: Request) {
  try {
    const client: MongoClient = await clientPromise;

    const db: Db = client.db("catalogo-gri");
    const productos = await db.collection("productos").find().toArray();

    return Response.json({ code: 200, productos }, { status: 200 });
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data: Partial<IProducto> = await req.json();
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("catalogo-gri");

    const nuevo_producto: OptionalId<Document> = {
      categoria: data.categoria,
      marca: data.marca,
      detalle: data.detalle,
      imagen: data.imagen,
      talle: data.talle,
      stock: data.stock,
      precio: data.precio,
      oferta: data.oferta,
    };

    const producto_creado: InsertOneResult<Document> = await db
      .collection("productos")
      .insertOne(nuevo_producto);

    return Response.json(
      { code: 201, nuevo: producto_creado },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}
