import { IProducto } from "@/Libs/interfaces";
import Image from "next/image";
import React from "react";
import PinkButton from "../varios/PinkButton";
import Swal from "sweetalert2";

interface ProductCardProps {
  producto: IProducto;
  show: boolean;
}

const ShareIcon = () => (
  <Image src={"/img/share.svg"} alt="share" width={21} height={21} />
);

const ProductCard = ({ producto, show }: Readonly<ProductCardProps>) => {
  const shareProduct = async (id: string) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Catalogo Gri",
          url: `http://192.168.0.95:3000/#${id}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Tu dispositivo no esta habilitado para compartir",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      }
    }
  };

  return (
    <>
      {show && (
        <article
          id={producto._id}
          className="w-full h-fit border-2 rounded-xl p-2"
        >
          <div className="relative flex justify-center border rounded-lg h-72">
            <Image
              className="object-cover object-center rounded-lg"
              src={producto.imagen}
              alt={producto.detalle}
              width={480}
              height={480}
            />
            {producto.precio > producto.oferta && producto.oferta !== 0 ? (
              <p className="absolute bottom-2 right-2 bg-[#ff6bb5] px-2 py-px rounded font-medium text-black text-lg bg-opacity-80">
                OFERTA $ {Intl.NumberFormat().format(producto.oferta)}{" "}
                <s className="text-sm">
                  $ {Intl.NumberFormat().format(producto.precio)}
                </s>
              </p>
            ) : (
              <p className="absolute bottom-2 right-2 bg-slate-700 px-2 py-px rounded font-medium text-white text-lg bg-opacity-80">
                $ {Intl.NumberFormat().format(producto.precio)}
              </p>
            )}
          </div>
          <div className="pt-4 h-24">
            {true && <p className="text-xl font-semibold">{producto.marca}</p>}
            <p className="text-lg font-medium">{producto.detalle}</p>
            {producto.talle && <p>Talle: {producto.talle}</p>}
          </div>
          <div>
            <PinkButton
              props={{
                fullWidth: true,
                variant: "contained",
                startIcon: <ShareIcon />,
                onClick: (event: React.MouseEvent) =>
                  shareProduct(producto._id),
              }}
            >
              Compartir
            </PinkButton>
          </div>
        </article>
      )}
    </>
  );
};

export default ProductCard;
