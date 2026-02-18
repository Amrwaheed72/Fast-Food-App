import { Models } from 'react-native-appwrite';

export interface MenuCustomizations {
  menu: string;
  customizations: string;
}
export interface MenusProps extends Models.Document {
  name: string;
  description: string;
  image_url: string;
  rating: number;
  calories: number;
  protein: number;
  price: number;
  category_name: string;
  menuCustomizations: MenuCustomizations;
}
export interface CategoriesProps extends Models.Document {
  name: string;
  description: string;
  menu: string;
}
