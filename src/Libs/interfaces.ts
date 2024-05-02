export interface IProducto {
  _id: string;
  marca: string;
  detalle: string;
  imagen: string;
  talle: false | string;
  stock: boolean;
  precio: number;
  oferta: number;
}
