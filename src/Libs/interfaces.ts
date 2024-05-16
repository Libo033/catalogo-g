export interface IProducto {
  _id: string;
  categoria: string;
  marca: string;
  detalle: string;
  imagen: string;
  talle: false | string;
  stock: boolean;
  precio: number;
  oferta: number;
}

export interface IErrorLogin {
  email: boolean;
  pass: boolean;
  info: string;
}

export interface IProductsContext {
  products: IProducto[] | undefined;
  load: boolean;
  productError: Error | undefined;
}

export interface GETResponse {
  code: number;
  productos: IProducto[];
}
