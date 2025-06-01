export interface IProductsCategory {
  id: string;
  name: string;
  img: string;
  slug: string;
  description: string;
  productCategory: string | IProductsCategory | null;
  isActive: boolean;
}
