"use client";
import ProductCard from "@/components/card/ProductCard";
import { IProducto } from "@/Libs/interfaces";
import { InputAdornment, Skeleton, TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ApiResponse {
  code: number;
  productos: IProducto[];
}

export default function Home() {
  const [filter, setFilter] = useState<boolean>(false);
  const [productos, setProductos] = useState<IProducto[]>();
  const [search, setSearch] = useState<string>("");

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
    <main className="relative pt-20 w-full mx-auto max-w-screen-2xl min-h-screen">
      <div className="p-4">
        <TextField
          className="w-full sm:w-80"
          autoComplete="off"
          placeholder="Buscar productos"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Image
                  src={"/img/search.svg"}
                  alt="search"
                  width={24}
                  height={24}
                />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          sx={{ backgroundColor: "#fff" }}
        />
      </div>
      <section className="p-4 mb-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productos ? (
          productos.length > 0 ? (
            productos.map((prod) => (
              <ProductCard
                key={prod._id}
                producto={prod}
                show={
                  search === ""
                    ? true
                    : prod.detalle
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      prod.marca.toLowerCase().includes(search.toLowerCase())
                }
              />
            ))
          ) : (
            <p className="h-80 flex justify-center items-center text-lg text-slate-600">
              No tenes productos cargados.
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
      <div className="relative">
        <div
          className={`w-screen ease-in-out duration-300 z-30 fixed flex gap-0 justify-center items-center top-[50%] left-[50%] translate-y-[-50%] lg:hidden ${
            filter ? "translate-x-[-50%]" : "translate-x-[-142%]"
          }`}
        >
          <div className="w-10/12 h-96 rounded-lg border bg-white p-4 shadow-xl z-30">
            <div className="flex justify-between border-b">
              <p className="text-3xl font-medium">Filtros</p>
              <Image
                className="mx-2 cursor-pointer"
                onClick={() => setFilter(false)}
                src={"/img/close.svg"}
                alt="close"
                width={18}
                height={18}
              />
            </div>
          </div>
          <div
            onClick={() => setFilter(!filter)}
            className="w-fit h-full bg-transparent rotate-90 z-20 cursor-pointer"
          >
            <p className="bg-[#ff6bb5] fixed bottom-0 right-0 translate-x-[47px] z-50 text-white font-semibold uppercase px-4 rounded-t-lg">
              filtros
            </p>
          </div>
        </div>
      </div>
      {filter && (
        <span
          className={`lg:hidden fixed opacity-70 ease-in-out duration-300 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black h-screen w-screen z-20`}
        ></span>
      )}
    </main>
  );
}
