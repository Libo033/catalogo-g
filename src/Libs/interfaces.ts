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
