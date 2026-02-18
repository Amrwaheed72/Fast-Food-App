import { Account, Avatars, Client, Databases, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: 'com.amr.fastfood',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
  categoriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!,
  customizationsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID!,
  menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID!,
  menuCustomizationsCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID!,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_ASSETS_BUCKET_ID!,
};

export const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);
