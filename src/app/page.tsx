"use client";
import ProductCard from "@/components/card/ProductCard";
import { IProducto } from "@/Libs/interfaces";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

interface ApiResponse {
  code: number;
  productos: IProducto[];
}

export default function Home() {
  const [productos, setProductos] = useState<IProducto[]>();
  const [search, setsearch] = useState<string>("");

  useEffect(() => {
    fetch("/api/v1/producto")
      .then((res: Response) => res.json())
      .then((data: ApiResponse) => {
        if (data.code === 200) {
          setProductos(data.productos);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      <section className="p-4 mb-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productos ? (
          productos.length > 0 ? (
            productos.map((prod) => <p></p>)
          ) : (
            <p className="h-80 flex justify-center items-center text-lg text-slate-600">
              <ProductCard />
            </p>
          )
        ) : (
          <>
            <Skeleton
              width={"100%"}
              sx={{ height: "456px", transform: "scale(1,1)" }}
            />
            <Skeleton
              width={"100%"}
              sx={{ height: "456px", transform: "scale(1,1)" }}
            />
            <Skeleton
              width={"100%"}
              sx={{ height: "456px", transform: "scale(1,1)" }}
            />
          </>
        )}
      </section>
    </main>
  );
}
