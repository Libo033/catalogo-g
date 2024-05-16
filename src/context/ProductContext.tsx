import { GETResponse, IProducto, IProductsContext } from "@/Libs/interfaces";
import { createContext, useState, useEffect } from "react";

const defaultValue: IProductsContext = {
  products: undefined,
  load: false,
  productError: undefined,
};

export const ProductContext: React.Context<IProductsContext> =
  createContext(defaultValue);

export const ProductContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [products, setProducts] = useState<IProducto[] | undefined>();
  const [productError, setProductError] = useState<Error | undefined>();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch("/api/v1/producto", { method: "GET" })
      .then((res: Response) => res.json())
      .then((data: GETResponse) => {
        if (data.code === 200) setProducts(data.productos);
        setLoad(true);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setProductError(err);
          setLoad(true);
        }
      });
  }, []);

  return (
    <ProductContext.Provider value={{ products, load, productError }}>
      {children}
    </ProductContext.Provider>
  );
};
