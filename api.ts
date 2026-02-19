import { Query } from 'react-native-appwrite';
import { appwriteConfig, databases } from './lib/appwrite';
import { CategoriesProps, MenusProps } from './types';

const {
  databaseId,
  userCollectionId,
  menuCollectionId,
  menuCustomizationsCollectionId,
  categoriesCollectionId,
  customizationsCollectionId,
} = appwriteConfig;
export const getMenu = async (filter: string, query: string) => {
  try {
    const buildQuery = [Query.orderDesc('$createdAt')];
    if (filter) {
      buildQuery.push(Query.equal('category_name', filter));
    }
    if (query) {
      buildQuery.push(Query.search('name', query));
    }
    const menus = await databases.listDocuments(databaseId, menuCollectionId, buildQuery);
    return menus.documents as unknown as MenusProps[];
  } catch (error) {
    throw error;
  }
};
export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(databaseId, categoriesCollectionId);
    return categories.documents as unknown as CategoriesProps[];
  } catch (error) {
    throw error;
  }
};
