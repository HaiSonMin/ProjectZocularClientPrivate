export interface IProductsCategory {
  name: string;
  img: string;
  slug: string;
  description: string;
  productCategory: string | IProductsCategory;
  isActive: boolean;
}
