import { account, avatars, databases, appwriteConfig } from '@/lib/appwrite';
import { ID, Query } from 'react-native-appwrite';
import { create } from 'zustand';
interface UserProfile {
  $id: string;
  accountId: string;
  username: string;
  email: string;
  avatar: string;
}

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isLoggingOut: boolean;

  signin: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  getUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isLoggingOut: false,
  signin: async (email, password) => {
    
    try {
      await account.createEmailPasswordSession(email, password);
      await get().getUser();
      return true;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (username, email, password) => {
    
    try {
      const newAccount = await account.create(ID.unique(), email, password, username);
      if (!newAccount) throw new Error('Account creation failed');
      const avatarUrl = avatars.getInitialsURL(username).toString();
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          account_id: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
        }
      );
      await get().signin(email, password);

      return true;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  getUser: async () => {
    set({ isLoading: true });
    try {
      const currentAccount = await account.get();
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('account_id', currentAccount.$id)]
      );

      if (currentUser.documents.length > 0) {
        set({ user: currentUser.documents[0] as unknown as UserProfile });
      } else {
        set({ user: null });
      }
    } catch (error) {
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await account.deleteSession('current');
      set({ user: null });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
